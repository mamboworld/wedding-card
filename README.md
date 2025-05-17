# 해리포터 테마 웨딩 카드 프로젝트

해리포터 감성의 애니메이션이 있는 모바일 최적화 청첩장 웹앱입니다.

## 기능 소개

- **인트로 페이지**: 마법같은 애니메이션과 함께 웨딩 정보 소개
- **메인 정보 페이지**: 결혼식 일시, 장소, 오시는 길, 연락처, 계좌번호
- **갤러리 페이지**: 커플 사진 슬라이드쇼
- **RSVP 페이지**: 참석 여부 확인 및 축하 메시지 전송 폼
- **위시리스트 페이지**: 선물 위시리스트 관리

## 기술 스택

- React + TypeScript
- Tailwind CSS (스타일링)
- Framer Motion (애니메이션)
- React Router (라우팅)
- React Hook Form (폼 처리)
- React Image Gallery (이미지 갤러리)

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 빌드
npm run build
```

## 배포

Build 후에 생성되는 `build` 폴더를 웹 서버에 업로드하거나, GitHub Pages, Netlify, Vercel 등을 통해 손쉽게 배포할 수 있습니다.

## 사용자 정의

- `src/contexts/WeddingContext.tsx` 파일에서 결혼 정보 업데이트
- `src/pages/GalleryPage.tsx` 파일에서 갤러리 이미지 업데이트
- `src/pages/WishlistPage.tsx` 파일에서 위시리스트 아이템 업데이트

## 특징

- 반응형 디자인 (모바일 최적화)
- 해리포터 테마의 UI/UX
- 마법 효과 애니메이션
- 계좌번호 복사 및 전화 연결 기능
- 참석자 관리 기능

---

해리포터 테마의 청첩장으로 특별한 날을 더욱 마법같이 만들어보세요! ✨🪄
