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
        <div className="flex flex-col items-center justify-center space-y-8 py-10 px-6 h-full overflow-y-auto">
            <div className="text-center space-y-4 opacity-0 animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl font-bold text-gradient-christmas tracking-tight">
                    Christmas
                    <br />
                    Invitation
                </h1>
                <p className="text-lg text-muted-foreground font-light break-keep">
                    {FESTIVAL_INFO.invitationMessage}
                </p>
            </div>

            <Card className="w-full max-w-sm md:max-w-md card-christmas shadow-xl border-2 border-primary/10 opacity-0 animate-fade-in-up animate-stagger-1">
                <CardContent className="p-6 space-y-4">
                    <div className="flex items-center space-x-3 text-foreground">
                        <Calendar className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                        <span className="font-medium">
                            {FESTIVAL_INFO.date} {FESTIVAL_INFO.time}
                        </span>
                    </div>
                    <div className="flex items-center space-x-3 text-foreground">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                        <span className="font-medium break-keep">{FESTIVAL_INFO.location}</span>
                    </div>
                </CardContent>
            </Card>

            <div className="w-full max-w-sm md:max-w-md opacity-0 animate-fade-in-up animate-stagger-2">
                <Button
                    onClick={() => onNavigate('intro')}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-xl btn-glow"
                >
                    자세히 보기
                </Button>
            </div>

            <p className="text-sm text-muted-foreground/70 mt-10 break-keep text-center opacity-0 animate-fade-in animate-stagger-3">
                새문안·동숭·자양·정릉교회 청년 찬양대 연합 주최
            </p>
        </div>
    );
}
