// Firebase設定の自動化スクリプト
// このスクリプトは設定手順をガイドします

class FirebaseSetupGuide {
    constructor() {
        this.setupSteps = [
            {
                step: 1,
                title: "Firebase Console にアクセス",
                description: "https://console.firebase.google.com/ を開いてGoogleアカウントでログイン",
                action: () => this.openFirebaseConsole()
            },
            {
                step: 2,
                title: "プロジェクトを作成",
                description: "「プロジェクトを作成」をクリックしてプロジェクト名を入力",
                action: () => this.createProject()
            },
            {
                step: 3,
                title: "Firestore Database を設定",
                description: "「Firestore Database」→「データベースを作成」→「本番モードで開始」",
                action: () => this.setupFirestore()
            },
            {
                step: 4,
                title: "Authentication を設定",
                description: "「Authentication」→「始める」→「Sign-in method」→「匿名」を有効化",
                action: () => this.setupAuth()
            },
            {
                step: 5,
                title: "Webアプリを追加",
                description: "プロジェクト設定→「アプリを追加」→「Web」→設定オブジェクトをコピー",
                action: () => this.addWebApp()
            },
            {
                step: 6,
                title: "設定ファイルを更新",
                description: "コピーした設定をfirebase-config.jsに貼り付け",
                action: () => this.updateConfig()
            }
        ];
    }

    async startSetup() {
        console.log("🚀 Firebase設定を開始します...");
        
        for (const step of this.setupSteps) {
            console.log(`\n📋 ステップ ${step.step}: ${step.title}`);
            console.log(`📝 ${step.description}`);
            
            const proceed = confirm(`ステップ ${step.step} を実行しますか？\n\n${step.title}\n${step.description}`);
            
            if (proceed) {
                try {
                    await step.action();
                    console.log(`✅ ステップ ${step.step} 完了`);
                } catch (error) {
                    console.error(`❌ ステップ ${step.step} でエラー:`, error);
                    const retry = confirm("エラーが発生しました。再試行しますか？");
                    if (retry) {
                        await step.action();
                    }
                }
            } else {
                console.log(`⏭️ ステップ ${step.step} をスキップ`);
            }
        }
        
        console.log("\n🎉 Firebase設定が完了しました！");
        this.testConnection();
    }

    openFirebaseConsole() {
        window.open("https://console.firebase.google.com/", "_blank");
        return new Promise(resolve => {
            setTimeout(() => {
                alert("Firebase Consoleが開きました。\nGoogleアカウントでログインしてください。");
                resolve();
            }, 1000);
        });
    }

    createProject() {
        alert("Firebase Consoleで：\n1. 「プロジェクトを作成」をクリック\n2. プロジェクト名を入力（例：habit-tracker-app）\n3. Googleアナリティクスを有効化\n4. 「プロジェクトを作成」をクリック");
    }

    setupFirestore() {
        alert("Firestore Databaseの設定：\n1. 左メニューから「Firestore Database」を選択\n2. 「データベースを作成」をクリック\n3. 「本番モードで開始」を選択\n4. ロケーションを「asia-northeast1 (東京)」に設定\n5. 「完了」をクリック");
        
        // セキュリティルールも設定
        setTimeout(() => {
            alert("セキュリティルールの設定：\n1. 「ルール」タブをクリック\n2. 既存のルールを以下に置き換え：\n\nrules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /users/{userId} {\n      allow read, write: if request.auth != null && request.auth.uid == userId;\n    }\n  }\n}");
        }, 2000);
    }

    setupAuth() {
        alert("Authenticationの設定：\n1. 左メニューから「Authentication」を選択\n2. 「始める」をクリック\n3. 「Sign-in method」タブを選択\n4. 「匿名」をクリック\n5. 「有効にする」をクリック\n6. 「保存」をクリック");
    }

    addWebApp() {
        alert("Webアプリの追加：\n1. 左メニューから「プロジェクトの設定」（歯車アイコン）を選択\n2. 「全般」タブの下部で「アプリを追加」→「Web」を選択\n3. アプリのニックネーム：habit-tracker-web\n4. 「Firebase Hosting を設定」はチェックしない\n5. 「アプリを登録」をクリック\n6. 表示される設定オブジェクトをコピー");
        
        // 設定オブジェクトのテンプレートを表示
        setTimeout(() => {
            const configTemplate = `const firebaseConfig = {
  apiKey: "コピーした値を貼り付け",
  authDomain: "コピーした値を貼り付け",
  projectId: "コピーした値を貼り付け",
  storageBucket: "コピーした値を貼り付け",
  messagingSenderId: "コピーした値を貼り付け",
  appId: "コピーした値を貼り付け"
};`;
            
            alert(`設定オブジェクトのテンプレート：\n\n${configTemplate}\n\nこの内容をコピーして、firebase-config.jsの9-15行目に貼り付けてください。`);
        }, 3000);
    }

    updateConfig() {
        alert("設定ファイルの更新：\n1. firebase-config.jsファイルを開く\n2. 9-15行目のfirebaseConfigを更新\n3. コピーした設定値を貼り付け\n4. ファイルを保存");
        
        // 設定ファイルを開く
        setTimeout(() => {
            const openFile = confirm("firebase-config.jsファイルを開きますか？");
            if (openFile) {
                // ファイルを開く（ローカル環境では制限があるため、手動で開いてもらう）
                alert("firebase-config.jsファイルを手動で開いて、設定を更新してください。");
            }
        }, 2000);
    }

    testConnection() {
        alert("設定完了後のテスト：\n1. ブラウザでアプリをリロード（Ctrl+Shift+R）\n2. 同期ステータスバーが表示されることを確認\n3. 習慣をチェックして同期されることを確認\n4. 別のデバイスで同じURLを開いて同期を確認");
    }
}

// 設定ガイドを開始
const setupGuide = new FirebaseSetupGuide();

// ページ読み込み時の設定ガイドは無効化（既に設定済みのため）
// window.addEventListener('load', () => {
//     setTimeout(() => {
//         const startSetup = confirm("Firebase設定を開始しますか？\n\nこの設定により、複数デバイス間でデータが同期されるようになります。");
//         if (startSetup) {
//             setupGuide.startSetup();
//         }
//     }, 2000);
// });
