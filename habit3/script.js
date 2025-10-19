// 習慣データの定義
const habitsData = [
    { id: 'early_bed', name: '早寝早起き', shortName: '早寝早起', category: '睡眠・生活リズム', priority: 5, reason: '全習慣の土台。心身・集中・代謝に直結。', type: 'habit' },
    { id: 'journal', name: 'ジャーナル', shortName: 'ｼﾞｬｰﾅﾙ', category: '精神・自己認識', priority: 4, reason: '習慣化や自己整理に役立つ。方向性を見失わないために重要。', type: 'habit' },
    { id: 'study', name: '勉強', shortName: '勉強', category: '知的成長・キャリア', priority: 5, reason: '外部成果（資格）と内的成長の両方に直結。人生の軸。', type: 'habit' },
    { id: 'exercise', name: '筋トレ', shortName: '筋トレ', category: '健康・体力', priority: 5, reason: '長期的な体力・メンタルの基盤。将来への投資。', type: 'habit' },
    { id: 'reading', name: '読書', shortName: '読書', category: '知的成長', priority: 4, reason: '思考の深さ・幅に寄与。ただし「勉強」優先。', type: 'habit' },
    { id: 'todo_list', name: 'To DO List', shortName: 'To DO List', category: '生産性・管理', priority: 4, reason: 'タスク管理と優先順位付け。効率的な時間活用。', type: 'habit' },
    { id: 'no_phone_bed', name: 'No寝る前スマホ', shortName: 'No寝ｽﾏﾎ', category: '睡眠の質', priority: 5, reason: '睡眠の質を守る最重要因子。早寝早起きと一体。', type: 'no' },
    { id: 'no_alcohol', name: 'No酒', shortName: 'No酒', category: '健康', priority: 5, reason: '睡眠・肝臓・集中力に広範な影響。長期的リスクが大きい。', type: 'no' },
    { id: 'no_overeating', name: 'No暴食', shortName: 'No暴食', category: '健康', priority: 4, reason: '健康と体重管理に影響。', type: 'no' },
    { id: 'protein', name: 'プロテイン', shortName: 'ﾌﾟﾛﾃｲﾝ', category: '栄養', priority: 4, reason: '筋トレ効果を高める。運動とセットで効力大。', type: 'supplement' },
    { id: 'probiotics', name: '整腸剤', shortName: '整腸剤', category: '栄養・消化', priority: 2, reason: '腸内環境改善の補助。基本は食事で十分。', type: 'supplement' },
    { id: 'vitamin_b', name: 'ビタミンD', shortName: 'ﾋﾞﾀﾐﾝD', category: '栄養', priority: 3, reason: 'エネルギー代謝と神経機能に重要。', type: 'supplement' }
];

// JSONBin.io API設定（テスト用のダミーキー）
const JSONBIN_API_URL = 'https://api.jsonbin.io/v3/b';
const JSONBIN_API_KEY = '$2a$10$dummy_key_for_testing'; // テスト用

class HabitTracker {
    constructor() {
        this.completedHabits = {};
        this.currentWeek = this.getCurrentWeek();
        this.currentUser = null;
        this.isSyncing = false;
        
        this.init();
    }

    init() {
        console.log('🚀 習慣トラッカー v3 初期化開始');
        this.setupAuth();
        this.setupEventListeners();
        this.renderCalendar();
        console.log('✅ 初期化完了');
    }

    // 認証システム
    setupAuth() {
        // 保存されたユーザー情報を読み込み
        const savedUser = localStorage.getItem('habit3_current_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateAuthUI();
            // ログイン済みの場合は自動でクラウドからデータを同期
            this.syncFromCloud();
        }
    }

