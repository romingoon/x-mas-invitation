import { PROGRAM } from "@/lib/constants";

export function ProgramSection() {
    return (
        <div className="section-container">
            <h2 className="section-title opacity-0 animate-fade-in-up">프로그램</h2>

            <div className="pb-nav">
                {PROGRAM.map((item, index) => (
                    <div
                        key={item.id}
                        className={`py-5 opacity-0 animate-fade-in-up ${index !== PROGRAM.length - 1 ? 'border-b-2 border-primary/15' : ''}`}
                        style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
                    >
                        <div className="flex items-start gap-4">
                            <span className="program-badge shrink-0 mt-0.5">
                                {item.id}
                            </span>
                            <div className="flex-1 min-w-0">
                                <div className="mb-2">
                                    <h3 className="font-bold text-foreground text-base leading-tight break-keep inline">
                                        {item.title}
                                    </h3>
                                    {item.composer && (
                                        <span className="text-xs text-muted-foreground/80 ml-2 font-medium">
                                            — {item.composer}
                                        </span>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-secondary font-semibold break-keep">
                                        {item.performer}
                                    </p>
                                    {item.details && (
                                        <p className="text-xs text-muted-foreground leading-relaxed">
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
