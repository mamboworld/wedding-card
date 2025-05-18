import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import PageLayout from '../components/layout/PageLayout';
import ComingSoonBanner from '../components/ComingSoonBanner';

// 임시 이미지 URL (나중에 실제 사진으로 교체)
const images = [
  {
    original: 'https://via.placeholder.com/800x600?text=Wedding+Photo+1',
    thumbnail: 'https://via.placeholder.com/250x150?text=Photo+1',
    description: '함께한 첫 여행',
  },
  {
    original: 'https://via.placeholder.com/800x600?text=Wedding+Photo+2',
    thumbnail: 'https://via.placeholder.com/250x150?text=Photo+2',
    description: '프로포즈 순간',
  },
  {
    original: 'https://via.placeholder.com/800x600?text=Wedding+Photo+3',
    thumbnail: 'https://via.placeholder.com/250x150?text=Photo+3',
    description: '우리의 추억',
  },
  {
    original: 'https://via.placeholder.com/800x600?text=Wedding+Photo+4',
    thumbnail: 'https://via.placeholder.com/250x150?text=Photo+4',
    description: '특별한 날',
  },
  {
    original: 'https://via.placeholder.com/800x600?text=Wedding+Photo+5',
    thumbnail: 'https://via.placeholder.com/250x150?text=Photo+5',
    description: '행복한 시간',
  },
];

const GalleryPage: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  return (
    <PageLayout>
      <ComingSoonBanner />
      
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
              오랜 시간 함께해온 우리의 이야기가 이 사진들 속에 담겨 있습니다.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-sm bg-hogwarts-gold/20 rounded-full">첫 만남</span>
              <span className="px-3 py-1 text-sm bg-hogwarts-gold/20 rounded-full">여행</span>
              <span className="px-3 py-1 text-sm bg-hogwarts-gold/20 rounded-full">프로포즈</span>
              <span className="px-3 py-1 text-sm bg-hogwarts-gold/20 rounded-full">데이트</span>
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