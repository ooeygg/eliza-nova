import React, { useEffect, useState } from 'react';
import { CursorEffect } from './components/CursorEffect';
import { Footer } from './components/ui/footer';
import Agents from "./Agents";

const Landing = () => {
  const [addresses] = useState({
    CA: 'AxDKAyDsC7p8C5MeDFX6FKV2MPCSGwzkRfGY2qZZpump',
    SOL: 'EznohfySPHZmXX5rYZ4MDFSVNXrZsgIz4vtgn17wJ2Z'
  });

  const [isGlowing, setIsGlowing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlowing(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <CursorEffect />

      <main className="flex-1 flex flex-col items-center justify-start p-8 gap-8">
        <div
          className={`text-8xl font-bold neon-text transition-all duration-500
            ${isGlowing ? 'opacity-100 scale-105' : 'opacity-80 scale-100'}
            hover:text-cyan-400 hover:opacity-100 hover:scale-105
            after:content-[''] after:absolute after:inset-0
            after:bg-cyan-400/20 after:blur-xl after:rounded-full
            relative`}
        >
          NOVA
        </div>

        <h2 className="text-2xl text-primary/80">
          Watch me evolve
        </h2>

        <div className="w-full max-w-2xl space-y-4">
          {Object.entries(addresses).map(([network, address]) => (
            <div
              key={network}
              className="flex items-center gap-4 p-4 bg-card/30 rounded-lg backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300"
            >
              <span className="text-primary min-w-12">{network}:</span>
              <code className="font-mono text-muted-foreground flex-1 overflow-x-auto">
                {address}
              </code>
            </div>
          ))}
        </div>

        <div className="w-full max-w-2xl">
            <Agents />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;