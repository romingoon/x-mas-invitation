"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CHOIRS } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import Image from "next/image";

function ChoirsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

    const choirId = searchParams.get("choirId");
    const isOpen = !!choirId;
    const selectedChoir = choirId ? CHOIRS.find((c) => c.id === Number(choirId)) : null;

    const handleCardClick = (id: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("choirId", id.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("choirId");
            router.replace(`?${params.toString()}`, { scroll: false });
        }
    };

    return (
        <>
            <div className="grid gap-6 pb-nav">
                {CHOIRS.map((choir, index) => (
                    <Card
                        key={choir.id}
                        className="overflow-hidden card-christmas card-hover-lift cursor-pointer border-2 border-primary/5 opacity-0 animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => handleCardClick(choir.id)}
                        suppressHydrationWarning
                    >
                        <div
                            className="h-48 bg-muted relative overflow-hidden group"
                            suppressHydrationWarning
                        >
                            {/* Loading skeleton */}
                            {!imageLoaded[choir.id] && (
                                <div className="absolute inset-0 bg-muted animate-pulse" />
                            )}
                            <Image
                                src={choir.image}
                                alt={`${choir.name} 단체 사진`}
                                fill
                                className={`object-cover transition-all duration-300 group-hover:scale-105 ${imageLoaded[choir.id] ? 'opacity-100' : 'opacity-0'}`}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                onLoad={() => setImageLoaded(prev => ({ ...prev, [choir.id]: true }))}
                            />
                            {/* Image overlay gradient */}
                            <div className="absolute inset-0 image-overlay-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-secondary font-bold" suppressHydrationWarning>{choir.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-muted-foreground line-clamp-2 break-keep leading-relaxed" suppressHydrationWarning>
                                {choir.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                <DialogContent className="sm:max-w-[425px] w-[90%] rounded-2xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden border-none shadow-2xl">
                    <div className="p-6 pb-2 shrink-0 bg-secondary/5">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-secondary">
                                {selectedChoir?.name}
                            </DialogTitle>
                        </DialogHeader>
                    </div>
                    <div className="p-6 pt-4 overflow-y-auto">
                        <div className="space-y-4">
                            <div className="h-48 bg-muted rounded-xl relative overflow-hidden shrink-0">
                                {selectedChoir && (
                                    <Image
                                        src={selectedChoir.image}
                                        alt={`${selectedChoir.name} 단체 사진`}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <DialogDescription className="text-foreground/80 text-base leading-relaxed whitespace-pre-wrap break-keep">
                                {selectedChoir?.details || selectedChoir?.description}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export function ChoirsSection() {
    return (
        <div className="section-container">
            <h2 className="section-title opacity-0 animate-fade-in-up">참여 찬양대</h2>
            <Suspense fallback={
                <div className="grid gap-6 pb-nav">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="card-christmas overflow-hidden animate-pulse">
                            <div className="h-48 bg-muted" />
                            <div className="p-4 space-y-3">
                                <div className="h-5 bg-muted rounded w-2/3" />
                                <div className="h-4 bg-muted rounded w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            }>
                <ChoirsContent />
            </Suspense>
        </div>
    );
}