    // イベントリスナーの設定
    setupEventListeners() {
        // DOM要素の存在確認
        const elements = {
            prevWeek: document.getElementById('prevWeek'),
            nextWeek: document.getElementById('nextWeek'),
            goToToday: document.getElementById('goToToday'),
            authBtn: document.getElementById('authBtn'),
            logoutBtn: document.getElementById('logoutBtn'),
            syncBtn: document.getElementById('syncBtn'),
            authModalClose: document.getElementById('authModalClose'),
            syncModalClose: document.getElementById('syncModalClose'),
            authModalCancel: document.getElementById('authModalCancel'),
            authModalCancel2: document.getElementById('authModalCancel2'),
            syncModalCancel: document.getElementById('syncModalCancel'),
            loginTab: document.getElementById('loginTab'),
            signupTab: document.getElementById('signupTab'),
            loginSubmit: document.getElementById('loginSubmit'),
            signupSubmit: document.getElementById('signupSubmit'),
            manualSync: document.getElementById('manualSync')
        };

        // 週移動
        if (elements.prevWeek) elements.prevWeek.addEventListener('click', () => this.changeWeek(-1));
        if (elements.nextWeek) elements.nextWeek.addEventListener('click', () => this.changeWeek(1));
        if (elements.goToToday) elements.goToToday.addEventListener('click', () => this.goToToday());

        // 認証ボタン
        if (elements.authBtn) elements.authBtn.addEventListener('click', () => this.showAuthModal());
        if (elements.logoutBtn) elements.logoutBtn.addEventListener('click', () => this.logout());
        if (elements.syncBtn) elements.syncBtn.addEventListener('click', () => this.showSyncModal());

        // モーダル
        if (elements.authModalClose) elements.authModalClose.addEventListener('click', () => this.hideAuthModal());
        if (elements.syncModalClose) elements.syncModalClose.addEventListener('click', () => this.hideSyncModal());
        if (elements.authModalCancel) elements.authModalCancel.addEventListener('click', () => this.hideAuthModal());
        if (elements.authModalCancel2) elements.authModalCancel2.addEventListener('click', () => this.hideAuthModal());
        if (elements.syncModalCancel) elements.syncModalCancel.addEventListener('click', () => this.hideSyncModal());

        // 認証フォーム
        if (elements.loginTab) elements.loginTab.addEventListener('click', () => this.showLoginForm());
        if (elements.signupTab) elements.signupTab.addEventListener('click', () => this.showSignupForm());
        if (elements.loginSubmit) elements.loginSubmit.addEventListener('click', () => this.handleLogin());
        if (elements.signupSubmit) elements.signupSubmit.addEventListener('click', () => this.handleSignup());

        // 同期
        if (elements.manualSync) elements.manualSync.addEventListener('click', () => this.manualSync());
    }

    // 認証モーダル表示
    showAuthModal() {
        const modal = document.getElementById('authModal');
        if (modal) modal.style.display = 'block';
        this.showLoginForm();
    }

    // 認証モーダル非表示
    hideAuthModal() {
        const modal = document.getElementById('authModal');
        if (modal) modal.style.display = 'none';
        this.clearAuthForms();
    }

    // 同期モーダル表示
    showSyncModal() {
        const modal = document.getElementById('syncModal');
        if (modal) modal.style.display = 'block';
    }

    // 同期モーダル非表示
    hideSyncModal() {
        const modal = document.getElementById('syncModal');
        if (modal) modal.style.display = 'none';
    }

    // ログインフォーム表示
    showLoginForm() {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const loginTab = document.getElementById('loginTab');
        const signupTab = document.getElementById('signupTab');
        
        if (loginForm) loginForm.style.display = 'block';
        if (signupForm) signupForm.style.display = 'none';
        if (loginTab) {
            loginTab.style.backgroundColor = '#4A90E2';
            loginTab.style.color = 'white';
        }
        if (signupTab) {
            signupTab.style.backgroundColor = '#555';
            signupTab.style.color = '#ccc';
        }
    }

    // 新規登録フォーム表示
    showSignupForm() {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const loginTab = document.getElementById('loginTab');
        const signupTab = document.getElementById('signupTab');
        
        if (loginForm) loginForm.style.display = 'none';
        if (signupForm) signupForm.style.display = 'block';
        if (signupTab) {
            signupTab.style.backgroundColor = '#4A90E2';
            signupTab.style.color = 'white';
        }
        if (loginTab) {
            loginTab.style.backgroundColor = '#555';
            loginTab.style.color = '#ccc';
        }
    }

    // フォームクリア
    clearAuthForms() {
        const loginEmail = document.getElementById('loginEmail');
        const loginPassword = document.getElementById('loginPassword');
        const signupEmail = document.getElementById('signupEmail');
        const signupPassword = document.getElementById('signupPassword');
        const signupPasswordConfirm = document.getElementById('signupPasswordConfirm');
        
        if (loginEmail) loginEmail.value = '';
        if (loginPassword) loginPassword.value = '';
        if (signupEmail) signupEmail.value = '';
        if (signupPassword) signupPassword.value = '';
        if (signupPasswordConfirm) signupPasswordConfirm.value = '';
        this.hideAuthMessage();
    }

