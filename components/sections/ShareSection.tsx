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
                description: '2025년 12월 20일(토) 오후 3시 새문안교회 4층 대예배당',
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
            <div className="flex flex-col items-center justify-center min-h-full space-y-8 py-10 px-6 pb-24">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900">초대하기</h2>
                    <p className="text-gray-600">
                        소중한 분들과<br />
                        성탄 연합 찬양제를 함께 즐기세요.
                    </p>
                </div>

                {/* Preview Card */}
                <Card className="w-full max-w-sm border-none shadow-lg bg-white/90 backdrop-blur pointer-events-none select-none">
                    <div className="h-40 bg-gray-200 relative overflow-hidden rounded-t-xl">
                        {/* Placeholder for actual image */}
                        <div className="absolute inset-0 flex items-center justify-center bg-red-50 text-red-200">
                            <span className="text-4xl font-bold">Christmas</span>
                        </div>
                    </div>
                    <CardContent className="p-6 space-y-4">
                        <h3 className="text-lg font-bold text-gray-900">성탄 연합 찬양제</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-red-600" />
                                <span>{FESTIVAL_INFO.date} {FESTIVAL_INFO.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-red-600" />
                                <span>{FESTIVAL_INFO.location}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="w-full max-w-sm space-y-4">
                    <Button
                        onClick={handleKakaoShare}
                        disabled={!isKakaoInitialized}
                        className="w-full bg-[#FEE500] hover:bg-[#FDD835] text-[#191919] text-lg py-6 rounded-xl shadow-md transition-all font-medium"
                    >
                        <KakaoTalkIcon className="w-6 h-6 mr-2" />
                        카카오톡으로 초대장 보내기
                    </Button>

                    <Button
                        onClick={handleCopyLink}
                        variant="outline"
                        className="w-full border-gray-300 text-gray-700 text-lg py-6 rounded-xl hover:bg-gray-50 transition-all font-medium"
                    >
                        {isCopied ? (
                            <>
                                <Check className="w-5 h-5 mr-2 text-green-600" />
                                링크가 복사되었습니다
                            </>
                        ) : (
                            <>
                                <LinkIcon className="w-5 h-5 mr-2" />
                                링크 복사하기
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
