// 習慣データの定義
const habitsData = [
    // 習慣系
    { id: 'early_bed', name: '早寝早起き', shortName: '早寝早起', category: '睡眠・生活リズム', priority: 5, reason: '全習慣の土台。心身・集中・代謝に直結。', type: 'habit' },
    { id: 'journal', name: 'ジャーナル', shortName: 'ｼﾞｬｰﾅﾙ', category: '精神・自己認識', priority: 4, reason: '習慣化や自己整理に役立つ。方向性を見失わないために重要。', type: 'habit' },
    { id: 'study', name: '勉強', shortName: '勉強', category: '知的成長・キャリア', priority: 5, reason: '外部成果（資格）と内的成長の両方に直結。人生の軸。', type: 'habit' },
    { id: 'exercise', name: '筋トレ', shortName: '筋トレ', category: '健康・体力', priority: 5, reason: '長期的な体力・メンタルの基盤。将来への投資。', type: 'habit' },
    { id: 'reading', name: '読書', shortName: '読書', category: '知的成長', priority: 4, reason: '思考の深さ・幅に寄与。ただし「勉強」優先。', type: 'habit' },
    { id: 'todo_list', name: 'To DO List', shortName: 'To DO List', category: '生産性・管理', priority: 4, reason: 'タスク管理と優先順位付け。効率的な時間活用。', type: 'habit' },
    
    // No系
    { id: 'no_phone_bed', name: 'No寝る前スマホ', shortName: 'No寝ｽﾏﾎ', category: '睡眠の質', priority: 5, reason: '睡眠の質を守る最重要因子。早寝早起きと一体。', type: 'no' },
    { id: 'no_alcohol', name: 'No酒', shortName: 'No酒', category: '健康', priority: 5, reason: '睡眠・肝臓・集中力に広範な影響。長期的リスクが大きい。', type: 'no' },
    { id: 'no_overeating', name: 'No暴食', shortName: 'No暴食', category: '健康', priority: 4, reason: '健康と体重管理に影響。', type: 'no' },
    
    // サプリ・食事系
    { id: 'protein', name: 'プロテイン', shortName: 'ﾌﾟﾛﾃｲﾝ', category: '栄養', priority: 4, reason: '筋トレ効果を高める。運動とセットで効力大。', type: 'supplement' },
    { id: 'probiotics', name: '整腸剤', shortName: '整腸剤', category: '栄養・消化', priority: 2, reason: '腸内環境改善の補助。基本は食事で十分。', type: 'supplement' },
    { id: 'vitamin_b', name: 'ビタミンD', shortName: 'ﾋﾞﾀﾐﾝD', category: '栄養', priority: 3, reason: 'エネルギー代謝と神経機能に重要。', type: 'supplement' },
    { id: 'creatine', name: 'クレアチン', shortName: 'ｸﾚｱﾁﾝ', category: '栄養', priority: 3, reason: '筋力と筋量の向上に効果的。', type: 'supplement' },
    { id: 'ashwagandha_magnesium', name: 'アシュワガンダ・マグネシウム', shortName: 'ｱｼｭﾜｶﾞﾝﾀﾞ・ﾏｸﾞﾈｼｳﾑ', category: '栄養', priority: 2, reason: 'ストレス軽減と睡眠の質向上。筋肉のリラクゼーション。', type: 'supplement' },
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
    0: { name: '眠れるエーテル卵', description: 'まだ力を秘めている', emoji: '🥚✨', color: '#666' },
    1: { name: '薄翼のベビードラゴン', description: '目覚めたての炎が灯る', emoji: '🐣🐲', color: '#4A90E2' },
    2: { name: '風駆けるルーキーペガサス', description: '空へ踏み出す小さな一歩', emoji: '🪽🦄', color: '#28a745' },
    3: { name: '鋼翼のガーディアングリフォン', description: '継続の刃が鍛えられる', emoji: '🛡️🦅', color: '#ffd700' },
    4: { name: '紅蓮のチャレンジドラグーン', description: '炎が大地を照らし始める', emoji: '🔥🐉', color: '#ff6b6b' },
    5: { name: '蒼雷のスカイランサー', description: '空を切り裂く槍の閃光', emoji: '⚡🐲', color: '#9c27b0' },
    6: { name: '黎明のオーロラヒポグリフ', description: '朝焼けのオーラをまとう', emoji: '🌅🦅', color: '#ff9800' },
    7: { name: '星河のアークドラゴン', description: '星屑が軌跡を描く', emoji: '🌌🐉', color: '#e91e63' },
    8: { name: '神威のセラフィックペガサス', description: '聖なる光が降り注ぐ', emoji: '👑🪽', color: '#00bcd4' },
    9: { name: '時空を裂くクロノドラゴン', description: '時間すら味方にする', emoji: '⏳🐲', color: '#795548' },
    10: { name: '創世のエターナルワイバーン', description: '神話を超える究極体', emoji: '🌠🐉', color: '#607d8b' }
};

const combinedMonsterStages = [
    {
        min: 0,
        title: '総合シンボル:黎明翼',
        name: '共鳴する初光のドラゴネット',
        description: 'すべての習慣が目を覚まし始めた。',
        emoji: '🌄🐲',
        color: '#74b9ff',
        glow: 'rgba(116, 185, 255, 0.45)',
        gradient: 'rgba(116, 185, 255, 0.18)',
        className: 'stage-dawn'
    },
    {
        min: 12,
        title: '総合シンボル:蒼天蹄',
        name: '空駆けるシナジーペガサス',
        description: '仲間の翼が風を切り、速度が増す。',
        emoji: '💨🦄',
        color: '#55efc4',
        glow: 'rgba(85, 239, 196, 0.45)',
        gradient: 'rgba(85, 239, 196, 0.16)',
        className: 'stage-aurora'
    },
    {
        min: 28,
        title: '総合シンボル:紅蓮槍',
        name: '連携のドラゴンランサー',
        description: '炎の槍が共鳴し合い、勢いが加速する。',
        emoji: '🔥🐉⚔️',
        color: '#ff7675',
        glow: 'rgba(255, 118, 117, 0.5)',
        gradient: 'rgba(255, 118, 117, 0.18)',
        className: 'stage-blaze'
    },
    {
        min: 48,
        title: '総合シンボル:星辰牙',
        name: '星光守護のキマイラ',
        description: '全習慣の力が星座のように輝き守る。',
        emoji: '✨🗡️🦁',
        color: '#ffeaa7',
        glow: 'rgba(255, 234, 167, 0.55)',
        gradient: 'rgba(255, 234, 167, 0.22)',
        className: 'stage-stellar'
    },
    {
        min: 72,
        title: '総合シンボル:創世竜',
        name: '時空統べるオメガドラゴン',
        description: '神話の頂点、全習慣が一つに溶け合う。',
        emoji: '🌌🐉✨',
        color: '#a29bfe',
        glow: 'rgba(162, 155, 254, 0.55)',
        gradient: 'rgba(162, 155, 254, 0.24)',
        className: 'stage-cosmos'
    }
];

const HEALTH_MONSTER_DEFINITIONS = [
    {
        key: 'healthKeeping',
        displayName: '🛡️ヘルスキープ',
        title: '守護のヘルスゴーレム',
        description: (count) => count > 0
            ? `ヘルスキーピングを${count}日記録し、体調の盾が輝きを増している。`
            : 'まだ体調管理の盾は眠ったまま。'
    },
    {
        key: 'headMassage',
        displayName: '💆ヘッドマッサージ',
        title: '癒しのヘッドスピリット',
        description: (count) => count > 0
            ? `リラックスタイムを${count}日積み重ね、柔らかな風が吹き抜ける。`
            : '頭皮ケアの精霊は静かに目覚めを待っている。'
    },
    {
        key: 'dentalCleaning',
        displayName: '🦷デンタルケア',
        title: '煌きのデンタルガーディアン',
        description: (count) => count > 0
            ? `口元を磨いた日が${count}日、光の粒子がきらめきを放つ。`
            : 'まだ光は弱く、磨きの力を欲している。'
    },
    {
        key: 'sauna',
        displayName: '♨️サウナタイム',
        title: '蒸気のサウナフェニックス',
        description: (count) => count > 0
            ? `温かな蒸気を${count}日浴び、羽ばたきに熱が宿った。`
            : 'フェニックスは静かな湯けむりの中で力を温めている。'
    },
    {
        key: 'catcafe',
        displayName: '🐾猫カフェ',
        title: '星詠みのキャットスピリット',
        description: (count) => count > 0
            ? `猫たちと過ごした日が${count}日、柔らかな癒しが星を揺らす。`
            : 'まだ猫たちは遠くで丸くなっている。'
    }
];

const BADGE_GIL_VALUES = {
    '初回達成': 50,
    'first_completion': 50,
    '3日連続': 120,
    '7日連続': 250,
    'week_streak': 250,
    '14日連続': 400,
    '30日連続': 650,
    'month_streak': 650,
    '100日連続': 900,
    'century': 900,
    '完璧10日': 320,
    '完璧50日': 520,
    '完璧100日': 820,
    'perfect_day': 180,
    'perfect_week': 400,
    'スコア50': 80,
    'score_50': 80,
    'スコア100': 150,
    'score_100': 150,
    'スコア250': 260,
    'score_250': 260,
    'スコア500': 420,
    'score_500': 420,
    'スコア750': 620,
    'score_750': 620,
    'スコア1000': 900,
    'score_1000': 900,
    '10個チェック連続': 500,
    '5個チェック連続': 420,
    '3個チェック連続': 360,
    '1個チェック連続': 280,
    '初心者': 60,
    '10回達成': 150,
    '見習い': 260,
    '100回達成': 360,
    '修行者': 480,
    '熟練者': 650,
    'エキスパート': 820,
    'マスター': 1100,
    '10回連続': 220,
    '20回連続': 360,
    '50回連続': 540,
    '100回連続': 800,
    'ダブルアップ': 120,
    'サーカス': 200,
    'アクター': 280,
    'アーティスト': 360,
    'ラッキー': 480,
    '月曜日マスター': 70,
    '金曜日キング': 90,
    '週末戦士': 130,
    '平日戦士': 110,
    '祝日マスター': 160,
    'health_guardian_lv1': 120,
    'health_guardian_lv2': 260,
    'health_guardian_lv3': 420,
    'head_massage_maestro_lv1': 120,
    'head_massage_maestro_lv2': 260,
    'head_massage_maestro_lv3': 420,
    'dental_cleaning_conqueror_lv1': 120,
    'dental_cleaning_conqueror_lv2': 260,
    'dental_cleaning_conqueror_lv3': 420,
    'sauna_sage_lv1': 120,
    'sauna_sage_lv2': 260,
    'sauna_sage_lv3': 420,
    'catcafe_starlight_lv1': 120,
    'catcafe_starlight_lv2': 260,
    'catcafe_starlight_lv3': 420,
    'friend_party_fellow_lv1': 120,
    'friend_party_fellow_lv2': 260,
    'friend_party_fellow_lv3': 420
};

