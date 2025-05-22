import React, { useEffect, useState, ReactNode, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useWedding } from '../contexts/WeddingContext';
import PageLayout from '../components/layout/PageLayout';
import backgroundImage from '../assets/images/background_intro_wedding.jpg';

// 네이버 지도 링크
const NAVER_MAP_URL = "https://naver.me/F9N45Mo5";

// 남은 시간 타입 정의
type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// 마법 효과 카운트다운 타이머 컴포넌트
const MagicCountdownTimer: React.FC<{ eventDate: Date }> = ({ eventDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    const calculateTimeLeft = () => {
      const difference = eventDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    // 초기 계산
    calculateTimeLeft();
    
    // 1초마다 업데이트
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [eventDate]);

  // 처음에는 숨겼다가 마운트 후 표시
  if (!mounted) return null;

  return (
    <div className="mt-8 mb-6">
      <div className="text-center mb-5">
        <h3 className="text-2xl font-korean-title text-amber-800 mb-1">D-{timeLeft.days}</h3>
        <p className="text-lg font-korean text-amber-700">우리의 새로운 시작까지!</p>
      </div>
      <div className="grid grid-cols-4 gap-4 justify-items-center">
        <MagicTimeBlock value={timeLeft.days} label="일" gradientFrom="from-amber-300" gradientTo="to-amber-500" />
        <MagicTimeBlock value={timeLeft.hours} label="시간" gradientFrom="from-amber-400" gradientTo="to-amber-600" />
        <MagicTimeBlock value={timeLeft.minutes} label="분" gradientFrom="from-amber-500" gradientTo="to-amber-700" />
        <MagicTimeBlock value={timeLeft.seconds} label="초" gradientFrom="from-amber-600" gradientTo="to-amber-800" />
      </div>
    </div>
  );
};

// 최적화된 러블리 파티클 컴포넌트
// const LovelyParticles: React.FC = () => { // LovelyParticles 주석 처리
//   const [particles, setParticles] = useState<ReactNode[]>([]);
  
//   // 파티클 생성 함수를 useCallback으로 메모이제이션
//   const createParticles = useCallback(() => {
//     const newParticles: ReactNode[] = [];
//     const particleCount = 10; // 파티클 수 감소 (25 -> 10)
    
//     for (let i = 0; i < particleCount; i++) {
//       // 랜덤 크기, 위치, 애니메이션 시간
//       const size = Math.random() * 4 + 2;
//       const xPos = Math.random() * 100;
//       const yPos = Math.random() * 100;
//       const delay = Math.random() * 5;
//       const duration = Math.random() * 12 + 8;
      
//       // 파티클 종류 랜덤 선택 (하트, 별, 원)
//       const types = ['heart', 'star', 'circle'];
//       const type = types[Math.floor(Math.random() * types.length)];
      
//       // 파티클 색상 랜덤 선택 (따뜻한 색상 팔레트)
//       const colors = [
//         'rgba(255, 223, 186, 0.4)', // 불투명도 감소
//         'rgba(255, 202, 212, 0.4)',
//         'rgba(255, 236, 209, 0.4)',
//         'rgba(245, 215, 181, 0.4)',
//         'rgba(254, 200, 154, 0.4)'
//       ];
//       const color = colors[Math.floor(Math.random() * colors.length)];
      
//       // 파티클 요소 생성
//       newParticles.push(
//         <div
//           key={`lovely-particle-${i}-${Date.now()}`}
//           className={`lovely-particle lovely-particle-${type} absolute will-change-transform`}
//           style={{
//             width: `${size}px`,
//             height: `${size}px`,
//             left: `${xPos}%`,
//             top: `${yPos}%`,
//             backgroundColor: color,
//             animationDelay: `${delay}s`,
//             animationDuration: `${duration}s`,
//             opacity: 0
//           }}
//         />
//       );
//     }
    
//     // 이전 파티클 교체 방식으로 변경 (추가가 아닌 교체)
//     setParticles(newParticles);
//   }, []);
  
//   useEffect(() => {
//     // 초기 파티클 생성
//     createParticles();
    
//     // 더 긴 간격으로 파티클 갱신
//     const interval = setInterval(createParticles, 10000); // 5초에서 10초로 변경
    
//     return () => clearInterval(interval);
//   }, [createParticles]);
  
//   // 성능 최적화를 위해 fixed 포지션과 낮은 z-index 사용
//   return (
//     <div className=\"lovely-particles-container fixed inset-0 overflow-hidden pointer-events-none z-5\">
//       {particles}
//     </div>
//   );
// };

// 마법 효과 시간 블록 컴포넌트
const MagicTimeBlock: React.FC<{ 
  value: number; 
  label: string;
  gradientFrom: string;
  gradientTo: string;
}> = ({ value, label, gradientFrom, gradientTo }) => {
  // 파티클 상태 추가 (메모이제이션 적용)
  const particles = useMemo(() => {
    const particleElements: ReactNode[] = [];
    const particleCount = 3; // 파티클 수 감소 (5 -> 3)
    
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 2 + 1; // 크기 축소
      const xPos = Math.random() * 100;
      const yPos = Math.random() * 100;
      const delay = Math.random() * 2;
      const duration = Math.random() * 2 + 1;
      
      particleElements.push(
        <div
          key={`particle-${i}-${Math.random()}`}
          className="magic-particle absolute will-change-transform"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${xPos}%`,
            top: `${yPos}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
          }}
        />
      );
    }
    
    return particleElements;
  }, [value]); // 값이 변경될 때만 재생성
  
  return (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={`relative w-16 h-16 md:w-18 md:h-18 bg-gradient-to-b ${gradientFrom} ${gradientTo} text-white rounded-full flex items-center justify-center shadow-lg overflow-hidden magic-countdown-block will-change-transform`}
        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        whileTap={{ scale: 0.95 }}
      >
        {/* 반짝이는 효과 */}
        <div className="absolute inset-0 sparkle-effect"></div>
        
        {/* 테두리 효과 */}
        <div className="absolute inset-0 border-2 border-amber-300/50 rounded-full"></div>
        
        {/* 파티클 효과 */}
        <div className="magic-particles">
          {particles}
        </div>
        
        {/* 숫자 */}
        <motion.span 
          className="text-xl md:text-2xl font-bold z-10"
          key={value}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {value.toString().padStart(2, '0')}
        </motion.span>
      </motion.div>
      <motion.div 
        className={`bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-0.5 rounded-full mt-2 shadow-md text-xs backdrop-blur-sm`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
};

const IntroPage: React.FC = () => {
  const { weddingInfo, getDaysRemaining, eventDate } = useWedding();
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
    <PageLayout showNavigation={false} backgroundImage={backgroundImage}>
      {/* 러블리 파티클 배경 */}
      {/* <LovelyParticles /> */}
      
      {/* 스냅 스크롤을 위한 컨테이너 */}
      <div 
        className="flex flex-col items-center snap-y snap-mandatory h-screen overflow-y-scroll overscroll-none snap-container hide-scrollbar"
        style={{ scrollSnapType: 'y mandatory', backgroundColor: 'transparent !important' }}
      >
        {/* 첫 번째 섹션: 고정 배경 이미지와 기본 정보 */}
        <div 
          className="min-h-screen w-full flex flex-col justify-center items-center relative pt-4 snap-start snap-always snap-section"
        >
          {/* 첫 번째 섹션 불투명 오버레이 추가 */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-xs z-0"></div>
          
          <motion.div 
            className="text-center relative z-10 px-6 md:px-12 max-w-sm mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* 영문 문구 추가 */}
            <div className="mb-2">
              <div className="text-5xl font-magic text-amber-500 leading-none mb-0">We are</div>
              <div className="text-5xl font-magic text-amber-500 leading-none mt-0">getting married</div>
            </div>
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
              className="mt-12"
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
        >
          <motion.div
            className="relative z-10 p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg max-w-sm mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-korean-title text-amber-700 text-center mb-6">INVITE</h2>
            <p className="text-lg md:text-xl leading-relaxed text-gray-800 font-korean text-center font-normal">
              따사로운 햇살 속에 시작된 이야기<br />
              여름밤 별이 증인이 되어 줍니다.<br />
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
        >
          <motion.div
            className="relative z-10 text-center px-6 md:px-10 max-w-md mx-auto bg-white/40 backdrop-blur-sm p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-2xl font-korean-title text-amber-800 mb-1">결혼식장</div>
            <a 
              href={NAVER_MAP_URL} 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-base text-amber-700 font-korean font-semibold mb-2 hover:text-amber-500 transition-colors whitespace-nowrap"
              style={{maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis'}}
            >
              {weddingInfo.venue} {weddingInfo.floor}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </a>
            <div className="text-sm text-amber-700 font-korean mb-1">
              {weddingInfo.address}
            </div>
            <div className="text-sm text-amber-700 font-korean mb-6">
              신림역 2호선 근방
            </div>
            
            <div className="text-3xl font-korean-title text-amber-800 mb-2 font-bold">
              2025.06.28 토요일
            </div>
            <div className="text-2xl text-amber-700 font-korean-title mb-6">
              {weddingInfo.time}
            </div>
            
            {/* 마법 효과 D-day 카운트다운 추가 */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <MagicCountdownTimer eventDate={eventDate} />
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-6 relative z-10 w-full flex flex-col items-center justify-center"
          >
            <Link 
              to="/main" 
              className="magic-btn inline-block font-korean bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 shadow-xl px-6 py-3 rounded-full text-white transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1"
            >
              청첩장 상세보기
              <motion.span 
                className="ml-2" 
                animate={{ x: [0, 5, 0] }} 
                transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </Link>
            <motion.div 
              className="mb-2 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <motion.span 
                className="mr-1 text-sm font-korean text-amber-700"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                여기를 클릭하세요
              </motion.span>
              <span className="text-2xl text-amber-700" role="img" aria-label="pointing Up emoji">👆</span>
            </motion.div>
          </motion.div>
        </div>
        
        {/* 스크롤 제한을 위한 숨겨진 요소 - 추가 스크롤 방지 */}
        <div className="h-0 w-full snap-start snap-always snap-section overflow-hidden"></div>
      </div>
    </PageLayout>
  );
};

export default IntroPage; 