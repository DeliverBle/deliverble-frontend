import Head from 'next/head';
import NavigationBar from '@src/components/NavigationBar';

function Home() {
  return (
    <div>
      <Head>
        <title>DeliverBle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Home</div>
      <NavigationBar />
    </div>
  );
}

export default Home;
