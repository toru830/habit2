// クラウド同期システム（JSONBin.io API使用）
(function() {
    class CloudSync {
        constructor() {
            this.apiUrl = 'https://api.jsonbin.io/v3/b';
            this.apiKey = null;
            this.binId = null;
            this.loadConfig();
        }

        // 設定を読み込み
        loadConfig() {
            this.apiKey = localStorage.getItem('jsonbin_api_key');
            this.binId = localStorage.getItem('jsonbin_bin_id');
            return !!(this.apiKey && this.binId);
        }

        // 設定を保存
        saveConfig(apiKey, binId) {
            this.apiKey = apiKey;
            this.binId = binId;
            localStorage.setItem('jsonbin_api_key', apiKey);
            localStorage.setItem('jsonbin_bin_id', binId);
        }

        // 設定をクリア
        clearConfig() {
            this.apiKey = null;
            this.binId = null;
            localStorage.removeItem('jsonbin_api_key');
            localStorage.removeItem('jsonbin_bin_id');
        }

        // データをクラウドに保存
        async saveData(data) {
            if (!this.apiKey || !this.binId) {
                throw new Error('JSONBin設定が完了していません');
            }

            try {
                const response = await fetch(`${this.apiUrl}/${this.binId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Master-Key': this.apiKey
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error(`保存失敗: ${response.statusText}`);
                }

                console.log('🔐 クラウドにデータを保存しました');
                return true;
            } catch (error) {
                console.error('クラウド保存エラー:', error);
                throw error;
            }
        }

        // データをクラウドから読み込み
        async loadData() {
            if (!this.apiKey || !this.binId) {
                throw new Error('JSONBin設定が完了していません');
            }

            try {
                const response = await fetch(`${this.apiUrl}/${this.binId}/latest`, {
                    headers: {
                        'X-Master-Key': this.apiKey
                    }
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        console.log('🔐 クラウドにデータがありません');
                        return null;
                    }
                    throw new Error(`読み込み失敗: ${response.statusText}`);
                }

                const result = await response.json();
                console.log('🔐 クラウドからデータを読み込みました');
                return result.record;
            } catch (error) {
                console.error('クラウド読み込みエラー:', error);
                throw error;
            }
        }

        // 新しいBinを作成
        async createBin(data) {
            if (!this.apiKey) {
                throw new Error('JSONBin APIキーが設定されていません');
            }

            try {
                const response = await fetch(this.apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Master-Key': this.apiKey
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error(`Bin作成失敗: ${response.statusText}`);
                }

                const result = await response.json();
                this.binId = result.metadata.id;
                localStorage.setItem('jsonbin_bin_id', this.binId);
                console.log('🔐 新しいBinを作成しました:', this.binId);
                return this.binId;
            } catch (error) {
                console.error('Bin作成エラー:', error);
                throw error;
            }
        }

        // 接続テスト
        async testConnection() {
            if (!this.apiKey) {
                return false;
            }

            try {
                const response = await fetch(`${this.apiUrl}`, {
                    headers: {
                        'X-Master-Key': this.apiKey
                    }
                });
                return response.ok;
            } catch (error) {
                console.error('接続テストエラー:', error);
                return false;
            }
        }
    }

    window.cloudSync = new CloudSync();
})();
