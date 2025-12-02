'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

function BackButtonHandlerContent() {
    const searchParams = useSearchParams();

    // URL 변경 시(특히 모달이 닫혔을 때) 현재 상태가 '앱 진입점'임을 표시
    useEffect(() => {
        // 모달 파라미터가 없는 '기본 뷰' 상태일 때
        if (!searchParams.get('choirId')) {
            // 현재 history state에 isAppEntry 플래그가 없다면 추가 (replaceState)
            if (!window.history.state?.isAppEntry) {
                const currentState = window.history.state || {};
                window.history.replaceState(
                    { ...currentState, isAppEntry: true },
                    '',
                    window.location.href
                );
            }
        }
    }, [searchParams]);

    useEffect(() => {
        // 초기 로드 시 처리 (위의 useEffect가 처리하겠지만, 안전장치)
        if (!window.history.state?.isAppEntry) {
            window.history.replaceState({ isAppEntry: true }, '', window.location.href);
        }

        const handlePopState = (event: PopStateEvent) => {
            // 뒤로가기 후의 상태(event.state)를 확인

            // 1. 앱 내부 이동인 경우 (isAppEntry 플래그가 있는 상태로 돌아온 경우)
            // 예: 모달 열기(push) -> 뒤로가기 -> 모달 닫힘(이전 state인 isAppEntry로 복귀)
            if (event.state?.isAppEntry) {
                // 창을 닫지 않고 그대로 둠 (모달만 닫히는 효과)
                return;
            }

            // 2. 앱 진입점 이전을 벗어나는 경우 (isAppEntry가 없는 상태)
            // 예: 앱 진입(isAppEntry) -> 뒤로가기 -> 외부 페이지

            // 일반적인 window.close()
            window.close();

            // 카카오톡 인앱 브라우저 대응
            // Kakao.closeWindow()는 존재하지 않는 함수이므로 제거함.
            // window.close()가 대부분의 인앱 브라우저에서 동작함.

            // 네이버 앱 등 기타 인앱 브라우저 대응 시도
            // 일부 환경에서는 history.back()을 호출해야 할 수도 있지만,
            // 여기서는 '창 닫기'가 목적이므로 close 시도 후 실패 시 다시 pushState로 앱 유지 (선택사항)
            // 사용자가 정말 나가고 싶어하므로 닫기 시도 후 별다른 조치 없이 종료되길 기대함.
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    return null;
}

export function BackButtonHandler() {
    return (
        <Suspense fallback={null}>
            <BackButtonHandlerContent />
        </Suspense>
    );
}
