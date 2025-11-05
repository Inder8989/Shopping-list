import React, { useEffect, useState } from 'react';

interface Particle {
    id: number;
    x: number;
    y: number;
    rotation: number;
    scale: number;
    color: string;
    opacity: number;
    vx: number;
    vy: number;
    vr: number;
}

const numParticles = 150;

export const Confetti: React.FC = () => {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        const themeColors = [
            `rgb(${rootStyles.getPropertyValue('--color-primary-500').trim()})`,
            `rgb(${rootStyles.getPropertyValue('--color-primary-400').trim()})`,
            `rgb(${rootStyles.getPropertyValue('--color-primary-600').trim()})`,
            `rgb(${rootStyles.getPropertyValue('--color-primary-200').trim()})`,
        ];

        const newParticles: Particle[] = Array.from({ length: numParticles }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: -10 - Math.random() * 20,
            rotation: Math.random() * 360,
            scale: 0.5 + Math.random() * 0.5,
            color: themeColors[Math.floor(Math.random() * themeColors.length)],
            opacity: 1,
            vx: -5 + Math.random() * 10,
            vy: 5 + Math.random() * 5,
            vr: -20 + Math.random() * 40,
        }));
        setParticles(newParticles);
    }, []);

    useEffect(() => {
        if (particles.length === 0) return;

        let animationFrameId: number;

        const update = () => {
            setParticles(prev => prev.map(p => {
                const newY = p.y + p.vy;
                if (newY > 120) {
                    return {
                        ...p,
                        y: -10,
                        x: Math.random() * 100,
                        opacity: 1,
                    };
                }
                return {
                    ...p,
                    y: newY,
                    x: p.x + p.vx * 0.1,
                    rotation: p.rotation + p.vr * 0.1,
                    opacity: p.y > 90 ? p.opacity - 0.05 : p.opacity,
                };
            }).filter(p => p.opacity > 0));
            animationFrameId = requestAnimationFrame(update);
        };

        animationFrameId = requestAnimationFrame(update);

        const timeoutId = setTimeout(() => {
            cancelAnimationFrame(animationFrameId);
            setParticles([]);
        }, 5000);

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearTimeout(timeoutId);
        };
    }, [particles.length > 0]);


    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 100 }}>
            {particles.map(p => (
                <div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        left: `${p.x}vw`,
                        top: `${p.y}vh`,
                        width: '10px',
                        height: '10px',
                        backgroundColor: p.color,
                        opacity: p.opacity,
                        transform: `rotate(${p.rotation}deg) scale(${p.scale})`,
                        transition: 'opacity 0.5s',
                    }}
                />
            ))}
        </div>
    );
};