"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Home, Info, Users, Music, MapPin, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/?view=home", label: "홈", icon: Home },
    { href: "/?view=intro", label: "찬양제 소개", icon: Info },
    { href: "/?view=choirs", label: "찬양대 소개", icon: Users },
    { href: "/?view=program", label: "프로그램", icon: Music },
    { href: "/?view=location", label: "오시는 길", icon: MapPin },
    { href: "/?view=share", label: "초대하기", icon: Share2 },
];

export function BottomNav() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentView = searchParams.get('view') || 'home';

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe">
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
                                "flex flex-col items-center justify-center w-full h-full space-y-1",
                                isActive ? "text-red-600" : "text-gray-500 hover:text-gray-900"
                            )}
                        >
                            <Icon className="w-6 h-6" />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
