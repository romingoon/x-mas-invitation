'use client';

import { memo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FESTIVAL_INFO } from "@/lib/constants";
import { Calendar, MapPin } from "lucide-react";

interface HomeSectionProps {
    onNavigate: (sectionId: string) => void;
}

export const HomeSection = memo(function HomeSection({ onNavigate }: HomeSectionProps) {
    return (
        <div className="relative flex flex-col items-center justify-center space-y-5 py-6 px-6 h-full overflow-y-auto bg-[url('/images/snow-bg.png')] bg-cover bg-center" suppressHydrationWarning>
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] -z-10" />

            <div className="text-center space-y-3 opacity-0 animate-fade-in-up z-10">
                <div className="space-y-1">
                    <p className="text-primary font-semibold tracking-wide uppercase text-xs animate-fade-in animate-stagger-1">
                        2025 청년찬양대 연합 성탄찬양제
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold text-gradient-christmas tracking-tight leading-none drop-shadow-sm">
                        Christmas
                        <br />
                        Worship
                    </h1>
                </div>
                <p className="text-sm text-muted-foreground font-normal break-keep max-w-xs mx-auto leading-normal">
                    {FESTIVAL_INFO.invitationMessage}
                </p>
            </div>

            <Card className="w-full max-w-xs md:max-w-sm card-christmas shadow-xl opacity-0 animate-fade-in-up animate-stagger-2 z-10">
                <CardContent className="p-4 space-y-2.5">
                    <div className="flex items-center space-x-3 text-foreground group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/20 transition-colors">
                            <Calendar className="w-4 h-4 text-primary" aria-hidden="true" />
                        </div>
                        <div className="flex flex-col text-left leading-snug">
                            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Date & Time</span>
                            <span className="font-semibold text-sm">
                                {FESTIVAL_INFO.date}
                            </span>
                            <span className="font-semibold text-sm text-primary">
                                {FESTIVAL_INFO.time}
                            </span>
                        </div>
                    </div>
                    <div className="h-px w-full bg-border/50" />
                    <div className="flex items-center space-x-3 text-foreground group">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary/20 to-accent/10 border border-secondary/20 flex items-center justify-center group-hover:from-secondary/30 group-hover:to-accent/20 transition-colors">
                            <MapPin className="w-4 h-4 text-secondary" aria-hidden="true" />
                        </div>
                        <div className="flex flex-col text-left leading-snug">
                            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Location</span>
                            <span className="font-semibold text-sm break-keep">{FESTIVAL_INFO.location}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="text-center space-y-0.5 opacity-0 animate-fade-in-up animate-stagger-2 z-10">
                <p className="text-xs text-muted-foreground/80 font-medium leading-relaxed">
                    <b className="text-primary">주관</b> {FESTIVAL_INFO.host}
                </p>
                <p className="text-xs text-muted-foreground/80 font-medium leading-relaxed">
                    <b className="text-secondary">참여 교회</b> {FESTIVAL_INFO.churches}
                </p>
                <p className="text-xs text-muted-foreground/80 font-medium leading-relaxed">
                    <b className="text-accent-foreground">지휘</b> {FESTIVAL_INFO.conductors}
                </p>
            </div>

            <div className="w-full max-w-xs opacity-0 animate-fade-in-up animate-stagger-3 z-10">
                <Button
                    onClick={() => onNavigate('intro')}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base py-5 rounded-2xl btn-glow shadow-lg shadow-primary/20 transition-all duration-300"
                >
                    초대장 열기
                </Button>
            </div>


        </div >
    );
});