const BADGE_LIBRARY = [
    {
        key: 'streak',
        title: '🔥 連続達成バッジ',
        icon: '🔥',
        badges: [
            { id: '初回達成', aliases: ['first_completion'], icon: '🥉', name: '初回達成', condition: '完璧な日を1日達成', gil: 50 },
            { id: '3日連続', icon: '🥈', name: '3日連続', condition: '完璧な日を3日連続達成', gil: 120 },
            { id: '7日連続', aliases: ['week_streak'], icon: '🥇', name: '7日連続', condition: '完璧な日を7日連続達成', gil: 250 },
            { id: '14日連続', icon: '💎', name: '14日連続', condition: '完璧な日を14日連続達成', gil: 400 },
            { id: '30日連続', aliases: ['month_streak'], icon: '👑', name: '30日連続', condition: '完璧な日を30日連続達成', gil: 650 }
        ]
    },
    {
        key: 'score',
        title: '⭐ スコアバッジ',
        icon: '⭐',
        badges: [
            { id: 'スコア50', aliases: ['score_50'], icon: '🎯', name: 'スコア50', condition: '総スコア50達成', gil: 80 },
            { id: 'スコア100', aliases: ['score_100'], icon: '🚀', name: 'スコア100', condition: '総スコア100達成', gil: 150 },
            { id: 'スコア250', aliases: ['score_250'], icon: '🌟', name: 'スコア250', condition: '総スコア250達成', gil: 260 },
            { id: 'スコア500', aliases: ['score_500'], icon: '💫', name: 'スコア500', condition: '総スコア500達成', gil: 420 },
            { id: 'スコア750', aliases: ['score_750'], icon: '⚡', name: 'スコア750', condition: '総スコア750達成', gil: 620 },
            { id: 'スコア1000', aliases: ['score_1000'], icon: '🔥', name: 'スコア1000', condition: '総スコア1000達成', gil: 900 }
        ]
    },
    {
        key: 'combo',
        title: '📊 連続バッジ',
        icon: '📊',
        badges: [
            { id: '10個チェック連続', icon: '🔥', name: '10個チェック連続', condition: '10個チェックが付いた日が10日連続', gil: 500 },
            { id: '5個チェック連続', icon: '⚡', name: '5個チェック連続', condition: '5個チェックが付いた日が20日連続', gil: 420 },
            { id: '3個チェック連続', icon: '💫', name: '3個チェック連続', condition: '3個チェックが付いた日が30日連続', gil: 360 },
            { id: '1個チェック連続', icon: '🌟', name: '1個チェック連続', condition: '1個チェックが付いた日が50日連続', gil: 280 }
        ]
    },
    {
        key: 'health',
        title: '💖 ヘルスケアバッジ',
        icon: '💖',
        badges: [
            { id: 'health_guardian_lv1', icon: '🛡️', name: 'A ヘルス守護者・初級', condition: 'ヘルスキーピングを3回記録', gil: 120 },
            { id: 'health_guardian_lv2', icon: '🛡️', name: 'A ヘルス守護者・中級', condition: 'ヘルスキーピングを7回記録', gil: 260 },
            { id: 'health_guardian_lv3', icon: '🛡️', name: 'A ヘルス守護者・達人', condition: 'ヘルスキーピングを15回記録', gil: 420 },
            { id: 'head_massage_maestro_lv1', icon: '💆', name: 'B ヘッドマイスター・初級', condition: 'ヘッドマッサージを3回記録', gil: 120 },
            { id: 'head_massage_maestro_lv2', icon: '💆', name: 'B ヘッドマイスター・中級', condition: 'ヘッドマッサージを7回記録', gil: 260 },
            { id: 'head_massage_maestro_lv3', icon: '💆', name: 'B ヘッドマイスター・達人', condition: 'ヘッドマッサージを15回記録', gil: 420 },
            { id: 'dental_cleaning_conqueror_lv1', icon: '🦷', name: 'C デンタルチャンピオン・初級', condition: '歯科クリーニングを3回記録', gil: 120 },
            { id: 'dental_cleaning_conqueror_lv2', icon: '🦷', name: 'C デンタルチャンピオン・中級', condition: '歯科クリーニングを7回記録', gil: 260 },
            { id: 'dental_cleaning_conqueror_lv3', icon: '🦷', name: 'C デンタルチャンピオン・達人', condition: '歯科クリーニングを15回記録', gil: 420 },
            { id: 'sauna_sage_lv1', icon: '🧖', name: 'D サウナ賢者・初級', condition: 'サウナを3回記録', gil: 120 },
            { id: 'sauna_sage_lv2', icon: '🧖', name: 'D サウナ賢者・中級', condition: 'サウナを7回記録', gil: 260 },
            { id: 'sauna_sage_lv3', icon: '🧖', name: 'D サウナ賢者・達人', condition: 'サウナを15回記録', gil: 420 },
            { id: 'catcafe_starlight_lv1', icon: '🐈', name: 'E キャットギルド・初級', condition: '猫カフェを3回記録', gil: 120 },
            { id: 'catcafe_starlight_lv2', icon: '🐈', name: 'E キャットギルド・中級', condition: '猫カフェを7回記録', gil: 260 },
            { id: 'catcafe_starlight_lv3', icon: '🐈', name: 'E キャットギルド・達人', condition: '猫カフェを15回記録', gil: 420 },
            { id: 'friend_party_fellow_lv1', icon: '🤝', name: 'F 懇親会ギルド・初級', condition: '懇親会を3回記録', gil: 120 },
            { id: 'friend_party_fellow_lv2', icon: '🤝', name: 'F 懇親会ギルド・中級', condition: '懇親会を7回記録', gil: 260 },
            { id: 'friend_party_fellow_lv3', icon: '🤝', name: 'F 懇親会ギルド・達人', condition: '懇親会を15回記録', gil: 420 }
        ]
    },
    {
        key: 'habit',
        title: '🏆 習慣達成バッジ',
        icon: '🏆',
        badges: [
            { id: '初心者', icon: '🌱', name: '初心者', condition: '初回習慣を達成', gil: 60 },
            { id: '10回達成', icon: '🔥', name: '10回達成', condition: '習慣を10回達成', gil: 150 },
            { id: '見習い', icon: '🌿', name: '見習い', condition: '習慣を50回達成', gil: 260 },
            { id: '100回達成', icon: '💪', name: '100回達成', condition: '習慣を100回達成', gil: 360 },
            { id: '修行者', icon: '🌳', name: '修行者', condition: '習慣を150回達成', gil: 480 },
            { id: '熟練者', icon: '🌲', name: '熟練者', condition: '習慣を300回達成', gil: 650 },
            { id: 'エキスパート', icon: '⭐', name: 'エキスパート', condition: '習慣を500回達成', gil: 820 },
            { id: 'マスター', icon: '🌟', name: 'マスター', condition: '習慣を1000回達成', gil: 1100 },
            { id: '10回連続', icon: '🎯', name: '10回連続', condition: '習慣を10回連続達成', gil: 220 },
            { id: '20回連続', icon: '🎲', name: '20回連続', condition: '習慣を20回連続達成', gil: 360 },
            { id: '50回連続', icon: '🃏', name: '50回連続', condition: '習慣を50回連続達成', gil: 540 },
            { id: '100回連続', icon: '🎰', name: '100回連続', condition: '習慣を100回連続達成', gil: 800 }
        ]
    },
    {
        key: 'random',
        title: '🎲 ランダムバッジ',
        icon: '🎲',
        badges: [
            { id: 'ダブルアップ', icon: '🎲', name: 'ダブルアップ', condition: '1日に2個以上達成', gil: 120 },
            { id: 'サーカス', icon: '🎪', name: 'サーカス', condition: '1日に3個以上達成', gil: 200 },
            { id: 'アクター', icon: '🎭', name: 'アクター', condition: '1日に4個以上達成', gil: 280 },
            { id: 'アーティスト', icon: '🎨', name: 'アーティスト', condition: '1日に5個以上達成', gil: 360 },
            { id: 'ラッキー', icon: '🍀', name: 'ラッキー', condition: '1日に6個以上達成', gil: 480 }
        ]
    },
    {
        key: 'calendar',
        title: '📅 日付バッジ',
        icon: '📅',
        badges: [
            { id: '月曜日マスター', icon: '🌙', name: '月曜日マスター', condition: '月曜日に習慣を達成', gil: 70 },
            { id: '金曜日キング', icon: '💼', name: '金曜日キング', condition: '金曜日に習慣を達成', gil: 90 },
            { id: '週末戦士', icon: '🗓️', name: '週末戦士', condition: '土日に習慣を達成', gil: 130 },
            { id: '平日戦士', icon: '📊', name: '平日戦士', condition: '平日に習慣を達成', gil: 110 },
            { id: '祝日マスター', icon: '📈', name: '祝日マスター', condition: '祝日に習慣を達成', gil: 160 }
        ]
    }
];

function isBadgeUnlocked(earnedSet, badge) {
    if (earnedSet.has(badge.id)) {
        return true;
    }
    if (Array.isArray(badge.aliases)) {
        return badge.aliases.some(alias => earnedSet.has(alias));
    }
    return false;
}

const JAPANESE_HOLIDAY_MD = new Set([
    '01-01', // 元日
    '01-13', // 成人の日 (2025)
    '02-11', // 建国記念の日
    '02-23', // 天皇誕生日
    '03-20', // 春分の日 (2025)
    '04-29', // 昭和の日
    '05-03', // 憲法記念日
    '05-04', // みどりの日
    '05-05', // こどもの日
    '07-21', // 海の日 (2025)
    '08-11', // 山の日
    '09-15', // 敬老の日 (2025)
    '09-23', // 秋分の日 (2025)
    '10-13', // スポーツの日 (2025)
    '11-03', // 文化の日
    '11-23', // 勤労感謝の日
    '12-23'  // 天皇誕生日 (振替用に保持)
]);

function isJapaneseHoliday(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return JAPANESE_HOLIDAY_MD.has(`${month}-${day}`);
}

function getBadgeGilValue(badgeKey) {
    if (!badgeKey) return 0;
    return BADGE_GIL_VALUES[badgeKey] || 0;
}

// アプリの状態管理
class HabitTracker {
    constructor() {
        this.habits = habitsData;
        this.completedHabits = this.loadCompletedHabits();
        this.currentWeek = this.getCurrentWeek();
        this.calendarMonth = new Date(); // 現在の月
        // レポート機能は削除されました
        this.healthData = this.loadHealthData(); // ヘルスキーピングとヘッドマッサージのデータ

        // モチベーション機能
        this.achievements = this.loadAchievements();
        this.streaks = this.calculateStreaks();
        this.totalScore = this.calculateTotalScore();
        this.totalChart = null;

        // Firebase認証
        this.currentUser = null;
        this.setupFirebaseAuth();

        this.init();
    }

