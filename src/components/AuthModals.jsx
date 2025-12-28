import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthModals = () => {
  const { 
    isLoginModalOpen, 
    isSignupModalOpen, 
    setIsLoginModalOpen, 
    setIsSignupModalOpen,
    login,
    signup
  } = useAuth();

  // 登录表单状态
  const [loginForm, setLoginForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  // 注册表单状态
  const [signupForm, setSignupForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  // 错误信息状态
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');

  // 处理登录表单变化
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  // 处理注册表单变化
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm(prev => ({ ...prev, [name]: value }));
  };

  // 处理登录提交
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      login(loginForm.username, loginForm.email, loginForm.password);
      setIsLoginModalOpen(false);
      // 重置表单
      setLoginForm({ username: '', email: '', password: '' });
    } catch (error) {
      setLoginError(error.message);
    }
  };

  // 处理注册提交
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setSignupError('');

    try {
      signup(signupForm.username, signupForm.email, signupForm.password);
      setIsSignupModalOpen(false);
      // 自动打开登录模态框
      setIsLoginModalOpen(true);
      // 重置表单
      setSignupForm({ username: '', email: '', password: '' });
    } catch (error) {
      setSignupError(error.message);
    }
  };

  // 关闭模态框
  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
    setLoginError('');
    setSignupError('');
  };

  return (
    <>
      {/* 登录模态框 */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl border border-gray-700 p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Login</h2>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={closeModals}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            
            {loginError && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded-md mb-4">
                {loginError}
              </div>
            )}
            
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label htmlFor="login-username" className="block text-sm font-medium text-gray-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="login-username"
                  name="username"
                  value={loginForm.username}
                  onChange={handleLoginChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter your username"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Login
              </button>
              
              <div className="text-center text-sm text-gray-400">
                Don't have an account? 
                <button 
                  type="button" 
                  className="text-accent hover:text-accent/80 ml-1"
                  onClick={() => {
                    setIsLoginModalOpen(false);
                    setIsSignupModalOpen(true);
                  }}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 注册模态框 */}
      {isSignupModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl border border-gray-700 p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Sign Up</h2>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={closeModals}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            
            {signupError && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded-md mb-4">
                {signupError}
              </div>
            )}
            
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label htmlFor="signup-username" className="block text-sm font-medium text-gray-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="signup-username"
                  name="username"
                  value={signupForm.username}
                  onChange={handleSignupChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Choose a username"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  value={signupForm.email}
                  onChange={handleSignupChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="signup-password"
                  name="password"
                  value={signupForm.password}
                  onChange={handleSignupChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Create a password"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Sign Up
              </button>
              
              <div className="text-center text-sm text-gray-400">
                Already have an account? 
                <button 
                  type="button" 
                  className="text-accent hover:text-accent/80 ml-1"
                  onClick={() => {
                    setIsSignupModalOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModals;