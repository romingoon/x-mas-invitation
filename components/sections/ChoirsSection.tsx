"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CHOIRS } from "@/lib/constants";
import { Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

import Image from "next/image";

function ChoirsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

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
            <div className="grid gap-6 pb-20">
                {CHOIRS.map((choir) => (
                    <Card
                        key={choir.id}
                        className="overflow-hidden border-none shadow-md cursor-pointer transition-transform active:scale-95"
                        onClick={() => handleCardClick(choir.id)}
                        suppressHydrationWarning
                    >
                        <div
                            className="h-48 bg-gray-200 relative"
                            suppressHydrationWarning
                        >
                            <Image
                                src={choir.image}
                                alt={choir.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-lg text-secondary" suppressHydrationWarning>{choir.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-gray-600 line-clamp-2" suppressHydrationWarning>
                                {choir.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                <DialogContent className="sm:max-w-[425px] w-[90%] rounded-xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
                    <div className="p-6 pb-2 shrink-0">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-secondary">
                                {selectedChoir?.name}
                            </DialogTitle>
                        </DialogHeader>
                    </div>
                    <div className="p-6 pt-2 overflow-y-auto">
                        <div className="space-y-4">
                            <div className="h-48 bg-gray-100 rounded-lg relative overflow-hidden shrink-0">
                                {selectedChoir && (
                                    <Image
                                        src={selectedChoir.image}
                                        alt={selectedChoir.name}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <DialogDescription className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
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
        <div className="space-y-6 py-6 px-6 h-full overflow-y-auto">
            <h2 className="text-2xl font-bold text-red-800">참여 찬양대</h2>
            <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
                <ChoirsContent />
            </Suspense>
        </div>
    );
}
