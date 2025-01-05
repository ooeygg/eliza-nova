import { useEffect, useState } from 'react';
import '../styles/cursor.css';

export function CursorEffect() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);
    let trailCounter = 0;

    useEffect(() => {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-dot';
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        const glow = document.createElement('div');

        document.body.appendChild(cursor);
        document.body.appendChild(trail);
        document.body.appendChild(glow);

        const updateCursor = (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;

            setPosition({ x, y });

            cursor.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
            trail.style.transform = `translate(${x - 12}px, ${y - 12}px)`;
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;

            // Create trail particle
            if (Math.random() > 0.55) {
                const particle = document.createElement('div');
                particle.className = 'trail-particle';
                particle.style.left = `${x - 4}px`;
                particle.style.top = `${y - 4}px`;
                document.body.appendChild(particle);

                setTimeout(() => {
                    document.body.removeChild(particle);
                }, 1500);
            }
        };

        const updateCursorStyle = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = (
                target.tagName.toLowerCase() === 'button' ||
                target.tagName.toLowerCase() === 'a' ||
                target.closest('button') ||
                target.closest('a')
            );

            setIsPointer(isClickable);

            if (isClickable) {
                trail.style.width = '42px';
                trail.style.height = '42px';
                trail.style.opacity = '0.8';
                trail.style.borderWidth = '1px';
            } else {
                trail.style.width = '24px';
                trail.style.height = '24px';
                trail.style.opacity = '0.5';
                trail.style.borderWidth = '2px';
            }
        };

        document.addEventListener('mousemove', updateCursor);
        document.addEventListener('mouseover', updateCursorStyle);

        return () => {
            document.removeEventListener('mousemove', updateCursor);
            document.removeEventListener('mouseover', updateCursorStyle);
            document.body.removeChild(cursor);
            document.body.removeChild(trail);
            document.body.removeChild(glow);
        };
    }, []);

    return null;
}