// GitHub API連携機能
class GitHubSync {
    constructor() {
        this.apiBaseUrl = 'https://api.github.com';
        this.gistId = null;
        this.token = null;
        this.username = null;
    }

    // GitHub設定を保存
    saveConfig(username, token, gistId = null) {
        this.username = username;
        this.token = token;
        this.gistId = gistId;
        
        const config = { username, token, gistId };
        localStorage.setItem('github_config', JSON.stringify(config));
        
        // グローバル設定も更新
        window.githubConfig.username = username;
        window.githubConfig.token = token;
        window.githubConfig.gistId = gistId;
        
        console.log('🔐 GitHub設定を保存しました:', username);
    }

    // GitHub設定を読み込み
    loadConfig() {
        const savedConfig = localStorage.getItem('github_config');
        if (savedConfig) {
            try {
                const config = JSON.parse(savedConfig);
                this.username = config.username;
                this.token = config.token;
                this.gistId = config.gistId;
                
                // グローバル設定も更新
                window.githubConfig.username = config.username;
                window.githubConfig.token = config.token;
                window.githubConfig.gistId = config.gistId;
                
                console.log('🔐 GitHub設定を読み込みました:', this.username);
                return true;
            } catch (error) {
                console.error('🔐 GitHub設定の読み込みエラー:', error);
                return false;
            }
        }
        return false;
    }

    // GitHub APIリクエスト
    async makeRequest(endpoint, options = {}) {
        if (!this.token) {
            throw new Error('GitHubトークンが設定されていません');
        }

        const url = `${this.apiBaseUrl}${endpoint}`;
        const defaultOptions = {
            headers: {
                'Authorization': `token ${this.token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch(url, { ...defaultOptions, ...options });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(`GitHub API エラー: ${response.status} - ${error.message}`);
        }

        return response.json();
    }

    // ユーザー情報を取得
    async getUserInfo() {
        try {
            const user = await this.makeRequest('/user');
            console.log('🔐 GitHubユーザー情報取得成功:', user.login);
            return user;
        } catch (error) {
            console.error('🔐 GitHubユーザー情報取得エラー:', error);
            throw error;
        }
    }

    // Gistを作成
    async createGist(data) {
        try {
            const gistData = {
                description: '習慣トラッカー データ',
                public: false,
                files: {
                    'habit-tracker-data.json': {
                        content: JSON.stringify(data, null, 2)
                    }
                }
            };

            const gist = await this.makeRequest('/gists', {
                method: 'POST',
                body: JSON.stringify(gistData)
            });

            this.gistId = gist.id;
            this.saveConfig(this.username, this.token, this.gistId);
            
            console.log('🔐 Gist作成成功:', this.gistId);
            return gist;
        } catch (error) {
            console.error('🔐 Gist作成エラー:', error);
            throw error;
        }
    }

    // Gistを更新
    async updateGist(data) {
        if (!this.gistId) {
            throw new Error('Gist IDが設定されていません');
        }

        try {
            const gistData = {
                files: {
                    'habit-tracker-data.json': {
                        content: JSON.stringify(data, null, 2)
                    }
                }
            };

            const gist = await this.makeRequest(`/gists/${this.gistId}`, {
                method: 'PATCH',
                body: JSON.stringify(gistData)
            });

            console.log('🔐 Gist更新成功:', this.gistId);
            return gist;
        } catch (error) {
            console.error('🔐 Gist更新エラー:', error);
            throw error;
        }
    }

    // Gistを取得
    async getGist() {
        if (!this.gistId) {
            throw new Error('Gist IDが設定されていません');
        }

        try {
            const gist = await this.makeRequest(`/gists/${this.gistId}`);
            
            if (gist.files && gist.files['habit-tracker-data.json']) {
                const content = gist.files['habit-tracker-data.json'].content;
                const data = JSON.parse(content);
                console.log('🔐 Gist取得成功:', this.gistId);
                return data;
            } else {
                throw new Error('Gistにデータファイルが見つかりません');
            }
        } catch (error) {
            console.error('🔐 Gist取得エラー:', error);
            throw error;
        }
    }

    // データを保存
    async saveData(data) {
        try {
            if (this.gistId) {
                await this.updateGist(data);
            } else {
                await this.createGist(data);
            }
            console.log('🔐 GitHubにデータを保存しました');
        } catch (error) {
            console.error('🔐 GitHubデータ保存エラー:', error);
            throw error;
        }
    }

    // データを読み込み
    async loadData() {
        try {
            if (!this.gistId) {
                console.log('🔐 Gist IDが設定されていません');
                return null;
            }
            
            const data = await this.getGist();
            console.log('🔐 GitHubからデータを読み込みました');
            return data;
        } catch (error) {
            console.error('🔐 GitHubデータ読み込みエラー:', error);
            throw error;
        }
    }

    // 接続テスト
    async testConnection() {
        try {
            const user = await this.getUserInfo();
            console.log('🔐 GitHub接続テスト成功:', user.login);
            return true;
        } catch (error) {
            console.error('🔐 GitHub接続テスト失敗:', error);
            return false;
        }
    }

    // 設定をクリア
    clearConfig() {
        this.username = null;
        this.token = null;
        this.gistId = null;
        
        localStorage.removeItem('github_config');
        
        window.githubConfig.username = null;
        window.githubConfig.token = null;
        window.githubConfig.gistId = null;
        
        console.log('🔐 GitHub設定をクリアしました');
    }
}

// グローバルにGitHubSyncインスタンスを作成
window.githubSync = new GitHubSync();
