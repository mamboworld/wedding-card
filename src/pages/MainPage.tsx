import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWedding } from '../contexts/WeddingContext';
import PageLayout from '../components/layout/PageLayout';

const MainPage: React.FC = () => {
  const { weddingInfo, getDaysRemaining } = useWedding();
  const daysRemaining = getDaysRemaining();
  
  // 계좌 복사 상태
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  
  const handleCopyAccount = (name: string, account: string) => {
    navigator.clipboard.writeText(account);
    setCopiedAccount(name);
    setTimeout(() => setCopiedAccount(null), 2000);
  };
  
  // 전화 연결
  const handleCallPerson = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <PageLayout>
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="magic-title mb-8 text-center">Our Wedding</h1>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-magic text-center mb-4 text-hogwarts-gold">D-{daysRemaining}</h2>
          <div className="text-center">
            <div className="text-xl mb-2">{weddingInfo.date}</div>
            <div className="text-lg text-gray-700">{weddingInfo.time}</div>
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-bold mb-4">오시는 길</h2>
          <div className="bg-gray-200 h-64 rounded-lg mb-4 flex items-center justify-center">
            <p className="text-gray-500">지도 영역 (카카오/네이버 지도)</p>
          </div>
          <div className="mb-3">
            <h3 className="font-bold mb-1">그레이스 파티</h3>
            <p className="text-gray-700 mb-2">{weddingInfo.address}</p>
            <div className="flex space-x-2 mb-4">
              <a 
                href="https://naver.me/F9N45Mo5" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1 bg-green-600 text-white text-sm rounded"
              >
                네이버 지도
              </a>
              <a 
                href="https://place.map.kakao.com/2098354524" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1 bg-yellow-500 text-black text-sm rounded"
              >
                카카오 지도
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-2">교통 안내</h3>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">지하철</span>: 신림역 5번 출구
            </p>
            <p className="text-gray-700 mb-3">
              <span className="font-semibold">셔틀버스</span>: 신림역 5번 출구 앞 10분마다 운행
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">버스</span>: 503, 504, 6515, 6516 (신림역 하차)
            </p>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div className="card">
          <h2 className="text-xl font-bold mb-4">연락처</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              className="bg-hogwarts-gold/10 p-3 rounded-lg flex flex-col items-center"
              onClick={() => handleCallPerson('01012345678')}
            >
              <span className="text-sm text-gray-500">신랑</span>
              <span className="font-medium">유예찬</span>
            </button>
            <button 
              className="bg-hogwarts-gold/10 p-3 rounded-lg flex flex-col items-center"
              onClick={() => handleCallPerson('01023456789')}
            >
              <span className="text-sm text-gray-500">신부</span>
              <span className="font-medium">박수희</span>
            </button>
            <button 
              className="bg-hogwarts-gold/10 p-3 rounded-lg flex flex-col items-center"
              onClick={() => handleCallPerson('01034567890')}
            >
              <span className="text-sm text-gray-500">신랑 아버지</span>
              <span className="font-medium">{weddingInfo.groomParents.father}</span>
            </button>
            <button 
              className="bg-hogwarts-gold/10 p-3 rounded-lg flex flex-col items-center"
              onClick={() => handleCallPerson('01045678901')}
            >
              <span className="text-sm text-gray-500">신부 아버지</span>
              <span className="font-medium">{weddingInfo.brideParents.father}</span>
            </button>
            <button 
              className="bg-hogwarts-gold/10 p-3 rounded-lg flex flex-col items-center"
              onClick={() => handleCallPerson('01056789012')}
            >
              <span className="text-sm text-gray-500">신랑 어머니</span>
              <span className="font-medium">{weddingInfo.groomParents.mother}</span>
            </button>
            <button 
              className="bg-hogwarts-gold/10 p-3 rounded-lg flex flex-col items-center"
              onClick={() => handleCallPerson('01067890123')}
            >
              <span className="text-sm text-gray-500">신부 어머니</span>
              <span className="font-medium">{weddingInfo.brideParents.mother}</span>
            </button>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <div className="card">
          <h2 className="text-xl font-bold mb-4">마음 전하실 곳</h2>
          
          <div className="space-y-3">
            <button 
              className="w-full bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center"
              onClick={() => handleCopyAccount('신랑', '110-123-456789')}
            >
              <div className="text-left">
                <div className="text-sm text-gray-500">신랑측</div>
                <div className="font-medium">신한은행 110-123-456789</div>
                <div className="text-sm">유예찬</div>
              </div>
              <div className="text-sm text-hogwarts-red">
                {copiedAccount === '신랑' ? '복사 완료!' : '복사'}
              </div>
            </button>
            
            <button 
              className="w-full bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center"
              onClick={() => handleCopyAccount('신부', '110-987-654321')}
            >
              <div className="text-left">
                <div className="text-sm text-gray-500">신부측</div>
                <div className="font-medium">국민은행 110-987-654321</div>
                <div className="text-sm">박수희</div>
              </div>
              <div className="text-sm text-hogwarts-red">
                {copiedAccount === '신부' ? '복사 완료!' : '복사'}
              </div>
            </button>
            
            <button 
              className="w-full bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center"
              onClick={() => handleCopyAccount('신랑부', '110-234-567890')}
            >
              <div className="text-left">
                <div className="text-sm text-gray-500">신랑 부모님</div>
                <div className="font-medium">우리은행 110-234-567890</div>
                <div className="text-sm">{weddingInfo.groomParents.father}</div>
              </div>
              <div className="text-sm text-hogwarts-red">
                {copiedAccount === '신랑부' ? '복사 완료!' : '복사'}
              </div>
            </button>
            
            <button 
              className="w-full bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center"
              onClick={() => handleCopyAccount('신부부', '110-345-678901')}
            >
              <div className="text-left">
                <div className="text-sm text-gray-500">신부 부모님</div>
                <div className="font-medium">하나은행 110-345-678901</div>
                <div className="text-sm">{weddingInfo.brideParents.father}</div>
              </div>
              <div className="text-sm text-hogwarts-red">
                {copiedAccount === '신부부' ? '복사 완료!' : '복사'}
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default MainPage; 