    // ログイン処理
    async handleLogin() {
        const emailEl = document.getElementById('loginEmail');
        const passwordEl = document.getElementById('loginPassword');
        
        if (!emailEl || !passwordEl) {
            console.error('ログインフォームの要素が見つかりません');
            return;
        }
        
        const email = emailEl.value;
        const password = passwordEl.value;

        if (!email || !password) {
            this.showAuthMessage('メールアドレスとパスワードを入力してください。', true);
            return;
        }

        try {
            const users = JSON.parse(localStorage.getItem('habit3_users') || '{}');
            const user = users[email];

            if (user && user.password === password) {
                this.currentUser = { email: email, id: user.id };
                localStorage.setItem('habit3_current_user', JSON.stringify(this.currentUser));
                this.updateAuthUI();
                this.hideAuthModal();
                this.showAuthMessage('ログインしました！', false);
                
                // ログイン後、自動でクラウドからデータを同期
                await this.syncFromCloud();
                return;
            } else {
                this.showAuthMessage('メールアドレスまたはパスワードが間違っています。', true);
            }
        } catch (error) {
            console.error('ログインエラー:', error);
            this.showAuthMessage('ログインに失敗しました。', true);
        }
    }

    // 新規登録処理
    async handleSignup() {
        const emailEl = document.getElementById('signupEmail');
        const passwordEl = document.getElementById('signupPassword');
        const passwordConfirmEl = document.getElementById('signupPasswordConfirm');
        
        if (!emailEl || !passwordEl || !passwordConfirmEl) {
            console.error('新規登録フォームの要素が見つかりません');
            return;
        }
        
        const email = emailEl.value;
        const password = passwordEl.value;
        const passwordConfirm = passwordConfirmEl.value;

        if (!email || !password || !passwordConfirm) {
            this.showAuthMessage('すべての項目を入力してください。', true);
            return;
        }

        if (password.length < 6) {
            this.showAuthMessage('パスワードは6文字以上で入力してください。', true);
            return;
        }

        if (password !== passwordConfirm) {
            this.showAuthMessage('パスワードが一致しません。', true);
            return;
        }

        try {
            const users = JSON.parse(localStorage.getItem('habit3_users') || '{}');
            
            if (users[email]) {
                this.showAuthMessage('このメールアドレスは既に登録されています。', true);
                return;
            }

            const userId = 'user_' + Date.now();
            users[email] = {
                id: userId,
                password: password,
                createdAt: new Date().toISOString()
            };

            localStorage.setItem('habit3_users', JSON.stringify(users));

            this.currentUser = { email: email, id: userId };
            localStorage.setItem('habit3_current_user', JSON.stringify(this.currentUser));
            this.updateAuthUI();
            this.hideAuthModal();
            this.showAuthMessage('アカウントを作成しました！', false);

            // 新規登録後、クラウドに初期データを保存
            await this.syncToCloud();
        } catch (error) {
            console.error('新規登録エラー:', error);
            this.showAuthMessage('新規登録に失敗しました。', true);
        }
    }

    // ログアウト処理
    logout() {
        if (confirm('ログアウトしますか？')) {
            this.currentUser = null;
            localStorage.removeItem('habit3_current_user');
            this.updateAuthUI();
            this.showAuthMessage('ログアウトしました。', false);
        }
    }

