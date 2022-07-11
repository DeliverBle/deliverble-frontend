import styled from 'styled-components';
import Head from 'next/head';
import { FONT_STYLES } from '@src/styles/fontStyle';

function Home() {
  return (
    <>
      <Head>
        <title>DeliverBle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StHome>
        <StBanner>
          <StBannerText>
            <h1>
              우리는 말하는 법은 배웠지만,
              <br />잘 말하는 법은 배우지 못했다!
            </h1>
            <p>딜리버블과 함께 잘 말하는 법을 배워봐요!</p>
          </StBannerText>
        </StBanner>
        <StNews>
          <h3>딜리버블의 추천 뉴스를 만나보세요.</h3>
        </StNews>
      </StHome>
    </>
  );
}

export default Home;

const StHome = styled.div``;

const StBanner = styled.div`
  display: flex;
  align-items: center;

  margin-top: 13.6rem;
  width: 100%;
  height: 68.8rem;

  background: no-repeat center/cover url('/assets/images/img_banner.svg');
`;

const StBannerText = styled.div`
  padding: 28.9rem 0 20.1rem 16rem;

  width: fit-content;
  height: fit-content;

  color: white;

  & > h1 {
    ${FONT_STYLES.M_44_HEADLINE}
  }

  & > p {
    padding-top: 3.2rem;
    ${FONT_STYLES.M_24_HEADLINE}
  }
`;

const StNews = styled.div`
  margin: 16rem 16.4rem 22rem 16rem;

  & > h3 {
    margin-bottom: 2.8rem;
    ${FONT_STYLES.SB_32_HEADLINE}
  }
`;
