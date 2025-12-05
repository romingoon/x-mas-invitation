'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FESTIVAL_INFO } from "@/lib/constants";
import { Calendar, MapPin, Link as LinkIcon, Check } from "lucide-react";
import { KakaoTalkIcon } from "@/components/icons/KakaoTalkIcon";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

const PAGE_URL = 'https://x-mas-invitation.vercel.app/';

export function ShareSection() {
    // Initialize state with actual Kakao SDK state to avoid synchronous setState in effect
    const [isKakaoInitialized, setIsKakaoInitialized] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.Kakao?.isInitialized() ?? false;
        }
        return false;
    });
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        // If already initialized during state initialization, skip
        if (isKakaoInitialized) {
            return;
        }

        // Listen for custom event from KakaoScript
        const handleKakaoReady = () => {
            if (window.Kakao?.isInitialized()) {
                setIsKakaoInitialized(true);
            }
        };

        window.addEventListener('kakaoReady', handleKakaoReady);

        return () => {
            window.removeEventListener('kakaoReady', handleKakaoReady);
        };
    }, [isKakaoInitialized]);

    const handleKakaoShare = useCallback(() => {
        if (!window.Kakao || !window.Kakao.isInitialized()) {
            alert('카카오톡 공유 기능을 사용할 수 없습니다.');
            return;
        }

        window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: '성탄 연합 찬양제에 초대합니다',
                description: '2025년 12월 20일(토) 오후 3시\n새문안교회 4층 대예배실',
                imageUrl: 'https://x-mas-invitation.vercel.app/images/thumb.jpeg',
                link: {
                    mobileWebUrl: PAGE_URL,
                    webUrl: PAGE_URL,
                },
            },
            buttons: [
                {
                    title: '초대장 보기',
                    link: {
                        mobileWebUrl: PAGE_URL,
                        webUrl: PAGE_URL,
                    },
                },
            ],
        });
    }, []);

    const handleCopyLink = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(PAGE_URL);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy link:', error);
            alert('링크 복사에 실패했습니다.');
        }
    }, []);

    return (
        <div className="h-full overflow-y-auto no-scrollbar" suppressHydrationWarning>
            <div className="flex flex-col items-center justify-center min-h-full space-y-8 py-10 px-6 pb-nav">
                <div className="text-center space-y-4 opacity-0 animate-fade-in-up">
                    <h2 className="section-title">초대하기</h2>
                    <p className="text-muted-foreground">

                        청년찬양대 연합 성탄찬양제를 <br />소중한 분들과 함께하세요.
                    </p>
                </div>

                {/* Preview Card */}

                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-2xl bg-[#850000]">
                    <Image
                        src="/images/poster1.jpeg"
                        alt="Christmas Invitation Poster"
                        fill
                        className="object-contain"
                    />
                </div>

                <div className="w-full max-w-sm md:max-w-md space-y-4 opacity-0 animate-fade-in-up animate-stagger-2">
                    <Button
                        onClick={handleKakaoShare}
                        disabled={!isKakaoInitialized}
                        className="w-full bg-[#FEE500] hover:bg-[#FDD835] text-[#191919] text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold disabled:opacity-50 active:scale-[0.98]"
                    >
                        <KakaoTalkIcon className="w-6 h-6 mr-2" />
                        카카오톡으로 초대장 보내기
                    </Button>

                    <Button
                        onClick={handleCopyLink}
                        variant="outline"
                        className="w-full border-2 border-border hover:border-primary/30 text-foreground text-lg py-6 rounded-xl hover:bg-muted/50 transition-all font-semibold active:scale-[0.98]"
                    >
                        {isCopied ? (
                            <>
                                <Check className="w-5 h-5 mr-2 text-secondary" aria-hidden="true" />
                                <span role="status">링크가 복사되었습니다</span>
                            </>
                        ) : (
                            <>
                                <LinkIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                                링크 복사하기
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div >
    );
}
