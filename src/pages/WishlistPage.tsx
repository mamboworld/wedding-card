import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/layout/PageLayout';

// 위시리스트 아이템 타입
type WishlistItem = {
  id: number;
  name: string;
  image: string;
  price: string;
  url: string;
  isSoldOut: boolean;
};

// 임시 위시리스트 데이터
const wishlistItems: WishlistItem[] = [
  {
    id: 1,
    name: '홈 커피머신',
    image: 'https://via.placeholder.com/300x200?text=Coffee+Machine',
    price: '350,000원',
    url: 'https://example.com/coffee-machine',
    isSoldOut: false,
  },
  {
    id: 2,
    name: '캐리어 세트',
    image: 'https://via.placeholder.com/300x200?text=Luggage+Set',
    price: '280,000원',
    url: 'https://example.com/luggage-set',
    isSoldOut: true,
  },
  {
    id: 3,
    name: '식기 세트',
    image: 'https://via.placeholder.com/300x200?text=Dinnerware',
    price: '150,000원',
    url: 'https://example.com/dinnerware',
    isSoldOut: false,
  },
  {
    id: 4,
    name: '침구 세트',
    image: 'https://via.placeholder.com/300x200?text=Bedding+Set',
    price: '220,000원',
    url: 'https://example.com/bedding-set',
    isSoldOut: false,
  },
  {
    id: 5,
    name: '에어프라이어',
    image: 'https://via.placeholder.com/300x200?text=Air+Fryer',
    price: '120,000원',
    url: 'https://example.com/air-fryer',
    isSoldOut: false,
  },
];

const WishlistPage: React.FC = () => {
  const [list, setList] = useState<WishlistItem[]>(wishlistItems);
  
  const handleSoldOut = (id: number) => {
    setList(list.map(item => 
      item.id === id ? { ...item, isSoldOut: true } : item
    ));
  };
  
  const markAsPurchased = (id: number) => {
    if (window.confirm('이 상품을 구매 완료로 표시하시겠습니까?')) {
      handleSoldOut(id);
    }
  };
  
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="magic-title mb-8 text-center">위시리스트</h1>
        
        <div className="card mb-6">
          <p className="text-gray-700 mb-4">
            저희의 새 출발을 위해 필요한 물품들입니다. 
            마음을 담아 선물해주시면 소중히 간직하고 사용하겠습니다.
          </p>
          <p className="text-gray-700">
            * 구매하신 경우 중복 선물을 방지하기 위해 '구매 완료'로 표시해주세요.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.map((item) => (
            <motion.div
              key={item.id}
              className="card p-4 overflow-hidden relative"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {item.isSoldOut && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                  <div className="bg-hogwarts-red text-white px-4 py-2 rounded-full transform -rotate-12 text-lg font-bold">
                    SOLD OUT
                  </div>
                </div>
              )}
              
              <div className="relative mb-3 overflow-hidden rounded-lg h-40">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 right-0 bg-hogwarts-gold text-white text-sm px-2 py-1">
                  {item.price}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              
              <div className="flex space-x-2 mt-3">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 px-3 py-2 text-center rounded text-sm ${
                    item.isSoldOut 
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-hogwarts-red text-white hover:bg-hogwarts-red/90'
                  }`}
                  onClick={(e) => item.isSoldOut && e.preventDefault()}
                >
                  구매 링크
                </a>
                {!item.isSoldOut && (
                  <button
                    onClick={() => markAsPurchased(item.id)}
                    className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                  >
                    구매 완료
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default WishlistPage; 