import React, { useState } from 'react';

interface EmailAuthProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<boolean>;
  onSignup: (email: string, password: string) => Promise<boolean>;
}

const EmailAuth: React.FC<EmailAuthProps> = ({ isOpen, onClose, onLogin, onSignup }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      if (isLoginMode) {
        const success = await onLogin(email, password);
        if (success) {
          onClose();
          setEmail('');
          setPassword('');
        } else {
          setMessage('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
        }
      } else {
        if (password !== confirmPassword) {
          setMessage('パスワードが一致しません。');
          setIsLoading(false);
          return;
        }
        if (password.length < 6) {
          setMessage('パスワードは6文字以上で入力してください。');
          setIsLoading(false);
          return;
        }
        const success = await onSignup(email, password);
        if (success) {
          onClose();
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        } else {
          setMessage('アカウント作成に失敗しました。');
        }
      }
    } catch (error) {
      setMessage('エラーが発生しました。');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>アカウント認証</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="auth-tabs">
          <button 
            className={`tab ${isLoginMode ? 'active' : ''}`}
            onClick={() => setIsLoginMode(true)}
          >
            ログイン
          </button>
          <button 
            className={`tab ${!isLoginMode ? 'active' : ''}`}
            onClick={() => setIsLoginMode(false)}
          >
            新規登録
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>メールアドレス:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>パスワード:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isLoginMode ? "パスワード" : "パスワード（6文字以上）"}
              required
            />
          </div>

          {!isLoginMode && (
            <div className="form-group">
              <label>パスワード確認:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="パスワード再入力"
                required
              />
            </div>
          )}

          <div className="form-actions">
            <button type="submit" disabled={isLoading}>
              {isLoading ? '処理中...' : (isLoginMode ? 'ログイン' : '新規登録')}
            </button>
            <button type="button" onClick={onClose}>
              キャンセル
            </button>
          </div>

          {message && (
            <div className={`message ${message.includes('失敗') || message.includes('エラー') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EmailAuth;
