import React, { useState, useEffect } from 'react';
import EmailAuth from './auth/EmailAuth';
import { authService } from './services/AuthService';
import './styles/auth.css';

interface MemoData {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const App: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memos, setMemos] = useState<MemoData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMemoTitle, setNewMemoTitle] = useState('');
  const [newMemoContent, setNewMemoContent] = useState('');

  useEffect(() => {
    // 認証状態を確認
    setIsLoggedIn(authService.isLoggedIn());
    
    // メモデータを読み込み
    loadMemos();
  }, []);

  const loadMemos = async () => {
    try {
      // ローカルストレージから読み込み
      const localMemos = JSON.parse(localStorage.getItem('memo_data') || '[]');
      setMemos(localMemos);

      // ログイン済みの場合はクラウドからも読み込み
      if (authService.isLoggedIn()) {
        const cloudData = await authService.loadFromCloud();
        if (cloudData && cloudData.memos) {
          setMemos(cloudData.memos);
          localStorage.setItem('memo_data', JSON.stringify(cloudData.memos));
        }
      }
    } catch (error) {
      console.error('メモ読み込みエラー:', error);
    }
  };

  const saveMemos = async (memoData: MemoData[]) => {
    try {
      // ローカルストレージに保存
      localStorage.setItem('memo_data', JSON.stringify(memoData));
      setMemos(memoData);

      // ログイン済みの場合はクラウドにも保存
      if (authService.isLoggedIn()) {
        await authService.saveToCloud({ memos: memoData });
      }
    } catch (error) {
      console.error('メモ保存エラー:', error);
    }
  };

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    const success = await authService.login(email, password);
    if (success) {
      setIsLoggedIn(true);
      await loadMemos(); // クラウドからデータを読み込み
    }
    return success;
  };

  const handleSignup = async (email: string, password: string): Promise<boolean> => {
    const success = await authService.signup(email, password);
    if (success) {
      setIsLoggedIn(true);
    }
    return success;
  };

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
  };

  const addMemo = () => {
    if (!newMemoTitle.trim()) return;

    const newMemo: MemoData = {
      id: Date.now().toString(),
      title: newMemoTitle,
      content: newMemoContent,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedMemos = [newMemo, ...memos];
    saveMemos(updatedMemos);
    
    setNewMemoTitle('');
    setNewMemoContent('');
  };

  const deleteMemo = (id: string) => {
    const updatedMemos = memos.filter(memo => memo.id !== id);
    saveMemos(updatedMemos);
  };

  const filteredMemos = memos.filter(memo =>
    memo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    memo.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>メモ</h1>
        <div className="header-actions">
          {isLoggedIn ? (
            <>
              <button className="auth-button sync-btn" onClick={() => loadMemos()}>
                同期
              </button>
              <button className="auth-button logout-btn" onClick={handleLogout}>
                ログアウト ({authService.getCurrentUser()?.email})
              </button>
            </>
          ) : (
            <button className="auth-button login-btn" onClick={() => setIsAuthModalOpen(true)}>
              ログイン
            </button>
          )}
        </div>
      </header>

      <main className="app-main">
        <div className="search-section">
          <input
            type="text"
            placeholder="メモを検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="quick-create">
          <h3>クイック作成</h3>
          <div className="quick-buttons">
            <button 
              className="quick-btn"
              onClick={() => {
                setNewMemoTitle('買い物');
                setNewMemoContent('');
              }}
            >
              🛒 買い物
            </button>
            <button 
              className="quick-btn"
              onClick={() => {
                setNewMemoTitle('仕事');
                setNewMemoContent('');
              }}
            >
              💼 仕事
            </button>
          </div>
        </div>

        <div className="memo-form">
          <input
            type="text"
            placeholder="メモのタイトル"
            value={newMemoTitle}
            onChange={(e) => setNewMemoTitle(e.target.value)}
            className="memo-title-input"
          />
          <textarea
            placeholder="メモの内容"
            value={newMemoContent}
            onChange={(e) => setNewMemoContent(e.target.value)}
            className="memo-content-input"
          />
          <button onClick={addMemo} className="add-memo-btn">
            メモを追加
          </button>
        </div>

        <div className="memos-list">
          {filteredMemos.map(memo => (
            <div key={memo.id} className="memo-item">
              <h4>{memo.title}</h4>
              <p>{memo.content}</p>
              <div className="memo-actions">
                <span className="memo-date">
                  {new Date(memo.createdAt).toLocaleDateString()}
                </span>
                <button 
                  onClick={() => deleteMemo(memo.id)}
                  className="delete-btn"
                >
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <EmailAuth
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </div>
  );
};

export default App;
