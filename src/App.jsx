import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import PublicGalleryPage from './pages/PublicGalleryPage';
import WorkspacePage from './pages/WorkspacePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark text-white font-sans">
        <Sidebar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<PublicGalleryPage />} />
            <Route path="/workspace" element={<WorkspacePage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
