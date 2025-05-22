import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import PageNavigation from '../PageNavigation';

type PageLayoutProps = {
  children: ReactNode;
  showNavigation?: boolean;
  backgroundImage?: string;
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
  showNavigation = true,
  backgroundImage
}) => {
  return (
    <div 
      className="min-h-screen flex flex-col" 
    >
      {backgroundImage && (
        <>
          {/* Background Image Layer - Fixed to viewport */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundImage: `url(${backgroundImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              backgroundSize: 'contain',
              zIndex: -2, 
            }}
          />
          {/* Overlay Layer (gradient + blur) - Fixed to viewport */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))', // Tailwind: from-black/10 to-black/30
              backdropFilter: 'blur(4px)', // Tailwind: backdrop-blur-sm
              zIndex: -1, 
            }}
          />
        </>
      )}
      <motion.main
        className="flex-1 max-w-sm mx-auto w-full px-4 py-6 pb-24 md:max-w-2xl relative z-10"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.main>
      
      {showNavigation && <PageNavigation />}
    </div>
  );
};

export default PageLayout; 