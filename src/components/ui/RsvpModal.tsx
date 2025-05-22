import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

type RsvpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose }) => {
  const [side, setSide] = useState<'groom' | 'bride'>('groom');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attendCount, setAttendCount] = useState(1);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const validatePhone = (phoneNumber: string): boolean => {
    // 대한민국 전화번호 형식 (하이픈 포함/미포함, 10-11자리)
    const phoneRegex = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhone(phone)) {
      setPhoneError('올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678 또는 01012345678)');
      return;
    }
    setPhoneError(''); // Clear error if validation passes

    try {
      await addDoc(collection(db, 'rsvps'), {
        side,
        name,
        phone,
        attendCount,
        message,
        createdAt: new Date()
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        resetForm();
        onClose();
      }, 2000);
    } catch (error) {
      alert('저장 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  const resetForm = () => {
    setSide('groom');
    setName('');
    setPhone('');
    setAttendCount(1);
    setMessage('');
    setPhoneError('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 flex flex-col max-h-[85vh]"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {isSubmitted ? (
              <div className="p-6 text-center">
                <div className="text-4xl text-amber-600 mb-4">✓</div>
                <h3 className="text-xl font-korean-title text-amber-800 mb-2">감사합니다</h3>
                <p className="text-gray-700">
                  참석 의사가 성공적으로 전달되었습니다.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-amber-50 p-4 border-b border-amber-100">
                  <h2 className="text-xl font-korean-title text-amber-800 text-center">참석 의사 전달하기</h2>
                </div>

                <div className="p-6 space-y-4 overflow-y-auto flex-grow">
                  {/* 구분 버튼 */}
                  <div>
                    <div className="text-lg font-korean-title text-gray-700 mb-2">구분</div>
                    <div className="flex space-x-2 mb-2">
                      <button
                        type="button"
                        className={`flex-1 py-2 rounded-md font-korean-title text-lg transition-colors ${side === 'groom' ? 'bg-amber-700 text-white' : 'bg-gray-200 text-gray-600'}`}
                        onClick={() => setSide('groom')}
                      >
                        신랑측
                      </button>
                      <button
                        type="button"
                        className={`flex-1 py-2 rounded-md font-korean-title text-lg transition-colors ${side === 'bride' ? 'bg-amber-700 text-white' : 'bg-gray-200 text-gray-600'}`}
                        onClick={() => setSide('bride')}
                      >
                        신부측
                      </button>
                    </div>
                  </div>

                  {/* 참석자 성함 */}
                  <div>
                    <label htmlFor="name" className="block text-lg font-korean-title text-gray-700 mb-1">
                      참석자 성함
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg"
                      placeholder="성함을 입력해 주세요."
                      required
                    />
                  </div>

                  {/* 참석 인원 */}
                  <div>
                    <label htmlFor="attendCount" className="block text-lg font-korean-title text-gray-700 mb-1">
                      인원
                    </label>
                    <select
                      id="attendCount"
                      value={attendCount}
                      onChange={(e) => setAttendCount(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg"
                      required
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(count => (
                        <option key={count} value={count}>
                          {count}명
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 연락처 */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      연락처
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (phoneError) setPhoneError(''); // Clear error on typing
                      }}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${phoneError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-amber-500'}`}
                      required
                    />
                    {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                  </div>

                  {/* 메시지 */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      메시지 (선택사항)
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 border-t border-gray-200">
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-white bg-amber-600 rounded-md hover:bg-amber-700 transition-colors"
                    >
                      전송하기
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RsvpModal; 