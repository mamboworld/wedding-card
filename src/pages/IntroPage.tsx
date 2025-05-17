import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useWedding } from '../contexts/WeddingContext';
import PageLayout from '../components/layout/PageLayout';
import backgroundImage from '../assets/images/background_intro_wedding.png';

// 네이버 지도 링크
const NAVER_MAP_URL = "https://naver.me/F9N45Mo5";

const IntroPage: React.FC = () => {
  const { weddingInfo, getDaysRemaining } = useWedding();
  const daysRemaining = getDaysRemaining();
  
  useEffect(() => {
    // 페이지 로드 시 상단으로 스크롤
    window.scrollTo(0, 0);

    // 스크롤 이벤트 리스너 추가
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // 문서 끝에 도달했는지 확인
      if (scrollPosition + windowHeight >= documentHeight) {
        // 스크롤 위치를 마지막 섹션으로 제한
        window.scrollTo(0, documentHeight - windowHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <PageLayout showNavigation={false}>
      {/* 스냅 스크롤을 위한 컨테이너 */}
      <div 
        className="flex flex-col items-center snap-y snap-mandatory h-screen overflow-y-scroll overscroll-none snap-container hide-scrollbar"
        style={{ scrollSnapType: 'y mandatory', backgroundColor: 'transparent' }}
      >
        {/* 첫 번째 섹션: 고정 배경 이미지와 기본 정보 */}
        <div 
          className="min-h-screen w-full flex flex-col justify-center items-center relative pt-4 snap-start snap-always snap-section"
          style={{
            background: `url(${backgroundImage}) no-repeat center center`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* 이미지 위에 반투명 오버레이 추가 */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-white/60 backdrop-blur-sm"></div>
          
          <motion.div 
            className="text-center relative z-10 px-6 md:px-12 max-w-sm mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="magic-title text-5xl mb-4 text-amber-700">결혼합니다</h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mb-3"
            >
              <div className="text-2xl font-korean-title text-amber-800 mb-4">
                유예찬 <span className="text-amber-600">♥</span> 박수희
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="mt-4"
            >
              <p className="text-gray-800 mb-1 font-korean text-base">
                <span className="font-semibold">{weddingInfo.groomParents.father} • {weddingInfo.groomParents.mother}</span>의 장남 {weddingInfo.groomName.split(' ')[0]}
              </p>
              <p className="text-gray-800 font-korean text-base">
                <span className="font-semibold">{weddingInfo.brideParents.father} • {weddingInfo.brideParents.mother}</span>의 장녀 {weddingInfo.brideName.split(' ')[0]}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              className="mt-16"
            >
              <Link to="#invite" className="text-amber-600 flex flex-col items-center">
                <span>아래로 스크롤</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* 두 번째 섹션: INVITE 문구 */}
        <div 
          id="invite"
          className="min-h-screen w-full flex flex-col justify-center items-center relative snap-start snap-always snap-section"
          style={{
            background: `url(${backgroundImage}) no-repeat center center`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
          
          <motion.div
            className="relative z-10 p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg max-w-sm mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-korean-title text-amber-700 text-center mb-6">INVITE</h2>
            <p className="text-lg leading-relaxed text-gray-800 font-korean text-center">
              따사로운 햇살 속에 시작된 이야기<br />
              여름밤 별이 증인이 되어 줍니다<br />
              이제 맞이할 모든 계절도<br />
              늘 함께하며 깊어져가겠습니다.<br />
              함께 자리하여 축복해주세요.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 relative z-10"
          >
            <Link to="#details" className="text-amber-600 flex flex-col items-center">
              <span>아래로 스크롤</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </Link>
          </motion.div>
        </div>
        
        {/* 세 번째 섹션: 날짜와 장소 정보 */}
        <div 
          id="details"
          className="min-h-screen w-full flex flex-col justify-center items-center relative snap-start snap-always snap-section"
          style={{
            background: `url(${backgroundImage}) no-repeat center center`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
          
          <motion.div
            className="relative z-10 text-center px-6 max-w-sm mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-2xl font-korean-title text-amber-900 mb-1 whitespace-nowrap">
              2025년 6월 28일 토요일
            </div>
            <div className="text-xl text-amber-800 font-korean-title mb-8">
              오후 4시 10분
            </div>
            
            <a 
              href={NAVER_MAP_URL} 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xl text-amber-700 font-korean font-semibold mb-2 whitespace-nowrap hover:text-amber-500 transition-colors"
            >
              그레이스 파티
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </a>
            <div className="text-sm text-amber-700 font-korean mb-1">
              서울특별시 관악구 신림동 1485-1번지
            </div>
            <div className="text-sm text-amber-700 font-korean">
              신림역 2호선 근방
            </div>
            
            <div className="mt-8 inline-block px-6 py-2 bg-amber-700 text-white rounded-full font-korean shadow-lg">
              D-{daysRemaining}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 relative z-10"
          >
            <Link to="/main" className="magic-btn inline-block font-korean bg-amber-600 hover:bg-amber-700 shadow-lg">
              청첩장 상세보기
              <span className="ml-2">→</span>
            </Link>
          </motion.div>
        </div>
        
        {/* 스크롤 제한을 위한 숨겨진 요소 - 추가 스크롤 방지 */}
        <div className="h-0 w-full snap-start snap-always snap-section overflow-hidden"></div>
      </div>
    </PageLayout>
  );
};

export default IntroPage; 