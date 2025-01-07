import React, { useEffect, useState } from 'react';
import { CursorEffect } from './components/CursorEffect';
import { Footer } from './components/ui/footer';
import { SolanaWalletLogin } from './components/ui/solanaWalletLogin';
import Agents from "./Agents";

const Landing = () => {
  const [addresses] = useState({
    CA: '8HjiRvPNwFT9jpzAAsYF4rE9y576CKdTkQZXaxibpump',
    Exchange: 'Raydium',
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

      <main className="flex-1 flex flex-col items-center justify-start p-8 gap-6">
        <div
          className={`text-8xl font-bold neon-text transition-all duration-500
            ${isGlowing ? 'opacity-100 scale-105' : 'opacity-80 scale-100'}
            hover:text-cyan-400 hover:opacity-100 hover:scale-105
            after:content-[''] after:absolute after:inset-0
            after:bg-cyan-400/20 after:blur-xl after:rounded-full
            relative`}
        >
          NOVA DOVA DAO
        </div>

        <h2 className="text-2xl text-primary/80">
          Watch me evolve
        </h2>

        <div className="w-full max-w-2xl space-y-3 mb-6">
          <SolanaWalletLogin />
          {Object.entries(addresses).map(([network, address]) => (
            <div
              key={network}
              className="flex items-center gap-4 p-4 bg-card/30 rounded-lg backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300"
            >
              <span className="text-primary min-w-12">{network}:</span>
              <code className="font-mono text-muted-foreground flex-1 overflow-x-auto">
                {network === 'CA' ? (
                  <a
                    href="https://dexscreener.com/solana/3i8wmd25pdifbikjmklelvenjjhim3mfluabcmeofwc2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {address}
                  </a>
                ) : network === 'Exchange' ? (
                  <a
                    href="https://raydium.io/swap/?inputMint=8HjiRvPNwFT9jpzAAsYF4rE9y576CKdTkQZXaxibpump&outputMint=sol"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {address}
                  </a>
                ) : address}
              </code>
            </div>
          ))}
        </div>

        <div className="w-full max-w-2xl mt-2">
            <Agents />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
