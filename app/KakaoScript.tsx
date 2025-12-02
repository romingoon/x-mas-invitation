'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function KakaoScript() {
  useEffect(() => {
    // 환경 변수 디버깅
    console.log('Kakao API Key:', process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    console.log('All env vars:', process.env);
  }, []);

  const onLoad = () => {
    const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

    // 환경 변수 체크
    if (!kakaoKey) {
      console.error('❌ Kakao API Key가 설정되지 않았습니다.');
      console.error(
        '💡 .env.local 파일에 NEXT_PUBLIC_KAKAO_API_KEY를 추가해주세요.'
      );
      return;
    }

    // Kakao SDK 초기화
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoKey);
        console.log('✅ Kakao SDK 초기화 완료:', window.Kakao.isInitialized());
      } else {
        console.log('ℹ️ Kakao SDK 이미 초기화됨');
      }
    } else {
      console.error('❌ Kakao SDK 로드 실패');
    }
  };

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
      integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onReady={onLoad}
      onError={() => {
        console.error('❌ Kakao SDK 스크립트 로드 실패');
      }}
    />
  );
}
