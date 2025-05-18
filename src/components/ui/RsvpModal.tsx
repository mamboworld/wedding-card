import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type RsvpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attendCount, setAttendCount] = useState(1);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기서 실제 데이터를 저장하거나 API 호출을 할 수 있습니다
    console.log({ name, phone, attendCount, message });
    setIsSubmitted(true);
    
    // 실제 구현에서는 서버에 데이터를 전송하고 성공 시 아래 코드 실행
    setTimeout(() => {
      setIsSubmitted(false);
      resetForm();
      onClose();
    }, 2000);
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setAttendCount(1);
    setMessage('');
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
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden"
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

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      이름
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      연락처
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="attendCount" className="block text-sm font-medium text-gray-700 mb-1">
                      참석 인원
                    </label>
                    <select
                      id="attendCount"
                      value={attendCount}
                      onChange={(e) => setAttendCount(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num}명
                        </option>
                      ))}
                    </select>
                  </div>

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

                  <div className="flex justify-end space-x-3 pt-2">
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