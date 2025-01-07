'use client';

import { PrivyProvider as Provider } from '@privy-io/react-auth';
import { ReactNode } from 'react';

export function PrivyProvider({ children }: { children: ReactNode }) {
  return (
    <Provider
      appId="YOUR_PRIVY_APP_ID" // Replace with your actual Privy app ID
      config={{
        appearance: {
          theme: 'dark', // Matches your app's dark theme
          accentColor: '#646cff', // Matches your app's accent color
        },
        loginMethods: ['wallet'],
        defaultChain: 'solana',
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      {children}
    </Provider>
  );
}
