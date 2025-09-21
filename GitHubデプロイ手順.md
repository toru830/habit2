# GitHubデプロイ手順

## 1. GitHubリポジトリの作成

1. [GitHub.com](https://github.com) にアクセス
2. 右上の「+」→「New repository」をクリック
3. リポジトリ名: `habit-tracker-app`
4. 説明: `週間習慣トラッカー - PWA対応`
5. Public を選択
6. 「Create repository」をクリック

## 2. ローカルリポジトリとGitHubを接続

以下のコマンドを実行してください：

```bash
git remote add origin https://github.com/YOUR_USERNAME/habit-tracker-app.git
git branch -M main
git push -u origin main
```

## 3. GitHub Pagesの設定

1. GitHubリポジトリの「Settings」タブをクリック
2. 左メニューの「Pages」をクリック
3. Source: 「Deploy from a branch」を選択
4. Branch: 「main」を選択
5. Folder: 「/ (root)」を選択
6. 「Save」をクリック

## 4. 本番URLの確認

数分後に以下のURLでアプリにアクセスできます：
`https://YOUR_USERNAME.github.io/habit-tracker-app/`

## 5. スマホでのテスト

1. スマホのブラウザで本番URLにアクセス
2. 「ホーム画面に追加」でアプリ化
3. 習慣をチェックして同期をテスト

## 注意事項

- Firebase設定は既に完了しているため、本番環境でも同期機能が動作します
- 初回アクセス時は少し時間がかかる場合があります
- PWA機能は対応ブラウザでのみ利用可能です
