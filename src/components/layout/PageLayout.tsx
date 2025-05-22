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
      style={backgroundImage ? { 
        background: `url(${backgroundImage}) no-repeat center center`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed' 
      } : {}}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 backdrop-blur-sm z-[-1]"></div>
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