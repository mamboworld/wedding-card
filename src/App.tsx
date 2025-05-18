import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// 페이지 컴포넌트
import IntroPage from './pages/IntroPage';
import MainPage from './pages/MainPage';
import GalleryPage from './pages/GalleryPage';
import WishlistPage from './pages/WishlistPage';

// 컨텍스트 
import { WeddingProvider } from './contexts/WeddingContext';

function App() {
  return (
    <WeddingProvider>
      <Router>
        <div className="min-h-screen relative overflow-hidden">
          <MagicBackground />
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </div>
      </Router>
    </WeddingProvider>
  );
}

// 마법 배경 효과 컴포넌트
function MagicBackground() {
  const [particles, setParticles] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 30; i++) {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = Math.random() * 4 + 1;
        const animationDuration = Math.random() * 3 + 2;
        const delay = Math.random() * 3;
        
        newParticles.push(
          <div
            key={i}
            className="particle"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDuration: `${animationDuration}s`,
              animationDelay: `${delay}s`
            }}
          />
        );
      }
      setParticles(newParticles);
    };

    createParticles();
    const interval = setInterval(createParticles, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50 to-amber-100 opacity-60" />
    </div>
  );
}

export default App;