    // 認証UI更新
    updateAuthUI() {
        const authBtn = document.getElementById('authBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const syncBtn = document.getElementById('syncBtn');
        
        if (this.currentUser) {
            authBtn.style.display = 'none';
            logoutBtn.style.display = 'flex';
            logoutBtn.title = `ログアウト (${this.currentUser.email})`;
            syncBtn.style.display = 'flex';
            syncBtn.title = '同期状況';
        } else {
            authBtn.style.display = 'flex';
            logoutBtn.style.display = 'none';
            syncBtn.style.display = 'none';
        }
    }

    // メッセージ表示
    showAuthMessage(message, isError) {
        const messageEl = document.getElementById('authMessage');
        if (messageEl) {
            messageEl.textContent = message;
            messageEl.style.display = 'block';
            messageEl.style.backgroundColor = isError ? '#ff6b6b' : '#28a745';
            messageEl.style.color = 'white';
            
            setTimeout(() => {
                this.hideAuthMessage();
            }, 3000);
        }
    }

    // メッセージ非表示
    hideAuthMessage() {
        const messageEl = document.getElementById('authMessage');
        if (messageEl) messageEl.style.display = 'none';
    }

    // JSONBin.io API連携（テスト用）
    async syncToCloud() {
        if (!this.currentUser) return;

        try {
            this.isSyncing = true;
            const userData = {
                completedHabits: this.completedHabits,
                userId: this.currentUser.id,
                email: this.currentUser.email,
                lastSync: new Date().toISOString()
            };

            // テスト用：ローカルストレージに保存
            localStorage.setItem(`habit3_cloud_${this.currentUser.id}`, JSON.stringify(userData));
            console.log('✅ ローカルにデータを保存しました（テスト用）');
        } catch (error) {
            console.error('❌ 同期エラー:', error);
        } finally {
            this.isSyncing = false;
        }
    }

    async syncFromCloud() {
        if (!this.currentUser) return;

        try {
            this.isSyncing = true;
            
            // テスト用：ローカルストレージから取得
            const savedData = localStorage.getItem(`habit3_cloud_${this.currentUser.id}`);
            if (savedData) {
                const userData = JSON.parse(savedData);
                if (userData && userData.completedHabits) {
                    this.completedHabits = userData.completedHabits;
                    this.saveCompletedHabits();
                    this.renderCalendar();
                    console.log('✅ ローカルからデータを取得しました（テスト用）');
                }
            } else {
                console.log('ℹ️ データが見つかりません（初回ログイン）');
            }
        } catch (error) {
            console.error('❌ 同期エラー:', error);
        } finally {
            this.isSyncing = false;
        }
    }

    // 手動同期
    async manualSync() {
        if (!this.currentUser) {
            this.showSyncMessage('ログインが必要です。', true);
            return;
        }

        try {
            this.showSyncMessage('同期中...', false);
            await this.syncToCloud();
            await this.syncFromCloud();
            this.showSyncMessage('同期が完了しました！', false);
        } catch (error) {
            this.showSyncMessage('同期に失敗しました。', true);
        }
    }

    // 同期メッセージ表示
    showSyncMessage(message, isError) {
        const messageEl = document.getElementById('syncMessage');
        messageEl.textContent = message;
        messageEl.style.display = 'block';
        messageEl.style.backgroundColor = isError ? '#ff6b6b' : '#28a745';
        messageEl.style.color = 'white';
        
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    }

    // 現在の週を取得
    getCurrentWeek() {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const monday = new Date(today);
        monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
        return monday;
    }

    // 週移動
    changeWeek(direction) {
        this.currentWeek.setDate(this.currentWeek.getDate() + (direction * 7));
        this.renderCalendar();
    }

    // 今日に戻る
    goToToday() {
        this.currentWeek = this.getCurrentWeek();
        this.renderCalendar();
    }

    // カレンダー描画
    renderCalendar() {
        this.loadCompletedHabits();
        this.renderDateRow();
        this.renderHabitsGrid();
        this.renderDailyTotalRow();
        this.updateMonthDisplay();
    }

    // 日付行描画
    renderDateRow() {
        const dateRow = document.getElementById('dateRow');
        const dates = this.getWeekDates();
        
        dateRow.innerHTML = `
            <div class="date-cell empty-cell"></div>
            <div class="date-cell empty-cell"></div>
            ${dates.map(date => `
                <div class="date-cell">${date.getDate()}</div>
            `).join('')}
            <div class="date-cell empty-cell"></div>
            <div class="date-cell empty-cell"></div>
        `;
    }

    // 習慣グリッド描画
    renderHabitsGrid() {
        const habitsGrid = document.getElementById('habitsGrid');
        const dates = this.getWeekDates();
        
        habitsGrid.innerHTML = habitsData.map((habit, index) => `
            <div class="habit-row">
                <div class="habit-cell habit-number">${index + 1}</div>
                <div class="habit-cell habit-name">${habit.shortName}</div>
                ${dates.map(date => {
                    const dateKey = this.formatDate(date);
                    const isChecked = this.completedHabits[habit.id] && this.completedHabits[habit.id][dateKey];
                    return `
                        <div class="habit-cell">
                            <div class="habit-checkbox ${isChecked ? 'checked' : ''}" 
                                 data-habit="${habit.id}" 
                                 data-date="${dateKey}">
                            </div>
                        </div>
                    `;
                }).join('')}
                <div class="habit-cell habit-count">${this.getWeeklyCount(habit.id)}</div>
                <div class="habit-cell habit-count">${this.getTotalCount(habit.id)}</div>
            </div>
        `).join('');

        // チェックボックスのイベントリスナーを追加
        document.querySelectorAll('.habit-checkbox').forEach(checkbox => {
            checkbox.addEventListener('click', (e) => this.toggleHabit(e));
        });
    }

    // 日計行描画
    renderDailyTotalRow() {
        const dailyTotalRow = document.getElementById('dailyTotalRow');
        const dates = this.getWeekDates();
        
        dailyTotalRow.innerHTML = `
            <div class="daily-total-cell total-label">日計</div>
            <div class="daily-total-cell total-label"></div>
            ${dates.map(date => {
                const dateKey = this.formatDate(date);
                const dailyCount = this.getDailyCount(dateKey);
                return `<div class="daily-total-cell total-value">${dailyCount}</div>`;
            }).join('')}
            <div class="daily-total-cell total-value">${this.getWeeklyTotal()}</div>
            <div class="daily-total-cell total-value">${this.getGrandTotal()}</div>
        `;
    }

    // 月表示更新
    updateMonthDisplay() {
        const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        const month = monthNames[this.currentWeek.getMonth()];
        const year = this.currentWeek.getFullYear();
        document.getElementById('currentMonth').textContent = `${year}年${month}`;
    }

    // 週の日付を取得
    getWeekDates() {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(this.currentWeek);
            date.setDate(this.currentWeek.getDate() + i);
            dates.push(date);
        }
        return dates;
    }

