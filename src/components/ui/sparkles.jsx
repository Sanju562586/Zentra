"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

export const SparklesCore = ({
    id,
    className,
    background,
    minSize,
    maxSize,
    particleDensity,
    particleColor,
}) => {
    const [init, setInit] = useState(false);

    // Simplified version using simple divs/svgs for better performance than full tsparticles if not installed
    // Or we can simulate it with css animations for now as a "Lite" version

    // For this demo, let's create a visual approximation using a canvas or purely CSS.
    // Actually, to make it "God Level" properly, let's try a simple canvas approach.

    const canvasRef = React.useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let animationFrameId;
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const createParticles = () => {
            for (let i = 0; i < (particleDensity || 50); i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * (maxSize || 2) + (minSize || 0.5),
                    speedX: Math.random() * 0.5 - 0.25,
                    speedY: Math.random() * 0.5 - 0.25,
                });
            }
        };

        createParticles();

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = particleColor || "#FFFFFF";

            particles.forEach((p, i) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            });

            animationFrameId = requestAnimationFrame(drawParticles);
        };

        drawParticles();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id={id}
            className={cn("absolute inset-0 h-full w-full pointer-events-none", className)}
            style={{ background: background || "transparent" }}
        />
    );
};
