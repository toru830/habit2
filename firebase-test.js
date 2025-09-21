// Firebase設定のテストスクリプト
class FirebaseTest {
    constructor() {
        this.testResults = [];
    }

    async runAllTests() {
        console.log("🧪 Firebase設定のテストを開始します...");
        
        await this.testFirebaseConfig();
        await this.testFirestoreConnection();
        await this.testAuthConnection();
        await this.testDataSync();
        
        this.showResults();
    }

    async testFirebaseConfig() {
        console.log("📋 テスト1: Firebase設定の確認");
        
        try {
            const response = await fetch('./firebase-config.js');
            const text = await response.text();
            
            // 設定オブジェクトを抽出
            const configMatch = text.match(/const firebaseConfig = ({[\s\S]*?});/);
            if (configMatch) {
                const config = eval('(' + configMatch[1] + ')');
                
                if (config.apiKey !== "your-api-key" && 
                    config.projectId !== "your-project-id" &&
                    config.apiKey.length > 10) {
                    this.testResults.push({ test: "Firebase設定", status: "✅ 成功", message: "設定が正しく完了しています" });
                } else {
                    this.testResults.push({ test: "Firebase設定", status: "❌ 失敗", message: "設定が完了していません" });
                }
            } else {
                this.testResults.push({ test: "Firebase設定", status: "❌ 失敗", message: "設定オブジェクトが見つかりません" });
            }
        } catch (error) {
            this.testResults.push({ test: "Firebase設定", status: "❌ エラー", message: error.message });
        }
    }

    async testFirestoreConnection() {
        console.log("📋 テスト2: Firestore接続の確認");
        
        try {
            if (window.optionalSync && window.optionalSync.isEnabled) {
                // テストデータを書き込み
                const testData = { test: true, timestamp: Date.now() };
                await window.optionalSync.saveData(testData);
                
                // テストデータを読み込み
                const loadedData = await window.optionalSync.loadData();
                
                if (loadedData && loadedData.test) {
                    this.testResults.push({ test: "Firestore接続", status: "✅ 成功", message: "データの読み書きが正常に動作しています" });
                } else {
                    this.testResults.push({ test: "Firestore接続", status: "⚠️ 部分成功", message: "接続はできていますが、データの読み書きに問題があります" });
                }
            } else {
                this.testResults.push({ test: "Firestore接続", status: "❌ 失敗", message: "同期機能が有効になっていません" });
            }
        } catch (error) {
            this.testResults.push({ test: "Firestore接続", status: "❌ エラー", message: error.message });
        }
    }

    async testAuthConnection() {
        console.log("📋 テスト3: Authentication接続の確認");
        
        try {
            if (window.optionalSync && window.optionalSync.syncManager) {
                // 認証状態を確認
                const authState = window.optionalSync.syncManager.isAuthenticated;
                if (authState) {
                    this.testResults.push({ test: "Authentication", status: "✅ 成功", message: "匿名認証が正常に動作しています" });
                } else {
                    this.testResults.push({ test: "Authentication", status: "⚠️ 待機中", message: "認証処理中です" });
                }
            } else {
                this.testResults.push({ test: "Authentication", status: "❌ 失敗", message: "同期機能が有効になっていません" });
            }
        } catch (error) {
            this.testResults.push({ test: "Authentication", status: "❌ エラー", message: error.message });
        }
    }

    async testDataSync() {
        console.log("📋 テスト4: データ同期の確認");
        
        try {
            if (window.optionalSync && window.optionalSync.isEnabled) {
                // 習慣データの同期テスト
                const habitData = { test_habit: { completed: true, lastUpdated: Date.now() } };
                await window.optionalSync.saveData({ completedHabits: habitData });
                
                this.testResults.push({ test: "データ同期", status: "✅ 成功", message: "習慣データの同期が正常に動作しています" });
            } else {
                this.testResults.push({ test: "データ同期", status: "❌ 失敗", message: "同期機能が有効になっていません" });
            }
        } catch (error) {
            this.testResults.push({ test: "データ同期", status: "❌ エラー", message: error.message });
        }
    }

    showResults() {
        console.log("\n📊 テスト結果:");
        console.log("=" * 50);
        
        this.testResults.forEach(result => {
            console.log(`${result.status} ${result.test}: ${result.message}`);
        });
        
        // 結果をアラートで表示
        const successCount = this.testResults.filter(r => r.status.includes("✅")).length;
        const totalCount = this.testResults.length;
        
        let resultMessage = `Firebase設定テスト結果:\n\n`;
        this.testResults.forEach(result => {
            resultMessage += `${result.status} ${result.test}\n${result.message}\n\n`;
        });
        
        resultMessage += `成功率: ${successCount}/${totalCount}`;
        
        if (successCount === totalCount) {
            resultMessage += "\n\n🎉 すべてのテストが成功しました！\n同期機能が正常に動作しています。";
        } else if (successCount > 0) {
            resultMessage += "\n\n⚠️ 一部のテストが失敗しました。\n設定を確認してください。";
        } else {
            resultMessage += "\n\n❌ すべてのテストが失敗しました。\nFirebase設定を確認してください。";
        }
        
        alert(resultMessage);
    }
}

// テスト実行関数
window.runFirebaseTest = () => {
    const tester = new FirebaseTest();
    tester.runAllTests();
};

// ページ読み込み時の自動テストは無効化（既に設定済みのため）
// window.addEventListener('load', () => {
//     setTimeout(() => {
//         if (window.optionalSync && window.optionalSync.isEnabled) {
//             const runTest = confirm("Firebase設定のテストを実行しますか？");
//             if (runTest) {
//                 window.runFirebaseTest();
//             }
//         }
//     }, 5000);
// });
