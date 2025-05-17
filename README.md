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

## GitHub Pages 배포 방법

이 프로젝트는 GitHub Pages로 쉽게 배포할 수 있습니다:

1. GitHub에 새 저장소 생성 (https://github.com/mamboworld/wedding-card)
2. 로컬 저장소 연결:
   ```bash
   git remote add origin https://github.com/mamboworld/wedding-card.git
   git branch -M main
   git push -u origin main
   ```
3. GitHub Pages 배포:
   ```bash
   npm run deploy
   ```
4. GitHub 저장소 설정에서 GitHub Pages 활성화:
   - Settings > Pages > Source를 'gh-pages' 브랜치로 설정

배포 후에는 `https://mamboworld.github.io/wedding-card` 주소로 접속 가능합니다.

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
