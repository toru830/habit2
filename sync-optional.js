// オプション同期機能（Firebase設定完了時のみ有効）
class OptionalSyncManager {
    constructor() {
        this.isEnabled = false;
        this.syncManager = null;
        this.init();
    }

    async init() {
        try {
            // Firebase設定が完了しているかチェック
            const config = await this.loadFirebaseConfig();
            if (config && this.isValidConfig(config)) {
                await this.enableSync();
                this.showSyncUI();
            } else {
                console.log('Firebase設定未完了 - 同期機能は無効');
                this.hideSyncUI();
            }
        } catch (error) {
            console.log('同期機能の初期化に失敗:', error);
            this.hideSyncUI();
        }
    }

    async loadFirebaseConfig() {
        try {
            // firebase-config.jsから設定を読み込み
            const response = await fetch('./firebase-config.js');
            const text = await response.text();
            
            // 設定オブジェクトを抽出
            const configMatch = text.match(/const firebaseConfig = ({[\s\S]*?});/);
            if (configMatch) {
                return eval('(' + configMatch[1] + ')');
            }
        } catch (error) {
            console.log('Firebase設定の読み込みに失敗:', error);
        }
        return null;
    }

    isValidConfig(config) {
        // デフォルト値でないかチェック
        return config && 
               config.apiKey !== "your-api-key" &&
               config.projectId !== "your-project-id" &&
               config.projectId.length > 0;
    }

    async enableSync() {
        try {
            console.log('手動同期機能を有効化中...');
            // 同期マネージャーを動的インポート
            const syncModule = await import('./sync-manager.js');
            this.syncManager = syncModule.syncManager;
            this.isEnabled = true;
            console.log('手動同期機能が有効になりました');
            
            // リアルタイム同期は無効化（手動同期のみ）
            console.log('リアルタイム同期は無効化されています');
        } catch (error) {
            console.error('同期機能の有効化に失敗:', error);
            this.isEnabled = false;
            this.hideSyncUI();
        }
    }

    showSyncUI() {
        const syncStatusBar = document.getElementById('syncStatusBar');
        if (syncStatusBar) {
            syncStatusBar.style.display = 'flex';
        }
    }

    hideSyncUI() {
        const syncStatusBar = document.getElementById('syncStatusBar');
        if (syncStatusBar) {
            syncStatusBar.style.display = 'none';
        }
    }

    // アプリとの連携メソッド
    async saveData(data) {
        console.log('saveData呼び出し:', { isEnabled: this.isEnabled, hasSyncManager: !!this.syncManager, data });
        if (this.isEnabled && this.syncManager) {
            try {
                console.log('Firebaseにデータを保存中...');
                await this.syncManager.saveAppData(data);
                console.log('Firebaseにデータを保存完了');
            } catch (error) {
                console.error('同期保存エラー:', error);
            }
        } else {
            console.warn('同期機能が無効または同期マネージャーがありません');
        }
    }

    async loadData() {
        if (this.isEnabled && this.syncManager) {
            try {
                return await this.syncManager.loadData();
            } catch (error) {
                console.error('同期読み込みエラー:', error);
            }
        }
        return null;
    }

    async forceSync() {
        if (this.isEnabled && this.syncManager) {
            try {
                console.log('手動同期開始 - データ保存のみ');
                // 現在のローカルデータを保存（上書きなし）
                const currentData = {
                    completedHabits: JSON.parse(localStorage.getItem('habitTrackerData') || '{}'),
                    lastUpdated: Date.now()
                };
                // 直接Firebaseに保存（ローカルデータは上書きしない）
                await this.syncManager.saveData(currentData);
                console.log('手動同期完了 - データ保存のみ');
            } catch (error) {
                console.error('手動同期エラー:', error);
                throw error;
            }
        } else {
            throw new Error('同期機能が無効です');
        }
    }

    // データ更新イベントの監視
    setupDataListener(callback) {
        if (this.isEnabled) {
            window.addEventListener('dataUpdated', callback);
        }
    }

    // 同期ステータスの更新
    updateSyncStatus() {
        if (this.isEnabled && this.syncManager) {
            this.syncManager.updateSyncStatus();
        }
    }
}

// グローバルインスタンス
window.optionalSync = new OptionalSyncManager();
