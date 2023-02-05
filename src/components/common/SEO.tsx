import Head from 'next/head';

interface SEOProps {
  title: string;
}

function SEO(props: SEOProps) {
  const { title } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="뉴스 스크립트, 끊어 읽기, 하이라이트, 메모 남기기 등의 기능과 함께 아나운서의 발성, 발음을 따라하고 말하기 자신감을 키워요!"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="DeliverBle 딜리버블" />
      <meta property="og:title" content="딜리버블 | 아나운서 쉐도잉으로 키우는 스피치 자신감" />
      <meta
        property="og:description"
        content="뉴스 스크립트, 끊어 읽기, 하이라이트, 메모 남기기 등의 기능과 함께 아나운서의 발성, 발음을 따라하고 말하기 자신감을 키워요!"
      />
      <meta property="og:image" content="/assets/images/img_thumbnail.png" />
      <meta property="og:url" content="https://deliverble.kr/" />
      <meta property="og:locale" content="ko_KR" />
      <meta
        name="keywords"
        content="뉴스 리딩, 스크립트, 아나운서, 스피치, 말하기 학습, 발성, 끊어 읽기, 쉐도잉, 발음 교정, 발표 목소리"
      />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:site" content="DeliverBle 딜리버블" />
      <meta property="twitter:title" content="딜리버블 | 아나운서 쉐도잉으로 키우는 스피치 자신감" />
      <meta
        property="twitter:description"
        content="뉴스 스크립트, 끊어 읽기, 하이라이트, 메모 남기기 등의 기능과 함께 아나운서의 발성, 발음을 따라하고 말하기 자신감을 키워요!"
      />
      <meta property="twitter:image" content="/assets/images/img_twitter_thumbnail.png" />
      <meta property="twitter:url" content="https://deliverble.kr/" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
}

export default SEO;
