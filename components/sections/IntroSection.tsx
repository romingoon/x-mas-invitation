import { FESTIVAL_INFO } from "@/lib/constants";

export function IntroSection() {
    return (
        <div className="section-container">
            <h2 className="section-title opacity-0 animate-fade-in-up">소개</h2>

            <div className="prose prose-primary max-w-none opacity-0 animate-fade-in-up animate-stagger-1">
                <p className="text-lg leading-[1.8] tracking-normal text-foreground/80 whitespace-pre-wrap break-keep">
                    {FESTIVAL_INFO.introText}
                </p>
            </div>

            <div className="quote-box bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 p-8 rounded-2xl mt-8 mb-24 opacity-0 animate-fade-in-up animate-stagger-2 border-l-4 border-primary/30 shadow-md">
                <blockquote className="text-center text-primary font-medium break-keep">
                    <p className="text-base md:text-lg leading-relaxed mb-3 italic">
                        "지극히 높은 곳에서는 하나님께 영광이요 땅에서는 하나님이 기뻐하신 사람들 중에 평화로다 하니라"
                    </p>
                    <footer className="text-primary/70 text-sm not-italic font-semibold tracking-wide">
                        — 누가복음 2장 14절
                    </footer>
                </blockquote>
            </div>
        </div>
    );
}
