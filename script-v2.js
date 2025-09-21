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
    { id: 'vitamin_b', name: 'ビタミンB', shortName: 'ﾋﾞﾀﾐﾝB', category: '栄養', priority: 3, reason: 'エネルギー代謝と神経機能に重要。', type: 'supplement' },
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
        this.calendarMonth = new Date(2025, 8, 1); // 2025年9月
        this.init();
    }

    init() {
        this.renderCalendar();
        this.setupEventListeners();
        
    }

    // 現在の週を取得（月曜日開始）
    getCurrentWeek() {
        // 2025年9月20日（金曜日）を今日として設定
        const today = new Date(2025, 8, 20); // 月は0から始まるので8=9月
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
            const isCompleted = this.isHabitCompleted(habit.id, date);
            if (isCompleted) {
                habitCell.classList.add('completed');
            }

            // クリックイベント
            habitCell.addEventListener('click', (e) => {
                console.log('Cell clicked:', habit.id, date.toISOString().split('T')[0]);
                e.preventDefault();
                e.stopPropagation();
                this.toggleHabit(habit.id, date, habitCell);
            });

            // タッチイベントも追加（モバイル対応）
            habitCell.addEventListener('touchstart', (e) => {
                console.log('Cell touched:', habit.id, date.toISOString().split('T')[0]);
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
    isHabitCompleted(habitId, date) {
        const dateStr = date.toISOString().split('T')[0];
        return this.completedHabits[dateStr]?.includes(habitId) || false;
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
            if (this.completedHabits[dateStr].includes(habitId)) {
                total++;
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
        // 今日（9月20日）の日付オブジェクトを作成
        const today = new Date(2025, 8, 20);
        const todayStr = today.toISOString().split('T')[0];
        
        // 今日にチェックがあれば1、なければ0
        if (this.completedHabits[todayStr] && this.completedHabits[todayStr].includes(habitId)) {
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
        const isCompleted = this.isHabitCompleted(habitId, date);

        if (isCompleted) {
            // 完了を解除
            if (this.completedHabits[dateStr]) {
                this.completedHabits[dateStr] = this.completedHabits[dateStr].filter(id => id !== habitId);
                if (this.completedHabits[dateStr].length === 0) {
                    delete this.completedHabits[dateStr];
                }
            }
            cell.classList.remove('completed');
        } else {
            // 完了に設定
            if (!this.completedHabits[dateStr]) {
                this.completedHabits[dateStr] = [];
            }
            this.completedHabits[dateStr].push(habitId);
            cell.classList.add('completed');
        }

        this.saveCompletedHabits();
        
        // 合計を更新
        this.updateHabitTotals();
        
        // 合計も更新
        this.updateTotalAll();
        
        // 日計も更新
        this.updateDailyTotals();
    }

    // 今日かどうかをチェック
    isToday(date) {
        // 2025年9月20日を今日として設定
        const today = new Date(2025, 8, 20);
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
            if (this.completedHabits[date]?.includes(habitId)) {
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

    // 過去最高連続日数を取得
    getBestStreak(habitId) {
        const dates = Object.keys(this.completedHabits).sort();
        let maxStreak = 0;
        let currentStreak = 0;
        
        for (const date of dates) {
            if (this.completedHabits[date]?.includes(habitId)) {
                currentStreak++;
                maxStreak = Math.max(maxStreak, currentStreak);
            } else {
                currentStreak = 0;
            }
        }
        
        return maxStreak;
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
                        <th>最高連続</th>
                    </tr>
                </thead>
                <tbody>
        `;

        this.habits.forEach((habit, index) => {
            const stats = this.getHabitStats(habit.id);
            const bestStreak = this.getBestStreak(habit.id);
            
            html += `
                <tr>
                    <td class="habit-number">${index + 1}</td>
                    <td class="habit-name">${habit.shortName}</td>
                    <td class="stat-value">${stats.monthlyRate}%</td>
                    <td class="stat-value">${stats.currentStreak}日</td>
                    <td class="best-streak-value">${bestStreak}日</td>
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
        const today = new Date(2025, 8, 20); // 2025年9月20日
        
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
            const monsterType = this.getMonsterType(totalCount);
            const bestStreak = this.getBestStreak(habit.id);
            
            const monsterCard = document.createElement('div');
            monsterCard.className = 'monster-card';
            
            monsterCard.innerHTML = `
                <div class="monster-image" style="border-color: ${monsterType.color}; background: ${monsterType.color}20;">
                    ${monsterType.emoji}
                </div>
                <div class="monster-name">${habit.shortName}</div>
                <div class="monster-description">${monsterType.name}</div>
                <div class="monster-stats">
                    <span>合計: ${totalCount}</span>
                    <span>最高: ${bestStreak}日</span>
                </div>
            `;
            
            monsterGrid.appendChild(monsterCard);
        });
    }

    // 合計値に基づいてモンスタータイプを取得
    getMonsterType(totalCount) {
        if (totalCount === 0) return monsterTypes[0];
        if (totalCount <= 1) return monsterTypes[1];
        if (totalCount <= 2) return monsterTypes[2];
        if (totalCount <= 3) return monsterTypes[3];
        if (totalCount <= 4) return monsterTypes[4];
        if (totalCount <= 5) return monsterTypes[5];
        if (totalCount <= 6) return monsterTypes[6];
        if (totalCount <= 7) return monsterTypes[7];
        if (totalCount <= 8) return monsterTypes[8];
        if (totalCount <= 9) return monsterTypes[9];
        return monsterTypes[10];
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

    // イベントリスナーの設定
    setupEventListeners() {
        // 週移動ボタン
        document.getElementById('prevWeek').addEventListener('click', () => this.moveToPrevWeek());
        document.getElementById('nextWeek').addEventListener('click', () => this.moveToNextWeek());
        document.getElementById('goToToday').addEventListener('click', () => this.goToToday());
        
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
    }

    // ビューの切り替え
    showWeekView() {
        document.getElementById('weekView').style.display = 'block';
        document.getElementById('statsView').style.display = 'none';
    }

    showHomeView() {
        this.showWeekView();
        this.setActiveNav('homeBtn');
    }

    showReportView() {
        document.getElementById('weekView').style.display = 'none';
        document.getElementById('statsView').style.display = 'block';
        document.getElementById('monsterView').style.display = 'none';
        this.renderTotalChart();
        this.renderReportTable();
        this.setActiveNav('reportBtn');
    }

    showMonsterView() {
        document.getElementById('weekView').style.display = 'none';
        document.getElementById('statsView').style.display = 'none';
        document.getElementById('monsterView').style.display = 'block';
        this.renderMonsters();
        this.setActiveNav('monsterBtn');
    }


    showSettingsView() {
        // 設定ビューの実装（将来の拡張）
        console.log('設定ビュー');
        this.setActiveNav('settingsBtn');
    }


    // アクティブナビの設定
    setActiveNav(activeNavId) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(activeNavId).classList.add('active');
    }

    // ローカルストレージから完了した習慣を読み込み
    loadCompletedHabits() {
        // 開発用：データをクリアして初期化（コメントアウト）
        // localStorage.removeItem('habitTrackerData');
        const saved = localStorage.getItem('habitTrackerData');
        return saved ? JSON.parse(saved) : {};
    }

    // ローカルストレージに完了した習慣を保存
    saveCompletedHabits() {
        localStorage.setItem('habitTrackerData', JSON.stringify(this.completedHabits));
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
        const today = new Date(2025, 8, 20); // 固定の今日の日付
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
}

// アプリの初期化
document.addEventListener('DOMContentLoaded', () => {
    new HabitTracker();
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