    init() {
        console.log('🔐 アプリ初期化開始');
        this.renderCalendar();
        this.setupEventListeners();
        this.setupDataManagement();
        this.setupMonthlyCalendarEvents();
        // 同期機能を完全に無効化（データ消失を防ぐため）
        console.log('同期機能は完全に無効化されています');
        
        // 初期化時に認証UIを更新
        this.updateAuthUI();
        console.log('🔐 アプリ初期化完了');
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
        
        // デバッグ用のデータクリア機能を追加
        this.addDebugFunctions();
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

    // デバッグ用の機能を追加
    // Firebase認証の設定
    // Firebase Console設定確認事項：
    // 1. Authentication → Settings → Authorized domains に 'toru830.github.io' が追加されているか
    // 2. Authentication → Sign-in method で Google が有効になっているか
    // 3. Firestore Database → Rules で認証されたユーザーの読み書きが許可されているか
    setupFirebaseAuth() {
        console.log('🔐 Firebase認証設定開始...');
        console.log('🔐 利用可能なFirebase関数:', {
            onAuthStateChanged: typeof window.firebaseOnAuthStateChanged,
            getRedirectResult: typeof window.firebaseGetRedirectResult,
            auth: window.firebaseAuth
        });
        
        if (typeof window.firebaseOnAuthStateChanged === 'function' && window.firebaseAuth) {
            console.log('🔐 認証状態監視を開始...');
            window.firebaseOnAuthStateChanged(window.firebaseAuth, (user) => {
                console.log('🔐 認証状態変更:', user ? 'ログイン' : 'ログアウト');
                this.currentUser = user;
                this.updateAuthUI();
                
                if (user) {
                    console.log('🔐 ユーザーがログインしました:', {
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    });
                    this.loadUserData();
                } else {
                    console.log('🔐 ユーザーがログアウトしました');
                }
            });
            
            // リダイレクト結果の処理
            if (typeof window.firebaseGetRedirectResult === 'function') {
                console.log('🔐 リダイレクト結果を確認中...');
                window.firebaseGetRedirectResult(window.firebaseAuth)
                    .then((result) => {
                        console.log('🔐 リダイレクト結果詳細:', {
                            result: result,
                            hasResult: !!result,
                            hasUser: !!(result && result.user),
                            user: result ? result.user : null,
                            credential: result ? result.credential : null,
                            operationType: result ? result.operationType : null
                        });
                        
                        if (result && result.user) {
                            console.log('🔐 リダイレクトログイン成功:', result.user);
                            console.log('🔐 ユーザー情報:', {
                                uid: result.user.uid,
                                email: result.user.email,
                                displayName: result.user.displayName,
                                photoURL: result.user.photoURL
                            });
                            // リダイレクト後のデータ読み込み
                            this.loadUserData();
                        } else {
                            console.log('🔐 リダイレクト結果なし（初回アクセスまたはログインしていない状態）');
                        }
                    })
                    .catch((error) => {
                        console.error('🔐 リダイレクトログインエラー詳細:', {
                            code: error.code,
                            message: error.message,
                            stack: error.stack,
                            name: error.name
                        });
                    });
            } else {
                console.warn('🔐 getRedirectResult関数が利用できません');
            }
        } else {
            console.error('🔐 Firebase認証が利用できません:', {
                onAuthStateChanged: typeof window.firebaseOnAuthStateChanged,
                auth: window.firebaseAuth
            });
        }
    }

    // 認証UIの更新
    updateAuthUI() {
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        
        if (this.currentUser) {
            // ログイン状態：ログインボタンを非表示、ログアウトボタンを表示
            if (loginBtn) loginBtn.style.display = 'none';
            if (logoutBtn) {
                logoutBtn.style.display = 'inline-block';
                // ユーザー名を表示
                logoutBtn.textContent = `ログアウト (${this.currentUser.displayName || this.currentUser.email})`;
            }
        } else {
            // ログアウト状態：ログインボタンを表示、ログアウトボタンを非表示
            if (loginBtn) {
                loginBtn.style.display = 'inline-block';
                loginBtn.textContent = 'Googleでログイン（リダイレクト）';
            }
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
    }

    // Googleログイン（リダイレクト方式）
    async signInWithGoogle() {
        try {
            console.log('🔐 signInWithGoogle関数が呼び出されました');
            console.log('🔐 Firebase認証オブジェクトの状態:', {
                auth: window.firebaseAuth,
                provider: window.firebaseProvider,
                signInRedirect: typeof window.firebaseSignInRedirect
            });
            
            if (typeof window.firebaseSignInRedirect === 'function' && window.firebaseAuth && window.firebaseProvider) {
                console.log('🔐 リダイレクト開始...');
                console.log('🔐 認証オブジェクト:', window.firebaseAuth);
                console.log('🔐 プロバイダーオブジェクト:', window.firebaseProvider);
                
                // リダイレクト先のURLを設定
                const redirectUrl = window.location.origin + window.location.pathname;
                console.log('🔐 リダイレクト先URL:', redirectUrl);
                
                await window.firebaseSignInRedirect(window.firebaseAuth, window.firebaseProvider);
                console.log('🔐 リダイレクト実行完了（ページがリダイレクトされます）');
                // リダイレクトの場合は結果は別途処理される
                return null;
            } else {
                console.error('🔐 Firebase認証が利用できません');
                console.error('🔐 利用可能な関数:', Object.keys(window).filter(key => key.includes('firebase')));
                alert('Firebase認証が利用できません。ページを再読み込みしてください。');
            }
        } catch (error) {
            console.error('🔐 ログインエラー詳細:', {
                code: error.code,
                message: error.message,
                stack: error.stack,
                name: error.name
            });
            alert(`ログインに失敗しました: ${error.code} - ${error.message}`);
        }
    }

    // メール/パスワードでサインアップ
    async signUpWithEmail(email, password) {
        try {
            console.log('🔐 メールでサインアップ開始:', email);
            const userCredential = await window.firebaseCreateUserWithEmailAndPassword(window.firebaseAuth, email, password);
            console.log('🔐 サインアップ成功:', userCredential.user);
            alert('サインアップが完了しました！');
            return userCredential.user;
        } catch (error) {
            console.error('🔐 サインアップエラー:', {
                code: error.code,
                message: error.message,
                stack: error.stack
            });
            alert('サインアップに失敗しました: ' + error.message);
            throw error;
        }
    }

    // メール/パスワードでログイン
    async loginWithEmail(email, password) {
        try {
            console.log('🔐 メールでログイン開始:', email);
            const userCredential = await window.firebaseSignInWithEmailAndPassword(window.firebaseAuth, email, password);
            console.log('🔐 ログイン成功:', userCredential.user);
            alert('ログインが完了しました！');
            return userCredential.user;
        } catch (error) {
            console.error('🔐 ログインエラー:', {
                code: error.code,
                message: error.message,
                stack: error.stack
            });
            alert('ログインに失敗しました: ' + error.message);
            throw error;
        }
    }

    // ログアウト
    async signOut() {
        try {
            if (typeof window.firebaseSignOut === 'function') {
                await window.firebaseSignOut(window.firebaseAuth);
                console.log('ログアウト成功');
            } else {
                console.error('Firebase認証が利用できません');
            }
        } catch (error) {
            console.error('ログアウトエラー:', error);
        }
    }

    // ユーザーデータの保存
    async saveUserData() {
        if (!this.currentUser) return;

        try {
            const userData = {
                completedHabits: this.completedHabits,
                healthData: this.healthData,
                achievements: this.achievements,
                lastUpdated: new Date().toISOString()
            };

            const userDocRef = window.firebaseDoc(window.firebaseDb, 'users', this.currentUser.uid);
            await window.firebaseSetDoc(userDocRef, userData, { merge: true });
            console.log('データをクラウドに保存しました');
        } catch (error) {
            console.error('データ保存エラー:', error);
        }
    }

    // ユーザーデータの読み込み
    async loadUserData() {
        if (!this.currentUser) return;

        try {
            const userDocRef = window.firebaseDoc(window.firebaseDb, 'users', this.currentUser.uid);
            const userDoc = await window.firebaseGetDoc(userDocRef);
            
            if (userDoc.exists()) {
                const userData = userDoc.data();
                this.completedHabits = userData.completedHabits || {};
                this.healthData = userData.healthData || {};
                this.achievements = userData.achievements || {};
                
                // ローカルストレージも更新
                this.saveCompletedHabits();
                this.saveHealthData();
                this.saveAchievements();
                
                // UIを更新
                this.renderCalendar();
                this.updateStatsView();
                
                console.log('クラウドからデータを読み込みました');
            }
        } catch (error) {
            console.error('データ読み込みエラー:', error);
        }
    }

    addDebugFunctions() {
        // グローバルにデバッグ関数を追加
        window.debugHabitTracker = {
            // 現在のデータを表示
            showData: () => {
                console.log('=== 習慣トラッカーデバッグ情報 ===');
                console.log('完了した習慣:', this.completedHabits);
                console.log('ヘルスデータ:', this.healthData);
                console.log('現在の週:', this.currentWeek);
                console.log('今日の日付:', new Date().toISOString().split('T')[0]);
                console.log('現在のユーザー:', this.currentUser);
                
                // 未来の日付のデータをチェック
                const today = new Date().toISOString().split('T')[0];
                const futureDates = Object.keys(this.completedHabits).filter(date => date > today);
                if (futureDates.length > 0) {
                    console.warn('⚠️ 未来の日付のデータを検出:', futureDates);
                    futureDates.forEach(date => {
                        console.log(`  ${date}:`, this.completedHabits[date]);
                    });
                }
            },
            
            // 未来の日付のデータをクリア
            clearFutureData: () => {
                const today = new Date().toISOString().split('T')[0];
                const futureDates = Object.keys(this.completedHabits).filter(date => date > today);
                
                if (futureDates.length > 0) {
                    console.log('未来の日付のデータをクリアします:', futureDates);
                    futureDates.forEach(date => {
                        delete this.completedHabits[date];
                    });
                    this.saveCompletedHabits();
                    this.renderCalendar();
                    alert(`${futureDates.length}件の未来のデータをクリアしました`);
                } else {
                    alert('未来の日付のデータは見つかりませんでした');
                }
            },
            
            // 全データをクリア
            clearAllData: () => {
                if (confirm('⚠️ 全てのデータを削除しますか？この操作は取り消せません。')) {
                    localStorage.removeItem('habitTrackerData');
                    localStorage.removeItem('healthData');
                    localStorage.removeItem('achievements');
                    this.completedHabits = {};
                    this.healthData = {};
                    this.achievements = this.loadAchievements();
                    this.renderCalendar();
                    this.updateMotivationDisplay();
                    alert('全てのデータをクリアしました');
                }
            },
            
            // データの整合性をチェック
            validateData: () => {
                this.validateHabitData(this.completedHabits);
                alert('データの整合性チェックが完了しました。コンソールを確認してください。');
            },
            
            // 古いIDを強制的にクリア
            clearOldIds: () => {
                const oldIds = ['ashwagandha', 'magnesium'];
                let hasChanges = false;
                
                for (const [dateStr, habits] of Object.entries(this.completedHabits)) {
                    if (Array.isArray(habits)) {
                        const filteredHabits = habits.filter(habitId => !oldIds.includes(habitId));
                        if (filteredHabits.length !== habits.length) {
                            this.completedHabits[dateStr] = filteredHabits;
                            hasChanges = true;
                            console.log(`${dateStr}から古いIDを削除:`, habits.filter(id => oldIds.includes(id)));
                        }
                    } else if (habits && typeof habits === 'object') {
                        const filteredHabits = {};
                        let hasObjectChanges = false;
                        
                        for (const [habitId, value] of Object.entries(habits)) {
                            if (!oldIds.includes(habitId)) {
                                filteredHabits[habitId] = value;
                            } else {
                                hasObjectChanges = true;
                                console.log(`${dateStr}から古いIDを削除: ${habitId}`);
                            }
                        }
                        
                        if (hasObjectChanges) {
                            this.completedHabits[dateStr] = filteredHabits;
                            hasChanges = true;
                        }
                    }
                }
                
                if (hasChanges) {
                    this.saveCompletedHabits();
                    this.renderCalendar();
                    alert('古いIDをクリアしました。ページをリフレッシュしてください。');
                } else {
                    alert('古いIDは見つかりませんでした。');
                }
            },
            
            // アプリを強制リセット
            forceReset: () => {
                if (confirm('アプリを完全にリセットしますか？全てのデータが削除されます。')) {
                    localStorage.clear();
                    location.reload();
                }
            },
            
            // クラウドにデータを保存
            saveToCloud: () => {
                this.saveUserData();
            },
            
            // クラウドからデータを読み込み
            loadFromCloud: () => {
                this.loadUserData();
            }
        };
        
        console.log('🔧 デバッグ機能が利用可能です:');
        console.log('  debugHabitTracker.showData() - 現在のデータを表示');
        console.log('  debugHabitTracker.clearFutureData() - 未来のデータをクリア');
        console.log('  debugHabitTracker.clearAllData() - 全データをクリア');
        console.log('  debugHabitTracker.validateData() - データの整合性をチェック');
        console.log('  debugHabitTracker.clearOldIds() - 古いIDをクリア');
        console.log('  debugHabitTracker.forceReset() - アプリを強制リセット');
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

        let habitIndex = 1;

        // すべての習慣を順番に描画
        this.habits.forEach((habit, index) => {
            const habitRow = this.createHabitRow(habit, habitIndex, habit.type);
            
            // グループ化のスタイル
            if (habitIndex >= 1 && habitIndex <= 6) {
                // グループ1（1-6番）：習慣系
                habitRow.style.backgroundColor = '#0a0a0a';
            } else if (habitIndex >= 7 && habitIndex <= 9) {
                // グループ2（7-9番）：No系 - 灰色の枠
                habitRow.classList.add('no-habit-row');
            } else if (habitIndex >= 10 && habitIndex <= 15) {
                // グループ3（10-15番）：サプリ系 - 緑の枠
                habitRow.classList.add('supplement-habit-row-10-15');
            }
            
            habitsGrid.appendChild(habitRow);
            habitIndex++;
        });

    }

    // グループヘッダーを作成
    createGroupHeader(groupName, startIndex, count) {
        const groupRow = document.createElement('div');
        groupRow.className = 'group-header-row';
        groupRow.style.backgroundColor = '#2a4a6b';
        groupRow.style.border = '2px solid #4a90e2';
        
        // No.セル（空）
        const noCell = document.createElement('div');
        noCell.className = 'group-header-no-cell';
        noCell.textContent = '';
        groupRow.appendChild(noCell);
        
        // グループ名セル
        const groupCell = document.createElement('div');
        groupCell.className = 'group-header-cell';
        groupCell.textContent = `【${groupName}グループ】`;
        groupCell.style.fontWeight = 'bold';
        groupCell.style.fontSize = '14px';
        groupRow.appendChild(groupCell);
        
        // 日付列（月〜日7列）
        for (let i = 0; i < 7; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'group-header-empty-cell';
            emptyCell.textContent = '';
            groupRow.appendChild(emptyCell);
        }
        
        // 週計列
        const weeklyCell = document.createElement('div');
        weeklyCell.className = 'group-header-empty-cell';
        weeklyCell.textContent = '';
        groupRow.appendChild(weeklyCell);
        
        // 合計列
        const totalCell = document.createElement('div');
        totalCell.className = 'group-header-empty-cell';
        totalCell.textContent = '';
        groupRow.appendChild(totalCell);
        
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
            
            // 10-15番の場合は特別なクラスを追加
            if (index >= 10 && index <= 15) {
                habitCell.classList.add('supplement-habit-cell-10-15');
            } else if (index >= 7 && index <= 9) {
                habitCell.classList.add('no-habit-cell');
            }
            
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
    isHabitCompleted(habitId, dateInput) {
        if (!dateInput) return false;

        let dateKey = '';
        if (dateInput instanceof Date) {
            dateKey = dateInput.toISOString().split('T')[0];
        } else if (typeof dateInput === 'string') {
            dateKey = dateInput;
        } else {
            const parsed = new Date(dateInput);
            if (!isNaN(parsed)) {
                dateKey = parsed.toISOString().split('T')[0];
            }
        }

        if (!dateKey) return false;

        const habits = this.completedHabits[dateKey];
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
            const habits = this.normalizeHabitEntries(this.completedHabits[dateStr]);
            total += habits.length;
        }
        return total;
    }

    normalizeHabitEntries(habitValue) {
        if (!habitValue) return [];
        if (Array.isArray(habitValue)) {
            return habitValue.filter(Boolean);
        }
        if (typeof habitValue === 'object') {
            return Object.entries(habitValue)
                .filter(([, completed]) => !!completed)
                .map(([habitId]) => habitId);
        }
        return [];
    }

    formatDateKey(inputDate) {
        if (!inputDate) return '';
        const date = new Date(inputDate);
        if (Number.isNaN(date.getTime())) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    getHabitIdsForDate(date) {
        const dateKey = this.formatDateKey(date);
        if (!dateKey) return [];
        const habits = this.completedHabits[dateKey];
        return this.normalizeHabitEntries(habits);
    }

    getHabitById(habitId) {
        return this.habits.find(habit => habit.id === habitId);
    }

    calculateHabitStreak(dateSet) {
        if (!dateSet || dateSet.size === 0) {
            return 0;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let streak = 0;
        const cursor = new Date(today);

        while (true) {
            const key = this.formatDateKey(cursor);
            if (dateSet.has(key)) {
                streak++;
                cursor.setDate(cursor.getDate() - 1);
            } else {
                break;
            }
        }

        return streak;
    }

    formatRelativeDate(date) {
        if (!date) return '';
        const target = new Date(date);
        if (Number.isNaN(target.getTime())) return '';
        target.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const diffMs = today.getTime() - target.getTime();
        const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return '最終: 今日';
        if (diffDays === 1) return '最終: 昨日';
        if (diffDays < 7) return `最終: ${diffDays}日前`;
        return `最終: ${target.getMonth() + 1}/${target.getDate()}`;
    }

    calculateHomeStats() {
        const statsByHabit = {};
        this.habits.forEach(habit => {
            statsByHabit[habit.id] = {
                totalAll: 0,
                last30: 0,
                last7: 0,
                prev7: 0,
                lastCompleted: null,
                dates: new Set()
            };
        });

        const entries = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const last30Start = new Date(today);
        last30Start.setDate(today.getDate() - 29);
        const last7Start = new Date(today);
        last7Start.setDate(today.getDate() - 6);
        const prev7Start = new Date(last7Start);
        prev7Start.setDate(prev7Start.getDate() - 7);

        const weekdayTrend = Array.from({ length: 7 }, (_, dayIndex) => ({
            dayIndex,
            label: ['日', '月', '火', '水', '木', '金', '土'][dayIndex],
            allTime: 0,
            recent: 0,
            activeDays: 0,
            recentActiveDays: 0,
            averageAll: 0,
            averageRecent: 0
        }));

        const activeByDay = Array.from({ length: 7 }, () => new Set());
        const recentActiveByDay = Array.from({ length: 7 }, () => new Set());

        for (const [dateStr, habitValue] of Object.entries(this.completedHabits)) {
            const date = new Date(dateStr);
            if (Number.isNaN(date.getTime())) continue;
            date.setHours(0, 0, 0, 0);
            const habitIds = this.normalizeHabitEntries(habitValue);
            if (habitIds.length === 0) continue;

            entries.push({ date, dateStr, habits: habitIds });

            const isLast30 = date >= last30Start;
            const isLast7 = date >= last7Start;
            const isPrev7 = date >= prev7Start && date < last7Start;

            const dayOfWeek = date.getDay();
            weekdayTrend[dayOfWeek].allTime += habitIds.length;
            activeByDay[dayOfWeek].add(dateStr);
            if (isLast30) {
                weekdayTrend[dayOfWeek].recent += habitIds.length;
                recentActiveByDay[dayOfWeek].add(dateStr);
            }

            habitIds.forEach(habitId => {
                const stats = statsByHabit[habitId];
                if (!stats) return;
                stats.totalAll += 1;
                if (isLast30) stats.last30 += 1;
                if (isLast7) stats.last7 += 1;
                if (isPrev7) stats.prev7 += 1;
                stats.dates.add(dateStr);
                if (!stats.lastCompleted || stats.lastCompleted < date) {
                    stats.lastCompleted = new Date(date);
                }
            });
        }

        entries.sort((a, b) => a.date - b.date);

        const totalActiveDays = new Set(entries.map(entry => entry.dateStr));
        const recentActiveDays = new Set(entries.filter(entry => entry.date >= last30Start).map(entry => entry.dateStr));

        weekdayTrend.forEach((dayStat, index) => {
            const activeCount = activeByDay[index].size;
            const recentActiveCount = recentActiveByDay[index].size;
            dayStat.activeDays = activeCount;
            dayStat.recentActiveDays = recentActiveCount;
            dayStat.averageAll = activeCount > 0 ? dayStat.allTime / activeCount : 0;
            dayStat.averageRecent = recentActiveCount > 0 ? dayStat.recent / recentActiveCount : 0;
        });

        const statsList = this.habits.map(habit => {
            const stats = statsByHabit[habit.id];
            const currentStreak = this.calculateHabitStreak(stats.dates);
            return {
                id: habit.id,
                name: habit.name,
                shortName: habit.shortName,
                category: habit.category,
                priority: habit.priority,
                totalAll: stats.totalAll,
                last30: stats.last30,
                last7: stats.last7,
                prev7: stats.prev7,
                currentStreak,
                lastCompleted: stats.lastCompleted,
                activeDays: stats.dates.size,
                pace: stats.dates.size > 0 ? stats.totalAll / stats.dates.size : 0
            };
        });

        const categoryMap = {};
        statsList.forEach(stat => {
            if (!categoryMap[stat.category]) {
                categoryMap[stat.category] = {
                    category: stat.category,
                    totalAll: 0,
                    last30: 0,
                    prev7: 0,
                    habitCount: 0,
                    activeHabits: 0,
                    focusHabit: null,
                    topHabit: null
                };
            }

            const categoryStats = categoryMap[stat.category];
            categoryStats.totalAll += stat.totalAll;
            categoryStats.last30 += stat.last30;
            categoryStats.prev7 += stat.prev7;
            categoryStats.habitCount += 1;
            if (stat.last30 > 0) {
                categoryStats.activeHabits += 1;
            }

            if (!categoryStats.topHabit || stat.last30 > categoryStats.topHabit.last30) {
                categoryStats.topHabit = {
                    id: stat.id,
                    name: stat.name,
                    last30: stat.last30
                };
            }

            if (stat.priority >= 4 && stat.last30 === 0) {
                if (!categoryStats.focusHabit || stat.priority > categoryStats.focusHabit.priority) {
                    categoryStats.focusHabit = {
                        id: stat.id,
                        name: stat.name,
                        priority: stat.priority
                    };
                }
            }
        });

        const recentTotal = statsList.reduce((sum, stat) => sum + stat.last30, 0);
        const categorySummary = Object.values(categoryMap).map(category => {
            const momentum = category.last30 - category.prev7;
            const recentShare = recentTotal > 0 ? Math.round((category.last30 / recentTotal) * 100) : 0;
            return {
                ...category,
                momentum,
                recentShare
            };
        }).sort((a, b) => b.last30 - a.last30);

        const normalizeDates = dates => dates.map(date => {
            const normalized = new Date(date);
            normalized.setHours(0, 0, 0, 0);
            return normalized;
        });

        const thisWeekDates = (this.currentWeek && this.currentWeek.length)
            ? normalizeDates(this.currentWeek)
            : normalizeDates(this.getCurrentWeek());

        const lastWeekStart = thisWeekDates.length
            ? new Date(thisWeekDates[0].getTime() - 7 * 24 * 60 * 60 * 1000)
            : new Date();

        const lastWeekDates = this.getWeekFromDate(lastWeekStart).map(date => {
            const normalized = new Date(date);
            normalized.setHours(0, 0, 0, 0);
            return normalized;
        });

        const computeWeekStats = (dates) => {
            let total = 0;
            const habitCountMap = new Map();
            let activeDaysCount = 0;

            dates.forEach(date => {
                const habitIds = this.getHabitIdsForDate(date);
                if (habitIds.length > 0) {
                    activeDaysCount += 1;
                    total += habitIds.length;
                    habitIds.forEach(id => {
                        habitCountMap.set(id, (habitCountMap.get(id) || 0) + 1);
                    });
                }
            });

            return { total, habitCountMap, activeDays: activeDaysCount, totalDays: dates.length };
        };

        const thisWeekStats = computeWeekStats(thisWeekDates);
        const lastWeekStats = computeWeekStats(lastWeekDates);
        const diff = thisWeekStats.total - lastWeekStats.total;
        const trend = diff > 0 ? 'up' : diff < 0 ? 'down' : 'flat';
        const diffPercent = lastWeekStats.total > 0
            ? Math.round((diff / lastWeekStats.total) * 100)
            : null;

        const bestHabitEntry = Array.from(thisWeekStats.habitCountMap.entries())
            .sort((a, b) => b[1] - a[1])[0];
        const bestHabit = bestHabitEntry
            ? {
                id: bestHabitEntry[0],
                name: (this.getHabitById(bestHabitEntry[0]) || {}).name || bestHabitEntry[0],
                count: bestHabitEntry[1]
            }
            : null;

        const weeklyComparison = {
            thisWeekTotal: thisWeekStats.total,
            lastWeekTotal: lastWeekStats.total,
            diff,
            diffPercent,
            trend,
            bestHabit,
            activeDays: thisWeekStats.activeDays,
            totalDays: thisWeekStats.totalDays,
            averagePerDay: thisWeekStats.totalDays > 0 ? thisWeekStats.total / thisWeekStats.totalDays : 0
        };

        let insightMessage = '';
        if (trend === 'up' && diff > 0) {
            insightMessage = `先週より${diff}件多くチェックできています。`;
        } else if (trend === 'down' && diff < 0) {
            insightMessage = `先週より${Math.abs(diff)}件少ないペースです。`;
        } else {
            insightMessage = '先週と同じペースを維持しています。';
        }

        if (bestHabit) {
            insightMessage += ` 今週よくできているのは「${bestHabit.name}」です。`;
        }

        weeklyComparison.insight = insightMessage;

        const bestRecentDay = weekdayTrend.reduce((best, day) => {
            if (!best || day.recent > best.recent) return day;
            return best;
        }, null);

        const calmRecentDay = weekdayTrend
            .filter(day => day.recent > 0)
            .reduce((calm, day) => {
                if (!calm || day.recent < calm.recent) return day;
                return calm;
            }, null);

        const totals = {
            allTime: statsList.reduce((sum, stat) => sum + stat.totalAll, 0),
            last30: recentTotal,
            last7: statsList.reduce((sum, stat) => sum + stat.last7, 0),
            activeDays: totalActiveDays.size,
            recentActiveDays: recentActiveDays.size,
            habitCount: this.habits.length,
            bestRecentDay,
            calmRecentDay
        };

        const maxWeekdayRecent = weekdayTrend.reduce((max, day) => Math.max(max, day.recent), 0);

        return {
            hasData: entries.length > 0,
            habitList: statsList,
            categorySummary,
            weekdayTrend,
            weeklyComparison,
            totals,
            maxWeekdayRecent
        };
    }

    updateStatsAnalysis() {
        const statsView = document.getElementById('statsView');
        if (!statsView) return;

        const stats = this.calculateHomeStats();
        this.renderOverallSummary(stats);
        this.renderHabitHighlights(stats);
        this.renderCategorySummary(stats);
        this.renderWeekdayTrend(stats);
        this.renderWeeklyComparison(stats);
    }

    renderOverallSummary(stats) {
        const container = document.getElementById('overallSummary');
        if (!container) return;

        container.innerHTML = '';
        if (!stats.hasData) {
            container.innerHTML = '<p class="analysis-empty">まだ集計できるデータがありません。ホームで記録を追加してみましょう。</p>';
            return;
        }

        const { totals } = stats;
        const recentPace = totals.recentActiveDays > 0
            ? (totals.last30 / totals.recentActiveDays)
            : 0;
        const weeklyAvg = totals.last7 / 7;

        const metrics = document.createElement('div');
        metrics.className = 'overall-metrics';
        metrics.innerHTML = `
            <div class="overall-metric">
                <span class="metric-label">総チェック数</span>
                <span class="metric-value">${totals.allTime}</span>
                <span class="metric-note">記録日数 ${totals.activeDays}日</span>
            </div>
            <div class="overall-metric">
                <span class="metric-label">直近30日</span>
                <span class="metric-value">${totals.last30}</span>
                <span class="metric-note">アクティブ日 ${totals.recentActiveDays}日</span>
            </div>
            <div class="overall-metric">
                <span class="metric-label">平均ペース</span>
                <span class="metric-value">${recentPace.toFixed(1)}件/日</span>
                <span class="metric-note">最近30日間の平均</span>
            </div>
            <div class="overall-metric">
                <span class="metric-label">週間平均</span>
                <span class="metric-value">${weeklyAvg.toFixed(1)}件</span>
                <span class="metric-note">直近7日の合計から算出</span>
            </div>
        `;

        container.appendChild(metrics);

        if (totals.bestRecentDay || totals.calmRecentDay) {
            const note = document.createElement('div');
            note.className = 'analysis-note';
            const bestDayText = totals.bestRecentDay
                ? `最近もっとも取り組めているのは${totals.bestRecentDay.label}曜日です。`
                : '';
            const calmDayText = totals.calmRecentDay
                ? `余白があるのは${totals.calmRecentDay.label}曜日。チャンスです。`
                : '';
            note.textContent = `${bestDayText} ${calmDayText}`.trim();
            container.appendChild(note);
        }
    }

    renderHabitHighlights(stats) {
        const container = document.getElementById('habitHighlights');
        if (!container) return;
        container.innerHTML = '';

        if (!stats.hasData) {
            container.innerHTML = '<p class="analysis-empty">習慣の記録がまだありません。ホームでチェックしてみましょう。</p>';
            return;
        }

        const successGroup = document.createElement('div');
        successGroup.className = 'highlight-group';

        const successTitle = document.createElement('div');
        successTitle.className = 'highlight-title';
        successTitle.textContent = 'よく続けられている項目';
        successGroup.appendChild(successTitle);

        const topHabits = stats.habitList
            .filter(habit => habit.last30 > 0)
            .sort((a, b) => (b.last30 - a.last30) || (b.totalAll - a.totalAll))
            .slice(0, 3);

        const successList = document.createElement('div');
        successList.className = 'highlight-list';

        if (topHabits.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'analysis-empty';
            empty.textContent = '直近30日でチェックされた項目がまだありません。';
            successList.appendChild(empty);
        } else {
            topHabits.forEach(habit => {
                const item = document.createElement('div');
                item.className = 'highlight-item';
                item.innerHTML = `
                    <div class="highlight-header">
                        <span class="highlight-name">${habit.name}</span>
                        <span class="highlight-tag priority-${habit.priority}">優先度${habit.priority}</span>
                    </div>
                    <div class="highlight-metrics">
                        <div class="metric">
                            <span class="metric-label">30日</span>
                            <span class="metric-value">${habit.last30}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">総計</span>
                            <span class="metric-value">${habit.totalAll}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">連続</span>
                            <span class="metric-value">${habit.currentStreak}日</span>
                        </div>
                    </div>
                    <div class="highlight-footer">
                        <span class="highlight-category">${habit.category}</span>
                        <span class="highlight-updated">${habit.lastCompleted ? this.formatRelativeDate(habit.lastCompleted) : '記録なし'}</span>
                    </div>
                `;
                successList.appendChild(item);
            });
        }

        successGroup.appendChild(successList);
        container.appendChild(successGroup);

        const focusGroup = document.createElement('div');
        focusGroup.className = 'highlight-group';

        const focusTitle = document.createElement('div');
        focusTitle.className = 'highlight-title';
        focusTitle.textContent = 'これから力を入れたい項目';
        focusGroup.appendChild(focusTitle);

        const attentionHabits = stats.habitList
            .filter(habit => habit.priority >= 4 && habit.last30 === 0)
            .sort((a, b) => (b.priority - a.priority) || (a.totalAll - b.totalAll))
            .slice(0, 3);

        const focusList = document.createElement('div');
        focusList.className = 'highlight-list';

        if (attentionHabits.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'analysis-empty';
            empty.textContent = '優先度の高い未着手項目はありません。バランス良く進められています。';
            focusList.appendChild(empty);
        } else {
            attentionHabits.forEach(habit => {
                const item = document.createElement('div');
                item.className = 'highlight-item';
                item.innerHTML = `
                    <div class="highlight-header">
                        <span class="highlight-name">${habit.name}</span>
                        <span class="highlight-tag priority-${habit.priority}">優先度${habit.priority}</span>
                    </div>
                    <div class="highlight-metrics">
                        <div class="metric">
                            <span class="metric-label">総計</span>
                            <span class="metric-value">${habit.totalAll}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">直近7日</span>
                            <span class="metric-value">${habit.last7}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">記録日数</span>
                            <span class="metric-value">${habit.activeDays}</span>
                        </div>
                    </div>
                    <div class="highlight-footer">
                        <span class="highlight-category">${habit.category}</span>
                        <span class="highlight-updated ${habit.lastCompleted ? '' : 'no-data'}">${habit.lastCompleted ? this.formatRelativeDate(habit.lastCompleted) : 'まだ記録がありません'}</span>
                    </div>
                `;
                focusList.appendChild(item);
            });
        }

        focusGroup.appendChild(focusList);
        container.appendChild(focusGroup);
    }

    renderCategorySummary(stats) {
        const container = document.getElementById('categorySummary');
        if (!container) return;
        container.innerHTML = '';

        if (!stats.hasData) {
            container.innerHTML = '<p class="analysis-empty">まだカテゴリーごとの分析ができません。チェックを追加すると自動的に表示されます。</p>';
            return;
        }

        const grid = document.createElement('div');
        grid.className = 'category-grid';

        stats.categorySummary.forEach(category => {
            const item = document.createElement('div');
            item.className = 'category-item';
            item.innerHTML = `
                <div class="category-header">
                    <span class="category-name">${category.category}</span>
                    <span class="category-score">30日 ${category.last30}件</span>
                </div>
                <div class="category-body">
                    <div class="category-metrics">
                        <div class="category-metric">
                            <span class="category-label">総計</span>
                            <span class="category-value">${category.totalAll}</span>
                        </div>
                        <div class="category-metric">
                            <span class="category-label">アクティブ習慣</span>
                            <span class="category-value">${category.activeHabits}/${category.habitCount}</span>
                        </div>
                    </div>
                    <div class="category-progress">
                        <div class="category-progress-bar">
                            <div class="category-progress-fill" style="width: ${category.recentShare}%"></div>
                        </div>
                        <span class="category-progress-label">最近シェア ${category.recentShare}%</span>
                    </div>
                    ${category.focusHabit ? `<div class="category-focus">注目: ${category.focusHabit.name}（優先度${category.focusHabit.priority}）</div>` : ''}
                </div>
            `;
            grid.appendChild(item);
        });

        container.appendChild(grid);
    }

    renderWeekdayTrend(stats) {
        const container = document.getElementById('weekdayTrend');
        if (!container) return;
        container.innerHTML = '';

        if (!stats.hasData) {
            container.innerHTML = '<p class="analysis-empty">曜日ごとの傾向を表示するには記録が必要です。</p>';
            return;
        }

        const list = document.createElement('div');
        list.className = 'weekday-list';

        stats.weekdayTrend.forEach(dayStat => {
            const item = document.createElement('div');
            item.className = 'weekday-item';
            const ratio = stats.maxWeekdayRecent > 0
                ? Math.max(0.08, dayStat.recent / stats.maxWeekdayRecent)
                : 0;

            item.innerHTML = `
                <div class="weekday-header">
                    <span>${dayStat.label}曜日</span>
                    <span>${dayStat.recent}件</span>
                </div>
                <div class="weekday-bar">
                    <div class="weekday-bar-fill" style="transform: scaleX(${ratio});"></div>
                </div>
                <div class="weekday-footer">
                    <span>平均 ${dayStat.averageRecent.toFixed(1)}件/日</span>
                    <span>記録日 ${dayStat.recentActiveDays}日</span>
                </div>
            `;
            list.appendChild(item);
        });

        container.appendChild(list);
    }

    renderWeeklyComparison(stats) {
        const container = document.getElementById('weeklyComparison');
        if (!container) return;
        container.innerHTML = '';

        if (!stats.hasData) {
            container.innerHTML = '<p class="analysis-empty">週間比較はまだ表示できません。ホームで1週間分の記録を作ってみましょう。</p>';
            return;
        }

        const comparison = document.createElement('div');
        comparison.className = 'weekly-comparison';

        const diffPercentText = stats.weeklyComparison.diffPercent === null
            ? '先週データなし'
            : `${stats.weeklyComparison.diffPercent >= 0 ? '+' : ''}${stats.weeklyComparison.diffPercent}%`;

        comparison.innerHTML = `
            <div class="weekly-headline">
                <div class="weekly-total">
                    <span class="weekly-label">今週のチェック</span>
                    <span class="weekly-value">${stats.weeklyComparison.thisWeekTotal}</span>
                    <span class="weekly-sub">アクティブ日数 ${stats.weeklyComparison.activeDays}/${stats.weeklyComparison.totalDays}日</span>
                </div>
                <div class="weekly-diff trend-${stats.weeklyComparison.trend}">
                    <span class="diff-label">先週比</span>
                    <span class="diff-value">${stats.weeklyComparison.diff >= 0 ? '+' : ''}${stats.weeklyComparison.diff}</span>
                    <span class="diff-percent">${diffPercentText}</span>
                </div>
            </div>
            <div class="weekly-details">
                <div class="weekly-detail-item">
                    <span class="weekly-detail-label">先週</span>
                    <span>${stats.weeklyComparison.lastWeekTotal}</span>
                </div>
                <div class="weekly-detail-item">
                    <span class="weekly-detail-label">平均ペース</span>
                    <span>1日あたり${stats.weeklyComparison.averagePerDay.toFixed(1)}件</span>
                </div>
                <div class="weekly-detail-item">
                    <span class="weekly-detail-label">最多項目</span>
                    <span>${stats.weeklyComparison.bestHabit ? `${stats.weeklyComparison.bestHabit.name} (${stats.weeklyComparison.bestHabit.count})` : '―'}</span>
                </div>
            </div>
            <div class="weekly-insight">${stats.weeklyComparison.insight}</div>
        `;

        container.appendChild(comparison);
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
        
        // クラウドに自動保存
        if (this.currentUser) {
            this.saveUserData();
        }
        
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
        
        // レポート機能は削除されました
    }


    // 習慣の統計機能は削除されました


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


    // 合計値推移グラフを生成
    renderTotalChart() {
        const canvas = document.getElementById('totalChart');
        if (!canvas) return;

        const chartData = this.getTotalChartData();
        this.updateTotalChartSummary(chartData);

        const container = document.getElementById('totalChartContainer');
        const emptyMessage = document.getElementById('totalChartEmptyMessage');
        const ctx = canvas.getContext('2d');

        const setEmptyState = (isEmpty, message) => {
            if (emptyMessage && typeof message === 'string') {
                emptyMessage.textContent = message;
            }
            if (container) {
                container.classList.toggle('chart-container--empty', isEmpty);
            }
        };

        if (this.totalChart) {
            this.totalChart.destroy();
            this.totalChart = null;
        }

        if (!ctx) {
            setEmptyState(true, 'グラフを表示できません');
            return;
        }

        if (typeof Chart === 'undefined') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setEmptyState(true, 'グラフを読み込めませんでした');
            return;
        }

        const hasData = chartData.dailyValues.some(value => value > 0);
        if (!hasData) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setEmptyState(true, 'まだ表示できるデータがありません');
            return;
        }

        setEmptyState(false);

        const initialMin = Math.max(0, chartData.labels.length - 14);
        const initialMax = chartData.labels.length - 1;
        const cumulativeColor = '#FFB74D';
        const dailyColor = 'rgba(74, 144, 226, 0.55)';
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(255, 183, 77, 0.35)');
        gradient.addColorStop(1, 'rgba(255, 183, 77, 0)');

        this.totalChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        type: 'bar',
                        label: '日別達成',
                        data: chartData.dailyValues,
                        backgroundColor: dailyColor,
                        borderRadius: 6,
                        maxBarThickness: 16,
                        order: 2
                    },
                    {
                        type: 'line',
                        label: '累積達成',
                        data: chartData.cumulativeValues,
                        borderColor: cumulativeColor,
                        backgroundColor: gradient,
                    borderWidth: 2,
                    fill: true,
                        tension: 0.35,
                    pointRadius: 3,
                        pointHoverRadius: 6,
                        pointBackgroundColor: cumulativeColor,
                        pointBorderColor: '#1c1c1c',
                        order: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 10,
                        right: 16,
                        bottom: 0,
                        left: 8
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#f5f5f5',
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#111',
                        borderColor: '#444',
                        borderWidth: 1,
                        titleColor: '#ffffff',
                        bodyColor: '#dfe4ff',
                        callbacks: {
                            label(context) {
                                const label = context.dataset.label || '';
                                const value = context.parsed.y;
                                return `${label}: ${value}回`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        min: initialMin,
                        max: initialMax,
                        ticks: {
                            color: '#c6d2f3',
                            maxRotation: 0,
                            autoSkip: true,
                            maxTicksLimit: 10
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: '#c6d2f3',
                            precision: 0
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.06)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 350
                }
            },
            plugins: [{
                id: 'dragPlugin',
                beforeEvent(chart, args) {
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
                                this.handleDrag(chart, deltaX);
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
                    const range = Math.max(1, xScale.max - xScale.min);
                    const scale = chart.width / range;
                    const shift = -deltaX / scale;
                    
                    const newMin = Math.max(0, xScale.min + shift);
                    const newMax = Math.min(chart.data.labels.length - 1, xScale.max + shift);
                    
                    if (newMax - newMin >= 5) {
                        xScale.options.min = newMin;
                        xScale.options.max = newMax;
                        chart.update('none');
                    }
                }
            }]
        });

        this.updateTotalChartSummary(chartData);
    }

