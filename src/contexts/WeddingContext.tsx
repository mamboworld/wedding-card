import React, { createContext, useContext, useState, ReactNode } from 'react';

type WeddingContextType = {
  eventDate: Date;
  weddingInfo: {
    groomName: string;
    brideName: string;
    groomParents: { father: string; mother: string };
    brideParents: { father: string; mother: string };
    venue: string;
    address: string;
    date: string;
    time: string;
    floor: string;
  };
  getDaysRemaining: () => number;
};

const defaultWeddingInfo = {
  groomName: '유예찬 (YECHAN YU)',
  brideName: '박수희 (SOOHEE PARK)',
  groomParents: { father: '유병윤', mother: '김경숙' },
  brideParents: { father: '박성진', mother: '송덕심' },
  venue: '그레이스파티, 그레이스파티홀',
  address: '서울특별시 관악구 신림동 1485-1번지',
  date: '2025년 6월 28일 토요일',
  time: '오후 4시 10분',
  floor: '(7F)'
};

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export const WeddingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const eventDate = new Date('2025-06-28T16:10:00+09:00');
  const [weddingInfo] = useState(defaultWeddingInfo);

  const getDaysRemaining = () => {
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <WeddingContext.Provider value={{ eventDate, weddingInfo, getDaysRemaining }}>
      {children}
    </WeddingContext.Provider>
  );
};

export const useWedding = (): WeddingContextType => {
  const context = useContext(WeddingContext);
  if (context === undefined) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
}; 