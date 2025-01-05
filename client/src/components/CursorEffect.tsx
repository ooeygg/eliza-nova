import { useEffect, useState, useCallback } from 'react';

export function CursorEffect() {
    const [isPointer, setIsPointer] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    const createTrailParticle = useCallback((x: number, y: number) => {
        // Create multiple particles with different properties
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.className = `trail-particle trail-particle-${i + 1}`;

            // Add random offset to position
            const offsetX = (Math.random() - 0.5) * 20;
            const offsetY = (Math.random() - 0.5) * 20;

            particle.style.left = `${x + offsetX}px`;
            particle.style.top = `${y + offsetY}px`;

            // Add random rotation
            const rotation = Math.random() * 360;
            particle.style.transform = `rotate(${rotation}deg)`;

            document.body.appendChild(particle);

            setTimeout(() => {
                if (document.body.contains(particle)) {
                    document.body.removeChild(particle);
                }
            }, 1000);
        }
    }, []);

    useEffect(() => {
        const cursor = document.createElement('div');
        const trail = document.createElement('div');
        const glow = document.createElement('div');

        cursor.className = 'cursor-dot';
        trail.className = 'cursor-trail';
        glow.className = 'cursor-glow';

        document.body.appendChild(cursor);
        document.body.appendChild(trail);
        document.body.appendChild(glow);

        let lastX = 0;
        let lastY = 0;
        let frameId: number;
        const render = () => {
            const currentX = parseFloat(cursor.style.transform.split('(')[1]) || 0;
            const currentY = parseFloat(cursor.style.transform.split(',')[1]) || 0;

            const dx = (lastX - currentX) * 0.15;
            const dy = (lastY - currentY) * 0.15;

            trail.style.transform = `translate(${currentX + dx - 12}px, ${currentY + dy - 12}px)`;
            frameId = requestAnimationFrame(render);
        };
        let lastMouseX = 0;
        let lastMouseY = 0;
        let lastMouseTime = 0;

        const updateCursor = (e: MouseEvent) => {
            const currentTime = performance.now();
            const timeDelta = currentTime - lastMouseTime;

            if (timeDelta > 0) {
                const velocityX = Math.abs(e.clientX - lastMouseX) / timeDelta;
                const velocityY = Math.abs(e.clientY - lastMouseY) / timeDelta;
                const velocity = Math.sqrt(velocityX * velocityX + velocityY * velocityY);

                // Create more particles when moving faster
                if (velocity > 0.1) {
                    const particleCount = Math.min(Math.floor(velocity * 2), 5);
                    for (let i = 0; i < particleCount; i++) {
                        createTrailParticle(e.clientX, e.clientY);
                    }
                }
            }

            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            lastMouseTime = currentTime;

            lastX = e.clientX;
            lastY = e.clientY;

            cursor.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
            glow.style.left = `${e.clientX}px`;
            glow.style.top = `${e.clientY}px`;
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
                trail.style.width = '32px';
                trail.style.height = '32px';
                trail.style.opacity = '0.8';
                trail.style.borderColor = 'rgba(6, 39, 17, 0.8)';
                glow.style.background = 'radial-gradient(circle, rgba(16, 39, 6, 0.3) 0%, rgba(16, 39, 176, 0.2) 40%, rgba(156, 39, 176, 0) 70%)';
            } else {
                trail.style.width = '24px';
                trail.style.height = '24px';
                trail.style.opacity = '0.5';
                trail.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                glow.style.background = 'radial-gradient(circle, rgba(6, 39, 176, 0.15) 0%, rgba(6, 39, 176, 0.1) 40%, rgba(156, 39, 176, 0) 70%)';
            }
        };

        const handleMouseDown = () => {
            cursor.classList.add('cursor-click');
            setIsClicking(true);
        };
        const handleMouseUp = () => {
            cursor.classList.remove('cursor-click');
            setIsClicking(false);
        };
        document.addEventListener('mousemove', updateCursor);
        document.addEventListener('mouseover', updateCursorStyle);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        frameId = requestAnimationFrame(render);

        return () => {
            document.removeEventListener('mousemove', updateCursor);
            document.removeEventListener('mouseover', updateCursorStyle);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            cancelAnimationFrame(frameId);
            document.body.removeChild(cursor);
            document.body.removeChild(trail);
            document.body.removeChild(glow);
        };
    }, [createTrailParticle]);

    return null;
}
