import { PROGRAM } from "@/lib/constants";
import { Music, Mic2 } from "lucide-react";

export function ProgramSection() {
    return (
        <div className="section-container">
            <h2 className="section-title opacity-0 animate-fade-in-up text-center mb-8 text-gradient-christmas">프로그램</h2>

            <div className="pb-nav space-y-4">
                {PROGRAM.map((item, index) => (
                    <div
                        key={item.id}
                        className="card-christmas p-5 opacity-0 animate-fade-in-up card-hover-lift border border-primary/10"
                        style={{ animationDelay: `${Math.min(index * 0.1, 1)}s` }}
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex flex-col items-center gap-2 shrink-0">
                                <span className="program-badge shadow-md">
                                    {item.id}
                                </span>
                                <div className="h-full w-[2px] bg-gradient-to-b from-primary/20 to-transparent rounded-full min-h-[20px]" />
                            </div>

                            <div className="flex-1 min-w-0 pt-1">
                                <div className="mb-3">
                                    <h3 className="font-bold text-foreground text-lg leading-tight break-keep">
                                        {item.title}
                                    </h3>
                                    {item.composer && (
                                        <p className="text-sm text-muted-foreground mt-1 font-medium flex items-center gap-1">
                                            <Music className="w-3 h-3" />
                                            {item.composer}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2 bg-secondary/5 p-3 rounded-xl border border-secondary/10">
                                    <p className="text-sm text-secondary font-bold break-keep flex items-center gap-2">
                                        <Mic2 className="w-4 h-4" />
                                        {item.performer}
                                    </p>
                                    {item.details && (
                                        <p className="text-xs text-muted-foreground leading-relaxed pl-6 border-l-2 border-muted">
                                            {item.details}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
