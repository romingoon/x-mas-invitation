"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Home, Info, Church, ListMusic, MapPin, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/?view=home", label: "홈", icon: Home },
    { href: "/?view=intro", label: "찬양제 소개", icon: Info },
    { href: "/?view=choirs", label: "찬양대 소개", icon: Church },
    { href: "/?view=program", label: "프로그램", icon: ListMusic },
    { href: "/?view=location", label: "오시는 길", icon: MapPin },
    { href: "/?view=share", label: "초대하기", icon: Share2 },
];

export function BottomNav() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentView = searchParams.get('view') || 'home';

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-red-100 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    // Extract view from href (e.g., "/?view=intro" -> "intro")
                    const itemView = item.href.split('=')[1];
                    const isActive = currentView === itemView;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200",
                                isActive ? "text-red-700" : "text-gray-400 hover:text-red-600"
                            )}
                        >
                            <Icon className={cn("w-6 h-6")} />
                            <span className={cn("text-[10px] font-medium", isActive && "font-bold")}>{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
