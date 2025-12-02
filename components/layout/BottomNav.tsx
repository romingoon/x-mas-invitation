"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Home, Info, Church, ListMusic, MapPin, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

const navItems = [
    { href: "/?view=home", label: "홈", icon: Home },
    { href: "/?view=intro", label: "찬양제 소개", icon: Info },
    { href: "/?view=choirs", label: "찬양대 소개", icon: Church },
    { href: "/?view=program", label: "프로그램", icon: ListMusic },
    { href: "/?view=location", label: "오시는 길", icon: MapPin },
    { href: "/?view=share", label: "초대하기", icon: Share2 },
];

function BottomNavContent() {
    const searchParams = useSearchParams();
    const currentView = searchParams.get('view') || 'home';

    return (
        <ul className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
            {navItems.map((item) => {
                const Icon = item.icon;
                const itemView = item.href.split('=')[1] || 'home';
                const isActive = currentView === itemView;

                return (
                    <li key={item.href} className="flex-1 h-full">
                        <Link
                            href={item.href}
                            replace={true}
                            aria-label={item.label}
                            aria-current={isActive ? 'page' : undefined}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200",
                                isActive ? "text-secondary" : "text-gray-400 hover:text-secondary/80"
                            )}
                        >
                            <Icon className="w-6 h-6" aria-hidden="true" />
                            <span className={cn("text-[10px] font-medium", isActive && "font-bold")}>{item.label}</span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

export function BottomNav() {
    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-secondary/20 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
            role="navigation"
            aria-label="하단 메뉴"
        >
            <Suspense fallback={
                <ul className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.href} className="flex-1 h-full">
                                <div className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-400">
                                    <Icon className="w-6 h-6" aria-hidden="true" />
                                    <span className="text-[10px] font-medium">{item.label}</span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            }>
                <BottomNavContent />
            </Suspense>
        </nav>
    );
}
