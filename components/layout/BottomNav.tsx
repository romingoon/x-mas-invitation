"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Home, Info, Church, ListMusic, MapPin, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

const navItems = [
    { href: "/?view=home", label: "홈", icon: Home },
    { href: "/?view=intro", label: "소개", icon: Info },
    { href: "/?view=choirs", label: "찬양대", icon: Church },
    { href: "/?view=program", label: "프로그램", icon: ListMusic },
    { href: "/?view=location", label: "오시는 길", icon: MapPin },
    { href: "/?view=share", label: "초대", icon: Share2 },
];

function BottomNavContent() {
    const searchParams = useSearchParams();
    const currentView = searchParams.get('view') || 'home';

    return (
        <ul className="flex justify-around items-center h-16 max-w-lg mx-auto px-1">
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
                                "relative flex flex-col items-center justify-center w-full h-full space-y-0.5 transition-all duration-200 rounded-lg mx-0.5",
                                isActive
                                    ? "text-secondary bg-secondary/10"
                                    : "text-muted-foreground hover:text-secondary/80 hover:bg-secondary/5"
                            )}
                        >
                            <Icon
                                className={cn(
                                    "w-5 h-5 transition-all duration-200",
                                    isActive && "scale-110 animate-icon-bounce"
                                )}
                                aria-hidden="true"
                            />
                            <span className={cn(
                                "text-[10px] leading-tight truncate max-w-full px-1 transition-all duration-200",
                                isActive ? "font-semibold" : "font-medium"
                            )}>
                                {item.label}
                            </span>
                            {/* Active indicator */}
                            {isActive && (
                                <span className="nav-indicator" aria-hidden="true" />
                            )}
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
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-white/20 pb-safe shadow-[0_-4px_20px_-1px_rgba(0,0,0,0.1)]"
            role="navigation"
            aria-label="하단 메뉴"
            suppressHydrationWarning
        >
            {/* Festive top border gradient */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/20 via-accent/50 to-primary/20" />

            <Suspense fallback={
                <ul className="flex justify-around items-center h-16 max-w-lg mx-auto px-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.href} className="flex-1 h-full">
                                <div className="flex flex-col items-center justify-center w-full h-full space-y-0.5 text-muted-foreground">
                                    <Icon className="w-5 h-5" aria-hidden="true" />
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
