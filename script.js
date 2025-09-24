// 習慣データの定義
const habitsData = [
    // 習慣系
    { id: 'early_bed', name: '早寝早起き', shortName: '早寝早起', category: '睡眠・生活リズム', priority: 5, reason: '全習慣の土台。心身・集中・代謝に直結。', type: 'habit' },
    { id: 'journal', name: 'ジャーナル', shortName: 'ｼﾞｬｰﾅﾙ', category: '精神・自己認識', priority: 4, reason: '習慣化や自己整理に役立つ。方向性を見失わないために重要。', type: 'habit' },
    { id: 'study', name: '勉強', shortName: '勉強', category: '知的成長・キャリア', priority: 5, reason: '外部成果（資格）と内的成長の両方に直結。人生の軸。', type: 'habit' },
    { id: 'exercise', name: '筋トレ', shortName: '筋トレ', category: '健康・体力', priority: 5, reason: '長期的な体力・メンタルの基盤。将来への投資。', type: 'habit' },
    { id: 'reading', name: '読書', shortName: '読書', category: '知的成長', priority: 4, reason: '思考の深さ・幅に寄与。ただし「勉強」優先。', type: 'habit' },
    
    // No系
    { id: 'no_phone_bed', name: 'No寝る前スマホ', shortName: 'No寝ｽﾏﾎ', category: '睡眠の質', priority: 5, reason: '睡眠の質を守る最重要因子。早寝早起きと一体。', type: 'no' },
    { id: 'no_alcohol', name: 'No酒', shortName: 'No酒', category: '健康', priority: 5, reason: '睡眠・肝臓・集中力に広範な影響。長期的リスクが大きい。', type: 'no' },
    { id: 'no_overeating', name: 'No暴食', shortName: 'No暴食', category: '健康', priority: 4, reason: '健康と体重管理に影響。', type: 'no' },
    
    // サプリ・食事系
    { id: 'protein', name: 'プロテイン', shortName: 'ﾌﾟﾛﾃｲﾝ', category: '栄養', priority: 4, reason: '筋トレ効果を高める。運動とセットで効力大。', type: 'supplement' },
    { id: 'probiotics', name: '整腸剤', shortName: '整腸剤', category: '栄養・消化', priority: 2, reason: '腸内環境改善の補助。基本は食事で十分。', type: 'supplement' },
    { id: 'vitamin_b', name: 'ビタミンD', shortName: 'ﾋﾞﾀﾐﾝD', category: '栄養', priority: 3, reason: 'エネルギー代謝と神経機能に重要。', type: 'supplement' },
    { id: 'creatine', name: 'クレアチン', shortName: 'ｸﾚｱﾁﾝ', category: '栄養', priority: 3, reason: '筋力と筋量の向上に効果的。', type: 'supplement' },
    { id: 'ashwagandha', name: 'アシュワガンダ', shortName: 'ｱｼｭﾜｶﾞﾝﾀﾞ', category: '栄養', priority: 2, reason: 'ストレス軽減と睡眠の質向上。', type: 'supplement' },
    { id: 'magnesium', name: 'マグネシウム', shortName: 'ﾏｸﾞﾈｼｳﾑ', category: '栄養', priority: 2, reason: '筋肉のリラクゼーションと睡眠の質向上。', type: 'supplement' },
    { id: 'berries', name: 'ベリー', shortName: 'ベリー', category: '栄養', priority: 2, reason: '抗酸化作用などあるが補助レベル。', type: 'supplement' }
];

// 報酬システムの定義
const rewards = {
    1: { title: '初心者', description: '1日連続達成！', emoji: '🌱' },
    3: { title: '継続者', description: '3日連続達成！', emoji: '🔥' },
    7: { title: '週間マスター', description: '1週間連続達成！', emoji: '⭐' },
    14: { title: 'フォーティナー', description: '2週間連続達成！', emoji: '💪' },
    30: { title: '月間チャンピオン', description: '1ヶ月連続達成！', emoji: '🏆' },
    60: { title: '習慣の達人', description: '2ヶ月連続達成！', emoji: '👑' },
    100: { title: '習慣の王', description: '100日連続達成！', emoji: '🎯' },
    365: { title: '習慣の神', description: '1年連続達成！', emoji: '🌟' }
};

// モンスタータイプの定義
const monsterTypes = {
    0: { name: '未開封', description: 'まだ挑戦していない', emoji: '❓', color: '#666' },
    1: { name: '弱そうな青年', description: '初心者レベル', emoji: '😊', color: '#4A90E2' },
    2: { name: 'やる気のある青年', description: '少し成長した', emoji: '😤', color: '#28a745' },
    3: { name: '頑張り屋', description: '継続の力', emoji: '💪', color: '#ffd700' },
    4: { name: '努力家', description: '真面目に取り組む', emoji: '🎯', color: '#ff6b6b' },
    5: { name: 'ちょっと強そうな青年', description: '中級者レベル', emoji: '😎', color: '#9c27b0' },
    6: { name: '習慣マスター', description: '習慣化の達人', emoji: '🏆', color: '#ff9800' },
    7: { name: '習慣の王', description: '完璧な習慣', emoji: '👑', color: '#e91e63' },
    8: { name: '伝説の存在', description: '神レベルの習慣', emoji: '🌟', color: '#00bcd4' },
    9: { name: '究極の存在', description: '究極の習慣', emoji: '⚡', color: '#795548' },
    10: { name: '超越者', description: '人間を超越', emoji: '🚀', color: '#607d8b' }
};

// アプリの状態管理
class HabitTracker {
    constructor() {
        this.habits = habitsData;
        this.completedHabits = this.loadCompletedHabits();
        this.currentWeek = this.getCurrentWeek();
        this.calendarMonth = new Date(); // 現在の月
        this.reportMonth = new Date(); // レポート用の月
        this.healthData = this.loadHealthData(); // ヘルスキーピングとヘッドマッサージのデータ
        
        // モチベーション機能
        this.achievements = this.loadAchievements();
        this.streaks = this.calculateStreaks();
        this.totalScore = this.calculateTotalScore();
        
        this.init();
    }

    init() {
        this.renderCalendar();
        this.setupEventListeners();
        this.setupDataManagement();
        this.setupMonthlyCalendarEvents();
        // 同期機能を完全に無効化（データ消失を防ぐため）
        console.log('同期機能は完全に無効化されています');
    }
    
    // データ管理機能の設定
    setupDataManagement() {
        const exportBtn = document.getElementById('exportDataBtn');
        const importBtn = document.getElementById('importDataBtn');
        const restoreBtn = document.getElementById('restoreDataBtn');
        
        if (exportBtn) {
            exportBtn.onclick = () => this.exportData();
        }
        
        if (importBtn) {
            importBtn.onclick = () => this.importData();
        }
        
        if (restoreBtn) {
            restoreBtn.onclick = () => this.restoreFromBackup();
        }
    }
    
