import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import PageLayout from '../components/layout/PageLayout';
// import ComingSoonBanner from '../components/ComingSoonBanner';
import image1 from '../assets/images/image1.jpeg';
import image2 from '../assets/images/image2.jpeg';
import image3 from '../assets/images/image3.jpeg';

const images = [
  {
    original: image1,
    thumbnail: image1,
    description: '우리의 추억 1',
  },
  {
    original: image2,
    thumbnail: image2,
    description: '우리의 추억 2',
  },
  {
    original: image3,
    thumbnail: image3,
    description: '우리의 추억 3',
  },
];

const GalleryPage: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotice, setShowNotice] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowNotice(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout>
      {/* 6월 3일 업로드 예정 팝업 광고 */}
      {showNotice && (
        <div className="fixed top-8 left-1/2 z-50 -translate-x-1/2 bg-amber-100 border border-amber-300 shadow-xl rounded-xl px-6 py-4 flex items-center gap-3 animate-fade-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-amber-600 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <span className="text-amber-900 font-bold text-lg">웨딩사진은 6월 3일에 올라올 예정입니다!</span>
        </div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="magic-title mb-8 text-center">우리의 이야기</h1>
        
        <div className={`card ${isFullscreen ? 'fixed inset-0 z-50 p-0 rounded-none bg-black/90' : ''}`}>
          <div className="gallery-container">
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={true}
              showNav={true}
              showThumbnails={true}
              thumbnailPosition="bottom"
              onScreenChange={(fullscreen: boolean) => setIsFullscreen(fullscreen)}
              renderCustomControls={() => (
                <div className="absolute top-2 right-2 z-10">
                  {isFullscreen && (
                    <button
                      className="bg-white/20 backdrop-blur-sm p-2 rounded-full"
                      onClick={() => setIsFullscreen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              )}
            />
          </div>
        </div>
        
        <div className="mt-8">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">우리의 아름다운 추억</h2>
            <p className="text-gray-700 mb-4">
              유예찬과 박수희의 특별한 순간들을 담은 사진들입니다. 
              함께해온 우리의 이야기가 이 사진들 속에 담겨 있습니다.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-sm bg-hogwarts-gold/20 rounded-full">첫 만남</span>
              <span className="px-3 py-1 text-sm bg-hogwarts-gold/20 rounded-full">여행</span>
              <span className="px-3 py-1 text-sm bg-hogwarts-gold/20 rounded-full">데이트</span>
              <span className="px-3 py-1 text-sm bg-hogwarts-gold/20 rounded-full">웨딩사진(6월 3일 예정)</span>
            </div>
          </div>
          
          <motion.p 
            className="text-center text-gray-500 mt-6 italic text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            "그리고 이제 새로운 이야기가 시작됩니다"
          </motion.p>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default GalleryPage; 