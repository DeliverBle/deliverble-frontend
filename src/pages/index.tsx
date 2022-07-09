import Head from 'next/head';
import GlobalStyle from 'styles/globalStyle';

function Home() {
  return (
    <div>
      <Head>
        <title>DeliverBle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <GlobalStyle />
        <div>Home</div>
      </>
    </div>
  );
}

export default Home;