    // 合計値推移のデータを取得
    getTotalChartData() {
        const labels = [];
        const dailyValues = [];
        const cumulativeValues = [];
        const today = new Date();
        
        let cumulativeTotal = 0;
        let peakValue = 0;
        let peakLabel = '';

        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateKey = date.toISOString().split('T')[0];
            const label = `${date.getMonth() + 1}/${date.getDate()}`;
            labels.push(label);
            
            const habits = this.completedHabits[dateKey];
            let dailyCompleted = 0;
            if (Array.isArray(habits)) {
                dailyCompleted = habits.length;
            } else if (habits && typeof habits === 'object') {
                dailyCompleted = Object.values(habits).filter(Boolean).length;
            }

            cumulativeTotal += dailyCompleted;
            dailyValues.push(dailyCompleted);
            cumulativeValues.push(Math.max(0, cumulativeTotal));

            if (dailyCompleted >= peakValue) {
                peakValue = dailyCompleted;
                peakLabel = label;
            }
        }

        const last7Total = dailyValues.slice(-7).reduce((sum, value) => sum + value, 0);
        const dailyAverage = dailyValues.length > 0 ? cumulativeTotal / dailyValues.length : 0;
        const latestLabel = labels[labels.length - 1] || '';
        const latestDaily = dailyValues[dailyValues.length - 1] || 0;

