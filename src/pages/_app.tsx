import GlobalStyle from '@src/styles/globalStyle';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import Script from 'next/script';
import * as gtag from '../utils/gtag';
import { hotjar } from 'react-hotjar';
import { HJID, HJSV } from '@src/utils/constant';
import { isMobile } from 'react-device-detect';
import Mobile from './moblie';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [isDeviceMobile, setIsDeviceMoblie] = useState<boolean>(false);

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
    if (isMobile) setIsDeviceMoblie(true);
  }, []);

  return (
    <>
      {isDeviceMobile ? (
        <>
          <GlobalStyle />
          <Mobile />
        </>
      ) : (
        <>
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
              <Component {...pageProps} />
            </RecoilRoot>
          </QueryClientProvider>
        </>
      )}
    </>
  );
}

export default MyApp;
