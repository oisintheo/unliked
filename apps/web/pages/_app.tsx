import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Outfit } from '@next/font/google';
import { useState } from 'react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { MyUserContextProvider } from 'utils/useUser';
import { Database } from '@unliked/types';

const outfit = Outfit({
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>(),
  );

  return (
    <main className={outfit.className}>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider>
          <Component {...pageProps} />
        </MyUserContextProvider>
      </SessionContextProvider>
    </main>
  );
}
