'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface PosterSectionProps {
    containerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function PosterSection({ containerRef }: PosterSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        container: containerRef,
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section ref={sectionRef} className="w-full h-dvh flex items-center justify-center relative overflow-hidden bg-[#840000]" suppressHydrationWarning>
            {/* Main Image */}
            <motion.div
                className="relative w-full h-full z-10 p-4 md:p-8"
                style={{ scale, opacity }}
                suppressHydrationWarning
            >
                <Image
                    src="/images/poster1.jpeg"
                    alt="Christmas Invitation Poster 1"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                />
            </motion.div>
        </section>
    );
}
