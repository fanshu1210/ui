import React, { createContext, useState, useEffect, useContext } from 'react';

// 创建认证上下文
const AuthContext = createContext(null);

// 认证提供者组件
export const AuthProvider = ({ children }) => {
  // 从localStorage加载用户数据
  const loadUsers = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };

  // 从localStorage加载当前用户
  const loadCurrentUser = () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  };

  const [users, setUsers] = useState(loadUsers());
  const [currentUser, setCurrentUser] = useState(loadCurrentUser());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  // 注册新用户
  const signup = (username, email, password) => {
    // 检查用户名是否已存在
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // 创建新用户
    const newUser = {
      id: Date.now(),
      username,
      email,
      password
    };

    // 更新用户列表
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    return newUser;
  };

  // 用户登录
  const login = (username, email, password) => {
    // 查找匹配的用户
    const user = users.find(user => 
      user.username === username && 
      user.email === email && 
      user.password === password
    );

    if (!user) {
      throw new Error('Invalid username, email, or password');
    }

    // 设置当前用户
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));

    return user;
  };

  // 用户登出
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // 上下文值
  const contextValue = {
    currentUser,
    isLoginModalOpen,
    isSignupModalOpen,
    setIsLoginModalOpen,
    setIsSignupModalOpen,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 自定义钩子，方便组件使用认证上下文
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};