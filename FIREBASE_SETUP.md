# Firebase設定手順

Googleアカウントでログインしてデータをクラウドに保存する機能を有効にするための手順です。

## 1. Firebaseプロジェクトの作成

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 「プロジェクトを作成」をクリック
3. プロジェクト名を入力（例：habit-tracker-app）
4. Google Analyticsは任意で有効/無効
5. プロジェクトを作成

## 2. Authenticationの設定

1. Firebase Consoleでプロジェクトを選択
2. 左メニューから「Authentication」をクリック
3. 「始める」をクリック
4. 「Sign-in method」タブをクリック
5. 「Google」を有効にする
6. プロジェクトのサポートメールを設定
7. 「保存」をクリック

## 3. Firestore Databaseの設定

1. 左メニューから「Firestore Database」をクリック
2. 「データベースを作成」をクリック
3. セキュリティルールを選択：
   - テストモード（開発用）
   - 本番モード（本格運用時）
4. ロケーションを選択（asia-northeast1推奨）
5. 「完了」をクリック

## 4. Webアプリの設定

1. プロジェクト設定（歯車アイコン）をクリック
2. 「全般」タブで「マイアプリ」セクションを確認
3. 「Webアプリを追加」をクリック
4. アプリのニックネームを入力（例：habit-tracker-web）
5. 「Firebase Hostingも設定する」は任意
6. 「アプリを登録」をクリック
7. 設定オブジェクトをコピー

## 5. 設定の適用

1. コピーした設定オブジェクトを `index.html` の `firebaseConfig` に貼り付け
2. 以下のように置き換え：

```javascript
const firebaseConfig = {
    apiKey: "実際のAPIキー",
    authDomain: "実際のプロジェクトID.firebaseapp.com",
    projectId: "実際のプロジェクトID",
    storageBucket: "実際のプロジェクトID.appspot.com",
    messagingSenderId: "実際の送信者ID",
    appId: "実際のアプリID"
};
```

## 6. セキュリティルールの設定（本番用）

Firestore Database > ルールタブで以下のルールを設定：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ユーザーは自分のデータのみアクセス可能
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 7. 動作確認

1. アプリを開く
2. 「Googleでログイン」ボタンをクリック
3. Googleアカウントでログイン
4. 習慣をチェックしてデータが保存されることを確認
5. 別のブラウザやデバイスで同じアカウントでログインしてデータが同期されることを確認

## トラブルシューティング

### ログインできない場合
- Firebase設定が正しく設定されているか確認
- ブラウザのコンソールでエラーメッセージを確認
- Authenticationの設定でGoogleが有効になっているか確認

### データが保存されない場合
- Firestore Databaseのセキュリティルールを確認
- ブラウザのコンソールでエラーメッセージを確認
- ネットワーク接続を確認

### デバッグ方法
ブラウザのコンソールで以下のコマンドを実行：
- `debugHabitTracker.showData()` - 現在のデータを表示
- `debugHabitTracker.saveToCloud()` - クラウドに手動保存
- `debugHabitTracker.loadFromCloud()` - クラウドから手動読み込み
