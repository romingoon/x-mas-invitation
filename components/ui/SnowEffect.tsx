"use client";

import { useEffect, useRef } from "react";

export function SnowEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: {
            x: number;
            y: number;
            radius: number;
            speed: number;
            opacity: number;
            type: 'circle' | 'snowflake';
            sway: number;
            swaySpeed: number;
            initialX: number;
        }[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticles = () => {
            const particleCount = Math.floor(window.innerWidth / 10); // Responsive particle count
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                const type = Math.random() > 0.8 ? 'snowflake' : 'circle';
                const x = Math.random() * canvas.width;
                particles.push({
                    x: x,
                    y: Math.random() * canvas.height,
                    radius: type === 'snowflake' ? Math.random() * 10 + 10 : Math.random() * 3 + 1,
                    speed: Math.random() * 0.5 + 0.2,
                    opacity: Math.random() * 0.5 + 0.3,
                    type: type,
                    sway: Math.random() * 20 + 10, // Sway amplitude
                    swaySpeed: Math.random() * 0.02 + 0.01, // Sway frequency
                    initialX: x,
                });
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
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
            particles.forEach((p) => {
                p.y += p.speed;
                // Apply horizontal sway
                p.x = p.initialX + Math.sin(p.y * p.swaySpeed) * p.sway;

                if (p.y > canvas.height) {
                    p.y = -p.radius;
                    p.initialX = Math.random() * canvas.width;
                    p.x = p.initialX;
                }
            });
        };

        const animate = () => {
            drawParticles();
            updateParticles();
            animationFrameId = requestAnimationFrame(animate);
        };

        resizeCanvas();
        createParticles();
        animate();

        window.addEventListener("resize", () => {
            resizeCanvas();
            createParticles();
        });

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-30"
        />
    );
}
