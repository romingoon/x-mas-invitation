'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

interface PosterSectionProps {
    containerRef?: React.RefObject<HTMLDivElement | null>;
}

const posterVariants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
        y: 30
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

export default function PosterSection({ containerRef }: PosterSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    const { scrollYProgress } = useScroll({
        container: containerRef,
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
    const scrollOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const scrollY = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <section ref={sectionRef} className="w-full h-dvh flex items-center justify-center relative overflow-hidden bg-[#840000]" suppressHydrationWarning>
            {/* Main Image */}
            <motion.div
                className="relative w-full h-full z-10 p-4 md:p-8"
                variants={posterVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{
                    scale: scrollScale,
                    opacity: scrollOpacity,
                    y: scrollY
                }}
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
