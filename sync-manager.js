// データ同期マネージャー
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot,
  serverTimestamp,
  enableNetwork,
  disableNetwork
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { 
  signInAnonymously, 
  onAuthStateChanged 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { db, auth } from './firebase-config.js';

class SyncManager {
  constructor() {
    this.isOnline = navigator.onLine;
    this.isAuthenticated = false;
    this.userId = null;
    this.syncStatus = 'disconnected'; // disconnected, connecting, connected, syncing, error
    this.lastSyncTime = null;
    this.setupEventListeners();
  }

  setupEventListeners() {
    // オンライン/オフライン状態の監視
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.connect();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.syncStatus = 'disconnected';
      this.updateSyncStatus();
    });

    // 認証状態の監視
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isAuthenticated = true;
        this.userId = user.uid;
        this.setupRealtimeSync();
      } else {
        this.isAuthenticated = false;
        this.userId = null;
        this.signInAnonymously();
      }
    });
  }

  async connect() {
    if (!this.isOnline) return;

    try {
      this.syncStatus = 'connecting';
      this.updateSyncStatus();

      if (!this.isAuthenticated) {
        await this.signInAnonymously();
      } else {
        await this.setupRealtimeSync();
      }

      this.syncStatus = 'connected';
      this.updateSyncStatus();
    } catch (error) {
      console.error('接続エラー:', error);
      this.syncStatus = 'error';
      this.updateSyncStatus();
    }
  }

  async signInAnonymously() {
    try {
      await signInAnonymously(auth);
      console.log('匿名認証完了');
    } catch (error) {
      console.error('認証エラー:', error);
      this.syncStatus = 'error';
      this.updateSyncStatus();
    }
  }

  async setupRealtimeSync() {
    if (!this.userId) return;

    const userDocRef = doc(db, 'users', this.userId);

    // リアルタイム同期の設定
    this.unsubscribe = onSnapshot(userDocRef, async (doc) => {
      if (doc.exists()) {
        const remoteData = doc.data();
        await this.mergeData(remoteData);
        this.lastSyncTime = new Date();
        this.updateSyncStatus();
        
        // カスタムイベントでアプリに変更を通知
        window.dispatchEvent(new CustomEvent('dataUpdated', { 
          detail: { completedHabits: remoteData.completedHabits } 
        }));
      }
    }, (error) => {
      console.error('同期エラー:', error);
      this.syncStatus = 'error';
      this.updateSyncStatus();
    });
  }

  async saveData(data) {
    if (!this.userId) return;

    try {
      this.syncStatus = 'syncing';
      this.updateSyncStatus();

      const userDocRef = doc(db, 'users', this.userId);
      await setDoc(userDocRef, {
        ...data,
        lastUpdated: serverTimestamp(),
        version: Date.now()
      }, { merge: true });

      this.lastSyncTime = new Date();
      this.syncStatus = 'connected';
      this.updateSyncStatus();
    } catch (error) {
      console.error('保存エラー:', error);
      this.syncStatus = 'error';
      this.updateSyncStatus();
    }
  }

  async loadData() {
    if (!this.userId) return null;

    try {
      const userDocRef = doc(db, 'users', this.userId);
      const docSnap = await getDoc(userDocRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        this.lastSyncTime = data.lastUpdated?.toDate() || new Date();
        return data;
      }
    } catch (error) {
      console.error('読み込みエラー:', error);
    }
    return null;
  }

  async mergeData(remoteData) {
    // ローカルデータとリモートデータをマージ
    const localData = this.getLocalData();
    
    if (!localData || !remoteData.version) {
      // ローカルデータがない場合、リモートデータを使用
      this.setLocalData(remoteData);
      return;
    }

    // バージョン比較で新しい方を採用
    if (remoteData.version > localData.version) {
      this.setLocalData(remoteData);
    } else if (localData.version > remoteData.version) {
      // ローカルの方が新しい場合はリモートに保存
      await this.saveData(localData);
    }
  }

  getLocalData() {
    try {
      const data = localStorage.getItem('habitData');
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('ローカルデータ読み込みエラー:', error);
      return null;
    }
  }

  setLocalData(data) {
    try {
      localStorage.setItem('habitData', JSON.stringify(data));
      // カスタムイベントでアプリに変更を通知
      window.dispatchEvent(new CustomEvent('dataUpdated', { detail: data }));
    } catch (error) {
      console.error('ローカルデータ保存エラー:', error);
    }
  }

  updateSyncStatus() {
    const statusElement = document.getElementById('sync-status');
    if (!statusElement) return;

    const statusTexts = {
      disconnected: 'オフライン',
      connecting: '接続中...',
      connected: '同期済み',
      syncing: '同期中...',
      error: 'エラー'
    };

    const statusIcons = {
      disconnected: '📱',
      connecting: '🔄',
      connected: '☁️',
      syncing: '🔄',
      error: '❌'
    };

    statusElement.textContent = `${statusIcons[this.syncStatus]} ${statusTexts[this.syncStatus]}`;
    statusElement.className = `sync-status ${this.syncStatus}`;

    if (this.lastSyncTime) {
      const timeElement = document.getElementById('last-sync-time');
      if (timeElement) {
        timeElement.textContent = `最終同期: ${this.lastSyncTime.toLocaleTimeString()}`;
      }
    }

    // エラー状態の場合は詳細をコンソールに出力
    if (this.syncStatus === 'error') {
      console.error('同期エラーの詳細:', {
        isOnline: this.isOnline,
        isAuthenticated: this.isAuthenticated,
        userId: this.userId
      });
    }
  }

  // アプリからのデータ保存リクエスト
  async saveAppData(data) {
    // ローカルに保存
    this.setLocalData(data);
    
    // オンラインの場合はクラウドにも保存
    if (this.isOnline && this.isAuthenticated) {
      await this.saveData(data);
    }
  }

  // 手動同期
  async forceSync() {
    if (!this.isOnline) {
      throw new Error('オフラインです。インターネット接続を確認してください。');
    }

    try {
      this.syncStatus = 'syncing';
      this.updateSyncStatus();

      const localData = this.getLocalData();
      if (localData) {
        await this.saveData(localData);
      }

      this.syncStatus = 'connected';
      this.updateSyncStatus();
    } catch (error) {
      this.syncStatus = 'error';
      this.updateSyncStatus();
      throw error;
    }
  }

  disconnect() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}

// シングルトンインスタンス
export const syncManager = new SyncManager();