        return {
            labels,
            dailyValues,
            cumulativeValues,
            meta: {
                totalCount: cumulativeTotal,
                last7Total,
                dailyAverage,
                peakValue,
                peakLabel,
                latestLabel,
                latestDaily
            }
        };
    }

    updateTotalChartSummary(chartData) {
        const summaryContainer = document.getElementById('totalChartSummary');
        const footer = document.getElementById('totalChartFooter');
        if (summaryContainer) {
            const average = chartData.meta.dailyAverage;
            const averageDisplay = Number.isFinite(average)
                ? (Number.isInteger(average) ? average : average.toFixed(1))
                : 0;

            summaryContainer.innerHTML = `
                <div class="summary-chip">
                    <span class="chip-label">30日累計</span>
                    <span class="chip-value">${chartData.meta.totalCount}回</span>
                </div>
                <div class="summary-chip">
                    <span class="chip-label">直近7日</span>
                    <span class="chip-value">${chartData.meta.last7Total}回</span>
                </div>
                <div class="summary-chip">
                    <span class="chip-label">1日平均</span>
                    <span class="chip-value">${averageDisplay}回</span>
                </div>
            `;
        }

        if (footer) {
            const peakText = chartData.meta.peakLabel
                ? `最多日: ${chartData.meta.peakLabel} (${chartData.meta.peakValue}回)`
                : '最多日: ー';
            const latestText = chartData.meta.latestLabel
                ? `最新: ${chartData.meta.latestLabel} (${chartData.meta.latestDaily}回)`
                : '最新: ー';

            footer.innerHTML = `
                <span><span class="indicator" style="background: #FFB74D"></span>累積達成</span>
                <span><span class="indicator" style="background: #4A90E2"></span>日別達成</span>
                <span>${peakText}</span>
                <span>${latestText}</span>
            `;
        }
        
        // 統計カードの更新
        this.updateStatsCards(chartData);
    }
    
    // 統計カードの更新
    updateStatsCards(chartData) {
        const total30Days = document.getElementById('total30Days');
        const total7Days = document.getElementById('total7Days');
        const dailyAverage = document.getElementById('dailyAverage');
        
        if (total30Days) {
            total30Days.textContent = chartData.meta.totalCount;
        }
        if (total7Days) {
            total7Days.textContent = chartData.meta.last7Total;
        }
        if (dailyAverage) {
            const average = chartData.meta.dailyAverage;
            const averageDisplay = Number.isFinite(average)
                ? (Number.isInteger(average) ? average : average.toFixed(1))
                : 0;
            dailyAverage.textContent = averageDisplay;
        }
    }

    // 習慣分析を更新
    updateHabitAnalysis() {
        this.updateBestWorstHabits();
        this.updateGrowthTrend();
        this.updateStreakRecord();
    }

    // 最も得意・苦手な習慣を更新
    updateBestWorstHabits() {
        const habitStats = this.getHabitStats();
        const bestHabit = habitStats.best;
        const worstHabit = habitStats.worst;

        // 最も得意な習慣
        const bestElement = document.getElementById('bestHabit');
        if (bestElement && bestHabit) {
            bestElement.innerHTML = `
                <div class="habit-name">${bestHabit.name}</div>
                <div class="habit-rate">達成率: ${Math.round(bestHabit.rate)}%</div>
            `;
        }

        // 改善が必要な習慣
        const worstElement = document.getElementById('worstHabit');
        if (worstElement && worstHabit) {
            worstElement.innerHTML = `
                <div class="habit-name">${worstHabit.name}</div>
                <div class="habit-rate">達成率: ${Math.round(worstHabit.rate)}%</div>
            `;
        }
    }

    // 成長トレンドを更新
    updateGrowthTrend() {
        const trend = this.calculateGrowthTrend();
        const trendElement = document.getElementById('growthTrend');
        if (trendElement) {
            trendElement.innerHTML = `
                <div class="trend-text">${trend.text}</div>
                <div class="trend-detail">${trend.detail}</div>
            `;
        }
    }

    // 連続記録を更新
    updateStreakRecord() {
        const streak = this.calculateStreakRecord();
        const streakElement = document.getElementById('streakRecord');
        if (streakElement) {
            streakElement.innerHTML = `
                <div class="streak-text">${streak.text}</div>
                <div class="streak-detail">${streak.detail}</div>
            `;
        }
    }

    // アドバイスを更新
    updateAdvice() {
        const advice = this.generatePersonalizedAdvice();
        const adviceElement = document.getElementById('adviceCard');
        if (adviceElement) {
            adviceElement.innerHTML = `
                <div class="advice-icon">${advice.icon}</div>
                <div class="advice-content">
                    <div class="advice-title">${advice.title}</div>
                    <div class="advice-text">${advice.text}</div>
                </div>
            `;
        }
    }

    // モチベーション分析を更新
    updateMotivationAnalysis() {
        this.updateWeeklyMood();
        this.updateNextGoal();
        this.updateConsistencyLevel();
    }

    // 今週の調子を更新
    updateWeeklyMood() {
        const mood = this.calculateWeeklyMood();
        const moodElement = document.getElementById('weeklyMood');
        const moodDetailElement = document.getElementById('weeklyMoodDetail');
        if (moodElement && moodDetailElement) {
            moodElement.textContent = mood.level;
            moodDetailElement.textContent = mood.detail;
        }
    }

    // 次の目標を更新
    updateNextGoal() {
        const goal = this.calculateNextGoal();
        const goalElement = document.getElementById('nextGoal');
        const goalDetailElement = document.getElementById('nextGoalDetail');
        if (goalElement && goalDetailElement) {
            goalElement.textContent = goal.target;
            goalDetailElement.textContent = goal.detail;
        }
    }

    // 継続力レベルを更新
    updateConsistencyLevel() {
        const level = this.calculateConsistencyLevel();
        const levelElement = document.getElementById('consistencyLevel');
        const levelDetailElement = document.getElementById('consistencyLevelDetail');
        if (levelElement && levelDetailElement) {
            levelElement.textContent = level.level;
            levelDetailElement.textContent = level.detail;
        }
    }

    // 習慣統計を取得
    getHabitStats() {
        const stats = this.habits.map(habit => {
            const completedDays = this.getCompletedDaysForHabit(habit.id);
            const totalDays = this.getTotalDays();
            const rate = totalDays > 0 ? (completedDays / totalDays) * 100 : 0;
            
            return {
                id: habit.id,
                name: habit.name,
                completedDays,
                totalDays,
                rate
            };
        });

        const best = stats.reduce((max, current) => current.rate > max.rate ? current : max);
        const worst = stats.reduce((min, current) => current.rate < min.rate ? current : min);

        return { best, worst, stats };
    }

    // 特定の習慣の完了日数を取得
    getCompletedDaysForHabit(habitId) {
        let count = 0;
        for (const [dateStr, habits] of Object.entries(this.completedHabits)) {
            if (Array.isArray(habits) && habits.includes(habitId)) {
                count++;
            } else if (habits && typeof habits === 'object' && habits[habitId]) {
                count++;
            }
        }
        return count;
    }

    // 総日数を取得
    getTotalDays() {
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        
        let count = 0;
        for (let d = new Date(thirtyDaysAgo); d <= today; d.setDate(d.getDate() + 1)) {
            count++;
        }
        return count;
    }

    // 成長トレンドを計算
    calculateGrowthTrend() {
        const chartData = this.getTotalChartData();
        const dailyValues = chartData.dailyValues;
        
        if (dailyValues.length < 7) {
            return {
                text: "データ不足",
                detail: "7日以上のデータが必要です"
            };
        }

        const recent7 = dailyValues.slice(-7);
        const previous7 = dailyValues.slice(-14, -7);
        
        const recentAvg = recent7.reduce((a, b) => a + b, 0) / recent7.length;
        const previousAvg = previous7.length > 0 ? previous7.reduce((a, b) => a + b, 0) / previous7.length : 0;
        
        const change = recentAvg - previousAvg;
        const changePercent = previousAvg > 0 ? (change / previousAvg) * 100 : 0;

        if (changePercent > 10) {
            return {
                text: "急上昇中！",
                detail: `前週比 +${Math.round(changePercent)}%`
            };
        } else if (changePercent > 0) {
            return {
                text: "順調に成長",
                detail: `前週比 +${Math.round(changePercent)}%`
            };
        } else if (changePercent > -10) {
            return {
                text: "安定維持",
                detail: `前週比 ${Math.round(changePercent)}%`
            };
        } else {
            return {
                text: "要注意",
                detail: `前週比 ${Math.round(changePercent)}%`
            };
        }
    }

    // 連続記録を計算
    calculateStreakRecord() {
        const chartData = this.getTotalChartData();
        const dailyValues = chartData.dailyValues;
        
        if (dailyValues.length === 0) {
            return {
                text: "記録なし",
                detail: "まだデータがありません"
            };
        }

        let currentStreak = 0;
        let maxStreak = 0;
        let tempStreak = 0;

        for (let i = dailyValues.length - 1; i >= 0; i--) {
            if (dailyValues[i] > 0) {
                if (i === dailyValues.length - 1) {
                    currentStreak++;
                }
                tempStreak++;
                maxStreak = Math.max(maxStreak, tempStreak);
            } else {
                tempStreak = 0;
            }
        }

        return {
            text: `${currentStreak}日連続`,
            detail: `最高記録: ${maxStreak}日`
        };
    }

    // パーソナライズされたアドバイスを生成
    generatePersonalizedAdvice() {
        const habitStats = this.getHabitStats();
        const worstHabit = habitStats.worst;
        const bestHabit = habitStats.best;
        const trend = this.calculateGrowthTrend();

        if (worstHabit.rate < 30) {
            return {
                icon: "🎯",
                title: "集中して改善しよう",
                text: `「${worstHabit.name}」の達成率が${Math.round(worstHabit.rate)}%と低めです。まずは1週間続けることを目標に、小さなステップから始めてみましょう。`
            };
        } else if (worstHabit.rate < 60) {
            return {
                icon: "⚡",
                title: "バランスを整えよう",
                text: `「${worstHabit.name}」をもう少し頑張れば、全体的なバランスが良くなりそうです。完璧を目指さず、継続を重視しましょう。`
            };
        } else if (trend.text.includes("急上昇") || trend.text.includes("成長")) {
            return {
                icon: "🚀",
                title: "素晴らしい調子！",
                text: `現在の成長トレンドを維持しましょう。特に「${bestHabit.name}」が好調なので、この勢いを他の習慣にも活かしてみてください。`
            };
        } else {
            return {
                icon: "💪",
                title: "安定した継続中",
                text: `全体的にバランス良く習慣化できています。この調子で継続し、さらなる成長を目指しましょう。`
            };
        }
    }

    // 今週の調子を計算
    calculateWeeklyMood() {
        const chartData = this.getTotalChartData();
        const dailyValues = chartData.dailyValues;
        const recent7 = dailyValues.slice(-7);
        const avg = recent7.reduce((a, b) => a + b, 0) / recent7.length;

        if (avg >= 10) {
            return {
                level: "絶好調！",
                detail: "今週は素晴らしい成果です"
            };
        } else if (avg >= 7) {
            return {
                level: "好調",
                detail: "順調に習慣化できています"
            };
        } else if (avg >= 4) {
            return {
                level: "普通",
                detail: "もう少し頑張ってみましょう"
            };
        } else {
            return {
                level: "不調",
                detail: "無理せず少しずつ始めましょう"
            };
        }
    }

    // 次の目標を計算
    calculateNextGoal() {
        const chartData = this.getTotalChartData();
        const dailyValues = chartData.dailyValues;
        const recent7 = dailyValues.slice(-7);
        const avg = recent7.reduce((a, b) => a + b, 0) / recent7.length;

        if (avg < 5) {
            return {
                target: "1日5つ",
                detail: "まずは基本的な習慣を定着させましょう"
            };
        } else if (avg < 10) {
            return {
                target: "1日10つ",
                detail: "現在の2倍を目指してみましょう"
            };
        } else if (avg < 15) {
            return {
                target: "1日15つ",
                detail: "全ての習慣を完璧にこなしましょう"
            };
        } else {
            return {
                target: "継続維持",
                detail: "現在のペースを維持しましょう"
            };
        }
    }

    // 継続力レベルを計算
    calculateConsistencyLevel() {
        const chartData = this.getTotalChartData();
        const dailyValues = chartData.dailyValues;
        const completedDays = dailyValues.filter(value => value > 0).length;
        const totalDays = dailyValues.length;
        const consistency = totalDays > 0 ? (completedDays / totalDays) * 100 : 0;

        if (consistency >= 90) {
            return {
                level: "S級",
                detail: "完璧な継続力です！"
            };
        } else if (consistency >= 70) {
            return {
                level: "A級",
                detail: "優秀な継続力です"
            };
        } else if (consistency >= 50) {
            return {
                level: "B級",
                detail: "良好な継続力です"
            };
        } else if (consistency >= 30) {
            return {
                level: "C級",
                detail: "もう少し頑張りましょう"
            };
        } else {
            return {
                level: "D級",
                detail: "継続力を向上させましょう"
            };
        }
    }

    // モンスターを生成
    renderMonsters() {
        const monsterGrid = document.getElementById('monsterGrid');
        if (!monsterGrid) return;

        monsterGrid.innerHTML = '';

        const baseMonsters = this.habits.map((habit) => {
            const totalCount = this.calculateTotalAll(habit.id);
            const level = this.getMonsterLevel(totalCount);
            const monsterType = this.getMonsterType(totalCount);
            const nextLevel = this.getNextLevel(totalCount);

            return {
                id: habit.id,
                displayName: habit.shortName,
                totalCount,
                level,
                nextLevel,
                color: monsterType.color,
                emoji: monsterType.emoji,
                title: monsterType.name,
                flavor: monsterType.description
            };
        });

        const healthCounts = this.getHealthCounts();
        const healthMonsters = HEALTH_MONSTER_DEFINITIONS.map((definition) => {
            const totalCount = healthCounts[definition.key] || 0;
            const level = this.getMonsterLevel(totalCount);
            const monsterType = this.getMonsterType(totalCount);
            const nextLevel = this.getNextLevel(totalCount);
            const flavorText = typeof definition.description === 'function'
                ? definition.description(totalCount)
                : (definition.description || monsterType.description);

            return {
                id: definition.key,
                displayName: definition.displayName,
                totalCount,
                level,
                nextLevel,
                color: definition.color || monsterType.color,
                emoji: definition.emoji || monsterType.emoji,
                title: definition.title || monsterType.name,
                flavor: flavorText
            };
        });

        const monsterDetails = [...baseMonsters, ...healthMonsters];

        const totalLevel = monsterDetails.reduce((sum, detail) => sum + detail.level, 0);
        const combinedStage = this.getCombinedMonsterStage(totalLevel);
        const combinedCard = document.createElement('div');
        const combinedClasses = ['monster-card', 'monster-card--legendary'];
        if (combinedStage.className) {
            combinedClasses.push(combinedStage.className);
        }
        combinedCard.className = combinedClasses.join(' ');
        combinedCard.style.setProperty('--monster-legendary-color', combinedStage.color);
        combinedCard.style.setProperty('--monster-legendary-glow', combinedStage.glow);
        combinedCard.style.setProperty('--monster-legendary-gradient', combinedStage.gradient);

        const nextStageThreshold = combinedStage.nextThreshold;
        const levelsToNextStage = nextStageThreshold !== null && nextStageThreshold !== undefined
            ? Math.max(0, nextStageThreshold - totalLevel)
            : null;

        combinedCard.innerHTML = `
            <div class="monster-name">${combinedStage.title}</div>
            <div class="monster-image monster-image--legendary">
                <span>${combinedStage.emoji}</span>
            </div>
            <div class="monster-level">総合Lv.${totalLevel}</div>
            <div class="monster-description">
                <div class="monster-title">${combinedStage.name}</div>
                <div class="monster-flavor">${combinedStage.description}</div>
            </div>
            <div class="monster-stats">
                <span>次のレベルまで: ${levelsToNextStage !== null ? `あと${levelsToNextStage}レベル` : '伝説級達成！'}</span>
            </div>
        `;

        monsterGrid.appendChild(combinedCard);

        monsterDetails.forEach(({ displayName, totalCount, level, title, flavor, color, emoji, nextLevel }) => {
            const monsterCard = document.createElement('div');
            monsterCard.className = 'monster-card';
            const daysToNext = Math.max(0, nextLevel - totalCount);
            
            monsterCard.innerHTML = `
                <div class="monster-name">${displayName}</div>
                <div class="monster-image" style="border-color: ${color}; background: radial-gradient(circle, ${color}33 0%, rgba(0, 0, 0, 0.85) 70%);">
                    <span>${emoji}</span>
                </div>
                <div class="monster-level">Lv.${level}</div>
                <div class="monster-description">
                    <div class="monster-title">${title}</div>
                    <div class="monster-flavor">${flavor}</div>
                </div>
                <div class="monster-stats">
                    <span>次のレベルまで: ${daysToNext}日</span>
                </div>
            `;
            
            monsterGrid.appendChild(monsterCard);
        });
    }

    getCombinedMonsterStage(totalLevel) {
        let currentStage = combinedMonsterStages[0];

        for (const stage of combinedMonsterStages) {
            if (totalLevel >= stage.min) {
                currentStage = stage;
            }
        }

        const nextStage = combinedMonsterStages.find(stage => stage.min > totalLevel);

        return {
            ...currentStage,
            nextThreshold: nextStage ? nextStage.min : null
        };
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
        console.log('🔐 setupEventListeners開始');
        console.log('🔐 DOM状態確認:', {
            readyState: document.readyState,
            body: !!document.body,
            head: !!document.head
        });
        
        // 週移動ボタン
        const prevWeekBtn = document.getElementById('prevWeek');
        const nextWeekBtn = document.getElementById('nextWeek');
        const goToTodayBtn = document.getElementById('goToToday');
        
        console.log('🔐 週移動ボタン要素確認:', {
            prevWeek: !!prevWeekBtn,
            nextWeek: !!nextWeekBtn,
            goToToday: !!goToTodayBtn
        });
        
        if (prevWeekBtn) prevWeekBtn.addEventListener('click', () => this.moveToPrevWeek());
        if (nextWeekBtn) nextWeekBtn.addEventListener('click', () => this.moveToNextWeek());
        if (goToTodayBtn) goToTodayBtn.addEventListener('click', () => this.goToToday());
        
        // スワイプイベントは無効化
        // this.setupSwipeEvents();
        
        // カレンダーモーダル
        document.querySelector('.dropdown-arrow').addEventListener('click', () => this.showCalendarModal());
        document.getElementById('closeCalendar').addEventListener('click', () => this.hideCalendarModal());
        document.getElementById('prevMonth').addEventListener('click', () => this.previousMonth());
        document.getElementById('nextMonth').addEventListener('click', () => this.nextMonth());
        
        // ボトムナビゲーション
        document.getElementById('homeBtn').addEventListener('click', () => this.showHomeView());
        document.getElementById('statsBtn').addEventListener('click', () => this.showStatsView());
        document.getElementById('monsterBtn').addEventListener('click', () => this.showMonsterView());
        document.getElementById('badgeBtn').addEventListener('click', () => this.showBadgeView());
        document.getElementById('settingsBtn').addEventListener('click', () => this.showSettingsView());
        
        // 認証ボタン
        console.log('🔐 認証ボタンの設定開始');
        console.log('🔐 現在のDOM状態:', {
            readyState: document.readyState,
            allElements: document.querySelectorAll('*').length,
            buttons: document.querySelectorAll('button').length
        });
        
        // 少し遅延してボタンが確実に存在することを確認
        setTimeout(() => {
            console.log('🔐 認証ボタン要素を検索中...');
            const loginBtn = document.getElementById('loginBtn');
            const logoutBtn = document.getElementById('logoutBtn');
            const emailInput = document.getElementById('emailInput');
            const passwordInput = document.getElementById('passwordInput');
            const emailSignUpBtn = document.getElementById('emailSignUpBtn');
            const emailLoginBtn = document.getElementById('emailLoginBtn');
            
            console.log('🔐 認証ボタン要素検索結果:', {
                loginBtn: !!loginBtn,
                logoutBtn: !!logoutBtn,
                emailInput: !!emailInput,
                passwordInput: !!passwordInput,
                emailSignUpBtn: !!emailSignUpBtn,
                emailLoginBtn: !!emailLoginBtn
            });
            
            console.log('🔐 ログインボタン要素:', loginBtn);
            console.log('🔐 ログアウトボタン要素:', logoutBtn);
            console.log('🔐 メールサインアップボタン要素:', emailSignUpBtn);
            console.log('🔐 メールログインボタン要素:', emailLoginBtn);
            
            if (loginBtn) {
                console.log('🔐 ログインボタンのイベントリスナーを追加中...');
                console.log('🔐 ログインボタン要素詳細:', {
                    id: loginBtn.id,
                    className: loginBtn.className,
                    textContent: loginBtn.textContent,
                    style: loginBtn.style.cssText
                });
                
                // 既存のイベントリスナーを削除（重複防止）
                loginBtn.removeEventListener('click', this.handleLoginClick);
                
                // 新しいイベントリスナーを追加
                this.handleLoginClick = (event) => {
                    console.log('🔐 ログインボタンがクリックされました！');
                    alert('テスト: Googleログインボタンがクリックされました！');
                    event.preventDefault();
                    event.stopPropagation();
                    console.log('🔐 現在の認証状態:', this.currentUser ? 'ログイン済み' : '未ログイン');
                    console.log('🔐 Firebase認証オブジェクト:', window.firebaseAuth);
                    console.log('🔐 Firebaseプロバイダー:', window.firebaseProvider);
                    console.log('🔐 signInWithRedirect関数:', typeof window.firebaseSignInRedirect);
                    this.signInWithGoogle();
                };
                
                loginBtn.addEventListener('click', this.handleLoginClick);
                console.log('🔐 ログインボタンのイベントリスナー追加完了');
            } else {
                console.error('🔐 ログインボタンが見つかりません！');
            }
            
            if (logoutBtn) {
                console.log('🔐 ログアウトボタンのイベントリスナーを追加中...');
                logoutBtn.addEventListener('click', () => this.signOut());
                console.log('🔐 ログアウトボタンのイベントリスナー追加完了');
            } else {
                console.warn('🔐 ログアウトボタンが見つかりません');
            }

            // メール/パスワード認証ボタン
            if (emailSignUpBtn && emailInput && passwordInput) {
                console.log('🔐 メールサインアップボタンのイベントリスナーを追加中...');
                console.log('🔐 メールサインアップボタン要素詳細:', {
                    id: emailSignUpBtn.id,
                    className: emailSignUpBtn.className,
                    textContent: emailSignUpBtn.textContent
                });
                emailSignUpBtn.addEventListener('click', async (event) => {
                    console.log('🔐 メールサインアップボタンがクリックされました！');
                    alert('テスト: メールサインアップボタンがクリックされました！');
                    event.preventDefault();
                    event.stopPropagation();
                    const email = emailInput.value;
                    const password = passwordInput.value;
                    if (email && password) {
                        try {
                            await this.signUpWithEmail(email, password);
                        } catch (e) {
                            // エラーは関数内で処理済み
                        }
                    } else {
                        alert('メールアドレスとパスワードを入力してください。');
                    }
                });
                console.log('🔐 メールサインアップボタンのイベントリスナー追加完了');
            }

            if (emailLoginBtn && emailInput && passwordInput) {
                console.log('🔐 メールログインボタンのイベントリスナーを追加中...');
                console.log('🔐 メールログインボタン要素詳細:', {
                    id: emailLoginBtn.id,
                    className: emailLoginBtn.className,
                    textContent: emailLoginBtn.textContent
                });
                emailLoginBtn.addEventListener('click', async (event) => {
                    console.log('🔐 メールログインボタンがクリックされました！');
                    alert('テスト: メールログインボタンがクリックされました！');
                    event.preventDefault();
                    event.stopPropagation();
                    const email = emailInput.value;
                    const password = passwordInput.value;
                    if (email && password) {
                        try {
                            await this.loginWithEmail(email, password);
                        } catch (e) {
                            // エラーは関数内で処理済み
                        }
                    } else {
                        alert('メールアドレスとパスワードを入力してください。');
                    }
                });
                console.log('🔐 メールログインボタンのイベントリスナー追加完了');
            }
        }, 100);
        
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
        // レポート機能は削除されました
        const monsterView = document.getElementById('monsterView');
        
        // より確実な判定方法を使用
        if (weekView && weekView.style.display !== 'none' && weekView.offsetParent !== null) {
            return 'week';
        } else if (statsView && statsView.style.display !== 'none' && statsView.offsetParent !== null) {
            return 'stats';
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
            case 'stats':
                this.updateStatsView();
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
    hideAllViews() {
        const viewIds = ['weekView', 'statsView', 'monsterView', 'settingsView', 'badgeView'];
        viewIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = 'none';
            }
        });
    }

    showWeekView() {
        this.hideAllViews();
        const weekView = document.getElementById('weekView');
        if (weekView) {
            weekView.style.display = 'block';
        }
    }

    showHomeView() {
        this.showWeekView();
        this.renderMonthlyCalendar();
        this.renderHealthSummary();
        this.setActiveNav('homeBtn');
    }

    showStatsView() {
        this.hideAllViews();
        const statsView = document.getElementById('statsView');
        if (statsView) {
            statsView.style.display = 'block';
        }
        this.renderTotalChart();
        this.updateMotivationDisplay();
        
        // 統計カードの更新
        const chartData = this.getTotalChartData();
        this.updateStatsCards(chartData);
        
        // 新しい分析セクションの更新
        this.updateHabitAnalysis();
        this.updateAdvice();
        this.updateMotivationAnalysis();
        
        this.setActiveNav('statsBtn');
    }

    showBadgeView() {
        this.hideAllViews();
        const badgeView = document.getElementById('badgeView');
        if (badgeView) {
            badgeView.style.display = 'block';
        }
        this.updateBadgeCenter();
        this.setActiveNav('badgeBtn');
    }

    updateBadgeCenter() {
        this.totalScore = this.calculateTotalScore();
        this.achievements = this.calculateAllAchievements();
        this.renderBadgeCollection();
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

        this.renderBadgeCollection();
        this.updateStatsAnalysis();
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

        const badgeSet = new Set();
        const today = new Date();
        let currentPerfectStreak = 0;
        let maxPerfectStreak = 0;

        const dailyThresholds = {
            10: { current: 0, max: 0, required: 10, name: '10個チェック連続' },
            5: { current: 0, max: 0, required: 20, name: '5個チェック連続' },
            3: { current: 0, max: 0, required: 30, name: '3個チェック連続' },
            1: { current: 0, max: 0, required: 50, name: '1個チェック連続' }
        };

        const randomBadgeFlags = { 2: false, 3: false, 4: false, 5: false, 6: false };
        const dayBadges = { monday: false, friday: false, weekend: false, weekday: false, holiday: false };

        const habitStats = {};
        this.habits.forEach(habit => {
            habitStats[habit.id] = { total: 0, consecutive: 0, maxConsecutive: 0 };
        });

        // 過去から現在に向かって計算（連続日数などを正しく計算するため）
        for (let i = 365; i >= 0; i--) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() - i);
            const dateStr = checkDate.toISOString().split('T')[0];
            const dayHabitsRaw = this.completedHabits[dateStr];
            const dayHabits = Array.isArray(dayHabitsRaw)
                ? dayHabitsRaw
                : (typeof dayHabitsRaw === 'object'
                    ? Object.keys(dayHabitsRaw).filter(key => dayHabitsRaw[key])
                    : []);
            const completedCount = dayHabits.length;

            if (completedCount > 0) {
                achievements.totalDays++;
                const day = checkDate.getDay();
                if (day === 1) dayBadges.monday = true;
                if (day === 5) dayBadges.friday = true;
                if (day === 0 || day === 6) dayBadges.weekend = true;
                if (day >= 1 && day <= 5) dayBadges.weekday = true;
                if (isJapaneseHoliday(checkDate)) dayBadges.holiday = true;
            }

            if (completedCount === this.habits.length && this.habits.length > 0) {
                achievements.perfectDays++;
                currentPerfectStreak++;
                maxPerfectStreak = Math.max(maxPerfectStreak, currentPerfectStreak);
                badgeSet.add('perfect_day');
            } else {
                currentPerfectStreak = 0;
            }

            Object.keys(dailyThresholds).forEach(key => {
                const threshold = Number(key);
                const tracker = dailyThresholds[threshold];
                if (completedCount >= threshold) {
                    tracker.current++;
                    tracker.max = Math.max(tracker.max, tracker.current);
                } else {
                    tracker.current = 0;
                }
            });

            if (completedCount >= 2) randomBadgeFlags[2] = true;
            if (completedCount >= 3) randomBadgeFlags[3] = true;
            if (completedCount >= 4) randomBadgeFlags[4] = true;
            if (completedCount >= 5) randomBadgeFlags[5] = true;
            if (completedCount >= 6) randomBadgeFlags[6] = true;

            this.habits.forEach(habit => {
                const stats = habitStats[habit.id];
                const isCompleted = dayHabits.includes(habit.id);
                if (isCompleted) {
                    stats.total++;
                    stats.consecutive++;
                    stats.maxConsecutive = Math.max(stats.maxConsecutive, stats.consecutive);
                } else {
                    stats.consecutive = 0;
                }
            });
        }

        achievements.currentStreak = currentPerfectStreak;
        achievements.bestStreak = maxPerfectStreak;

        if (achievements.currentStreak >= 1) badgeSet.add('初回達成');
        if (achievements.currentStreak >= 3) badgeSet.add('3日連続');
        if (achievements.currentStreak >= 7) badgeSet.add('7日連続');
        if (achievements.currentStreak >= 14) badgeSet.add('14日連続');
        if (achievements.currentStreak >= 30) badgeSet.add('30日連続');
        if (achievements.currentStreak >= 100) badgeSet.add('100日連続');

        if (achievements.perfectDays >= 10) badgeSet.add('完璧10日');
        if (achievements.perfectDays >= 50) badgeSet.add('完璧50日');
        if (achievements.perfectDays >= 100) badgeSet.add('完璧100日');
        if (maxPerfectStreak >= 7) badgeSet.add('perfect_week');

        Object.values(dailyThresholds).forEach(tracker => {
            if (tracker.max >= tracker.required) {
                badgeSet.add(tracker.name);
            }
        });

        if (randomBadgeFlags[2]) badgeSet.add('ダブルアップ');
        if (randomBadgeFlags[3]) badgeSet.add('サーカス');
        if (randomBadgeFlags[4]) badgeSet.add('アクター');
        if (randomBadgeFlags[5]) badgeSet.add('アーティスト');
        if (randomBadgeFlags[6]) badgeSet.add('ラッキー');

        if (dayBadges.monday) badgeSet.add('月曜日マスター');
        if (dayBadges.friday) badgeSet.add('金曜日キング');
        if (dayBadges.weekend) badgeSet.add('週末戦士');
        if (dayBadges.weekday) badgeSet.add('平日戦士');
        if (dayBadges.holiday) badgeSet.add('祝日マスター');

        const habitTotals = Object.values(habitStats).map(stat => stat.total);
        const habitMaxStreaks = Object.values(habitStats).map(stat => stat.maxConsecutive);
        const highestHabitTotal = habitTotals.length > 0 ? Math.max(...habitTotals) : 0;
        const highestHabitStreak = habitMaxStreaks.length > 0 ? Math.max(...habitMaxStreaks) : 0;
        const healthCounts = this.getHealthCounts();

        if (highestHabitTotal >= 1) badgeSet.add('初心者');
        if (highestHabitTotal >= 10) badgeSet.add('10回達成');
        if (highestHabitTotal >= 50) badgeSet.add('見習い');
        if (highestHabitTotal >= 100) badgeSet.add('100回達成');
        if (highestHabitTotal >= 150) badgeSet.add('修行者');
        if (highestHabitTotal >= 300) badgeSet.add('熟練者');
        if (highestHabitTotal >= 500) badgeSet.add('エキスパート');
        if (highestHabitTotal >= 1000) badgeSet.add('マスター');

        if (highestHabitStreak >= 10) badgeSet.add('10回連続');
        if (highestHabitStreak >= 20) badgeSet.add('20回連続');
        if (highestHabitStreak >= 50) badgeSet.add('50回連続');
        if (highestHabitStreak >= 100) badgeSet.add('100回連続');

        if (this.totalScore >= 50) badgeSet.add('スコア50');
        if (this.totalScore >= 100) badgeSet.add('スコア100');
        if (this.totalScore >= 250) badgeSet.add('スコア250');
        if (this.totalScore >= 500) badgeSet.add('スコア500');
        if (this.totalScore >= 750) badgeSet.add('スコア750');
        if (this.totalScore >= 1000) badgeSet.add('スコア1000');

        if (achievements.totalDays >= 100) badgeSet.add('century');

        const healthBadgeThresholds = {
            healthKeeping: [
                { id: 'health_guardian_lv1', threshold: 3 },
                { id: 'health_guardian_lv2', threshold: 7 },
                { id: 'health_guardian_lv3', threshold: 15 }
            ],
            headMassage: [
                { id: 'head_massage_maestro_lv1', threshold: 3 },
                { id: 'head_massage_maestro_lv2', threshold: 7 },
                { id: 'head_massage_maestro_lv3', threshold: 15 }
            ],
            dentalCleaning: [
                { id: 'dental_cleaning_conqueror_lv1', threshold: 3 },
                { id: 'dental_cleaning_conqueror_lv2', threshold: 7 },
                { id: 'dental_cleaning_conqueror_lv3', threshold: 15 }
            ],
            sauna: [
                { id: 'sauna_sage_lv1', threshold: 3 },
                { id: 'sauna_sage_lv2', threshold: 7 },
                { id: 'sauna_sage_lv3', threshold: 15 }
            ],
            catcafe: [
                { id: 'catcafe_starlight_lv1', threshold: 3 },
                { id: 'catcafe_starlight_lv2', threshold: 7 },
                { id: 'catcafe_starlight_lv3', threshold: 15 }
            ],
            friendParty: [
                { id: 'friend_party_fellow_lv1', threshold: 3 },
                { id: 'friend_party_fellow_lv2', threshold: 7 },
                { id: 'friend_party_fellow_lv3', threshold: 15 }
            ]
        };

        Object.entries(healthBadgeThresholds).forEach(([key, tiers]) => {
            const count = healthCounts[key] || 0;
            tiers.forEach(tier => {
                if (count >= tier.threshold) {
                    badgeSet.add(tier.id);
                }
            });
        });

        achievements.badges = Array.from(badgeSet);
        return achievements;
    }

    renderBadgeCollection() {
        const board = document.getElementById('badgeCategoryBoard');
        if (!board) return;

        const earnedSet = new Set(Array.isArray(this.achievements?.badges) ? this.achievements.badges : []);
        let totalBadges = 0;
        let unlockedBadges = 0;
        let nextTargetBadge = null;
        const unlockedBadgeMap = new Map();

        board.innerHTML = '';

        BADGE_LIBRARY.forEach(category => {
            const categoryCard = document.createElement('div');
            categoryCard.className = 'badge-category-card';

            const header = document.createElement('div');
            header.className = 'badge-category-header';

            const title = document.createElement('div');
            title.className = 'badge-category-title';
            const icon = document.createElement('span');
            icon.className = 'badge-category-icon';
            icon.textContent = category.icon;
            const label = document.createElement('span');
            label.textContent = category.title;
            title.appendChild(icon);
            title.appendChild(label);

            const categoryBadges = category.badges || [];
            const earnedInCategory = categoryBadges.reduce((count, badge) => {
                return count + (isBadgeUnlocked(earnedSet, badge) ? 1 : 0);
            }, 0);
            const progressRate = categoryBadges.length > 0
                ? Math.round((earnedInCategory / categoryBadges.length) * 100)
                : 0;

            const progress = document.createElement('div');
            progress.className = 'badge-category-progress';
            const progressCount = document.createElement('span');
            progressCount.className = 'badge-category-progress-count';
            progressCount.textContent = `${earnedInCategory}/${categoryBadges.length}`;

            const progressBar = document.createElement('div');
            progressBar.className = 'badge-category-progress-bar';
            const progressFill = document.createElement('div');
            progressFill.className = 'badge-category-progress-fill';
            progressFill.style.width = `${progressRate}%`;

            progressBar.appendChild(progressFill);
            progress.appendChild(progressCount);
            progress.appendChild(progressBar);

            header.appendChild(title);
            header.appendChild(progress);

            const grid = document.createElement('div');
            grid.className = 'badge-card-grid';

            categoryBadges.forEach(badge => {
                totalBadges++;
                const unlocked = isBadgeUnlocked(earnedSet, badge);
                if (unlocked) {
                    unlockedBadges++;
                    if (!unlockedBadgeMap.has(badge.id)) {
                        unlockedBadgeMap.set(badge.id, badge);
                    }
                } else if (!nextTargetBadge) {
                    nextTargetBadge = badge;
                }

                const card = document.createElement('div');
                const cardClasses = ['badge-card', unlocked ? 'unlocked' : 'locked'];

                // レイアウトクラスを適用
                if (category.key === 'streak') {
                    cardClasses.push('streak-layout');
                } else if (category.key === 'score') {
                    cardClasses.push('score-layout');
                } else if (category.key === 'combo') {
                    cardClasses.push('continuous-layout');
                } else if (category.key === 'health') {
                    cardClasses.push('healthcare-layout');
                } else if (category.key === 'random') {
                    cardClasses.push('random-layout');
                } else if (category.key === 'calendar') {
                    cardClasses.push('date-layout');
                } else if (category.key === 'habit') {
                    cardClasses.push('habit-layout');
                }
                
                // 統一されたHTMLを適用（全カテゴリ共通）
                card.innerHTML = `
                    <div class="badge-card-top">
                        <span class="badge-status">${unlocked ? '獲得済み' : '未獲得'}</span>
                        <span class="badge-reward">+${badge.gil}ギル</span>
                    </div>
                    <div class="badge-card-body">
                        <div class="badge-icon">${badge.icon}</div>
                        <div class="badge-info">
                            <span class="badge-name">${badge.name}</span>
                            <span class="badge-condition">${badge.condition}</span>
                        </div>
                    </div>
                `;

                card.className = cardClasses.join(' ');

                grid.appendChild(card);
            });

            categoryCard.appendChild(header);
            categoryCard.appendChild(grid);
            board.appendChild(categoryCard);
        });

        const earnedEl = document.getElementById('earnedBadgeCount');
        const totalEl = document.getElementById('totalBadgeCount');
        const rateEl = document.getElementById('badgeCompletionRate');
        const progressEl = document.getElementById('badgeProgressFill');
        const messageEl = document.getElementById('nextBadgeMessage');
        const ownedGrid = document.getElementById('badgeIconGrid');
        const emptyOwnedMessage = document.getElementById('badgeIconEmpty');

        if (earnedEl) earnedEl.textContent = unlockedBadges;
        if (totalEl) totalEl.textContent = totalBadges;
        const overallRate = totalBadges > 0 ? Math.round((unlockedBadges / totalBadges) * 100) : 0;
        if (rateEl) rateEl.textContent = `${overallRate}%`;
        if (progressEl) progressEl.style.width = `${overallRate}%`;

        if (ownedGrid) {
            ownedGrid.innerHTML = '';
            const unlockedBadgeList = Array.from(unlockedBadgeMap.values());

            if (unlockedBadgeList.length > 0) {
                unlockedBadgeList
                    .sort((a, b) => a.name.localeCompare(b.name, 'ja'))
                    .forEach(badge => {
                        const badgeItem = document.createElement('div');
                        badgeItem.className = 'badge-owned-item';
                        badgeItem.setAttribute('title', badge.name);
                        badgeItem.innerHTML = `
                            <span class="badge-owned-icon">${badge.icon}</span>
                        `;
                        ownedGrid.appendChild(badgeItem);
                    });
            }

            if (emptyOwnedMessage) {
                emptyOwnedMessage.style.display = unlockedBadgeList.length === 0 ? 'block' : 'none';
            }
        } else if (emptyOwnedMessage) {
            emptyOwnedMessage.style.display = unlockedBadgeMap.size === 0 ? 'block' : 'none';
        }

        if (messageEl) {
            if (nextTargetBadge) {
                messageEl.innerHTML = `次は<span class="badge-inline-name">「${nextTargetBadge.name}」</span>（+${nextTargetBadge.gil}ギル）を狙おう！<span class="badge-inline-condition">${nextTargetBadge.condition}</span>`;
            } else {
                messageEl.textContent = '全バッジをコンプリートしました！ギルの雨を堪能しましょう！';
            }
        }
    }

    calculateAchievementTotal() {
        const achievements = this.achievements || {};
        const currentStreak = Math.max(0, achievements.currentStreak || 0);
        const perfectDays = Math.max(0, achievements.perfectDays || 0);
        const totalScore = Math.max(0, this.totalScore || 0);

        const uniqueBadges = new Set(Array.isArray(achievements.badges) ? achievements.badges : []);
        let badgeGil = 0;
        uniqueBadges.forEach(badge => {
            badgeGil += getBadgeGilValue(badge);
        });

        const streakBonus = currentStreak * 3;
        const perfectionBonus = perfectDays * 5;
        const activityBonus = totalScore * 2;

        return streakBonus + perfectionBonus + activityBonus + badgeGil;
    }

    updateStatsView() {
        this.renderTotalChart();
        this.updateMotivationDisplay();
        
        // 統計カードの更新
        const chartData = this.getTotalChartData();
        this.updateStatsCards(chartData);
        
        // 新しい分析セクションの更新
        this.updateHabitAnalysis();
        this.updateAdvice();
        this.updateMotivationAnalysis();
    }

    showMonsterView() {
        this.hideAllViews();
        const monsterView = document.getElementById('monsterView');
        if (monsterView) {
            monsterView.style.display = 'block';
        }
        this.renderMonsters();
        this.setActiveNav('monsterBtn');
    }


    showSettingsView() {
        this.hideAllViews();
        const settingsView = document.getElementById('settingsView');
        if (settingsView) {
            settingsView.style.display = 'block';
        }
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
            
            // データの整合性をチェック
            this.validateHabitData(result);
            
            return result;
        } catch (error) {
            console.error('ローカル読み込みエラー:', error);
            return {};
        }
    }

    // 習慣データの整合性をチェック
    validateHabitData(data) {
        if (!data || typeof data !== 'object') {
            console.log('データが無効です。空のオブジェクトにリセットします。');
            return {};
        }

        const today = new Date().toISOString().split('T')[0];
        const invalidDates = [];
        let hasChanges = false;
        
        for (const [dateStr, habits] of Object.entries(data)) {
            // 日付形式をチェック
            if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
                console.warn(`無効な日付形式: ${dateStr}`);
                invalidDates.push(dateStr);
                continue;
            }
            
            // 未来の日付をチェック
            if (dateStr > today) {
                console.warn(`未来の日付のデータを検出: ${dateStr}`, habits);
                invalidDates.push(dateStr);
                continue;
            }
            
            // 習慣データの形式をチェック
            if (!Array.isArray(habits) && typeof habits !== 'object') {
                console.warn(`無効な習慣データ形式: ${dateStr}`, habits);
                invalidDates.push(dateStr);
                continue;
            }
            
            // 古いIDを新しいIDに移行
            if (Array.isArray(habits)) {
                const updatedHabits = habits.map(habitId => {
                    if (habitId === 'ashwagandha' || habitId === 'magnesium') {
                        console.log(`古いIDを移行: ${habitId} -> ashwagandha_magnesium`);
                        hasChanges = true;
                        return 'ashwagandha_magnesium';
                    }
                    return habitId;
                });
                
                // 重複を除去
                const uniqueHabits = [...new Set(updatedHabits)];
                if (uniqueHabits.length !== habits.length || updatedHabits.some((id, index) => id !== habits[index])) {
                    data[dateStr] = uniqueHabits;
                    hasChanges = true;
                }
            } else if (habits && typeof habits === 'object') {
                // オブジェクト形式の場合も処理
                const updatedHabits = {};
                let hasObjectChanges = false;
                
                for (const [habitId, value] of Object.entries(habits)) {
                    if (habitId === 'ashwagandha' || habitId === 'magnesium') {
                        console.log(`古いIDを移行: ${habitId} -> ashwagandha_magnesium`);
                        updatedHabits['ashwagandha_magnesium'] = value;
                        hasObjectChanges = true;
                    } else {
                        updatedHabits[habitId] = value;
                    }
                }
                
                if (hasObjectChanges) {
                    data[dateStr] = updatedHabits;
                    hasChanges = true;
                }
            }
        }
        
        // 無効なデータを削除
        if (invalidDates.length > 0) {
            console.log('無効なデータを削除します:', invalidDates);
            invalidDates.forEach(dateStr => {
                delete data[dateStr];
            });
            hasChanges = true;
        }
        
        // 変更があった場合は保存
        if (hasChanges) {
            console.log('データの移行が完了しました');
            this.completedHabits = data;
            this.saveCompletedHabits();
        }
        
        return data;
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
        const monthDisplay = document.getElementById('currentMonth');
        if (!calendarGrid || !monthDisplay) return;

        const year = this.calendarMonth.getFullYear();
        const month = this.calendarMonth.getMonth();
        
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
            const hasFriendParty = healthStatus.friendParty;

            // 複数選択の組み合わせをチェック
            const selectedCount = [hasHealth, hasMassage, hasDental, hasSauna, hasCatcafe, hasFriendParty].filter(Boolean).length;

            if (selectedCount > 1) {
                dayElement.classList.add('has-both');
                // 複数選択の場合はグラデーション表示
                const colors = [];
                if (hasHealth) colors.push('#28a745');
                if (hasMassage) colors.push('#b8860b');
                if (hasDental) colors.push('#17a2b8');
                if (hasSauna) colors.push('#dc3545');
                if (hasCatcafe) colors.push('#6f42c1');
                if (hasFriendParty) colors.push('#ff6f61');

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
            } else if (hasFriendParty) {
                dayElement.classList.add('has-friendparty');
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
        const prevBtn = document.getElementById('prevMonth');
        const nextBtn = document.getElementById('nextMonth');
        
        if (prevBtn) {
            prevBtn.onclick = () => {
                this.calendarMonth.setMonth(this.calendarMonth.getMonth() - 1);
                this.renderMonthlyCalendar();
            };
        }
        
        if (nextBtn) {
            nextBtn.onclick = () => {
                this.calendarMonth.setMonth(this.calendarMonth.getMonth() + 1);
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

        const friendPartyOption = document.createElement('div');
        friendPartyOption.className = `health-selection-option ${healthStatus.friendParty ? 'selected friend-party' : ''}`;
        friendPartyOption.textContent = 'F';
        friendPartyOption.onclick = () => {
            this.toggleHealthData(dateStr, 'friendParty');
            this.updateHealthDisplay(dayElement, dateStr);
            dropdown.remove();
        };

        dropdown.appendChild(healthOption);
        dropdown.appendChild(massageOption);
        dropdown.appendChild(dentalOption);
        dropdown.appendChild(saunaOption);
        dropdown.appendChild(catcafeOption);
        dropdown.appendChild(friendPartyOption);
        
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
        dayElement.classList.remove('has-health', 'has-massage', 'has-dental', 'has-sauna', 'has-catcafe', 'has-friendparty', 'has-both');
        
        // 複数選択の組み合わせをチェック
        const hasHealth = healthStatus.healthKeeping;
        const hasMassage = healthStatus.headMassage;
        const hasDental = healthStatus.dentalCleaning;
        const hasSauna = healthStatus.sauna;
        const hasCatcafe = healthStatus.catcafe;
        const hasFriendParty = healthStatus.friendParty;

        // 複数選択の組み合わせをチェック
        const selectedCount = [hasHealth, hasMassage, hasDental, hasSauna, hasCatcafe, hasFriendParty].filter(Boolean).length;
        
        if (selectedCount > 1) {
            dayElement.classList.add('has-both');
            // 複数選択の場合はグラデーション表示
            const colors = [];
            if (hasHealth) colors.push('#28a745');
            if (hasMassage) colors.push('#ffc107');
            if (hasDental) colors.push('#17a2b8');
            if (hasSauna) colors.push('#dc3545');
            if (hasCatcafe) colors.push('#6f42c1');
            if (hasFriendParty) colors.push('#ff6f61');
            
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
        } else if (hasFriendParty) {
            dayElement.classList.add('has-friendparty');
            dayElement.style.background = '';
        }
        
        // 集計表を更新
        this.renderHealthSummary();
    }

    // ヘルス集計表をレンダリング（全期間）
    renderHealthSummary() {
        const healthCounts = this.getHealthCounts();

        this.updateSummaryRow('healthKeepingSummary', { count: healthCounts.healthKeeping });
        this.updateSummaryRow('headMassageSummary', { count: healthCounts.headMassage });
        this.updateSummaryRow('dentalCleaningSummary', { count: healthCounts.dentalCleaning });
        this.updateSummaryRow('saunaSummary', { count: healthCounts.sauna });
        this.updateSummaryRow('catcafeSummary', { count: healthCounts.catcafe });
        this.updateSummaryRow('friendPartySummary', { count: healthCounts.friendParty });

        this.evaluateHealthBadges(healthCounts);
    }

    // 集計行を更新
    updateSummaryRow(elementId, data) {
        const row = document.getElementById(elementId);
        if (!row) return;

        const countCell = row.querySelector('.count');
        countCell.textContent = data.count;
    }

    getHealthCounts() {
        const counts = {
            healthKeeping: 0,
            headMassage: 0,
            dentalCleaning: 0,
            sauna: 0,
            catcafe: 0,
            friendParty: 0
        };

        for (const dateStr in this.healthData) {
            const healthStatus = this.healthData[dateStr] || {};

            if (healthStatus.healthKeeping) counts.healthKeeping++;
            if (healthStatus.headMassage) counts.headMassage++;
            if (healthStatus.dentalCleaning) counts.dentalCleaning++;
            if (healthStatus.sauna) counts.sauna++;
            if (healthStatus.catcafe) counts.catcafe++;
            if (healthStatus.friendParty) counts.friendParty++;
        }

        return counts;
    }

    evaluateHealthBadges(healthCounts) {
        const definitions = [
            {
                key: 'healthKeeping',
                tiers: [
                    {
                        id: 'health_guardian_lv1',
                        threshold: 3,
                        title: 'A ヘルス守護者・初級',
                        description: 'ヘルスキーピングを3回達成しました！'
                    },
                    {
                        id: 'health_guardian_lv2',
                        threshold: 7,
                        title: 'A ヘルス守護者・中級',
                        description: 'ヘルスキーピングを7回達成しました！'
                    },
                    {
                        id: 'health_guardian_lv3',
                        threshold: 15,
                        title: 'A ヘルス守護者・達人',
                        description: 'ヘルスキーピングを15回達成しました！'
                    }
                ]
            },
            {
                key: 'headMassage',
                tiers: [
                    {
                        id: 'head_massage_maestro_lv1',
                        threshold: 3,
                        title: 'B ヘッドマイスター・初級',
                        description: 'ヘッドマッサージを3回達成しました！'
                    },
                    {
                        id: 'head_massage_maestro_lv2',
                        threshold: 7,
                        title: 'B ヘッドマイスター・中級',
                        description: 'ヘッドマッサージを7回達成しました！'
                    },
                    {
                        id: 'head_massage_maestro_lv3',
                        threshold: 15,
                        title: 'B ヘッドマイスター・達人',
                        description: 'ヘッドマッサージを15回達成しました！'
                    }
                ]
            },
            {
                key: 'dentalCleaning',
                tiers: [
                    {
                        id: 'dental_cleaning_conqueror_lv1',
                        threshold: 3,
                        title: 'C デンタルチャンピオン・初級',
                        description: '歯科クリーニングを3回達成しました！'
                    },
                    {
                        id: 'dental_cleaning_conqueror_lv2',
                        threshold: 7,
                        title: 'C デンタルチャンピオン・中級',
                        description: '歯科クリーニングを7回達成しました！'
                    },
                    {
                        id: 'dental_cleaning_conqueror_lv3',
                        threshold: 15,
                        title: 'C デンタルチャンピオン・達人',
                        description: '歯科クリーニングを15回達成しました！'
                    }
                ]
            },
            {
                key: 'sauna',
                tiers: [
                    {
                        id: 'sauna_sage_lv1',
                        threshold: 3,
                        title: 'D サウナ賢者・初級',
                        description: 'サウナを3回達成しました！'
                    },
                    {
                        id: 'sauna_sage_lv2',
                        threshold: 7,
                        title: 'D サウナ賢者・中級',
                        description: 'サウナを7回達成しました！'
                    },
                    {
                        id: 'sauna_sage_lv3',
                        threshold: 15,
                        title: 'D サウナ賢者・達人',
                        description: 'サウナを15回達成しました！'
                    }
                ]
            },
            {
                key: 'catcafe',
                tiers: [
                    {
                        id: 'catcafe_starlight_lv1',
                        threshold: 3,
                        title: 'E キャットギルド・初級',
                        description: '猫カフェを3回達成しました！'
                    },
                    {
                        id: 'catcafe_starlight_lv2',
                        threshold: 7,
                        title: 'E キャットギルド・中級',
                        description: '猫カフェを7回達成しました！'
                    },
                    {
                        id: 'catcafe_starlight_lv3',
                        threshold: 15,
                        title: 'E キャットギルド・達人',
                        description: '猫カフェを15回達成しました！'
                    }
                ]
            },
            {
                key: 'friendParty',
                tiers: [
                    {
                        id: 'friend_party_fellow_lv1',
                        threshold: 3,
                        title: 'F 懇親会ギルド・初級',
                        description: '懇親会を3回達成しました！'
                    },
                    {
                        id: 'friend_party_fellow_lv2',
                        threshold: 7,
                        title: 'F 懇親会ギルド・中級',
                        description: '懇親会を7回達成しました！'
                    },
                    {
                        id: 'friend_party_fellow_lv3',
                        threshold: 15,
                        title: 'F 懇親会ギルド・達人',
                        description: '懇親会を15回達成しました！'
                    }
                ]
            }
        ];

        let unlocked = false;

        definitions.forEach(def => {
            const count = healthCounts[def.key] || 0;
            def.tiers.forEach(tier => {
                if (count >= tier.threshold) {
                    const granted = this.giveBadge(tier.id, tier.title, tier.description);
                    if (granted) {
                        unlocked = true;
                    }
                }
            });
        });

        if (unlocked) {
            this.saveAchievements();
        }
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
            return true;
        }
        return false;
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
    console.log('🔐 DOMContentLoaded: アプリ初期化開始');
    
    // Firebase認証の初期化を待つ
    const initApp = () => {
        console.log('🔐 Firebase認証オブジェクトの確認:', {
            firebaseAuth: !!window.firebaseAuth,
            firebaseProvider: !!window.firebaseProvider,
            firebaseDb: !!window.firebaseDb
        });
        
        if (window.firebaseAuth && window.firebaseProvider && window.firebaseDb) {
            console.log('🔐 Firebase認証オブジェクトが利用可能です');
            const app = new HabitTracker();
            window.habitTracker = app; // グローバルに保存
            
            // データ更新イベントは無効化（データ上書きを防ぐため）
            console.log('データ更新イベントは無効化されています');
        } else {
            console.log('🔐 Firebase認証オブジェクトを待機中...');
            setTimeout(initApp, 100);
        }
    };
    
    initApp();
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