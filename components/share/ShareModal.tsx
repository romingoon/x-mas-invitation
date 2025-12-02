"use client";

import { Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export function ShareModal() {
    const [isOpen, setIsOpen] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("링크가 복사되었습니다!");
        setIsOpen(false);
    };

    const handleKakaoShare = () => {
        // Placeholder for Kakao Share logic
        alert("카카오톡 공유하기 (기능 구현 예정)");
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700">
                    <Share2 className="w-6 h-6" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>초대장 공유하기</DialogTitle>
                    <DialogDescription>
                        친구와 가족들에게 성탄 연합 찬양제 초대장을 공유해보세요.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-4 py-4">
                    <Button onClick={handleKakaoShare} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
                        카카오톡으로 공유하기
                    </Button>
                    <Button onClick={handleCopyLink} variant="outline" className="w-full">
                        <Copy className="mr-2 h-4 w-4" />
                        링크 복사하기
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
