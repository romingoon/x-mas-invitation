"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CHOIRS } from "@/lib/constants";
import { Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function ChoirsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);
    const [selectedChoir, setSelectedChoir] = useState<(typeof CHOIRS)[0] | null>(null);

    const choirId = searchParams.get("choirId");

    useEffect(() => {
        if (choirId) {
            const choir = CHOIRS.find((c) => c.id === Number(choirId));
            if (choir) {
                setSelectedChoir(choir);
                setOpen(true);
            }
        } else {
            setOpen(false);
        }
    }, [choirId]);

    const handleCardClick = (id: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("choirId", id.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("choirId");
            router.push(`?${params.toString()}`, { scroll: false });
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
                            className="h-32 bg-gray-200 flex items-center justify-center"
                            suppressHydrationWarning
                        >
                            {/* Placeholder for Image */}
                            <Users className="w-12 h-12 text-gray-400" />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-lg text-red-700" suppressHydrationWarning>{choir.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 line-clamp-2">{choir.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent className="sm:max-w-[425px] w-[90%] rounded-xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-red-700">
                            {selectedChoir?.name}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Users className="w-16 h-16 text-gray-400" />
                        </div>
                        <DialogDescription className="text-gray-700 text-base leading-relaxed">
                            {selectedChoir?.description}
                        </DialogDescription>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export function ChoirsSection() {
    return (
        <div className="space-y-6 py-6 px-6 h-full overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900">참여 찬양대</h2>
            <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
                <ChoirsContent />
            </Suspense>
        </div>
    );
}
