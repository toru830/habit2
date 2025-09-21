// Firebase設定ファイル
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, connectFirestoreEmulator } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAuth, connectAuthEmulator } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Firebase設定
const firebaseConfig = {
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
const db = getFirestore(app);
const auth = getAuth(app);

// エミュレーター接続を無効化（本番環境用）
// if (location.hostname === 'localhost') {
//   try {
//     connectFirestoreEmulator(db, 'localhost', 8080);
//     connectAuthEmulator(auth, 'http://localhost:9099');
//   } catch (error) {
//     console.log('エミュレーターは既に接続されています');
//   }
// }

export { db, auth };
