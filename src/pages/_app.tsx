import { CustomErrorBoundary } from '@src/components/common';
import { HJID, HJSV } from '@src/constants/common';
import GlobalStyle from '@src/styles/globalStyle';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { hotjar } from 'react-hotjar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import * as gtag from '../utils/gtag';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            useErrorBoundary: true,
            retry: 0,
          },
          mutations: {
            useErrorBoundary: true,
          },
        },
      }),
  );

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
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      hotjar.initialize(HJID, HJSV);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyle />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <CustomErrorBoundary>
          <Component {...pageProps} />
        </CustomErrorBoundary>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
