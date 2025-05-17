import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

type PageLayoutProps = {
  children: ReactNode;
  showNavigation?: boolean;
};

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
    },
  },
};

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  showNavigation = true 
}) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <motion.main
        className="flex-1 max-w-sm mx-auto w-full px-4 py-6 pb-24 md:max-w-2xl"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.main>
      
      {showNavigation && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-lg border-t border-amber-200 z-50">
          <div className="max-w-md mx-auto flex justify-around items-center">
            <NavLink to="/" label="인트로" icon="✨" active={location.pathname === '/'} />
            <NavLink to="/main" label="정보" icon="📅" active={location.pathname === '/main'} />
            <NavLink to="/gallery" label="사진" icon="🖼️" active={location.pathname === '/gallery'} />
            <NavLink to="/rsvp" label="참석" icon="✉️" active={location.pathname === '/rsvp'} />
            <NavLink to="/wishlist" label="선물" icon="🎁" active={location.pathname === '/wishlist'} />
          </div>
        </nav>
      )}

      {/* 모바일 안내 배너 */}
      <motion.div 
        className="fixed top-0 left-0 right-0 bg-amber-600 text-white text-center text-sm py-1 z-50 md:hidden"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        화면을 세로로 돌려 모바일 화면에 최적화된 청첩장을 확인하세요
      </motion.div>
    </div>
  );
};

// 내비게이션 링크 컴포넌트
type NavLinkProps = {
  to: string;
  label: string;
  icon: string;
  active: boolean;
};

const NavLink: React.FC<NavLinkProps> = ({ to, label, icon, active }) => {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center py-3 px-2 relative ${
        active ? 'text-amber-700 font-semibold' : 'text-gray-600'
      }`}
    >
      <span className="text-xl mb-1">{icon}</span>
      <span className="text-xs font-korean">{label}</span>
      {active && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600"
          layoutId="navIndicator"
        />
      )}
    </Link>
  );
};

export default PageLayout; 