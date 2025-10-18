// Firebase設定ファイル
// 実際のプロジェクト設定に置き換えてください

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

export const firebaseConfig = {
    apiKey: "AIzaSyDzu_ky2Sz0x0wG0UfVzUF68HiTUnu6euY",
    authDomain: "habit-tracker0830.firebaseapp.com",
    projectId: "habit-tracker0830",
    storageBucket: "habit-tracker0830.firebasestorage.app",
    messagingSenderId: "1012307413614",
    appId: "1:1012307413614:web:3c772a588c4d0825c3f47f",
    measurementId: "G-NCQSMFEPQL"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Firebase設定の取得方法：
// 1. Firebase Console (https://console.firebase.google.com/) にアクセス
// 2. プロジェクトを作成または選択
// 3. プロジェクト設定 > 全般 > マイアプリ > Webアプリを追加
// 4. 設定オブジェクトをコピーして上記の値に置き換える