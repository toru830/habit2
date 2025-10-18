interface User {
  id: string;
  email: string;
  createdAt: string;
}

interface AuthServiceConfig {
  jsonbinApiKey?: string;
  jsonbinBinId?: string;
}

class AuthService {
  private currentUser: User | null = null;
  private config: AuthServiceConfig = {};

  constructor() {
    this.loadUserFromStorage();
    this.loadConfig();
  }

  // ユーザー情報をローカルストレージから読み込み
  private loadUserFromStorage(): void {
    const savedUser = localStorage.getItem('memo_user');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  // 設定をローカルストレージから読み込み
  private loadConfig(): void {
    const apiKey = localStorage.getItem('jsonbin_api_key');
    const binId = localStorage.getItem('jsonbin_bin_id');
    if (apiKey) this.config.jsonbinApiKey = apiKey;
    if (binId) this.config.jsonbinBinId = binId;
  }

  // 設定を保存
  saveConfig(apiKey: string, binId: string): void {
    this.config.jsonbinApiKey = apiKey;
    this.config.jsonbinBinId = binId;
    localStorage.setItem('jsonbin_api_key', apiKey);
    localStorage.setItem('jsonbin_bin_id', binId);
  }

  // ログイン
  async login(email: string, password: string): Promise<boolean> {
    try {
      const users = JSON.parse(localStorage.getItem('memo_users') || '{}');
      const user = users[email];
      
      if (user && user.password === password) {
        this.currentUser = { id: user.id, email: email, createdAt: user.createdAt };
        localStorage.setItem('memo_user', JSON.stringify(this.currentUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('ログインエラー:', error);
      return false;
    }
  }

  // 新規登録
  async signup(email: string, password: string): Promise<boolean> {
    try {
      const users = JSON.parse(localStorage.getItem('memo_users') || '{}');
      
      if (users[email]) {
        return false; // 既に登録済み
      }

      const userId = 'user_' + Date.now();
      users[email] = {
        id: userId,
        password: password,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('memo_users', JSON.stringify(users));
      
      this.currentUser = { id: userId, email: email, createdAt: users[email].createdAt };
      localStorage.setItem('memo_user', JSON.stringify(this.currentUser));
      
      return true;
    } catch (error) {
      console.error('新規登録エラー:', error);
      return false;
    }
  }

  // ログアウト
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('memo_user');
  }

  // 現在のユーザーを取得
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // ログイン状態を確認
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  // クラウドにデータを保存
  async saveToCloud(data: any): Promise<boolean> {
    if (!this.currentUser || !this.config.jsonbinApiKey || !this.config.jsonbinBinId) {
      return false;
    }

    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${this.config.jsonbinBinId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': this.config.jsonbinApiKey
        },
        body: JSON.stringify({
          userId: this.currentUser.id,
          email: this.currentUser.email,
          data: data,
          lastSync: new Date().toISOString()
        })
      });

      return response.ok;
    } catch (error) {
      console.error('クラウド保存エラー:', error);
      return false;
    }
  }

  // クラウドからデータを読み込み
  async loadFromCloud(): Promise<any | null> {
    if (!this.currentUser || !this.config.jsonbinApiKey || !this.config.jsonbinBinId) {
      return null;
    }

    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${this.config.jsonbinBinId}/latest`, {
        headers: {
          'X-Master-Key': this.config.jsonbinApiKey
        }
      });

      if (!response.ok) {
        return null;
      }

      const result = await response.json();
      return result.record?.data || null;
    } catch (error) {
      console.error('クラウド読み込みエラー:', error);
      return null;
    }
  }

  // 新しいBinを作成
  async createBin(data: any): Promise<string | null> {
    if (!this.currentUser || !this.config.jsonbinApiKey) {
      return null;
    }

    try {
      const response = await fetch('https://api.jsonbin.io/v3/b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': this.config.jsonbinApiKey
        },
        body: JSON.stringify({
          userId: this.currentUser.id,
          email: this.currentUser.email,
          data: data,
          lastSync: new Date().toISOString()
        })
      });

      if (!response.ok) {
        return null;
      }

      const result = await response.json();
      const binId = result.metadata.id;
      this.config.jsonbinBinId = binId;
      localStorage.setItem('jsonbin_bin_id', binId);
      return binId;
    } catch (error) {
      console.error('Bin作成エラー:', error);
      return null;
    }
  }

  // 接続テスト
  async testConnection(): Promise<boolean> {
    if (!this.config.jsonbinApiKey) {
      return false;
    }

    try {
      const response = await fetch('https://api.jsonbin.io/v3/b', {
        headers: {
          'X-Master-Key': this.config.jsonbinApiKey
        }
      });
      return response.ok;
    } catch (error) {
      console.error('接続テストエラー:', error);
      return false;
    }
  }
}

export const authService = new AuthService();
export default AuthService;
