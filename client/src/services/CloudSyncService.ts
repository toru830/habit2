export class CloudSyncService {
  private apiBaseUrl = 'https://api.jsonbin.io/v3/b';
  private apiKey: string | null = null;
  private binId: string | null = null;

  constructor() {
    this.loadConfig();
  }

  loadConfig(): boolean {
    this.apiKey = localStorage.getItem('jsonbin_api_key');
    this.binId = localStorage.getItem('jsonbin_bin_id');
    return !!(this.apiKey && this.binId);
  }

  saveConfig(apiKey: string, binId: string): void {
    this.apiKey = apiKey;
    this.binId = binId;
    localStorage.setItem('jsonbin_api_key', apiKey);
    localStorage.setItem('jsonbin_bin_id', binId);
  }

  clearConfig(): void {
    this.apiKey = null;
    this.binId = null;
    localStorage.removeItem('jsonbin_api_key');
    localStorage.removeItem('jsonbin_bin_id');
  }

  async request(method: string, url: string, data: any = null): Promise<any> {
    if (!this.apiKey) {
      throw new Error('JSONBin.io API Keyが設定されていません。');
    }

    const headers = {
      'X-Master-Key': this.apiKey,
      'Content-Type': 'application/json'
    };

    const options: RequestInit = {
      method: method,
      headers: headers
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`JSONBin.io APIエラー (${response.status}): ${errorText}`);
    }

    return response.json();
  }

  async testConnection(): Promise<boolean> {
    try {
      if (this.binId) {
        await this.request('GET', `${this.apiBaseUrl}/${this.binId}`);
      } else {
        await this.request('POST', this.apiBaseUrl, { test: true });
      }
      return true;
    } catch (error) {
      console.error('JSONBin.io接続テストエラー:', error);
      return false;
    }
  }

  async createBin(data: any): Promise<string> {
    const response = await this.request('POST', this.apiBaseUrl, data);
    if (response && response.metadata && response.metadata.id) {
      this.binId = response.metadata.id;
      localStorage.setItem('jsonbin_bin_id', this.binId);
      return this.binId;
    }
    throw new Error('Bin IDの取得に失敗しました。');
  }

  async updateBin(data: any): Promise<string> {
    if (!this.binId) {
      return this.createBin(data);
    }
    const response = await this.request('PUT', `${this.apiBaseUrl}/${this.binId}`, data);
    if (response && response.metadata && response.metadata.id) {
      return response.metadata.id;
    }
    throw new Error('Binの更新に失敗しました。');
  }

  async loadData(): Promise<any> {
    if (!this.binId) {
      return null;
    }
    const response = await this.request('GET', `${this.apiBaseUrl}/${this.binId}/latest`);
    return response.record;
  }

  async saveData(data: any): Promise<string> {
    if (!this.binId) {
      return this.createBin(data);
    } else {
      return this.updateBin(data);
    }
  }

  async syncFromCloud(userId: string): Promise<void> {
    try {
      const cloudData = await this.loadData();
      if (cloudData && cloudData.memos) {
        localStorage.setItem('memo-app-data', JSON.stringify(cloudData));
        console.log('クラウドからデータを同期しました');
      }
    } catch (error) {
      console.error('クラウド同期エラー:', error);
    }
  }

  async syncToCloud(userId: string, data: any): Promise<void> {
    try {
      await this.saveData(data);
      console.log('クラウドにデータを同期しました');
    } catch (error) {
      console.error('クラウド同期エラー:', error);
    }
  }
}
