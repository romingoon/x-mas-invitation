'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FESTIVAL_INFO } from "@/lib/constants";
import { Calendar, MapPin, ChevronDown } from "lucide-react";

interface HomeSectionProps {
    onNavigate: (sectionId: string) => void;
}

export function HomeSection({ onNavigate }: HomeSectionProps) {
    return (
        <div className="relative flex flex-col items-center justify-center space-y-5 py-6 px-6 h-full overflow-y-auto bg-[url('/images/snow-bg.png')] bg-cover bg-center">
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] -z-10" />

            <div className="text-center space-y-4 opacity-0 animate-fade-in-up z-10">
                <div className="space-y-2">
                    <p className="text-primary font-medium tracking-wide uppercase text-sm animate-fade-in animate-stagger-1">
                        2025 Joint Christmas Praise Festival
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold text-gradient-christmas tracking-tight leading-tight drop-shadow-sm">
                        Christmas
                        <br />
                        Invitation
                    </h1>
                </div>
                <p className="text-lg text-muted-foreground font-light break-keep max-w-xs mx-auto leading-relaxed">
                    {FESTIVAL_INFO.invitationMessage}
                </p>
            </div>

            <Card className="w-full max-w-sm md:max-w-md card-christmas shadow-xl border border-white/40 opacity-0 animate-fade-in-up animate-stagger-2 z-10">
                <CardContent className="p-5 space-y-5">
                    <div className="flex items-center space-x-4 text-foreground group">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Date & Time</span>
                            <span className="font-medium text-lg">
                                {FESTIVAL_INFO.date}
                            </span>
                            <span className="font-medium text-lg text-primary">
                                {FESTIVAL_INFO.time}
                            </span>
                        </div>
                    </div>
                    <div className="h-px w-full bg-border/50" />
                    <div className="flex items-center space-x-4 text-foreground group">
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                            <MapPin className="w-5 h-5 text-secondary" aria-hidden="true" />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Location</span>
                            <span className="font-medium text-lg break-keep">{FESTIVAL_INFO.location}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

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
