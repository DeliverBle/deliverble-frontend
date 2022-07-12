import styled from 'styled-components';
import Head from 'next/head';
import { FONT_STYLES } from '@src/styles/fontStyle';
import NewsList from '@src/components/common/NewsList';
import { COLOR } from '@src/styles/color';
import axios from 'axios';
import { useEffect, useState } from 'react';

export interface videoType {
  id: number;
  title: string;
  channel: string;
  category: string;
  date: string;
  thumbnail: string;
  isLiked: boolean;
}

function Home() {
  const [videoList, setVideoList] = useState<videoType[]>([]);

  const fetchVideoList = async () => {
    try {
      const { data } = await axios.get('https://5bf61531-1c07-442d-b743-28471f964f44.mock.pstmn.io/recommend_news');
      setVideoList(() => data.data.videoList);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchVideoList();
  }, [videoList]);

  if (!videoList) return null;
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
          <div>
            <NewsList newsList={videoList} />
          </div>
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

  width: 100%;
  height: 73rem; // 68.8rem
  margin-top: 4.8rem;

  background: no-repeat url('/assets/images/img_banner.svg');
  background-size: cover;
  background-position: center;
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
  padding: 0 16rem 16rem 16.4rem;

  & > div {
    width: 159.6rem;
    margin: 0 auto;
  }

  & > h3 {
    padding-top: 16rem;
    margin-bottom: 2.8rem;

    ${FONT_STYLES.SB_32_HEADLINE}
    color: ${COLOR.BLACK};
  }
`;