    // 日付フォーマット
    formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    // 習慣の切り替え
    async toggleHabit(event) {
        if (!this.currentUser) {
            this.showAuthMessage('ログインが必要です。', true);
            return;
        }

        const checkbox = event.target;
        const habitId = checkbox.dataset.habit;
        const dateKey = checkbox.dataset.date;

        if (!this.completedHabits[habitId]) {
            this.completedHabits[habitId] = {};
        }

        if (checkbox.classList.contains('checked')) {
            delete this.completedHabits[habitId][dateKey];
            checkbox.classList.remove('checked');
        } else {
            this.completedHabits[habitId][dateKey] = true;
            checkbox.classList.add('checked');
        }

        this.saveCompletedHabits();
        this.renderCalendar();

        // データ変更後、自動でクラウドに保存
        await this.syncToCloud();
    }

    // 週間カウント取得
    getWeeklyCount(habitId) {
        const dates = this.getWeekDates();
        return dates.reduce((count, date) => {
            const dateKey = this.formatDate(date);
            return count + (this.completedHabits[habitId] && this.completedHabits[habitId][dateKey] ? 1 : 0);
        }, 0);
    }

    // 総カウント取得
    getTotalCount(habitId) {
        return this.completedHabits[habitId] ? Object.keys(this.completedHabits[habitId]).length : 0;
    }

    // 日別カウント取得
    getDailyCount(dateKey) {
        return habitsData.reduce((count, habit) => {
            return count + (this.completedHabits[habit.id] && this.completedHabits[habit.id][dateKey] ? 1 : 0);
        }, 0);
    }

    // 週間合計取得
    getWeeklyTotal() {
        const dates = this.getWeekDates();
        return dates.reduce((total, date) => {
            return total + this.getDailyCount(this.formatDate(date));
        }, 0);
    }

    // 総合計取得
    getGrandTotal() {
        return habitsData.reduce((total, habit) => {
            return total + this.getTotalCount(habit.id);
        }, 0);
    }

    // データ保存
    saveCompletedHabits() {
        localStorage.setItem('habit3_completed_habits', JSON.stringify(this.completedHabits));
    }

    // データ読み込み
    loadCompletedHabits() {
        const saved = localStorage.getItem('habit3_completed_habits');
        this.completedHabits = saved ? JSON.parse(saved) : {};
    }
}

// アプリ初期化
document.addEventListener('DOMContentLoaded', () => {
    window.habitTracker = new HabitTracker();
});
