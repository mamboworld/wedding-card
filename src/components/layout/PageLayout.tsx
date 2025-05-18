import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import PageNavigation from '../PageNavigation';

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
      
      {showNavigation && <PageNavigation />}
    </div>
  );
};

export default PageLayout; 