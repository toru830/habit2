# Firebase設定ガイド

## 1. Firebaseプロジェクトの作成

1. [Firebase Console](https://console.firebase.google.com/)にアクセス
2. 「プロジェクトを作成」をクリック
3. プロジェクト名を入力（例：habit-tracker-app）
4. Googleアナリティクスは必要に応じて有効化
5. 「プロジェクトを作成」をクリック

## 2. Firestore Databaseの設定

1. 左メニューから「Firestore Database」を選択
2. 「データベースを作成」をクリック
3. セキュリティルール：
   - テストモードで開始（後で本番用に変更）
   - または本番モードで開始
4. ロケーションを選択（asia-northeast1 推奨）

## 3. Authenticationの設定

1. 左メニューから「Authentication」を選択
2. 「始める」をクリック
3. 「Sign-in method」タブを選択
4. 「匿名」を有効化

## 4. Webアプリの設定

1. 左メニューから「プロジェクトの設定」（歯車アイコン）を選択
2. 「全般」タブの下部で「アプリを追加」→「Web」を選択
3. アプリのニックネームを入力（例：habit-tracker-web）
4. 「Firebase Hosting を設定」はチェックしない
5. 「アプリを登録」をクリック
6. 設定オブジェクトをコピー

## 5. firebase-config.jsの更新

コピーした設定オブジェクトを`firebase-config.js`の`firebaseConfig`に貼り付け：

```javascript
const firebaseConfig = {
  apiKey: "実際のAPIキー",
  authDomain: "実際のプロジェクトID.firebaseapp.com",
  projectId: "実際のプロジェクトID",
  storageBucket: "実際のプロジェクトID.appspot.com",
  messagingSenderId: "実際のSenderID",
  appId: "実際のAppID"
};
```

## 6. セキュリティルールの設定

Firestore Databaseの「ルール」タブで以下のルールを設定：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ユーザーは自分のデータのみ読み書き可能
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 7. ローカル開発用エミュレーター（オプション）

```bash
# Firebase CLIをインストール
npm install -g firebase-tools

# ログイン
firebase login

# エミュレーターを初期化
firebase init emulators

# エミュレーターを起動
firebase emulators:start
```

## 8. 本番環境での注意事項

- 匿名認証は本番環境でも使用可能
- データは自動的にバックアップされる
- ストレージ料金に注意（無料枠あり）
- 必要に応じて認証方法を追加（メール/パスワード等）

## トラブルシューティング

### エラー: "Firebase App named '[DEFAULT]' already exists"
- ページをリロードして解決

### エラー: "Permission denied"
- Firestoreのセキュリティルールを確認
- 認証状態を確認

### エラー: "Network request failed"
- インターネット接続を確認
- Firebase設定を確認

