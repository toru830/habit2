// 自動化機能のテストスクリプト
console.log("🧪 自動化機能のテストを開始します...");

// 1. ファイルの存在確認
const files = [
    'firebase-setup-automated.js',
    'firebase-test.js', 
    'sync-optional.js',
    'firebase-config.js'
];

files.forEach(file => {
    fetch(`./${file}`)
        .then(response => {
            if (response.ok) {
                console.log(`✅ ${file} - 読み込み成功`);
            } else {
                console.log(`❌ ${file} - 読み込み失敗`);
            }
        })
        .catch(error => {
            console.log(`❌ ${file} - エラー: ${error.message}`);
        });
});

// 2. グローバル変数の確認
setTimeout(() => {
    console.log("\n📋 グローバル変数の確認:");
    console.log("window.optionalSync:", typeof window.optionalSync);
    console.log("window.runFirebaseTest:", typeof window.runFirebaseTest);
    console.log("window.setupGuide:", typeof window.setupGuide);
}, 3000);

// 3. DOM要素の確認
setTimeout(() => {
    console.log("\n📋 DOM要素の確認:");
    console.log("syncStatusBar:", document.getElementById('syncStatusBar') ? "存在" : "不存在");
    console.log("forceSyncBtn:", document.getElementById('forceSyncBtn') ? "存在" : "不存在");
    console.log("firebaseTestBtn:", document.getElementById('firebaseTestBtn') ? "存在" : "不存在");
}, 5000);

// 4. 自動化機能のテスト
setTimeout(() => {
    console.log("\n📋 自動化機能のテスト:");
    
    if (window.setupGuide) {
        console.log("✅ FirebaseSetupGuide が利用可能");
    } else {
        console.log("❌ FirebaseSetupGuide が利用できません");
    }
    
    if (window.runFirebaseTest) {
        console.log("✅ FirebaseTest が利用可能");
    } else {
        console.log("❌ FirebaseTest が利用できません");
    }
    
    if (window.optionalSync) {
        console.log("✅ OptionalSyncManager が利用可能");
        console.log("同期機能の状態:", window.optionalSync.isEnabled ? "有効" : "無効");
    } else {
        console.log("❌ OptionalSyncManager が利用できません");
    }
}, 7000);

// 5. 手動テストの実行
setTimeout(() => {
    console.log("\n🚀 手動テストを実行します:");
    
    // Firebase設定ガイドのテスト
    if (window.setupGuide && window.setupGuide.startSetup) {
        console.log("Firebase設定ガイドをテスト実行...");
        // 実際には実行しない（テスト用）
        console.log("✅ 設定ガイドの関数が利用可能");
    }
    
    // Firebaseテストの実行
    if (window.runFirebaseTest) {
        console.log("Firebaseテストを実行...");
        // 実際には実行しない（テスト用）
        console.log("✅ テスト関数が利用可能");
    }
}, 9000);

console.log("\n⏰ テストは10秒後に完了します...");



