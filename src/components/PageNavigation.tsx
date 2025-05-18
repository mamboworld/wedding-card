import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PageNavigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // 페이지 정보 정의 - 참석 탭 제거
  const pages = [
    { name: '정보', path: '/main', icon: '📝' },
    { name: '사진', path: '/gallery', icon: '🖼️' },
    { name: '선물', path: '/wishlist', icon: '🎁' },
  ];
  
  // 현재 페이지 인덱스 찾기
  const currentIndex = pages.findIndex(page => page.path === currentPath);
  
  // 이전/다음 페이지 경로 계산
  const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const nextPage = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;
  
  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center px-4">
      <motion.div 
        className="bg-white/80 backdrop-blur-md rounded-full shadow-lg p-1 flex justify-between items-center border border-amber-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 모든 페이지 버튼 */}
        <div className="flex space-x-1">
          {pages.map((page) => (
            <Link 
              key={page.path} 
              to={page.path}
              className={`relative px-3 py-2 rounded-full flex flex-col items-center justify-center transition-all duration-300 min-w-16 ${
                currentPath === page.path 
                  ? 'bg-amber-500 text-white font-medium' 
                  : 'text-gray-600 hover:bg-amber-100'
              }`}
            >
              <span className="text-lg mb-0.5">{page.icon}</span>
              <span className="text-xs">{page.name}</span>
              {currentPath === page.path && (
                <motion.div
                  className="absolute -bottom-1 w-1.5 h-1.5 bg-white rounded-full"
                  layoutId="navigation-dot"
                  transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </div>
      </motion.div>
      
      {/* 이전/다음 페이지 화살표 (큰 화면에서만 표시) */}
      <div className="hidden md:block">
        {prevPage && (
          <Link 
            to={prevPage.path}
            className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-amber-100 hover:bg-amber-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
        )}
        
        {nextPage && (
          <Link 
            to={nextPage.path}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-amber-100 hover:bg-amber-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
      
      {/* 모바일 스와이프 힌트 (현재 페이지에 따라 표시) */}
      <div className="fixed bottom-24 left-0 right-0 flex justify-between px-4 md:hidden">
        {prevPage && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 0.7, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs shadow-sm text-amber-800"
          >
            <span className="mr-1">←</span>
            {prevPage.name}
          </motion.div>
        )}
        
        {nextPage && (
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 0.7, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs shadow-sm text-amber-800 ml-auto"
          >
            {nextPage.name}
            <span className="ml-1">→</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PageNavigation; 