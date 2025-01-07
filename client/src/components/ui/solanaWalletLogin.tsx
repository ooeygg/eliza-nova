import { usePrivy } from '@privy-io/react-auth';
import { useState } from 'react';

export function SolanaWalletLogin() {
  const { login, authenticated, ready } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!ready) {
    return null;
  }

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading || authenticated}
      className={`
        flex items-center justify-center px-6 py-3
        bg-card/30 rounded-lg backdrop-blur-sm
        border border-primary/20 hover:border-primary/40
        transition-all duration-300
        text-primary font-medium
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        ${authenticated ? 'bg-green-500/20 border-green-500/40' : ''}
      `}
    >
      {isLoading ? (
        <div className="flex gap-2">
          <span className="animate-pulse-fast">•</span>
          <span className="animate-pulse-med">•</span>
          <span className="animate-pulse-slow">•</span>
        </div>
      ) : authenticated ? (
        'Connected'
      ) : (
        'Connect Wallet'
      )}
    </button>
  );
}
