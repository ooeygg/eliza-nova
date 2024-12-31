import { useEffect, useState } from 'react';

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
}

export const ComingSoon = () => {
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Initialize particles
    const initialParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      color: `hsla(${Math.random() * 360}, 70%, 70%, 0.6)`,
      speed: Math.random() * 1 + 0.5,
    }));
    setParticles(initialParticles);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev =>
        prev.map(particle => ({
          ...particle,
          y: particle.y - particle.speed,
          x: particle.x + Math.sin(particle.y * 0.01) * 0.5,
          ...(particle.y < 0 && {
            y: dimensions.height,
            x: Math.random() * dimensions.width,
          }),
        }))
      );
    };

    const animationFrame = requestAnimationFrame(function animate() {
      animateParticles();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [dimensions]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Particles */}
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <div className="relative mb-8">
          <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 md:text-8xl lg:text-9xl animate-pulse">
            Coming Soon
          </h1>
          <div className="absolute -inset-1 blur-xl bg-gradient-to-r from-purple-400 to-pink-600 opacity-30" />
        </div>

        <p className="max-w-md text-center text-gray-400 text-lg md:text-xl animate-fade-in">
          We're working on something amazing. Stay tuned!
        </p>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-30" />
      </div>
    </div>
  );
};

// Add these keyframes to your global CSS or style tag
const styles = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-in {
    animation: fade-in 1s ease-out forwards;
  }
`;

// Add style tag to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default ComingSoon;