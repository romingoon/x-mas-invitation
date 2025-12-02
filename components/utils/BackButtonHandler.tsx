'use client';

import { useEffect } from 'react';

export function BackButtonHandler() {
    useEffect(() => {
        // 초기 로드 시 현재 상태를 history에 push하여 '뒤로가기' 이벤트를 감지할 수 있게 함
        // 단, 이미 감지용 state가 있다면 push하지 않음
        if (!window.history.state?.isAppEntry) {
            window.history.pushState({ isAppEntry: true }, '', window.location.href);
        }

        const handlePopState = (event: PopStateEvent) => {
            // 뒤로가기 이벤트 발생 시 창 닫기 시도
            // 브라우저 보안 정책상 window.close()는 스크립트로 연 창에서만 동작할 수 있음
            // 하지만 모바일 인앱 브라우저(카카오톡 등)에서는 동작할 가능성이 높음

            // 1. 일반적인 window.close()
            window.close();

            // 2. 카카오톡 인앱 브라우저 대응
            // Kakao.closeWindow()는 존재하지 않는 함수이므로 제거함.
            // window.close()가 대부분의 인앱 브라우저에서 동작함.

            // 3. 네이버 앱 등 기타 인앱 브라우저 대응 시도
            // 일부 환경에서는 history.back()을 호출해야 할 수도 있지만, 
            // 여기서는 '창 닫기'가 목적이므로 close 시도 후 실패 시 다시 pushState로 앱 유지 (선택사항)
            // 사용자가 정말 나가고 싶어하므로 닫기 시도 후 별다른 조치 없이 종료되길 기대함.

            // 만약 닫히지 않았다면 사용자가 다시 뒤로가기를 누를 수 있도록 
            // 다시 pushState를 하지 않고 그대로 둠 (브라우저 기본 동작으로 이전 페이지로 이동)
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    return null;
}
