'use client';

import { useEffect, useRef } from 'react';

interface Snowflake {
    x: number;
    y: number;
    radius: number;
    speed: number;
}

export default function SnowCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const backgroundImageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Load background image
        const backgroundImage = new Image();
        backgroundImage.src = '/snow_vector_bg.svg';
        backgroundImageRef.current = backgroundImage;

        // Set canvas size to window size
        const resizeCanvas = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Create snowflakes
        const snowflakes: Snowflake[] = Array.from({ length: 100 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            speed: Math.random() * 0.5 + 0.5,
        }));

        // Function to draw background
        const drawBackground = () => {
            if (!canvas || !ctx || !backgroundImageRef.current?.complete) return;

            const img = backgroundImageRef.current;
            ctx.drawImage(
                img,
                0, // X position at left edge
                0, // Y position at top
                canvas.width,
                canvas.height // Full height of canvas
            );
        };

        // Animation loop
        let animationFrameId: number;

        function animate() {
            if (!canvas || !ctx) return;

            // Clear canvas with sky blue background
            ctx.fillStyle = '#AFCEFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw background image
            drawBackground();

            // Draw snowflakes
            ctx.fillStyle = 'white';
            snowflakes.forEach(flake => {
                ctx.beginPath();
                ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
                ctx.fill();

                // Update position
                flake.y += flake.speed;

                // Reset position if snowflake goes off screen
                if (flake.y > canvas.height) {
                    flake.y = -5;
                    flake.x = Math.random() * canvas.width;
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        }

        animate();

        // Cleanup function
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10" />;
} 