    // データをエクスポート
    exportData() {
        const data = {
            completedHabits: this.completedHabits,
            healthData: this.healthData,
            achievements: this.achievements,
            exportDate: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `habit-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('データをエクスポートしました！');
    }
    
    // データをインポート
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        
                        if (data.completedHabits) {
                            this.completedHabits = data.completedHabits;
                        }
                        if (data.healthData) {
                            this.healthData = data.healthData;
                        }
                        if (data.achievements) {
                            this.achievements = data.achievements;
                        }
                        
                        this.saveCompletedHabits();
                        this.saveHealthData();
                        this.saveAchievements();
                        this.renderCalendar();
                        this.updateMotivationDisplay();
                        
                        alert('データをインポートしました！');
                    } catch (error) {
                        alert('データのインポートに失敗しました。正しいファイルを選択してください。');
                    }
                };
                reader.readAsText(file);
            }
        };
        
        input.click();
    }
    
    // バックアップから復元
    restoreFromBackup() {
        if (confirm('バックアップから復元しますか？現在のデータは上書きされます。')) {
            this.restoreHabitsFromBackup();
            this.restoreFromBackup();
            this.renderCalendar();
            this.updateMotivationDisplay();
            alert('バックアップから復元しました！');
        }
    }

    // 現在の週を取得（月曜日開始）
    getCurrentWeek() {
        // 実際の今日の日付を使用
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0=日曜日, 1=月曜日, ..., 6=土曜日
        const monday = new Date(today);
        // 月曜日を週の開始にする（月曜日=1の場合、0日戻る）
        const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        monday.setDate(today.getDate() + daysToMonday);
        
        const week = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            week.push(date);
        }
        return week;
    }

    // 週を移動
    moveWeek(direction) {
        const days = direction === 'next' ? 7 : -7;
        this.currentWeek = this.currentWeek.map(date => {
            const newDate = new Date(date);
            newDate.setDate(date.getDate() + days);
            return newDate;
        });
        this.renderCalendar();
    }

    // 今日の週に移動
    goToToday() {
        this.currentWeek = this.getCurrentWeek();
        this.renderCalendar();
        
        // 今日の列にスクロール
        setTimeout(() => {
            const todayColumn = document.querySelector('.date-cell.today');
            if (todayColumn) {
                todayColumn.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest', 
                    inline: 'center' 
                });
            }
        }, 100);
    }

    // 次の週に移動
    moveToNextWeek() {
        this.moveWeek('next');
    }

    // 前の週に移動
    moveToPrevWeek() {
        this.moveWeek('prev');
    }

    // カレンダーの描画
    renderCalendar() {
        this.renderDateRow();
        this.renderHabitsGrid();
        this.renderDailyTotalRow();
        this.updateMonthDisplay();
        
    }

    // 日付行の描画
    renderDateRow() {
        const dateRow = document.getElementById('dateRow');
        dateRow.innerHTML = '';

        // 空のセル（No.列用）
        const emptyCell1 = document.createElement('div');
        emptyCell1.className = 'empty-cell';
        dateRow.appendChild(emptyCell1);

        // 空のセル（項目列用）
        const emptyCell2 = document.createElement('div');
        emptyCell2.className = 'empty-cell';
        dateRow.appendChild(emptyCell2);

        this.currentWeek.forEach((date, index) => {
            const dateCell = document.createElement('div');
            dateCell.className = 'date-cell';
            
            const isToday = this.isToday(date);
            if (isToday) {
                dateCell.classList.add('today');
            }
            
            // 日付のみ表示
            dateCell.textContent = date.getDate();
            dateRow.appendChild(dateCell);
        });
    }

    // 習慣グリッドの描画
    renderHabitsGrid() {
        const habitsGrid = document.getElementById('habitsGrid');
        habitsGrid.innerHTML = '';

        // 習慣を種類ごとに分類
        const habitHabits = this.habits.filter(h => h.type === 'habit');
        const noHabits = this.habits.filter(h => h.type === 'no');
        const supplementHabits = this.habits.filter(h => h.type === 'supplement');

        let habitIndex = 1;

        // 習慣系を描画
        habitHabits.forEach(habit => {
            const habitRow = this.createHabitRow(habit, habitIndex);
            habitsGrid.appendChild(habitRow);
            habitIndex++;
        });

        // No系の習慣を個別に描画
        noHabits.forEach(habit => {
            const habitRow = this.createHabitRow(habit, habitIndex, 'no');
            habitsGrid.appendChild(habitRow);
            habitIndex++;
        });

        // サプリ・食事系を描画
        supplementHabits.forEach(habit => {
            const habitRow = this.createHabitRow(habit, habitIndex, 'supplement');
            habitsGrid.appendChild(habitRow);
            habitIndex++;
        });

    }

    // グループヘッダーを作成
    createGroupHeader(groupName, startIndex, count) {
        const groupRow = document.createElement('div');
        groupRow.className = 'group-header-row';
        
        // No.セル（空）
        const noCell = document.createElement('div');
        noCell.className = 'group-header-no-cell';
        groupRow.appendChild(noCell);
        
        // グループ名セル（縦書き）
        const groupCell = document.createElement('div');
        groupCell.className = 'group-header-cell';
        
        // 縦書きの文字を1文字ずつ分割
        const chars = groupName.split('');
        const verticalText = chars.join('\n');
        groupCell.textContent = verticalText;
        groupRow.appendChild(groupCell);
        
        // 残りのセルを空で作成
        for (let i = 0; i < 9; i++) { // No., 項目, 月〜日, 週計, 連続
            const emptyCell = document.createElement('div');
            emptyCell.className = 'group-header-empty-cell';
            groupRow.appendChild(emptyCell);
        }
        
        return groupRow;
    }

    // 個別の習慣行を作成
    createHabitRow(habit, index, habitType = 'habit') {
        const habitRow = document.createElement('div');
        habitRow.className = `habit-row ${habitType}-habit-row`;

        // No.セル
        const noCell = document.createElement('div');
        noCell.className = 'habit-no-cell';
        noCell.textContent = index.toString();
        habitRow.appendChild(noCell);

        // 項目セル
        const itemCell = document.createElement('div');
        itemCell.className = `habit-item-cell ${habitType}-habit-item`;
        itemCell.textContent = habit.shortName;
        habitRow.appendChild(itemCell);

        // 各日のセル
        this.currentWeek.forEach(date => {
            const habitCell = document.createElement('div');
            habitCell.className = `habit-cell ${habitType}-habit-cell`;
            habitCell.dataset.habitId = habit.id;
            habitCell.dataset.date = date.toISOString().split('T')[0];
            habitCell.classList.add(`priority-${habit.priority}`);

            // 今日かどうかをチェック
            const isToday = this.isToday(date);
            if (isToday) {
                habitCell.classList.add('today');
            }

            // 完了状態をチェック
            const dateStr = date.toISOString().split('T')[0];
            const isCompleted = this.isHabitCompleted(habit.id, dateStr);
            if (isCompleted) {
                habitCell.classList.add('completed');
            }

            // クリックイベントのみ（タッチイベントは削除）
            habitCell.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleHabit(habit.id, date, habitCell);
            });

            habitRow.appendChild(habitCell);
        });

        // 合計セル
        const totalCell = document.createElement('div');
        totalCell.className = 'habit-total-cell';
        const totalCount = this.calculateHabitTotal(habit.id);
        totalCell.textContent = totalCount;
        totalCell.dataset.total = totalCount;
        habitRow.appendChild(totalCell);

        // 合計セル
        const totalAllCell = document.createElement('div');
        totalAllCell.className = 'habit-total-cell';
        totalAllCell.dataset.habitId = habit.id;
        const totalAllCount = this.calculateTotalAll(habit.id);
        totalAllCell.textContent = totalAllCount;
        habitRow.appendChild(totalAllCell);


        return habitRow;
    }


    // 習慣名を作成（項目列用）
    createHabitName(habit, index, habitType = 'habit') {
        const habitName = document.createElement('div');
        habitName.className = `habit-name-row ${habitType}-habit-name`;
        habitName.innerHTML = `
            <div class="habit-no-cell">${index}</div>
            <div class="habit-item-cell ${habitType}-habit-item">${habit.shortName}</div>
        `;
        return habitName;
    }


    // 月表示の更新
    updateMonthDisplay() {
        const firstDay = this.currentWeek[0];
        const month = firstDay.getMonth() + 1;
        const year = firstDay.getFullYear();
        document.getElementById('currentMonth').textContent = `${year}年${month}月`;
    }

    // 習慣の完了状態をチェック
    isHabitCompleted(habitId, dateStr) {
        const habits = this.completedHabits[dateStr];
        if (Array.isArray(habits)) {
            return habits.includes(habitId);
        } else if (habits && typeof habits === 'object') {
            return !!habits[habitId];
        }
        return false;
    }

    // 習慣の一週間の合計を計算
    calculateHabitTotal(habitId) {
        let total = 0;
        this.currentWeek.forEach(date => {
            if (this.isHabitCompleted(habitId, date)) {
                total++;
            }
        });
        return total;
    }

    // 全ての習慣の合計を更新
    updateHabitTotals() {
        const totalCells = document.querySelectorAll('.habit-total-cell');
        totalCells.forEach((cell, index) => {
            const habitRow = cell.closest('.habit-row');
            const habitCells = habitRow.querySelectorAll('.habit-cell');
            const habitId = habitCells[0]?.dataset.habitId;
            if (habitId && !cell.dataset.habitId) {
                const total = this.calculateHabitTotal(habitId);
                cell.textContent = total;
                cell.dataset.total = total;
            }
        });
    }

    // 全ての習慣の合計を更新
    updateTotalAll() {
        const totalAllCells = document.querySelectorAll('.habit-total-cell[data-habit-id]');
        totalAllCells.forEach((cell) => {
            const habitId = cell.dataset.habitId;
            if (habitId) {
                const totalAll = this.calculateTotalAll(habitId);
                cell.textContent = totalAll;
            }
        });
    }

    // 過去のチェックが入った数の合計を計算
    calculateTotalAll(habitId) {
        let total = 0;
        for (const dateStr in this.completedHabits) {
            const habits = this.completedHabits[dateStr];
            // 配列かオブジェクトかを判定
            if (Array.isArray(habits)) {
                if (habits.includes(habitId)) {
                    total++;
                }
            } else if (habits && typeof habits === 'object') {
                // オブジェクトの場合、habitIdをキーとして確認
                if (habits[habitId]) {
                    total++;
                }
            }
        }
        return total;
    }

    // 特定の日の完了習慣数を計算
    calculateDailyTotal(date) {
        const dateStr = date.toISOString().split('T')[0];
        const dailyHabits = this.completedHabits[dateStr];
        
        // デバッグ用：日付と完了習慣を確認
        if (dailyHabits && dailyHabits.length > 0) {
            console.log(`日付: ${dateStr}, 完了習慣数: ${dailyHabits.length}, 習慣ID: ${dailyHabits.join(', ')}`);
        }
        
        return dailyHabits ? dailyHabits.length : 0;
    }

    // 今週の合計を計算
    calculateWeeklyTotal() {
        let total = 0;
        this.currentWeek.forEach(date => {
            total += this.calculateDailyTotal(date);
        });
        return total;
    }

    // 全期間の合計を計算
    calculateAllTimeTotal() {
        let total = 0;
        for (const dateStr in this.completedHabits) {
            total += this.completedHabits[dateStr].length;
        }
        return total;
    }

    // 習慣の連続日数を計算（今日のチェックのみ）
    calculateStreak(habitId) {
        // 実際の今日の日付オブジェクトを作成
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        
        // 今日にチェックがあれば1、なければ0
        const todayHabits = this.completedHabits[todayStr];
        const isCompleted = Array.isArray(todayHabits) ? 
            todayHabits.includes(habitId) : 
            (todayHabits && typeof todayHabits === 'object' ? !!todayHabits[habitId] : false);
        if (isCompleted) {
            return 1;
        } else {
            return 0;
        }
    }

    // 日計行を描画
    renderDailyTotalRow() {
        const dailyTotalRow = document.getElementById('dailyTotalRow');
        dailyTotalRow.innerHTML = '';

        // No.セル（空）
        const noCell = document.createElement('div');
        noCell.className = 'daily-total-cell';
        noCell.textContent = '';
        dailyTotalRow.appendChild(noCell);

        // 項目セル（"日計"）
        const itemCell = document.createElement('div');
        itemCell.className = 'daily-total-cell';
        itemCell.textContent = '日計';
        dailyTotalRow.appendChild(itemCell);

        // 各日の日計セル
        this.currentWeek.forEach(date => {
            const dailyTotalCell = document.createElement('div');
            dailyTotalCell.className = 'daily-total-cell';
            
            // 今日かどうかをチェック
            const isToday = this.isToday(date);
            if (isToday) {
                dailyTotalCell.classList.add('today');
            }
            
            const dailyTotal = this.calculateDailyTotal(date);
            dailyTotalCell.textContent = dailyTotal;
            dailyTotalRow.appendChild(dailyTotalCell);
        });

        // 週計セル（今週の合計）
        const weeklyTotalCell = document.createElement('div');
        weeklyTotalCell.className = 'daily-total-cell';
        weeklyTotalCell.textContent = this.calculateWeeklyTotal();
        dailyTotalRow.appendChild(weeklyTotalCell);

        // 合計セル（全期間の合計）
        const totalAllCell = document.createElement('div');
        totalAllCell.className = 'daily-total-cell';
        totalAllCell.textContent = this.calculateAllTimeTotal();
        dailyTotalRow.appendChild(totalAllCell);

    }

    // 日計を更新
    updateDailyTotals() {
        const dailyTotalCells = document.querySelectorAll('.daily-total-row .daily-total-cell');
        let cellIndex = 2; // No.と項目の後から開始
        
        console.log('日計更新開始 - 週の日付:', this.currentWeek.map(d => d.toISOString().split('T')[0]));
        
        this.currentWeek.forEach(date => {
            const dateStr = date.toISOString().split('T')[0];
            const dailyTotal = this.calculateDailyTotal(date);
            
            console.log(`日付: ${dateStr}, 日計: ${dailyTotal}`);
            
            if (dailyTotalCells[cellIndex]) {
                dailyTotalCells[cellIndex].textContent = dailyTotal;
            }
            cellIndex++;
        });

        // 週計を更新
        const weeklyTotal = this.calculateWeeklyTotal();
        console.log('週計:', weeklyTotal);
        if (dailyTotalCells[cellIndex]) {
            dailyTotalCells[cellIndex].textContent = weeklyTotal;
            cellIndex++;
        }

        // 全期間合計を更新
        const allTimeTotal = this.calculateAllTimeTotal();
        console.log('全期間合計:', allTimeTotal);
        if (dailyTotalCells[cellIndex]) {
            dailyTotalCells[cellIndex].textContent = allTimeTotal;
        }
    }

    // 習慣の完了状態を切り替え
    toggleHabit(habitId, date, cell) {
        const dateStr = date.toISOString().split('T')[0];
        
        // 現在の完了状態を直接チェック
        const habits = this.completedHabits[dateStr];
        const isCurrentlyCompleted = Array.isArray(habits) ? 
            habits.includes(habitId) : 
            (habits && typeof habits === 'object' ? !!habits[habitId] : false);
        
        console.log('toggleHabit開始:', { habitId, dateStr, isCurrentlyCompleted, currentData: this.completedHabits });
        
        if (isCurrentlyCompleted) {
            // 完了を解除
            if (this.completedHabits[dateStr]) {
                this.completedHabits[dateStr] = this.completedHabits[dateStr].filter(id => id !== habitId);
                if (this.completedHabits[dateStr].length === 0) {
                    delete this.completedHabits[dateStr];
                }
            }
            cell.classList.remove('completed');
            console.log('習慣を未完了に変更');
        } else {
            // 完了に設定
            if (!this.completedHabits[dateStr]) {
                this.completedHabits[dateStr] = [];
            }
            this.completedHabits[dateStr].push(habitId);
            cell.classList.add('completed');
            console.log('習慣を完了に変更');
        }

        console.log('変更後のデータ:', this.completedHabits);
        this.saveCompletedHabits();
        
        // 達成チェックを実行
        this.checkAchievements();
        
        // 合計を更新
        this.updateHabitTotals();
        
        // 合計も更新
        this.updateTotalAll();
        
        // 日計も更新
        this.updateDailyTotals();
        
        // モチベーション表示を更新
        this.updateMotivationDisplay();
    }

    // 今日かどうかをチェック
    isToday(date) {
        // 実際の今日の日付を使用
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }

    // 統計の更新
    updateStats() {
        const streakCount = this.calculateStreak();
        const weeklyRate = this.calculateWeeklyRate();
        const monthlyRate = this.calculateMonthlyRate();
        const currentReward = this.getCurrentReward(streakCount);
        const nextReward = this.getNextReward(streakCount);

        document.getElementById('streakCount').textContent = `${streakCount}日`;
        document.getElementById('weeklyRate').textContent = `${weeklyRate}%`;
        document.getElementById('monthlyRate').textContent = `${monthlyRate}%`;
        
        // 報酬情報はHTMLで静的に表示されるため削除
        
        // 詳細レポートはrenderDetailReports()で表示されるため削除
    }


    // 習慣の統計を取得
    getHabitStats(habitId) {
        const today = new Date();
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        
        let weeklyCompleted = 0;
        let weeklyTotal = 0;
        let monthlyCompleted = 0;
        let monthlyTotal = 0;
        let currentStreak = 0;
        
        // 週間統計
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];
            
            if (date <= today) {
                weeklyTotal++;
                if (this.isHabitCompleted(habitId, date)) {
                    weeklyCompleted++;
                }
            }
        }
        
        // 月間統計
        for (let d = new Date(monthStart); d <= today; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            monthlyTotal++;
            if (this.isHabitCompleted(habitId, d)) {
                monthlyCompleted++;
            }
        }
        
        // 現在の連続日数
        const dates = Object.keys(this.completedHabits).sort().reverse();
        for (let i = 0; i < dates.length; i++) {
            const date = dates[i];
            const habits = this.completedHabits[date];
            const isCompleted = Array.isArray(habits) ? 
                habits.includes(habitId) : 
                (habits && typeof habits === 'object' ? !!habits[habitId] : false);
            if (isCompleted) {
                currentStreak++;
            } else {
                break;
            }
        }
        
        return {
            weeklyRate: weeklyTotal > 0 ? Math.round((weeklyCompleted / weeklyTotal) * 100) : 0,
            monthlyRate: monthlyTotal > 0 ? Math.round((monthlyCompleted / monthlyTotal) * 100) : 0,
            currentStreak: currentStreak
        };
    }


    // タイプラベルを取得
    getTypeLabel(type) {
        const labels = {
            'habit': '習慣',
            'no': 'No系',
            'supplement': 'サプリ・食事'
        };
        return labels[type] || type;
    }

    // 現在の報酬を取得
    getCurrentReward(streakCount) {
        const rewardKeys = Object.keys(rewards).map(Number).sort((a, b) => b - a);
        for (const key of rewardKeys) {
            if (streakCount >= key) {
                return { days: key, ...rewards[key] };
            }
        }
        return null;
    }

    // 次の報酬を取得
    getNextReward(streakCount) {
        const rewardKeys = Object.keys(rewards).map(Number).sort((a, b) => a - b);
        for (const key of rewardKeys) {
            if (streakCount < key) {
                return { days: key, ...rewards[key] };
            }
        }
        return null;
    }

    // 新しいレポートテーブルを生成
    renderReportTable() {
        const reportTableContainer = document.getElementById('reportTable');
        if (!reportTableContainer) return;

        let html = `
            <table class="report-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>習慣名</th>
                        <th>月完了率</th>
                        <th>連続日数</th>
                        <th>最大連続</th>
                    </tr>
                </thead>
                <tbody>
        `;

        this.habits.forEach((habit, index) => {
            const stats = this.getHabitStats(habit.id);
            const bestStreak = this.getBestStreak(habit.id);
            
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${habit.shortName}</td>
                    <td>${stats.monthlyRate}%</td>
                    <td>${stats.currentStreak}日</td>
                    <td>${bestStreak}日</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        reportTableContainer.innerHTML = html;
    }

    // 合計値推移グラフを生成
    renderTotalChart() {
        const ctx = document.getElementById('totalChart');
        if (!ctx) return;

        // 過去30日分のデータを取得
        const chartData = this.getTotalChartData();
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: '合計値',
                    data: chartData.values,
                    borderColor: '#4A90E2',
                    backgroundColor: 'rgba(74, 144, 226, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: 'white'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'white'
                        },
                        grid: {
                            color: '#333'
                        },
                        min: chartData.labels.length - 14, // 最初は14日分表示
                        max: chartData.labels.length - 1
                    },
                    y: {
                        ticks: {
                            color: 'white',
                            stepSize: 1, // 整数ステップ
                            callback: function(value) {
                                return Number.isInteger(value) ? value : null;
                            }
                        },
                        grid: {
                            color: '#333'
                        },
                        beginAtZero: true // 0から開始
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 0
                },
                elements: {
                    point: {
                        hoverRadius: 6,
                        radius: 4
                    }
                }
            },
            plugins: [{
                id: 'dragPlugin',
                beforeEvent(chart, args, pluginOptions) {
                    const self = this;
                    if (args.event.type === 'mousedown' || args.event.type === 'touchstart') {
                        chart.dragStartX = args.event.x;
                        chart.dragStartY = args.event.y;
                        chart.isDragging = false;
                    }
                    
                    if (args.event.type === 'mousemove' || args.event.type === 'touchmove') {
                        if (chart.dragStartX !== undefined && chart.dragStartY !== undefined) {
                            const deltaX = args.event.x - chart.dragStartX;
                            const deltaY = args.event.y - chart.dragStartY;
                            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                            
                            if (distance > 5) {
                                chart.isDragging = true;
                                self.handleDrag(chart, deltaX);
                                chart.dragStartX = args.event.x;
                                chart.dragStartY = args.event.y;
                            }
                        }
                    }
                    
                    if (args.event.type === 'mouseup' || args.event.type === 'touchend') {
                        chart.dragStartX = undefined;
                        chart.dragStartY = undefined;
                        chart.isDragging = false;
                    }
                },
                handleDrag(chart, deltaX) {
                    const xScale = chart.scales.x;
                    const range = xScale.max - xScale.min;
                    const scale = chart.width / range;
                    const shift = -deltaX / scale;
                    
                    const newMin = Math.max(0, xScale.min + shift);
                    const newMax = Math.min(chart.data.labels.length - 1, xScale.max + shift);
                    
                    if (newMax - newMin >= 5) { // 最小表示範囲を5日分に制限
                        xScale.options.min = newMin;
                        xScale.options.max = newMax;
                        chart.update('none');
                    }
                }
            }]
        });
    }

    // 合計値推移のデータを取得
    getTotalChartData() {
        const labels = [];
        const values = [];
        const today = new Date(); // 実際の今日の日付を使用
        
        // 過去30日分のデータを生成
        let cumulativeTotal = 0;
        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            // 日付ラベル（月/日形式）
            const label = `${date.getMonth() + 1}/${date.getDate()}`;
            labels.push(label);
            
            // その日の完了習慣数を累積合計に加算
            const dailyCompleted = this.completedHabits[dateStr] ? this.completedHabits[dateStr].length : 0;
            cumulativeTotal += dailyCompleted;
            
            // 整数値のみを保証し、マイナス値を防ぐ
            const safeValue = Math.max(0, Math.floor(cumulativeTotal));
            values.push(safeValue);
            
            // デバッグ用ログ
            console.log(`日付: ${dateStr}, 日完了: ${dailyCompleted}, 累積: ${safeValue}`);
        }
        
        return { labels, values };
    }

    // モンスターを生成
    renderMonsters() {
        const monsterGrid = document.getElementById('monsterGrid');
        if (!monsterGrid) return;

        monsterGrid.innerHTML = '';

        this.habits.forEach((habit, index) => {
            const totalCount = this.calculateTotalAll(habit.id);
            const level = this.getMonsterLevel(totalCount);
            const monsterType = this.getMonsterType(totalCount);
            const monsterCard = document.createElement('div');
            monsterCard.className = 'monster-card';

            // 次のレベルまでの必要日数を計算
            const nextLevel = this.getNextLevel(totalCount);
            const daysToNext = Math.max(0, nextLevel - totalCount);

            monsterCard.innerHTML = `
                <div class="monster-name">${habit.shortName}</div>
                <div class="monster-image" style="border-color: ${monsterType.color}; background: ${monsterType.color}20;">
                    ${monsterType.emoji}
                </div>
                <div class="monster-level">Lv.${level}</div>
                <div class="monster-description">${monsterType.name}</div>
                <div class="monster-stats">
                    <span>次のレベルまで: ${daysToNext}日</span>
                </div>
            `;
            
            monsterGrid.appendChild(monsterCard);
        });
    }

    // 合計値に基づいてモンスタータイプを取得
    getMonsterType(totalCount) {
        const level = this.getMonsterLevel(totalCount);
        return monsterTypes[level];
    }

    getMonsterLevel(totalCount) {
        if (totalCount === 0) return 0;
        if (totalCount <= 1) return 1;
        if (totalCount <= 2) return 2;
        if (totalCount <= 3) return 3;
        if (totalCount <= 4) return 4;
        if (totalCount <= 5) return 5;
        if (totalCount <= 6) return 6;
        if (totalCount <= 7) return 7;
        if (totalCount <= 8) return 8;
        if (totalCount <= 9) return 9;
        return 10;
    }

    // 次のレベルまでの必要日数を取得
    getNextLevel(totalCount) {
        if (totalCount < 1) return 1;
        if (totalCount < 2) return 2;
        if (totalCount < 3) return 3;
        if (totalCount < 4) return 4;
        if (totalCount < 5) return 5;
        if (totalCount < 6) return 6;
        if (totalCount < 7) return 7;
        if (totalCount < 8) return 8;
        if (totalCount < 9) return 9;
        if (totalCount < 10) return 10;
        return 15; // 10以上は15を次の目標とする
    }

    // 連続日数の計算
    calculateStreak() {
        const dates = Object.keys(this.completedHabits).sort().reverse();
        let streak = 0;
        
        for (let i = 0; i < dates.length; i++) {
            const date = dates[i];
            const completedHabits = this.completedHabits[date] || [];
            const highPriorityHabits = this.habits.filter(h => h.priority === 5);
            const completedHighPriority = highPriorityHabits.filter(h => completedHabits.includes(h.id));
            
            // 最重要習慣の80%以上完了で連続日数にカウント
            if (completedHighPriority.length >= Math.ceil(highPriorityHabits.length * 0.8)) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }

    // 週間完了率の計算
    calculateWeeklyRate() {
        let totalPossible = 0;
        let totalCompleted = 0;
        
        this.currentWeek.forEach(date => {
            const dateStr = date.toISOString().split('T')[0];
            totalPossible += this.habits.length;
            totalCompleted += (this.completedHabits[dateStr] || []).length;
        });
        
        return totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;
    }

    // 月間完了率の計算
    calculateMonthlyRate() {
        const today = new Date();
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        
        let totalPossible = 0;
        let totalCompleted = 0;
        
        for (let d = new Date(monthStart); d <= today; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            totalPossible += this.habits.length;
            totalCompleted += (this.completedHabits[dateStr] || []).length;
        }
        
        return totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;
    }

    // スワイプイベントの設定
    setupSwipeEvents() {
        const calendarContainer = document.querySelector('.calendar-container');
        if (!calendarContainer) return;

        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        let isSwiping = false;

        // タッチ開始
        calendarContainer.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            isSwiping = true;
        }, { passive: true });

        // タッチ移動
        calendarContainer.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            const touch = e.touches[0];
            endX = touch.clientX;
            endY = touch.clientY;
            
            // スワイプ中の視覚的フィードバック
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 10) {
                    calendarContainer.classList.add('swiping-right');
                    calendarContainer.classList.remove('swiping-left');
                } else if (deltaX < -10) {
                    calendarContainer.classList.add('swiping-left');
                    calendarContainer.classList.remove('swiping-right');
                }
            }
        }, { passive: true });

        // タッチ終了
        calendarContainer.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            isSwiping = false;

            // スワイプクラスをクリア
            calendarContainer.classList.remove('swiping-left', 'swiping-right');

            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const minSwipeDistance = 50; // 最小スワイプ距離

            // 水平スワイプの判定（垂直方向の動きが少ない場合）
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    // 右スワイプ → 前の週へ
                    this.moveToPrevWeek();
                } else {
                    // 左スワイプ → 次の週へ
                    this.moveToNextWeek();
                }
            }
        }, { passive: true });

        // マウスイベント（デスクトップでのテスト用）
        calendarContainer.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            startY = e.clientY;
            isSwiping = true;
        });

        calendarContainer.addEventListener('mousemove', (e) => {
            if (!isSwiping) return;
            endX = e.clientX;
            endY = e.clientY;
            
            // スワイプ中の視覚的フィードバック
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 10) {
                    calendarContainer.classList.add('swiping-right');
                    calendarContainer.classList.remove('swiping-left');
                } else if (deltaX < -10) {
                    calendarContainer.classList.add('swiping-left');
                    calendarContainer.classList.remove('swiping-right');
                }
            }
        });

        calendarContainer.addEventListener('mouseup', (e) => {
            if (!isSwiping) return;
            isSwiping = false;

            // スワイプクラスをクリア
            calendarContainer.classList.remove('swiping-left', 'swiping-right');

            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const minSwipeDistance = 50;

            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    this.moveToPrevWeek();
                } else {
                    this.moveToNextWeek();
                }
            }
        });

        // マウスが離れた場合の処理
        document.addEventListener('mouseleave', () => {
            isSwiping = false;
        });
    }

    // イベントリスナーの設定
    setupEventListeners() {
        // 週移動ボタン
        document.getElementById('prevWeek').addEventListener('click', () => this.moveToPrevWeek());
        document.getElementById('nextWeek').addEventListener('click', () => this.moveToNextWeek());
        document.getElementById('goToToday').addEventListener('click', () => this.goToToday());
        
        // スワイプイベントは無効化
        // this.setupSwipeEvents();
        
        // カレンダーモーダル
        document.querySelector('.dropdown-arrow').addEventListener('click', () => this.showCalendarModal());
        document.getElementById('closeCalendar').addEventListener('click', () => this.hideCalendarModal());
        document.getElementById('prevMonth').addEventListener('click', () => this.previousMonth());
        document.getElementById('nextMonth').addEventListener('click', () => this.nextMonth());
        
        // ボトムナビゲーション
        document.getElementById('homeBtn').addEventListener('click', () => this.showHomeView());
        document.getElementById('reportBtn').addEventListener('click', () => this.showReportView());
        document.getElementById('monsterBtn').addEventListener('click', () => this.showMonsterView());
        document.getElementById('settingsBtn').addEventListener('click', () => this.showSettingsView());
        
        // Firebaseテストボタン
        const firebaseTestBtn = document.getElementById('firebaseTestBtn');
        if (firebaseTestBtn) {
            firebaseTestBtn.addEventListener('click', () => {
                if (window.runFirebaseTest) {
                    window.runFirebaseTest();
                } else {
                    alert('Firebaseテスト機能が利用できません');
                }
            });
        }
    }

    // 手動同期のみの安全なセットアップ
    setupManualSyncOnly() {
        console.log('手動同期は無効化されています');
        // 同期機能を完全に無効化
        return;
    }

    // オプション同期機能の設定（自動同期を無効化）
    setupOptionalSync() {
        console.log('自動同期は無効化されています');
        return;
        
        console.log('同期機能の設定を開始');
        
        // 以下のコードは DISABLE_SYNC = true の場合は実行されない
        // 手動同期ボタンのイベントリスナー
        // const forceSyncBtn = document.getElementById('forceSyncBtn');
        // if (forceSyncBtn) {
        //     forceSyncBtn.addEventListener('click', async () => {
        //         // ... 同期処理
        //     });
        // }

        // データ更新イベントの監視も無効化
        // if (window.optionalSync) {
        //     window.optionalSync.setupDataListener((event) => {
        //         // ... イベント処理
        //     });
        // }
    }

    // クラウドデータの読み込み
    async loadCloudData() {
        if (window.optionalSync && window.optionalSync.isEnabled) {
            try {
                const cloudData = await window.optionalSync.loadData();
                if (cloudData && cloudData.completedHabits) {
                    this.mergeCloudData(cloudData.completedHabits);
                }
            } catch (error) {
                console.error('クラウドデータ読み込みエラー:', error);
            }
        }
    }

    // 安全なクラウドデータ読み込み
    async loadCloudDataSafely() {
        if (window.optionalSync && window.optionalSync.isEnabled) {
            try {
                const cloudData = await window.optionalSync.loadData();
                if (cloudData && cloudData.completedHabits) {
                    // 現在のビューを保存
                    const currentView = this.getCurrentView();
                    
                    // データをマージ（レンダリングは行わない）
                    this.mergeCloudDataWithoutRendering(cloudData.completedHabits);
                    
                    // 現在のビューのみを更新
                    this.updateCurrentView(currentView);
                }
            } catch (error) {
                console.error('安全なクラウドデータ読み込みエラー:', error);
                throw error;
            }
        }
    }

    // クラウドデータとのマージ
    mergeCloudData(cloudData) {
        try {
            const localData = this.completedHabits;
            const merged = { ...localData };
            let hasChanges = false;

            // クラウドデータの各習慣をチェック
            if (cloudData && typeof cloudData === 'object') {
                for (const [habitId, cloudHabit] of Object.entries(cloudData)) {
                    if (cloudHabit && typeof cloudHabit === 'object') {
                        if (!merged[habitId] || (cloudHabit.lastUpdated > (merged[habitId].lastUpdated || 0))) {
                            merged[habitId] = cloudHabit;
                            hasChanges = true;
                        }
                    }
                }
            }

            // ローカルデータの方が新しい場合
            if (localData && typeof localData === 'object') {
                for (const [habitId, localHabit] of Object.entries(localData)) {
                    if (localHabit && typeof localHabit === 'object') {
                        if (!cloudData[habitId] || (localHabit.lastUpdated > (cloudData[habitId].lastUpdated || 0))) {
                            merged[habitId] = localHabit;
                            hasChanges = true;
                        }
                    }
                }
            }

            // データが変更された場合のみレンダリング
            if (hasChanges) {
                this.completedHabits = merged;
                
                // 現在表示中のビューのみを更新
                const currentView = this.getCurrentView();
                this.updateCurrentView(currentView);
            }
            
        } catch (error) {
            console.error('データマージエラー:', error);
            // エラー時は現在のデータを維持
        }
    }

    // 現在のビューを取得
    getCurrentView() {
        const weekView = document.getElementById('weekView');
        const reportView = document.getElementById('reportView');
        const monsterView = document.getElementById('monsterView');
        
        // より確実な判定方法を使用
        if (weekView && weekView.style.display !== 'none' && weekView.offsetParent !== null) {
            return 'week';
        } else if (reportView && reportView.style.display !== 'none' && reportView.offsetParent !== null) {
            return 'report';
        } else if (monsterView && monsterView.style.display !== 'none' && monsterView.offsetParent !== null) {
            return 'monster';
        }
        return 'week'; // デフォルト
    }

    // 現在のビューのみを更新
    updateCurrentView(view) {
        switch (view) {
            case 'week':
                this.renderCalendar();
                break;
            case 'report':
                this.updateReportView();
                break;
            case 'monster':
                this.updateMonsterView();
                break;
        }
    }

    // レンダリングなしのデータマージ
    mergeCloudDataWithoutRendering(cloudData) {
        try {
            const localData = this.completedHabits;
            const merged = { ...localData };
            let hasChanges = false;

            // クラウドデータの各習慣をチェック
            if (cloudData && typeof cloudData === 'object') {
                for (const [habitId, cloudHabit] of Object.entries(cloudData)) {
                    if (cloudHabit && typeof cloudHabit === 'object') {
                        if (!merged[habitId] || (cloudHabit.lastUpdated > (merged[habitId].lastUpdated || 0))) {
                            merged[habitId] = cloudHabit;
                            hasChanges = true;
                        }
                    }
                }
            }

            // ローカルデータの方が新しい場合
            if (localData && typeof localData === 'object') {
                for (const [habitId, localHabit] of Object.entries(localData)) {
                    if (localHabit && typeof localHabit === 'object') {
                        if (!cloudData[habitId] || (localHabit.lastUpdated > (cloudData[habitId].lastUpdated || 0))) {
                            merged[habitId] = localHabit;
                            hasChanges = true;
                        }
                    }
                }
            }

            // データが変更された場合のみ更新
            if (hasChanges) {
                this.completedHabits = merged;
                console.log('データマージが完了しました（レンダリングなし）');
            }
            
        } catch (error) {
            console.error('レンダリングなしデータマージエラー:', error);
            throw error;
        }
    }


    // ビューの切り替え
    showWeekView() {
        document.getElementById('weekView').style.display = 'block';
        document.getElementById('statsView').style.display = 'none';
    }

    showHomeView() {
        this.showWeekView();
        this.renderMonthlyCalendar();
        this.renderHealthSummary();
        this.setActiveNav('homeBtn');
    }

    showReportView() {
        document.getElementById('weekView').style.display = 'none';
        document.getElementById('statsView').style.display = 'block';
        document.getElementById('monsterView').style.display = 'none';
        this.renderTotalChart();
        this.renderReportTable();
        this.updateMotivationDisplay();
        this.setActiveNav('reportBtn');
    }
    
    // モチベーション表示を更新
    updateMotivationDisplay() {
        // データを再計算
        this.streaks = this.calculateStreaks();
        this.totalScore = this.calculateTotalScore();
        
        // 達成データを完全に再計算
        this.achievements = this.calculateAllAchievements();
        
        // 表示を更新
        document.getElementById('currentStreak').textContent = this.achievements.currentStreak;
        document.getElementById('totalScore').textContent = this.totalScore;
        document.getElementById('perfectDays').textContent = this.achievements.perfectDays;
        document.getElementById('badgeCount').textContent = this.achievements.badges.length;

        const totalAchievementValue = this.calculateAchievementTotal();
        document.getElementById('achievementTotal').textContent = `${totalAchievementValue}ギル`;
    }

    // 全達成データを再計算
    calculateAllAchievements() {
        const achievements = {
            totalDays: 0,
            perfectDays: 0,
            currentStreak: 0,
            bestStreak: 0,
            badges: []
        };

        // 完璧な日と現在の連続日数を計算
        let currentStreak = 0;
        let maxStreak = 0;
        const today = new Date();
        
        // 過去から現在に向かって計算（連続日数を正しく計算するため）
        for (let i = 365; i >= 0; i--) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() - i);
            const dateStr = checkDate.toISOString().split('T')[0];
            const dayHabits = this.completedHabits[dateStr];
            
            if (dayHabits) {
                const completedCount = Array.isArray(dayHabits) ? dayHabits.length : 
                                     (typeof dayHabits === 'object' ? Object.values(dayHabits).filter(Boolean).length : 0);
                
                if (completedCount > 0) {
                    achievements.totalDays++;
                }
                
                // 完璧な日（全習慣完了）
                if (completedCount === this.habits.length) {
                    achievements.perfectDays++;
                    currentStreak++;
                    maxStreak = Math.max(maxStreak, currentStreak);
                } else {
                    // 完璧でない日があったら連続をリセット
                    currentStreak = 0;
                }
            } else {
                // データがない日があったら連続をリセット
                currentStreak = 0;
            }
        }
        
        achievements.currentStreak = currentStreak;
        achievements.bestStreak = maxStreak;
        
        // バッジチェック（簡易版）
        if (achievements.currentStreak >= 1) achievements.badges.push('初回達成');
        if (achievements.currentStreak >= 3) achievements.badges.push('3日連続');
        if (achievements.currentStreak >= 7) achievements.badges.push('7日連続');
        if (achievements.currentStreak >= 30) achievements.badges.push('30日連続');
        if (achievements.currentStreak >= 100) achievements.badges.push('100日連続');
        if (this.totalScore >= 100) achievements.badges.push('スコア100');
        if (this.totalScore >= 500) achievements.badges.push('スコア500');
        if (this.totalScore >= 1000) achievements.badges.push('スコア1000');
        if (achievements.perfectDays >= 10) achievements.badges.push('完璧10日');
        if (achievements.perfectDays >= 50) achievements.badges.push('完璧50日');
        if (achievements.perfectDays >= 100) achievements.badges.push('完璧100日');

        return achievements;
    }

    calculateAchievementTotal() {
        const achievements = this.achievements || {};
        const currentStreak = Math.max(0, achievements.currentStreak || 0);
        const perfectDays = Math.max(0, achievements.perfectDays || 0);
        const badgeCount = Array.isArray(achievements.badges) ? achievements.badges.length : 0;
        const totalScore = Math.max(0, this.totalScore || 0);

        return currentStreak + perfectDays + badgeCount + totalScore;
    }

    showMonsterView() {
        document.getElementById('weekView').style.display = 'none';
        document.getElementById('statsView').style.display = 'none';
        document.getElementById('monsterView').style.display = 'block';
        this.renderMonsters();
        this.setActiveNav('monsterBtn');
    }


    showSettingsView() {
        document.getElementById('weekView').style.display = 'none';
        document.getElementById('statsView').style.display = 'none';
        document.getElementById('monsterView').style.display = 'none';
        document.getElementById('settingsView').style.display = 'block';
        this.setActiveNav('settingsBtn');
    }


    // アクティブナビの設定
    setActiveNav(activeNavId) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(activeNavId).classList.add('active');
    }

    // ローカルストレージから完了した習慣を読み込み
    loadCompletedHabits() {
        try {
            const saved = localStorage.getItem('habitTrackerData');
            console.log('ローカルストレージから読み込み:', saved);
            const result = saved ? JSON.parse(saved) : {};
            console.log('読み込み結果:', result);
            return result;
        } catch (error) {
            console.error('ローカル読み込みエラー:', error);
            return {};
        }
    }

    // ヘルスデータの読み込み
    loadHealthData() {
        try {
            const saved = localStorage.getItem('healthData');
            return saved ? JSON.parse(saved) : {};
        } catch (error) {
            console.error('ヘルスデータ読み込みエラー:', error);
            return {};
        }
    }

    // ヘルスデータの保存
    saveHealthData() {
        try {
            const dataToSave = JSON.stringify(this.healthData);
            
            // メイン保存
            localStorage.setItem('healthData', dataToSave);
            
            // バックアップ保存（タイムスタンプ付き）
            const timestamp = new Date().toISOString();
            localStorage.setItem(`healthData_backup_${timestamp}`, dataToSave);
            
            // 最新のバックアップを保持（古いバックアップは削除）
            this.cleanupOldBackups();
            
            console.log('ヘルスデータを保存（バックアップ付き）:', this.healthData);
        } catch (error) {
            console.error('ヘルスデータ保存エラー:', error);
            // エラー時は古いバックアップから復元を試行
            this.restoreFromBackup();
        }
    }
    
    // 古いバックアップをクリーンアップ（最新5個まで保持）
    cleanupOldBackups() {
        const backupKeys = Object.keys(localStorage)
            .filter(key => key.startsWith('healthData_backup_'))
            .sort()
            .reverse();
        
        // 最新5個以外を削除
        backupKeys.slice(5).forEach(key => {
            localStorage.removeItem(key);
        });
    }
    
    // バックアップから復元
    restoreFromBackup() {
        const backupKeys = Object.keys(localStorage)
            .filter(key => key.startsWith('healthData_backup_'))
            .sort()
            .reverse();
        
        if (backupKeys.length > 0) {
            const latestBackup = localStorage.getItem(backupKeys[0]);
            if (latestBackup) {
                this.healthData = JSON.parse(latestBackup);
                console.log('バックアップから復元しました:', this.healthData);
            }
        }
    }

    // ローカルストレージに完了した習慣を保存（バックアップ付き）
    saveCompletedHabits() {
        try {
            // データが空でない場合のみ保存
            if (this.completedHabits && Object.keys(this.completedHabits).length > 0) {
                const dataToSave = JSON.stringify(this.completedHabits);
                
                // メイン保存
                localStorage.setItem('habitTrackerData', dataToSave);
                
                // バックアップ保存（タイムスタンプ付き）
                const timestamp = new Date().toISOString();
                localStorage.setItem(`habitTrackerData_backup_${timestamp}`, dataToSave);
                
                // 古いバックアップをクリーンアップ
                this.cleanupHabitBackups();
                
                console.log('ローカルにデータを保存完了（バックアップ付き）:', this.completedHabits);
            } else {
                console.log('保存するデータがありません');
            }
        } catch (error) {
            console.error('ローカル保存エラー:', error);
            // エラー時はバックアップから復元を試行
            this.restoreHabitsFromBackup();
        }
    }
    
    // 習慣データの古いバックアップをクリーンアップ
    cleanupHabitBackups() {
        const backupKeys = Object.keys(localStorage)
            .filter(key => key.startsWith('habitTrackerData_backup_'))
            .sort()
            .reverse();
        
        // 最新5個以外を削除
        backupKeys.slice(5).forEach(key => {
            localStorage.removeItem(key);
        });
    }
    
    // 習慣データをバックアップから復元
    restoreHabitsFromBackup() {
        const backupKeys = Object.keys(localStorage)
            .filter(key => key.startsWith('habitTrackerData_backup_'))
            .sort()
            .reverse();
        
        if (backupKeys.length > 0) {
            const latestBackup = localStorage.getItem(backupKeys[0]);
            if (latestBackup) {
                this.completedHabits = JSON.parse(latestBackup);
                console.log('習慣データをバックアップから復元しました:', this.completedHabits);
                this.renderCalendar(); // カレンダーを再描画
            }
        }
    }
    
    // 手動同期ボタンを表示
    showManualSyncButton() {
        const syncStatusBar = document.getElementById('syncStatusBar');
        if (syncStatusBar) {
            syncStatusBar.style.display = 'flex';
            const statusElement = document.getElementById('sync-status');
            if (statusElement) {
                statusElement.textContent = '⚠️ 手動同期が必要';
            }
        }
    }

    // カレンダーモーダルを表示
    showCalendarModal() {
        document.getElementById('calendarModal').style.display = 'flex';
        this.renderCalendarModal();
    }

    // カレンダーモーダルを非表示
    hideCalendarModal() {
        document.getElementById('calendarModal').style.display = 'none';
    }

    // 前の月に移動
    previousMonth() {
        this.calendarMonth.setMonth(this.calendarMonth.getMonth() - 1);
        this.renderCalendarModal();
    }

    // 次の月に移動
    nextMonth() {
        this.calendarMonth.setMonth(this.calendarMonth.getMonth() + 1);
        this.renderCalendarModal();
    }

    // カレンダーモーダルを描画
    renderCalendarModal() {
        const calendarGrid = document.getElementById('calendarGrid');
        const currentMonthYear = document.getElementById('currentMonthYear');
        
        // 月年表示を更新
        currentMonthYear.textContent = `${this.calendarMonth.getFullYear()}年${this.calendarMonth.getMonth() + 1}月`;
        
        // カレンダーグリッドをクリア
        calendarGrid.innerHTML = '';
        
        // 曜日ヘッダーを追加
        const dayHeaders = ['日', '月', '火', '水', '木', '金', '土'];
        dayHeaders.forEach(day => {
            const header = document.createElement('div');
            header.className = 'calendar-day-header';
            header.textContent = day;
            calendarGrid.appendChild(header);
        });
        
        // 月の最初の日と最後の日を取得
        const firstDay = new Date(this.calendarMonth.getFullYear(), this.calendarMonth.getMonth(), 1);
        const lastDay = new Date(this.calendarMonth.getFullYear(), this.calendarMonth.getMonth() + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay(); // 0=日曜日, 1=月曜日, ...
        
        // 前月の日付を表示（空白を埋めるため）
        const prevMonth = new Date(this.calendarMonth.getFullYear(), this.calendarMonth.getMonth() - 1, 0);
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            const day = document.createElement('div');
            day.className = 'calendar-day other-month';
            day.textContent = prevMonth.getDate() - i;
            calendarGrid.appendChild(day);
        }
        
        // 当月の日付を表示
        const today = new Date(); // 実際の今日の日付を使用
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            // 今日の日付をハイライト
            if (this.calendarMonth.getFullYear() === today.getFullYear() &&
                this.calendarMonth.getMonth() === today.getMonth() &&
                day === today.getDate()) {
                dayElement.classList.add('today');
            }
            
            // クリックイベントを追加
            dayElement.addEventListener('click', () => {
                this.goToSelectedDate(day);
            });
            
            calendarGrid.appendChild(dayElement);
        }
        
        // 次月の日付を表示（空白を埋めるため）
        const totalCells = 42; // 6週間 × 7日
        const currentCells = startingDayOfWeek + daysInMonth;
        const remainingCells = totalCells - currentCells;
        
        for (let day = 1; day <= remainingCells; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day other-month';
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        }
    }

    // 選択した日付の週に移動
    goToSelectedDate(day) {
        const selectedDate = new Date(this.calendarMonth.getFullYear(), this.calendarMonth.getMonth(), day);
        
        // 選択した日付を含む週の最初の日（月曜日）を計算
        const dayOfWeek = selectedDate.getDay(); // 0=日曜日, 1=月曜日, ...
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 日曜日の場合は-6、それ以外は1-dayOfWeek
        const weekStart = new Date(selectedDate);
        weekStart.setDate(selectedDate.getDate() + mondayOffset);
        
        // 週を更新
        this.currentWeek = this.getWeekFromDate(weekStart);
        
        // カレンダーを再描画
        this.renderCalendar();
        
        // モーダルを閉じる
        this.hideCalendarModal();
    }

    // 指定した日付から週を取得
    getWeekFromDate(date) {
        const week = [];
        const monday = new Date(date);
        
        for (let i = 0; i < 7; i++) {
            const day = new Date(monday);
            day.setDate(monday.getDate() + i);
            week.push(day);
        }
        
        return week;
    }

    // 月間カレンダーを描画
    renderMonthlyCalendar() {
        const calendarGrid = document.getElementById('monthlyCalendarGrid');
        const monthDisplay = document.getElementById('currentMonthReport');
        if (!calendarGrid || !monthDisplay) return;

        const year = this.reportMonth.getFullYear();
        const month = this.reportMonth.getMonth();
        
        // 月表示を更新
        monthDisplay.textContent = `${year}年${month + 1}月`;
        
        // 月の最初の日と最後の日を取得
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        
        // 月の最初の日の曜日（0=日曜日）
        const firstDayOfWeek = firstDay.getDay();
        
        // カレンダーグリッドをクリア
        calendarGrid.innerHTML = '';
        
        // 曜日ヘッダー
        const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
        weekDays.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'monthly-calendar-day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });
        
        // 前月の日付（空白セル）
        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'monthly-calendar-day other-month';
            calendarGrid.appendChild(emptyDay);
        }
        
        // 当月の日付
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'monthly-calendar-day';
            dayElement.textContent = day;
            
            const date = new Date(year, month, day);
            const dateStr = date.toISOString().split('T')[0];
            
            // 今日かどうかチェック
            const today = new Date();
            if (date.toDateString() === today.toDateString()) {
                dayElement.classList.add('today');
            }
            
            // ヘルスデータの状態をチェック（複数選択対応）
            const healthStatus = this.healthData[dateStr] || {};
            const hasHealth = healthStatus.healthKeeping;
            const hasMassage = healthStatus.headMassage;
            const hasDental = healthStatus.dentalCleaning;
            const hasSauna = healthStatus.sauna;
            const hasCatcafe = healthStatus.catcafe;
            
            // 複数選択の組み合わせをチェック
            const selectedCount = [hasHealth, hasMassage, hasDental, hasSauna, hasCatcafe].filter(Boolean).length;
            
            if (selectedCount > 1) {
                dayElement.classList.add('has-both');
                // 複数選択の場合はグラデーション表示
                const colors = [];
                if (hasHealth) colors.push('#28a745');
                if (hasMassage) colors.push('#b8860b');
                if (hasDental) colors.push('#17a2b8');
                if (hasSauna) colors.push('#dc3545');
                if (hasCatcafe) colors.push('#6f42c1');
                
                if (colors.length === 2) {
                    dayElement.style.background = `linear-gradient(45deg, ${colors[0]} 50%, ${colors[1]} 50%)`;
                } else if (colors.length === 3) {
                    dayElement.style.background = `repeating-linear-gradient(45deg, ${colors[0]} 0px, ${colors[0]} 8px, ${colors[1]} 8px, ${colors[1]} 16px, ${colors[2]} 16px, ${colors[2]} 24px)`;
                } else if (colors.length >= 4) {
                    // 4色以上の場合は複雑なグラデーション
                    const gradientStops = colors.map((color, index) => 
                        `${color} ${(index * 100) / (colors.length - 1)}%`
                    ).join(', ');
                    dayElement.style.background = `linear-gradient(45deg, ${gradientStops})`;
                }
            }
            // 単一選択の場合
            else if (hasHealth) {
                dayElement.classList.add('has-health');
            } else if (hasMassage) {
                dayElement.classList.add('has-massage');
            } else if (hasDental) {
                dayElement.classList.add('has-dental');
            } else if (hasSauna) {
                dayElement.classList.add('has-sauna');
            } else if (hasCatcafe) {
                dayElement.classList.add('has-catcafe');
            }
            
            // クリックイベントを追加
            dayElement.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showHealthSelection(date, dayElement);
            });
            
            calendarGrid.appendChild(dayElement);
        }
        
        // 月移動ボタンのイベントリスナー
        this.setupMonthlyCalendarEvents();
    }

    // 月間カレンダーのイベント設定
    setupMonthlyCalendarEvents() {
        const prevBtn = document.getElementById('prevMonthReport');
        const nextBtn = document.getElementById('nextMonthReport');
        
        if (prevBtn) {
            prevBtn.onclick = () => {
                this.reportMonth.setMonth(this.reportMonth.getMonth() - 1);
                this.renderMonthlyCalendar();
            };
        }
        
        if (nextBtn) {
            nextBtn.onclick = () => {
                this.reportMonth.setMonth(this.reportMonth.getMonth() + 1);
                this.renderMonthlyCalendar();
            };
        }
    }

    // ヘルス選択プルダウンを表示
    showHealthSelection(date, dayElement) {
        // 既存のプルダウンを削除
        const existingDropdown = document.querySelector('.health-selection-dropdown');
        if (existingDropdown) {
            existingDropdown.remove();
        }
        
        const dateStr = date.toISOString().split('T')[0];
        const healthStatus = this.healthData[dateStr] || {};
        
        // プルダウンを作成
        const dropdown = document.createElement('div');
        dropdown.className = 'health-selection-dropdown show';
        
        const healthOption = document.createElement('div');
        healthOption.className = `health-selection-option ${healthStatus.healthKeeping ? 'selected health-keeping' : ''}`;
        healthOption.textContent = 'A';
        healthOption.onclick = () => {
            this.toggleHealthData(dateStr, 'healthKeeping');
            this.updateHealthDisplay(dayElement, dateStr);
            dropdown.remove();
        };
        
        const massageOption = document.createElement('div');
        massageOption.className = `health-selection-option ${healthStatus.headMassage ? 'selected head-massage' : ''}`;
        massageOption.textContent = 'B';
        massageOption.onclick = () => {
            this.toggleHealthData(dateStr, 'headMassage');
            this.updateHealthDisplay(dayElement, dateStr);
            dropdown.remove();
        };
        
        const dentalOption = document.createElement('div');
        dentalOption.className = `health-selection-option ${healthStatus.dentalCleaning ? 'selected dental-cleaning' : ''}`;
        dentalOption.textContent = 'C';
        dentalOption.onclick = () => {
            this.toggleHealthData(dateStr, 'dentalCleaning');
            this.updateHealthDisplay(dayElement, dateStr);
            dropdown.remove();
        };
        
        const saunaOption = document.createElement('div');
        saunaOption.className = `health-selection-option ${healthStatus.sauna ? 'selected sauna' : ''}`;
        saunaOption.textContent = 'D';
        saunaOption.onclick = () => {
            this.toggleHealthData(dateStr, 'sauna');
            this.updateHealthDisplay(dayElement, dateStr);
            dropdown.remove();
        };
        
        const catcafeOption = document.createElement('div');
        catcafeOption.className = `health-selection-option ${healthStatus.catcafe ? 'selected catcafe' : ''}`;
        catcafeOption.textContent = 'E';
        catcafeOption.onclick = () => {
            this.toggleHealthData(dateStr, 'catcafe');
            this.updateHealthDisplay(dayElement, dateStr);
            dropdown.remove();
        };
        
        dropdown.appendChild(healthOption);
        dropdown.appendChild(massageOption);
        dropdown.appendChild(dentalOption);
        dropdown.appendChild(saunaOption);
        dropdown.appendChild(catcafeOption);
        
        // 日付要素に相対的に配置
        dayElement.style.position = 'relative';
        dayElement.appendChild(dropdown);
        
        // 外部クリックでプルダウンを閉じる
        setTimeout(() => {
            document.addEventListener('click', function closeDropdown() {
                dropdown.remove();
                document.removeEventListener('click', closeDropdown);
            });
        }, 100);
    }

    // ヘルスデータの切り替え
    toggleHealthData(dateStr, type) {
        if (!this.healthData[dateStr]) {
            this.healthData[dateStr] = {};
        }
        
        this.healthData[dateStr][type] = !this.healthData[dateStr][type];
        console.log('ヘルスデータ切り替え:', { dateStr, type, newValue: this.healthData[dateStr][type], allData: this.healthData });
        this.saveHealthData();
    }

    // ヘルス表示の更新
    updateHealthDisplay(dayElement, dateStr) {
        const healthStatus = this.healthData[dateStr] || {};
        
        // 既存のクラスを削除
        dayElement.classList.remove('has-health', 'has-massage', 'has-dental', 'has-sauna', 'has-catcafe', 'has-both');
        
        // 複数選択の組み合わせをチェック
        const hasHealth = healthStatus.healthKeeping;
        const hasMassage = healthStatus.headMassage;
        const hasDental = healthStatus.dentalCleaning;
        const hasSauna = healthStatus.sauna;
        const hasCatcafe = healthStatus.catcafe;
        
        // 複数選択の組み合わせをチェック
        const selectedCount = [hasHealth, hasMassage, hasDental, hasSauna, hasCatcafe].filter(Boolean).length;
        
        if (selectedCount > 1) {
            dayElement.classList.add('has-both');
            // 複数選択の場合はグラデーション表示
            const colors = [];
            if (hasHealth) colors.push('#28a745');
            if (hasMassage) colors.push('#ffc107');
            if (hasDental) colors.push('#17a2b8');
            if (hasSauna) colors.push('#dc3545');
            if (hasCatcafe) colors.push('#6f42c1');
            
            if (colors.length === 2) {
                dayElement.style.background = `linear-gradient(45deg, ${colors[0]} 50%, ${colors[1]} 50%)`;
            } else if (colors.length === 3) {
                dayElement.style.background = `repeating-linear-gradient(45deg, ${colors[0]} 0px, ${colors[0]} 8px, ${colors[1]} 8px, ${colors[1]} 16px, ${colors[2]} 16px, ${colors[2]} 24px)`;
            } else if (colors.length >= 4) {
                // 4色以上の場合は複雑なグラデーション
                const gradientStops = colors.map((color, index) => 
                    `${color} ${(index * 100) / (colors.length - 1)}%`
                ).join(', ');
                dayElement.style.background = `linear-gradient(45deg, ${gradientStops})`;
            }
        }
        // 単一選択の場合
        else if (hasHealth) {
            dayElement.classList.add('has-health');
            dayElement.style.background = '';
        } else if (hasMassage) {
            dayElement.classList.add('has-massage');
            dayElement.style.background = '';
        } else if (hasDental) {
            dayElement.classList.add('has-dental');
            dayElement.style.background = '';
        } else if (hasSauna) {
            dayElement.classList.add('has-sauna');
            dayElement.style.background = '';
        } else if (hasCatcafe) {
            dayElement.classList.add('has-catcafe');
            dayElement.style.background = '';
        }
        
        // 集計表を更新
        this.renderHealthSummary();
    }

    // ヘルス集計表をレンダリング（全期間）
    renderHealthSummary() {
        // 各項目の集計
        const healthKeepingData = { count: 0 };
        const headMassageData = { count: 0 };
        const dentalCleaningData = { count: 0 };
        const saunaData = { count: 0 };
        const catcafeData = { count: 0 };
        
        // 全期間のデータをチェック
        for (const dateStr in this.healthData) {
            const healthStatus = this.healthData[dateStr] || {};
            
            if (healthStatus.healthKeeping) {
                healthKeepingData.count++;
            }
            if (healthStatus.headMassage) {
                headMassageData.count++;
            }
            if (healthStatus.dentalCleaning) {
                dentalCleaningData.count++;
            }
            if (healthStatus.sauna) {
                saunaData.count++;
            }
            if (healthStatus.catcafe) {
                catcafeData.count++;
            }
        }
        
        // 集計表を更新
        this.updateSummaryRow('healthKeepingSummary', healthKeepingData);
        this.updateSummaryRow('headMassageSummary', headMassageData);
        this.updateSummaryRow('dentalCleaningSummary', dentalCleaningData);
        this.updateSummaryRow('saunaSummary', saunaData);
        this.updateSummaryRow('catcafeSummary', catcafeData);
    }

    // 集計行を更新
    updateSummaryRow(elementId, data) {
        const row = document.getElementById(elementId);
        if (!row) return;
        
        const countCell = row.querySelector('.count');
        countCell.textContent = data.count;
    }
    
    // 達成システムのメソッド群
    loadAchievements() {
        try {
            const saved = localStorage.getItem('achievements');
            return saved ? JSON.parse(saved) : {
                totalDays: 0,
                perfectDays: 0,
                currentStreak: 0,
                bestStreak: 0,
                badges: []
            };
        } catch (error) {
            console.error('達成データ読み込みエラー:', error);
            return {
                totalDays: 0,
                perfectDays: 0,
                currentStreak: 0,
                bestStreak: 0,
                badges: []
            };
        }
    }
    
    saveAchievements() {
        try {
            localStorage.setItem('achievements', JSON.stringify(this.achievements));
        } catch (error) {
            console.error('達成データ保存エラー:', error);
        }
    }
    
    calculateStreaks() {
        const streaks = {};
        for (const habit of this.habits) {
            streaks[habit.id] = {
                current: this.getCurrentStreak(habit.id),
                best: this.getBestStreak(habit.id)
            };
        }
        return streaks;
    }
    
    // 現在の連続日数を取得
    getCurrentStreak(habitId) {
        let currentStreak = 0;
        const today = new Date();
        
        for (let i = 0; i < 365; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() - i);
            const dateStr = checkDate.toISOString().split('T')[0];
            const dayHabits = this.completedHabits[dateStr];
            
            if (dayHabits && (Array.isArray(dayHabits) ? dayHabits.includes(habitId) : dayHabits[habitId])) {
                currentStreak++;
            } else {
                break;
            }
        }
        
        return currentStreak;
    }
    
    // 最高連続日数を取得
    getBestStreak(habitId) {
        let maxStreak = 0;
        let currentStreak = 0;
        const today = new Date();
        
        for (let i = 365; i >= 0; i--) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() - i);
            const dateStr = checkDate.toISOString().split('T')[0];
            const dayHabits = this.completedHabits[dateStr];
            
            if (dayHabits && (Array.isArray(dayHabits) ? dayHabits.includes(habitId) : dayHabits[habitId])) {
                currentStreak++;
                maxStreak = Math.max(maxStreak, currentStreak);
            } else {
                currentStreak = 0;
            }
        }
        
        return maxStreak;
    }
    
    
    
    calculateTotalScore() {
        let totalScore = 0;
        for (const dateStr in this.completedHabits) {
            const habits = this.completedHabits[dateStr];
            if (Array.isArray(habits)) {
                totalScore += habits.length;
            } else if (typeof habits === 'object') {
                totalScore += Object.values(habits).filter(Boolean).length;
            }
        }
        return totalScore;
    }
    
    // 達成チェックとバッジ付与
    checkAchievements() {
        const today = new Date().toISOString().split('T')[0];
        const todayHabits = this.completedHabits[today];
        const completedCount = Array.isArray(todayHabits) ? todayHabits.length : 
                             (typeof todayHabits === 'object' ? Object.values(todayHabits).filter(Boolean).length : 0);
        
        // 完璧な日（全習慣完了）
        if (completedCount === this.habits.length) {
            this.achievements.perfectDays++;
            this.giveBadge('perfect_day', '完璧な日！', 'すべての習慣を完了しました！');
        }
        
        // 総日数更新
        if (completedCount > 0) {
            this.achievements.totalDays++;
        }
        
        // ストリーク更新
        this.updateStreaks();
        
        // バッジチェック
        this.checkBadges();
        
        this.saveAchievements();
        this.showAchievementNotification();
    }
    
    updateStreaks() {
        let currentStreak = 0;
        const today = new Date();
        
        for (let i = 0; i < 365; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() - i);
            const dateStr = checkDate.toISOString().split('T')[0];
            const dayHabits = this.completedHabits[dateStr];
            
            if (dayHabits && (Array.isArray(dayHabits) ? dayHabits.length > 0 : Object.values(dayHabits).some(Boolean))) {
                currentStreak++;
            } else {
                break;
            }
        }
        
        this.achievements.currentStreak = currentStreak;
        if (currentStreak > this.achievements.bestStreak) {
            this.achievements.bestStreak = currentStreak;
        }
    }
    
    checkBadges() {
        const badges = this.achievements.badges;
        
        // 初回完了
        if (this.achievements.totalDays === 1 && !badges.includes('first_completion')) {
            this.giveBadge('first_completion', '初回完了！', '初めて習慣を完了しました！');
        }
        
        // 7日連続
        if (this.achievements.currentStreak >= 7 && !badges.includes('week_streak')) {
            this.giveBadge('week_streak', '1週間達成！', '7日連続で習慣を続けました！');
        }
        
        // 30日連続
        if (this.achievements.currentStreak >= 30 && !badges.includes('month_streak')) {
            this.giveBadge('month_streak', '1ヶ月達成！', '30日連続で習慣を続けました！');
        }
        
        // 100日達成
        if (this.achievements.totalDays >= 100 && !badges.includes('century')) {
            this.giveBadge('century', '100日達成！', '100日間習慣を続けました！');
        }
        
        // 完璧な週
        if (this.achievements.perfectDays >= 7 && !badges.includes('perfect_week')) {
            this.giveBadge('perfect_week', '完璧な週！', '7日間すべて完璧に完了しました！');
        }
    }
    
    giveBadge(badgeId, title, description) {
        if (!this.achievements.badges.includes(badgeId)) {
            this.achievements.badges.push(badgeId);
            this.showBadgeNotification(title, description);
        }
    }
    
    showAchievementNotification() {
        // 達成通知を表示（簡単なアラート）
        if (this.achievements.currentStreak > 0 && this.achievements.currentStreak % 7 === 0) {
            console.log(`🎉 ${this.achievements.currentStreak}日連続達成！`);
        }
    }
    
    showBadgeNotification(title, description) {
        // バッジ通知を表示
        console.log(`🏆 バッジ獲得: ${title} - ${description}`);
        
        // 簡単な通知表示
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">🏆</div>
                <div class="achievement-text">
                    <div class="achievement-title">${title}</div>
                    <div class="achievement-description">${description}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // 3秒後に削除
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// アプリの初期化
document.addEventListener('DOMContentLoaded', () => {
    const app = new HabitTracker();
    
    // データ更新イベントは無効化（データ上書きを防ぐため）
    console.log('データ更新イベントは無効化されています');
});

// サービスワーカーの登録（PWA対応）
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}