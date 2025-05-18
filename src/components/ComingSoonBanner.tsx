import React from 'react';
import { motion } from 'framer-motion';

const ComingSoonBanner: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white/90 backdrop-blur-md p-10 rounded-xl text-center max-w-md mx-4 shadow-2xl border-4 border-amber-600/30"
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
      >
        <motion.div 
          className="text-4xl text-amber-600 font-bold mb-2"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          ✨
        </motion.div>
        <h2 className="text-3xl font-korean-title text-amber-800 mb-4">준비 중입니다</h2>
        <p className="text-gray-700 mb-6">
          조금만 기다려주세요!<br />
          웨딩 사진은 6월 3일에 올라올 예정입니다.
        </p>
        <div className="flex justify-center space-x-2">
          <motion.div 
            className="w-3 h-3 rounded-full bg-amber-500"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
          />
          <motion.div 
            className="w-3 h-3 rounded-full bg-amber-600"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
          />
          <motion.div 
            className="w-3 h-3 rounded-full bg-amber-700"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ComingSoonBanner; 