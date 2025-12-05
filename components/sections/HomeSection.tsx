'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FESTIVAL_INFO } from "@/lib/constants";
import { Calendar, MapPin } from "lucide-react";

interface HomeSectionProps {
    onNavigate: (sectionId: string) => void;
}

export function HomeSection({ onNavigate }: HomeSectionProps) {
    return (
        <div className="relative flex flex-col items-center justify-center space-y-5 py-6 px-6 h-full overflow-y-auto bg-[url('/images/snow-bg.png')] bg-cover bg-center" suppressHydrationWarning>
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] -z-10" />

            <div className="text-center space-y-4 opacity-0 animate-fade-in-up z-10">
                <div className="space-y-2">
                    <p className="text-primary font-medium tracking-wide uppercase text-sm animate-fade-in animate-stagger-1">
                        2025 청년찬양대 연합 성탄찬양제 초대장
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold text-gradient-christmas tracking-tight leading-tight drop-shadow-sm">
                        Christmas
                        <br />
                        Worship
                    </h1>
                </div>
                <p className="text-lg text-muted-foreground font-light break-keep max-w-xs mx-auto leading-relaxed">
                    {FESTIVAL_INFO.invitationMessage}
                </p>
            </div>

            <Card className="w-full max-w-xs md:max-w-sm card-christmas shadow-xl border border-white/40 opacity-0 animate-fade-in-up animate-stagger-2 z-10">
                <CardContent className="p-4 space-y-3">
                    <div className="flex items-center space-x-3 text-foreground group">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Calendar className="w-4 h-4 text-primary" aria-hidden="true" />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Date & Time</span>
                            <span className="font-medium text-base">
                                {FESTIVAL_INFO.date}
                            </span>
                            <span className="font-medium text-base text-primary">
                                {FESTIVAL_INFO.time}
                            </span>
                        </div>
                    </div>
                    <div className="h-px w-full bg-border/50" />
                    <div className="flex items-center space-x-3 text-foreground group">
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                            <MapPin className="w-4 h-4 text-secondary" aria-hidden="true" />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Location</span>
                            <span className="font-medium text-base break-keep">{FESTIVAL_INFO.location}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="text-center space-y-1 opacity-0 animate-fade-in-up animate-stagger-2 z-10">

                <p className="text-sm text-muted-foreground/70 font-medium">
                    <b> 주관 </b> {FESTIVAL_INFO.host}
                </p>
                <p className="text-sm text-muted-foreground/70 font-medium">
                    <b> 참여 교회 </b> {FESTIVAL_INFO.churches}
                </p>
                <p className="text-sm text-muted-foreground/70 font-medium">
                    <b> 지휘 </b> {FESTIVAL_INFO.conductors}
                </p>
            </div>

            <div className="w-full max-w-sm md:max-w-md opacity-0 animate-fade-in-up animate-stagger-3 z-10">
                <Button
                    onClick={() => onNavigate('intro')}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-2xl btn-glow shadow-lg shadow-primary/20 transition-all duration-300"
                >
                    초대장 열기
                </Button>
            </div>


        </div >
    );
}