import { CloudSyncService } from './CloudSyncService';

interface User {
  id: string;
  email: string;
  token?: string;
}

export class AuthService {
  private cloudSync: CloudSyncService;
  private USERS_KEY = 'memo_users';
  private CURRENT_USER_KEY = 'memo_current_user';

  constructor() {
    this.cloudSync = new CloudSyncService();
  }

  async signup(email: string, password: string): Promise<User | null> {
    let users = this.getUsers();
    if (users[email]) {
      console.error('このメールアドレスは既に登録されています。');
      return null;
    }

    const userId = `user_${Date.now()}`;
    const newUser: User = { id: userId, email: email };
    users[email] = { ...newUser, passwordHash: this.hashPassword(password) };
    this.saveUsers(users);

    this.setCurrentUser(newUser);
    return newUser;
  }

  async login(email: string, password: string): Promise<User | null> {
    const users = this.getUsers();
    const userRecord = users[email];

    if (userRecord && userRecord.passwordHash === this.hashPassword(password)) {
      const user: User = { id: userRecord.id, email: userRecord.email };
      this.setCurrentUser(user);
      return user;
    }

    console.error('メールアドレスまたはパスワードが間違っています。');
    return null;
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.cloudSync.clearConfig();
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  private getUsers(): { [email: string]: { id: string; email: string; passwordHash: string } } {
    const usersJson = localStorage.getItem(this.USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : {};
  }

  private saveUsers(users: { [email: string]: { id: string; email: string; passwordHash: string } }): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  private hashPassword(password: string): string {
    return btoa(password);
  }

  getCloudSyncService(): CloudSyncService {
    return this.cloudSync;
  }
}
