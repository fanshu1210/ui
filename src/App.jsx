import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import PublicGalleryPage from './pages/PublicGalleryPage';
import WorkspacePage from './pages/WorkspacePage';
import HistoryPage from './pages/HistoryPage';
import SDKDocsPage from './pages/SDKDocsPage';
import { AuthProvider } from './context/AuthContext';
import AuthModals from './components/AuthModals';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-dark text-white font-sans">
          <Sidebar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={<PublicGalleryPage />} />
              <Route path="/workspace" element={<WorkspacePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/docs" element={<SDKDocsPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <AuthModals />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
