import GlobalStyle from '@src/styles/globalStyle';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { hotjar } from 'react-hotjar';
import { HJID, HJSV } from '@src/utils/constant';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  const router = useRouter();
  useEffect(() => storePathValues, [router.pathname]);

  const storePathValues = () => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    const prevPrevPath = storage.getItem('prevPath');
    const prevPath = storage.getItem('currentPath');
    storage.setItem('prevPrevPath', prevPrevPath || '');
    storage.setItem('prevPath', prevPath || '');
    storage.setItem('currentPath', globalThis.location.pathname);
  };

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      hotjar.initialize(HJID, HJSV);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyle />
        <Component {...pageProps} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
