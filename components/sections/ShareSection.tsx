'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FESTIVAL_INFO } from "@/lib/constants";
import { Calendar, MapPin, Link as LinkIcon, Check } from "lucide-react";
import { KakaoTalkIcon } from "@/components/icons/KakaoTalkIcon";
import { useEffect, useState } from "react";


interface ShareSectionProps {
    url?: string;
    title?: string;
}


export function ShareSection({ url = '' }: ShareSectionProps) {
    const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const currentUrl =
        url || (typeof window !== 'undefined' ? window.location.href : '');

    const pageUrl = 'https://x-mas-invitation.vercel.app/';

    useEffect(() => {
        // Check if already initialized
        if (window.Kakao?.isInitialized()) {
            setIsKakaoInitialized(true);
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
    }, []);

    const handleKakaoShare = () => {
        if (!window.Kakao || !window.Kakao.isInitialized()) {
            alert('카카오톡 공유 기능을 사용할 수 없습니다.');
            return;
        }

        window.Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: '성탄 연합 찬양제에 초대합니다',
                description: '2025년 12월 20일(토) 오후 3시\n새문안교회 4층 대예배실',
                imageUrl: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20191207_200%2F1575645003467FPzEl_JPEG%2Fy7NcXhRAN3M-rgQCsjWM4WE0.jpg',
                link: {
                    mobileWebUrl: pageUrl,
                    webUrl: pageUrl,
                },
            },
            buttons: [
                {
                    title: '초대장 보기',
                    link: {
                        mobileWebUrl: pageUrl,
                        webUrl: pageUrl,
                    },
                },
            ],
        });
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(pageUrl);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch {
            alert('링크 복사에 실패했습니다.');
        }
    };

    return (
        <div className="h-full overflow-y-auto no-scrollbar">
            <div className="flex flex-col items-center justify-center min-h-full space-y-8 py-10 px-6 pb-nav">
                <div className="text-center space-y-4 opacity-0 animate-fade-in-up">
                    <h2 className="section-title">초대하기</h2>
                    <p className="text-muted-foreground">
                        소중한 분들과<br />
                        성탄 연합 찬양제를 함께 즐기세요.
                    </p>
                </div>

                {/* Preview Card */}
                <Card className="w-full max-w-sm md:max-w-md card-christmas border-2 border-primary/10 shadow-xl pointer-events-none select-none opacity-0 animate-fade-in-up animate-stagger-1">
                    <div className="h-40 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 relative overflow-hidden rounded-t-2xl">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl font-bold text-primary/40 tracking-wider">Christmas</span>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-primary/10 blur-xl" />
                        <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-accent/10 blur-xl" />
                    </div>
                    <CardContent className="p-6 space-y-4">
                        <h3 className="text-lg font-bold text-foreground">성탄 연합 찬양제</h3>
                        <div className="space-y-2.5 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                                <span className="font-medium">{FESTIVAL_INFO.date} {FESTIVAL_INFO.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                                <span className="break-keep font-medium">{FESTIVAL_INFO.location}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

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
        </div>
    );
}
