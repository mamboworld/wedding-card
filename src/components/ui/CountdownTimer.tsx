import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type CountdownTimerProps = {
  eventDate: Date;
  coupleName?: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ eventDate, coupleName }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = eventDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
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

  const timeLabels = [
    { key: 'days', label: '일', gradientFrom: "from-amber-300", gradientTo: "to-amber-500" },
    { key: 'hours', label: '시간', gradientFrom: "from-amber-400", gradientTo: "to-amber-600" },
    { key: 'minutes', label: '분', gradientFrom: "from-amber-500", gradientTo: "to-amber-700" },
    { key: 'seconds', label: '초', gradientFrom: "from-amber-600", gradientTo: "to-amber-800" }
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-5">
        <h3 className="text-2xl font-korean-title text-amber-800 mb-1">D-{timeLeft.days}</h3>
        <p className="text-lg font-korean text-amber-700">우리의 새로운 시작까지!</p>
      </div>
      
      {/* 타임스탬프 표시 - 인트로 페이지 스타일과 동일하게 */}
      <div className="grid grid-cols-4 gap-4 justify-items-center">
        {timeLabels.map((timeItem) => (
          <motion.div 
            key={timeItem.key}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className={`relative w-16 h-16 md:w-18 md:h-18 bg-gradient-to-b ${timeItem.gradientFrom} ${timeItem.gradientTo} text-white rounded-full flex items-center justify-center shadow-lg overflow-hidden will-change-transform`}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              whileTap={{ scale: 0.95 }}
            >
              {/* 반짝이는 효과 */}
              <div className="absolute inset-0 sparkle-effect"></div>
              
              {/* 테두리 효과 */}
              <div className="absolute inset-0 border-2 border-amber-300/50 rounded-full"></div>
              
              {/* 숫자 */}
              <motion.span 
                className="text-xl md:text-2xl font-bold z-10"
                key={timeLeft[timeItem.key as keyof TimeLeft]}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {String(timeLeft[timeItem.key as keyof TimeLeft]).padStart(2, '0')}
              </motion.span>
            </motion.div>
            <motion.div 
              className={`bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-0.5 rounded-full mt-2 shadow-md text-xs backdrop-blur-sm`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {timeItem.label}
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      {/* 커플 이름과 D-day 표시 */}
      {coupleName && (
        <motion.div 
          className="mt-4 p-3 bg-white rounded-full text-center shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className="text-sm text-gray-700">
            {coupleName}의 결혼식이 {timeLeft.days}일 남았습니다.
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default CountdownTimer; 