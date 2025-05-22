import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWedding } from '../contexts/WeddingContext';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import shuttleBusImage from '../assets/images/shuttle_bus.jpg';
import ToggleSection from '../components/ui/ToggleSection';
import CalendarDisplay from '../components/ui/CalendarDisplay';
import CountdownTimer from '../components/ui/CountdownTimer';
import RsvpModal from '../components/ui/RsvpModal';
import introBackgroundImage from '../assets/images/background_intro_wedding.jpg';

const MainPage: React.FC = () => {
  const { weddingInfo, getDaysRemaining, eventDate } = useWedding();
  const daysRemaining = getDaysRemaining();
  
  // 계좌 복사 상태
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  
  // 참석의사 모달 상태
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  
  // 이미지 로딩 상태
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const handleCopyAccount = (name: string, account: string) => {
    navigator.clipboard.writeText(account);
    setCopiedAccount(name);
    setTimeout(() => setCopiedAccount(null), 2000);
  };
  
  // 전화 연결
  const handleCallPerson = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const cardBaseStyle = "bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-6 md:p-8 mb-8";
  // 텍스트 그림자는 상황에 따라 유지하거나, 배경이 밝아지므로 약하게 조정하거나 제거할 수 있습니다.
  // 우선은 유지하고, 실제 화면을 보면서 미세 조정하는 것이 좋습니다.
  const textShadowForWhiteBg = '1px 1px 2px rgba(0,0,0,0.2)'; 

  return (
    <PageLayout backgroundImage={introBackgroundImage}>
      {/* 인트로 페이지로 이동하는 버튼 - 위치 재조정 */}
      <div className="w-full flex justify-end p-4">
        <Link 
          to="/" 
          className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-amber-100 hover:bg-amber-100 transition-colors flex items-center justify-center"
          aria-label="인트로 페이지로 이동"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      </div>
      
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="magic-title mb-6 text-center text-amber-50" style={{ textShadow: '2px 2px 5px rgba(0,0,0,0.7)' }}>Our Wedding</h1>
        
        <div className={`${cardBaseStyle} text-center`} style={{ textShadow: textShadowForWhiteBg }}>
          <div className="text-3xl font-korean-title text-amber-800 mb-4">
            {weddingInfo.groomName.split(' ')[0]} <span className="text-amber-700">♥</span> {weddingInfo.brideName.split(' ')[0]}
          </div>
          <div className="text-lg text-gray-700 mb-1 font-korean">
            <span className="font-semibold text-amber-700">{weddingInfo.groomParents.father} • {weddingInfo.groomParents.mother}</span>의 장남 {weddingInfo.groomName.split(' ')[0]}
          </div>
          <div className="text-lg text-gray-700 font-korean mb-6">
            <span className="font-semibold text-amber-700">{weddingInfo.brideParents.father} • {weddingInfo.brideParents.mother}</span>의 장녀 {weddingInfo.brideName.split(' ')[0]}
          </div>
          <div className="w-full border-t border-amber-200/50 my-6"></div>
          <div className="mb-4">
            <div className="text-xl font-korean-title text-amber-800 mb-1">Wedding Venue</div>
            <a 
              href="https://naver.me/F9N45Mo5" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xl text-amber-700 font-korean font-semibold mb-1 hover:text-amber-600 transition-colors"
            >
              {weddingInfo.venue} {weddingInfo.floor}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </a>
            <div className="text-xs text-gray-600 font-korean">
              {weddingInfo.address}
            </div>
          </div>
          <div className="text-center text-gray-700">
            <div className="text-xl mb-2">{weddingInfo.date}</div>
            <div className="text-lg">{weddingInfo.time}</div>
          </div>
        </div>
        
        <div className={`${cardBaseStyle}`} style={{ textShadow: textShadowForWhiteBg }}>
          <div className="mb-6">
            <CalendarDisplay date={eventDate} highlightDate={eventDate.getDate()} />
          </div>
          <div className="mt-4">
            <CountdownTimer eventDate={eventDate} coupleName={`${weddingInfo.groomName.split(' ')[0]} & ${weddingInfo.brideName.split(' ')[0]}`} />
          </div>
        </div>
        
        <div className={`${cardBaseStyle}`} style={{ textShadow: textShadowForWhiteBg }}>
          <h2 className="text-xl font-bold mb-4 text-amber-800">오시는 길</h2>
          
          {/* 지도 영역: 구글 지도 iframe 임베드 */}
          <div className="h-64 rounded-lg mb-4 overflow-hidden shadow-md">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3166.15209914762!2d126.90784421182995!3d37.48073697194436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9e32baa9a5f9%3A0xb467a8f315e849d9!2zKOyjvCnqt7jroIjsnbTsiqTtjIzti7A!5e0!3m2!1sko!2skr!4v1747492695931!5m2!1sko!2skr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title={`${weddingInfo.venue} ${weddingInfo.floor} 지도`}
            ></iframe>
          </div>
          
          <div className="mb-3 text-gray-700">
            <h3 className="font-bold mb-1 text-amber-800">{weddingInfo.venue} {weddingInfo.floor}</h3>
            <p className="mb-2">{weddingInfo.address}</p>
            <p className="mb-2">{weddingInfo.date} {weddingInfo.time}</p>
            <div className="flex space-x-2 mb-4">
              <a 
                href="https://naver.me/F9N45Mo5" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                네이버 지도
              </a>
              <a 
                href="https://place.map.kakao.com/2098354524" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1 bg-yellow-500 text-black text-sm rounded hover:bg-yellow-600"
                style={{ textShadow: 'none' }}
              >
                카카오 지도
              </a>
            </div>
          </div>
          
          <div className="text-gray-700">
            <h3 className="font-bold mb-2 text-amber-800">교통 안내</h3>
            <p className="mb-3"><span className="font-semibold text-amber-700">교통수단 이용</span>: 신림역 2호선 5번출구 하차후 셔틀버스 또는 버스 운행</p>
            
            {/* 셔틀버스 이미지 추가 */}
            <div className="mb-4 flex justify-center">
              <div className="w-full overflow-hidden rounded-lg shadow-md">
                {!imageError ? (
                  <img 
                    src={shuttleBusImage} 
                    alt="셔틀버스 안내" 
                    className="w-full h-auto object-cover"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="bg-gray-100/50 p-4 text-center">
                    <p className="text-gray-300">셔틀버스 이미지를 불러올 수 없습니다.</p>
                    <p className="text-gray-100 mt-2">신림역 5번 출구에서 10분 간격으로 셔틀버스가 운행됩니다.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
        <div className={`${cardBaseStyle}`} >
          <ToggleSection title="혼주에게 연락하기" customBgColor="bg-transparent" titleClassName="text-amber-800" initiallyOpen={false} noPadding={true} >
            <div className="space-y-4 mt-4" style={{ textShadow: textShadowForWhiteBg }}>
              <div className="p-3 bg-amber-50/60 rounded-lg">
                <h3 className="text-sm font-semibold text-amber-800 mb-3">신랑측 혼주</h3>
                <div className="grid grid-cols-3 gap-4 md:gap-6">
                  <button 
                    className="bg-hogwarts-gold/10 p-4 rounded-xl flex flex-col items-center justify-center min-h-[80px] shadow-sm hover:bg-amber-100 transition-all"
                    onClick={() => handleCallPerson('010-9769-4639')}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] text-gray-500 leading-tight mb-1 break-keep">신랑</span>
                      <span className="font-semibold text-base text-amber-900 break-keep">유예찬</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mt-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </button>
                  <button 
                    className="bg-hogwarts-gold/10 p-4 rounded-xl flex flex-col items-center justify-center min-h-[80px] shadow-sm hover:bg-amber-100 transition-all"
                    onClick={() => handleCallPerson('010-3993-4639')}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] text-gray-500 leading-tight mb-1 break-keep">신랑 아버지</span>
                      <span className="font-semibold text-base text-amber-900 break-keep">{weddingInfo.groomParents.father}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mt-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </button>
                  <button 
                    className="bg-hogwarts-gold/10 p-4 rounded-xl flex flex-col items-center justify-center min-h-[80px] shadow-sm hover:bg-amber-100 transition-all"
                    onClick={() => handleCallPerson('010-7722-4639')}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] text-gray-500 leading-tight mb-1 break-keep">신랑 어머니</span>
                      <span className="font-semibold text-base text-amber-900 break-keep">{weddingInfo.groomParents.mother}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mt-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-3 bg-amber-50/60 rounded-lg">
                <h3 className="text-sm font-semibold text-amber-800 mb-3">신부측 혼주</h3>
                <div className="grid grid-cols-3 gap-4 md:gap-6">
                  <button 
                    className="bg-hogwarts-gold/10 p-4 rounded-xl flex flex-col items-center justify-center min-h-[80px] shadow-sm hover:bg-amber-100 transition-all"
                    onClick={() => handleCallPerson('010-5664-0750')}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] text-gray-500 leading-tight mb-1 break-keep">신부</span>
                      <span className="font-semibold text-base text-amber-900 break-keep">{weddingInfo.brideName.split(' ')[0]}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mt-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </button>
                  <button 
                    className="bg-hogwarts-gold/10 p-4 rounded-xl flex flex-col items-center justify-center min-h-[80px] shadow-sm hover:bg-amber-100 transition-all"
                    onClick={() => handleCallPerson('010-4702-0400')}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] text-gray-500 leading-tight mb-1 break-keep">신부 아버지</span>
                      <span className="font-semibold text-base text-amber-900 break-keep">{weddingInfo.brideParents.father}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mt-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </button>
                  <button 
                    className="bg-hogwarts-gold/10 p-4 rounded-xl flex flex-col items-center justify-center min-h-[80px] shadow-sm hover:bg-amber-100 transition-all"
                    onClick={() => handleCallPerson('010-5553-0750')}
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] text-gray-500 leading-tight mb-1 break-keep">신부 어머니</span>
                      <span className="font-semibold text-base text-amber-900 break-keep">{weddingInfo.brideParents.mother}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mt-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </ToggleSection>
        </div>
      </motion.div>
      
      <motion.div className="mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
        <div className={`${cardBaseStyle}`} >
          <ToggleSection title="마음 전하실 곳" customBgColor="bg-transparent" titleClassName="text-amber-800" initiallyOpen={false} noPadding={true}>
            <div className="space-y-3 mt-4" style={{ textShadow: textShadowForWhiteBg }}>
              <div className="p-3 bg-amber-50/60 rounded-lg">
                <h3 className="text-sm font-semibold text-amber-800 mb-2">신랑측 계좌번호</h3>
                <div className="space-y-3">
                  <button 
                    className="w-full bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center"
                    onClick={() => handleCopyAccount('신랑', '3333-16-464095')}
                  >
                    <div className="text-left">
                      <div className="text-sm text-gray-500">신랑</div>
                      <div className="font-medium">카카오뱅크 3333-16-464095</div>
                      <div className="text-sm">유예찬</div>
                    </div>
                    <div className="text-sm text-hogwarts-red">
                      {copiedAccount === '신랑' ? '복사 완료!' : '복사'}
                    </div>
                  </button>
                  
                  <button 
                    className="w-full bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center"
                    onClick={() => handleCopyAccount('신랑부', '356-0729-3940-23')}
                  >
                    <div className="text-left">
                      <div className="text-sm text-gray-500">신랑 부모님</div>
                      <div className="font-medium">농협 356-0729-3940-23</div>
                      <div className="text-sm">유병윤</div>
                    </div>
                    <div className="text-sm text-hogwarts-red">
                      {copiedAccount === '신랑부' ? '복사 완료!' : '복사'}
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="p-3 bg-amber-50/60 rounded-lg">
                <h3 className="text-sm font-semibold text-amber-800 mb-2">신부측 계좌번호</h3>
                <div className="space-y-3">
                  <button 
                    className="w-full bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center"
                    onClick={() => handleCopyAccount('신부', '100-120-660063')}
                  >
                    <div className="text-left">
                      <div className="text-sm text-gray-500">신부</div>
                      <div className="font-medium">케이뱅크 100-120-660063</div>
                      <div className="text-sm">박수희</div>
                    </div>
                    <div className="text-sm text-hogwarts-red">
                      {copiedAccount === '신부' ? '복사 완료!' : '복사'}
                    </div>
                  </button>
                  
                  <button 
                    className="w-full bg-white p-3 rounded-lg border border-gray-200 flex justify-between items-center"
                    onClick={() => handleCopyAccount('신부부', '831-24-0132392')}
                  >
                    <div className="text-left">
                      <div className="text-sm text-gray-500">신부 부모님</div>
                      <div className="font-medium">국민 831-24-0132392</div>
                      <div className="text-sm">송덕심</div>
                    </div>
                    <div className="text-sm text-hogwarts-red">
                      {copiedAccount === '신부부' ? '복사 완료!' : '복사'}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </ToggleSection>
        </div>
        
        <div className={`${cardBaseStyle} mb-4`}>
          <button onClick={() => setShowRsvpModal(true)} className="w-full py-4 px-6 bg-amber-100/80 rounded-lg text-center hover:bg-amber-200/90 transition-colors flex justify-between items-center">
            <span className="text-xl font-korean-title text-amber-800" style={{ textShadow: 'none' }}>참석 의사 전달하기</span>
          </button>
        </div>
        <div className={`${cardBaseStyle}`}>
          <Link to="/gallery" className="w-full block py-4 px-6 bg-amber-300/80 rounded-lg text-center text-xl font-korean-title text-amber-900 hover:bg-amber-400/90 transition-colors" style={{ textShadow: 'none' }}>
            📸 사진 구경하러가기
          </Link>
        </div>
      </motion.div>
      
      <RsvpModal isOpen={showRsvpModal} onClose={() => setShowRsvpModal(false)} />
    </PageLayout>
  );
};

export default MainPage; 