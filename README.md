# 🎄 성탄 연합 찬양제 초대장 (Christmas Joint Praise Festival Invitation)

2025년 성탄 연합 찬양제를 위한 모바일 초대장 웹 애플리케이션입니다. 따뜻한 크리스마스 분위기의 디자인과 직관적인 사용자 경험을 제공합니다.

## ✨ 주요 기능

- **크리스마스 테마 디자인**:
  - Warm Cream 배경과 Deep Red/Forest Green 컬러 팔레트 적용
  - **Pretendard** 폰트로 가독성 강화
  - 전역 **눈 내리는 효과 (Snow Effect)** 적용으로 감성적인 분위기 연출

- **부드러운 내비게이션**:
  - **풀 페이지 스크롤 (Snap Scroll)**: 섹션 단위로 부드럽게 이동
  - **스크롤-내비게이션 연동**: 스크롤 위치에 따라 하단 내비게이션 바의 활성 상태 자동 업데이트
  - **하단 내비게이션 바**: 직관적인 아이콘과 함께 주요 섹션으로 빠르게 이동

- **오시는 길 (Naver Map)**:
  - 네이버 지도 API 연동
  - 현재 위치 기반 길찾기 및 대중교통(지하철, 버스) 안내
  - 네이버 지도 앱/웹으로 연결 기능

- **공유하기**:
  - **카카오톡 공유하기**: 썸네일과 함께 초대장 전송
  - **링크 복사**: 간편하게 URL 복사

## 🛠 기술 스택

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Maps**: Naver Maps API
- **Deployment**: Vercel

## 🚀 시작하기

### 1. 프로젝트 클론

```bash
git clone https://github.com/romingoon/x-mas-invitation.git
cd x-mas-invitation
```

### 2. 의존성 설치

```bash
npm install
# or
yarn install
```

### 3. 환경 변수 설정

루트 디렉토리에 `.env.local` 파일을 생성하고 다음 변수를 설정하세요.

```env
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your_naver_map_client_id
```

### 4. 개발 서버 실행

```bash
npm run dev
# or
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📱 모바일 최적화

이 프로젝트는 모바일 환경에 최적화되어 있습니다. 데스크탑에서도 모바일 뷰로 확인하는 것을 권장합니다.
