import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useWedding } from '../contexts/WeddingContext';
import PageLayout from '../components/layout/PageLayout';

const IntroPage: React.FC = () => {
  const { weddingInfo, getDaysRemaining } = useWedding();
  const daysRemaining = getDaysRemaining();
  
  useEffect(() => {
    // 페이지 로드 시 상단으로 스크롤
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout showNavigation={false}>
      <div className="h-screen flex flex-col justify-center items-center">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="magic-title text-5xl mb-3">결혼합니다</h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <p className="text-gray-700 mb-1 font-korean">
              <span className="font-semibold">{weddingInfo.groomParents.father} • {weddingInfo.groomParents.mother}</span>의 장남 <span className="font-medium">{weddingInfo.groomName.split(' ')[0]}</span>
            </p>
            <p className="text-gray-700 mb-8 font-korean">
              <span className="font-semibold">{weddingInfo.brideParents.father} • {weddingInfo.brideParents.mother}</span>의 장녀 <span className="font-medium">{weddingInfo.brideName.split(' ')[0]}</span>
            </p>
          </motion.div>
          
          <motion.div
            className="my-6 p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            <p className="text-lg leading-relaxed text-gray-800 italic font-korean">
              "따사로운 햇살 속에 시작된 이야기<br />
              여름밤 별이 증인이 되어 줍니다<br />
              이제 맞이할 모든 계절도<br />
              늘 함께하며 깊어져가겠습니다.<br />
              함께 자리하여 축복해주세요."
            </p>
          </motion.div>
          
          <motion.div
            className="mt-10 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
          >
            <div className="text-2xl mb-1 font-korean">{weddingInfo.date}</div>
            <div className="text-xl text-gray-700 font-korean">{weddingInfo.time}</div>
            <div className="text-lg mt-2 text-gray-700 font-korean">
              {weddingInfo.venue} / {weddingInfo.address}
            </div>
            <div className="mt-4 inline-block px-4 py-2 bg-hogwarts-red text-white rounded-full font-korean">
              D-{daysRemaining}
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.5 }}
        >
          <Link to="/main" className="magic-btn inline-block font-korean">
            초대장 열기
            <span className="ml-2">→</span>
          </Link>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default IntroPage; 