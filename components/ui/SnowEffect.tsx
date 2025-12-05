"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
    x: number;
    y: number;
    radius: number;
    speed: number;
    opacity: number;
    type: 'circle' | 'snowflake';
    sway: number;
    swaySpeed: number;
    initialX: number;
}

export function SnowEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const isRunningRef = useRef(true);

    // Detect low-performance devices
    const isLowPerformance = useCallback(() => {
        if (typeof navigator === 'undefined') return false;
        const cores = navigator.hardwareConcurrency || 4;
        return cores < 4;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const isLowEnd = isLowPerformance();
        const MAX_PARTICLES = isLowEnd ? 40 : 80;
        const TARGET_FPS = isLowEnd ? 30 : 60;
        const FRAME_INTERVAL = 1000 / TARGET_FPS;

        let lastFrameTime = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            const baseCount = Math.floor(window.innerWidth / 15);
            const particleCount = Math.min(baseCount, MAX_PARTICLES);

            particlesRef.current = [];
            for (let i = 0; i < particleCount; i++) {
                // On low-end devices, skip snowflake emojis for better performance
                const type = isLowEnd ? 'circle' : (Math.random() > 0.85 ? 'snowflake' : 'circle');
                const x = Math.random() * canvas.width;
                particlesRef.current.push({
                    x: x,
                    y: Math.random() * canvas.height,
                    radius: type === 'snowflake' ? Math.random() * 10 + 10 : Math.random() * 3 + 1,
                    speed: Math.random() * 0.5 + 0.2,
                    opacity: Math.random() * 0.5 + 0.3,
                    type: type,
                    sway: Math.random() * 20 + 10,
                    swaySpeed: Math.random() * 0.02 + 0.01,
                    initialX: x,
                });
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((p) => {
                if (p.type === 'snowflake') {
                    ctx.font = `${p.radius}px serif`;
                    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                    ctx.fillText("❄️", p.x, p.y);
                } else {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                    ctx.fill();
                }
            });
        };

        const updateParticles = () => {
            particlesRef.current.forEach((p) => {
                p.y += p.speed;
                p.x = p.initialX + Math.sin(p.y * p.swaySpeed) * p.sway;

                if (p.y > canvas.height) {
                    p.y = -p.radius;
                    p.initialX = Math.random() * canvas.width;
                    p.x = p.initialX;
                }
            });
        };

        const animate = (currentTime: number) => {
            if (!isRunningRef.current) {
                animationRef.current = requestAnimationFrame(animate);
                return;
            }

            const deltaTime = currentTime - lastFrameTime;

            if (deltaTime >= FRAME_INTERVAL) {
                lastFrameTime = currentTime - (deltaTime % FRAME_INTERVAL);
                drawParticles();
                updateParticles();
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        // Handle visibility change - pause when tab is hidden
        const handleVisibilityChange = () => {
            isRunningRef.current = !document.hidden;
        };

        // Handle resize with debounce
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resizeCanvas();
                createParticles();
            }, 150);
        };

        // Initialize
        resizeCanvas();
        createParticles();
        animationRef.current = requestAnimationFrame(animate);

        // Event listeners
        window.addEventListener("resize", handleResize);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            clearTimeout(resizeTimeout);
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [isLowPerformance]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-30"
            aria-hidden="true"
            role="presentation"
        />
    );
}
