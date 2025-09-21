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
            // 同期マネージャーを動的インポート
            const syncModule = await import('./sync-manager.js');
            this.syncManager = syncModule.syncManager;
            this.isEnabled = true;
            console.log('同期機能が有効になりました');
            
            // 初期接続を試行
            if (this.syncManager) {
                await this.syncManager.connect();
            }
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
        if (this.isEnabled && this.syncManager) {
            try {
                await this.syncManager.saveAppData(data);
            } catch (error) {
                console.error('同期保存エラー:', error);
            }
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
                await this.syncManager.forceSync();
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
