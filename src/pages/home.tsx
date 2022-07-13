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
  const [videoList, setVideoList] = useState<videoType[]>([
    {
      id: 1,
      title: '비트코인, 한때 1만 8천 달러 붕괴',
      channel: 'SBS 뉴스',
      category: '사회',
      date: '2022.06.19',
      thumbnail: 'https://이미지링크',
      isLiked: true,
    },
    {
      id: 2,
      title: '비트코인, 한때 1만 8천 달러 붕괴',
      channel: 'SBS 뉴스',
      category: '사회',
      date: '2022.06.19',
      thumbnail: 'https://이미지링크',
      isLiked: false,
    },
    {
      id: 3,
      title: '비트코인, 한때 1만 8천 달러 붕괴',
      channel: 'SBS 뉴스',
      category: '사회',
      date: '2022.06.19',
      thumbnail: 'https://이미지링크',
      isLiked: false,
    },
    {
      id: 4,
      title: '비트코인, 한때 1만 8천 달러 붕괴',
      channel: 'SBS 뉴스',
      category: '사회',
      date: '2022.06.19',
      thumbnail: 'https://이미지링크',
      isLiked: false,
    },
    {
      id: 5,
      title: '비트코인, 한때 1만 8천 달러 붕괴',
      channel: 'SBS 뉴스',
      category: '사회',
      date: '2022.06.19',
      thumbnail: 'https://이미지링크',
      isLiked: false,
    },
    {
      id: 6,
      title: '비트코인, 한때 1만 8천 달러 붕괴',
      channel: 'SBS 뉴스',
      category: '사회',
      date: '2022.06.19',
      thumbnail: 'https://이미지링크',
      isLiked: false,
    },
    {
      id: 7,
      title: '비트코인, 한때 1만 8천 달러 붕괴',
      channel: 'SBS 뉴스',
      category: '사회',
      date: '2022.06.19',
      thumbnail: 'https://이미지링크',
      isLiked: false,
    },
    {
      id: 8,
      title: '비트코인, 한때 1만 8천 달러 붕괴',
      channel: 'SBS 뉴스',
      category: '사회',
      date: '2022.06.19',
      thumbnail: 'https://이미지링크',
      isLiked: false,
    },
  ]);

  // const fetchVideoList = async () => {
  //   try {
  //     const { data } = await axios.get('https://5bf61531-1c07-442d-b743-28471f964f44.mock.pstmn.io/recommend_news');
  //     setVideoList(() => data.data.videoList);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   fetchVideoList();
  // }, [videoList]);

  if (!videoList) return null;
  return (
    <>
      <Head>
        <title>DeliverBle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StHome>
        <StBannerText>
          <h1>
            우리는 말하는 법은 배웠지만,
            <br />잘 말하는 법은 배우지 못했다!
          </h1>
          <p>딜리버블과 함께 잘 말하는 법을 배워봐요!</p>
        </StBannerText>
      </StHome>
      <StNews>
        <h3>딜리버블의 추천 뉴스를 만나보세요.</h3>
        <div>
          <NewsList newsList={videoList} />
        </div>
      </StNews>
    </>
  );
}

export default Home;

const StHome = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 73rem; // 68.8rem
  margin: 4.8rem 0 16rem 0;

  background: no-repeat url('/assets/images/img_banner.svg');
  background-size: cover;
  background-position: center;
`;

const StBannerText = styled.div`
  padding: 28.9rem 0 20.1rem 16rem;

  width: fit-content;
  height: fit-content;

  color: ${COLOR.WHITE};

  & > h1 {
    ${FONT_STYLES.M_44_HEADLINE}
  }

  & > p {
    padding-top: 3.2rem;
    ${FONT_STYLES.M_24_HEADLINE}
  }
`;

const StNews = styled.div`
  padding: 0 16rem 16rem 16rem;

  & > div {
    margin: 0 auto;
  }

  & > h3 {
    margin-bottom: 2.8rem;

    ${FONT_STYLES.SB_32_HEADLINE}
    color: ${COLOR.BLACK};
  }
`;
