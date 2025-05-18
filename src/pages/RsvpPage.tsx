import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import PageLayout from '../components/layout/PageLayout';
import ComingSoonBanner from '../components/ComingSoonBanner';

type FormInputs = {
  name: string;
  attendance: 'yes' | 'no';
  guests: number;
  message: string;
};

const RsvpPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    // 여기서 실제 서버로 데이터를 전송하는 로직이 추가될 수 있습니다.
    // 예: fetch 또는 axios를 사용한 API 호출
    
    setIsSubmitted(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
    reset();
  };
  
  return (
    <PageLayout>
      <ComingSoonBanner />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="magic-title mb-8 text-center">참석 여부</h1>
        
        {showConfetti && <Confetti />}
        
        <div className="card">
          {isSubmitted ? (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-magic text-hogwarts-gold mb-4">감사합니다!</h2>
              <p className="text-gray-700 mb-6">
                소중한 응답을 보내주셔서 감사합니다. 
                특별한 날에 함께해주시는 마음이 큰 힘이 됩니다.
              </p>
              <button
                className="magic-btn"
                onClick={() => setIsSubmitted(false)}
              >
                다시 작성하기
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  이름
                </label>
                <input
                  id="name"
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-hogwarts-gold/50 focus:border-hogwarts-gold outline-none transition ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="이름을 입력해주세요"
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm mt-1">이름을 입력해주세요</span>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  참석 여부
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="yes"
                      className="w-4 h-4 text-hogwarts-gold border-gray-300 focus:ring-hogwarts-gold"
                      {...register('attendance', { required: true })}
                    />
                    <span className="ml-2">참석합니다</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="no"
                      className="w-4 h-4 text-hogwarts-gold border-gray-300 focus:ring-hogwarts-gold"
                      {...register('attendance', { required: true })}
                    />
                    <span className="ml-2">불참합니다</span>
                  </label>
                </div>
                {errors.attendance && (
                  <span className="text-red-500 text-sm mt-1">참석 여부를 선택해주세요</span>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                  참석 인원
                </label>
                <select
                  id="guests"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-hogwarts-gold/50 focus:border-hogwarts-gold outline-none transition ${
                    errors.guests ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register('guests', { required: true })}
                >
                  <option value="">인원을 선택해주세요</option>
                  <option value="1">1명</option>
                  <option value="2">2명</option>
                  <option value="3">3명</option>
                  <option value="4">4명</option>
                  <option value="5">5명 이상</option>
                </select>
                {errors.guests && (
                  <span className="text-red-500 text-sm mt-1">인원을 선택해주세요</span>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  축하 메시지 (선택)
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hogwarts-gold/50 focus:border-hogwarts-gold outline-none transition"
                  placeholder="축하 메시지를 남겨주세요"
                  {...register('message')}
                />
              </div>
              
              <motion.button
                type="submit"
                className="w-full magic-btn py-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                보내기
              </motion.button>
            </form>
          )}
        </div>
      </motion.div>
    </PageLayout>
  );
};

// 간단한 Confetti 효과
const Confetti: React.FC = () => {
  const confetti = Array.from({ length: 50 }, (_, i) => (
    <div
      key={i}
      className="absolute w-2 h-2 rounded-full"
      style={{
        backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animation: `fall ${Math.random() * 3 + 2}s linear forwards`,
        animationDelay: `${Math.random() * 2}s`,
      }}
    />
  ));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}} />
      {confetti}
    </div>
  );
};

export default RsvpPage; 