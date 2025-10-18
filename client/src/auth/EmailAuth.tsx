import React, { useState } from 'react';
import { AuthService } from '../services/AuthService';
import '../styles/auth.css';

interface EmailAuthProps {
  onAuthSuccess: (user: { email: string; id: string }) => void;
  onClose: () => void;
}

const EmailAuth: React.FC<EmailAuthProps> = ({ onAuthSuccess, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const authService = new AuthService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (isLogin) {
      const user = await authService.login(email, password);
      if (user) {
        setMessage({ text: 'ログイン成功！', type: 'success' });
        onAuthSuccess(user);
      } else {
        setMessage({ text: 'ログイン失敗。メールアドレスまたはパスワードが間違っています。', type: 'error' });
      }
    } else {
      if (password !== confirmPassword) {
        setMessage({ text: 'パスワードが一致しません。', type: 'error' });
        return;
      }
      if (password.length < 6) {
        setMessage({ text: 'パスワードは6文字以上で入力してください。', type: 'error' });
        return;
      }
      const user = await authService.signup(email, password);
      if (user) {
        setMessage({ text: '新規登録成功！', type: 'success' });
        onAuthSuccess(user);
      } else {
        setMessage({ text: '新規登録失敗。このメールアドレスは既に登録されているか、無効です。', type: 'error' });
      }
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-content">
        <h2 className="auth-title">{isLogin ? 'ログイン' : '新規登録'}</h2>
        
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${isLogin ? 'active' : ''}`} 
            onClick={() => setIsLogin(true)}
          >
            ログイン
          </button>
          <button 
            className={`auth-tab ${!isLogin ? 'active' : ''}`} 
            onClick={() => setIsLogin(false)}
          >
            新規登録
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">メールアドレス:</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="auth-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">パスワード:</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="auth-input"
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">パスワード確認:</label>
              <input 
                type="password" 
                id="confirmPassword" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
                className="auth-input"
              />
            </div>
          )}
          
          {message && (
            <p className={`auth-message ${message.type === 'error' ? 'error' : 'success'}`}>
              {message.text}
            </p>
          )}

          <div className="auth-actions">
            <button type="submit" className="auth-submit-btn">
              {isLogin ? 'ログイン' : '新規登録'}
            </button>
            <button type="button" onClick={onClose} className="auth-cancel-btn">
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailAuth;
