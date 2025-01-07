import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { CursorEffect } from './components/CursorEffect';
import { Footer } from './components/ui/footer';
import { SolanaWalletLogin } from './components/ui/solanaWalletLogin';
import { DemoButton } from './components/ui/demoButton';
// import Agents from "./Agents";


const Landing = () => {
  const [addresses] = useState({
    CA: '8HjiRvPNwFT9jpzAAsYF4rE9y576CKdTkQZXaxibpump',
    Exchange: 'Raydium',
  });

  const [isGlowing, setIsGlowing] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlowing(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <CursorEffect />

      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <main className="flex-1 flex flex-col items-center justify-start px-4 md:px-8 py-12 md:py-16 gap-8 md:gap-12 relative z-10">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
          />
        </div>

        <motion.div
          className="text-center relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className={`text-8xl font-bold neon-text transition-all duration-500
                ${isGlowing ? 'opacity-100 scale-105' : 'opacity-80 scale-100'}
                hover:text-cyan-400 hover:opacity-100 hover:scale-105
                after:content-[''] after:absolute after:inset-0
                after:bg-cyan-400/20 after:blur-xl after:rounded-full
                relative`}
            whileHover={{
              textShadow: [
                "0 0 20px rgba(var(--primary-rgb), 0.7)",
                "0 0 40px rgba(var(--primary-rgb), 0.5)",
                "0 0 60px rgba(var(--primary-rgb), 0.3)",
              ],
              transition: {
                duration: 0.3
              }
            }}
          >
            NOVA DOVA DAO
          </motion.h1>

          <motion.h2
            className="text-xl md:text-2xl mt-4 text-primary/80 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Watch me evolve
          </motion.h2>
        </motion.div>

        <motion.div
          className="w-full max-w-3xl space-y-6 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="backdrop-blur-xl bg-card/20 rounded-3xl p-8 border border-primary/20
            shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]
            hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]
            hover:border-primary/30 transition-all duration-500">
            <SolanaWalletLogin />

            <div className="mt-8 space-y-4">
              {Object.entries(addresses).map(([network, address]) => (
                <motion.div
                  key={network}
                  className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 p-6
                    bg-background/40 rounded-2xl border border-primary/10
                    hover:border-primary/30 hover:bg-background/60
                    transition-all duration-300"
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <span className="text-primary font-medium min-w-[80px] uppercase tracking-wider text-sm">
                    {network}:
                  </span>
                  <code className="font-mono text-muted-foreground flex-1 overflow-x-auto text-sm md:text-base w-full">
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
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="w-full max-w-3xl px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <DemoButton />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
