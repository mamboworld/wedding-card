import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// body에 wand-cursor 클래스 추가
document.body.classList.add('wand-cursor');

// 별 생성 함수
const createStars = () => {
  const starsContainer = document.createElement('div');
  starsContainer.className = 'stars-container';
  
  // 랜덤 별 생성
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    const size = Math.random();
    
    if (size < 0.6) {
      star.className = 'star small';
    } else if (size < 0.9) {
      star.className = 'star medium';
    } else {
      star.className = 'star large';
    }
    
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    
    starsContainer.appendChild(star);
  }
  
  document.body.appendChild(starsContainer);
};

// 앱 로드 시 별 생성
window.addEventListener('load', createStars);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
