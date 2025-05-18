import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

type CalendarDisplayProps = {
  date: Date;
  highlightDate?: number;
};

// 애니메이션 효과를 위한 변형 설정
const dayVariants = {
  normal: { scale: 1 },
  highlighted: { scale: 1.1, boxShadow: "0 4px 12px rgba(180, 120, 0, 0.2)" }
};

const CalendarDisplay: React.FC<CalendarDisplayProps> = ({ date, highlightDate }) => {
  // 달력 데이터 생성
  const calendarData = useMemo(() => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // 해당 월의 첫째 날과 마지막 날
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // 첫째 날의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // 달력에 표시할 날짜 배열 생성 (이전 달의 일부 + 현재 달 전체 + 다음 달의 일부)
    const calendarDays: Array<{ day: number; currentMonth: boolean }> = [];
    
    // 이전 달의 마지막 일부 날짜 추가
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      calendarDays.push({
        day: prevMonthLastDay - i,
        currentMonth: false
      });
    }
    
    // 현재 달의 모든 날짜 추가
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      calendarDays.push({
        day: i,
        currentMonth: true
      });
    }
    
    // 다음 달의 시작 일부 날짜 추가 (달력을 6줄로 맞추기 위해)
    const remainingDays = 42 - calendarDays.length; // 6주 x 7일 = 42
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({
        day: i,
        currentMonth: false
      });
    }
    
    // 주 단위로 분할
    const weeks: Array<Array<{ day: number; currentMonth: boolean }>> = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }
    
    return {
      year,
      month,
      weekdays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      weeks
    };
  }, [date]);

  // 한글 월 이름
  const getMonthName = (month: number): string => {
    return `${month + 1}월`;
  };

  // 오늘 날짜
  const today = new Date();
  const isToday = (day: number): boolean => {
    return (
      today.getFullYear() === calendarData.year &&
      today.getMonth() === calendarData.month &&
      today.getDate() === day
    );
  };

  // 특별한 날짜 여부 (여기서는 결혼식 날짜)
  const isWeddingDay = (day: number): boolean => {
    return highlightDate === day;
  };

  return (
    <div className="relative bg-gray-50 rounded-lg p-4 shadow-md overflow-hidden">
      {/* 달력 헤더 */}
      <div className="text-center mb-4">
        <div className="text-lg text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md font-semibold inline-block">
          {`${calendarData.year}년 ${getMonthName(calendarData.month)} ${highlightDate}일 ${['일', '월', '화', '수', '목', '금', '토'][new Date(date.getFullYear(), date.getMonth(), highlightDate).getDay()]}요일`}
        </div>
      </div>
      
      {/* 달력 요일 헤더 */}
      <div className="grid grid-cols-7 mb-2">
        {calendarData.weekdays.map((weekday, index) => (
          <div
            key={`weekday-${index}`}
            className={`text-center text-sm font-medium ${
              index === 0 ? 'text-red-400' : index === 6 ? 'text-blue-400' : 'text-gray-600'
            }`}
          >
            {weekday}
          </div>
        ))}
      </div>
      
      {/* 달력 날짜 */}
      <div className="grid gap-1">
        {calendarData.weeks.map((week, weekIndex) => (
          <div key={`week-${weekIndex}`} className="grid grid-cols-7 gap-1">
            {week.map((dateInfo, dayIndex) => (
              <motion.div
                key={`day-${weekIndex}-${dayIndex}`}
                className={`
                  h-8 flex items-center justify-center rounded-full text-sm
                  ${dateInfo.currentMonth ? 'font-medium' : 'text-gray-400'}
                  ${isToday(dateInfo.day) ? 'border border-amber-400' : ''}
                  ${isWeddingDay(dateInfo.day) && dateInfo.currentMonth ? 'bg-amber-600 text-white' : ''}
                `}
                variants={dayVariants}
                initial="normal"
                animate={isWeddingDay(dateInfo.day) && dateInfo.currentMonth ? "highlighted" : "normal"}
                whileHover={dateInfo.currentMonth ? { scale: 1.05 } : {}}
              >
                {dateInfo.day}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarDisplay; 