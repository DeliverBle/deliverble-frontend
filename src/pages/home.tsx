import { BannerSlider, Footer, NavigationBar, NewsList, SEO, VideoListSkeleton } from '@src/components/common';
import { api } from '@src/services/api';
import { usePostLikeData } from '@src/services/queries/common';
import { useGetRecommendVideoList, useGetSpeechGuideList } from '@src/services/queries/home';
import { loginState } from '@src/stores/loginState';
import { COLOR, FONT_STYLES } from '@src/styles';
import type { NewsListType } from '@src/types/home';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

function Home({ initialRecommendNewsList, initialSpeechGuideList }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [mounted, setMounted] = useState(false);
  const smallBanner = useMediaQuery({ query: '(max-width: 500px)' });
  const isLoggedIn = useRecoilValue(loginState);
  const newsList = useGetRecommendVideoList(initialRecommendNewsList);
  const speechGuideList = useGetSpeechGuideList(initialSpeechGuideList);
  const postLikeData = usePostLikeData();

  useEffect(() => {
    if (isLoggedIn) {
      newsList.refetch();
      speechGuideList.refetch();
    }
    setMounted(true);
  }, []);

  return (
    <StPageWrapper>
      <SEO title="Deliverble" />
      <NavigationBar />
      <StHome>
        <BannerSlider />
        <StNews type="guide">
          <h2>스스로 학습하기 전, {mounted && smallBanner && <br />}스피치 가이드를 살펴보세요.</h2>
          <NewsList onClickLike={postLikeData.mutate} newsList={speechGuideList.data} type="guide" />
        </StNews>
        <StNews type="normal">
          <h2>딜리버블의 추천 뉴스를 만나보세요.</h2>
          <NewsList onClickLike={postLikeData.mutate} newsList={newsList.data} type="normal" />
        </StNews>
      </StHome>
      <Footer />
    </StPageWrapper>
  );
}

export const getStaticProps: GetStaticProps<NewsListType> = async () => {
  const initialRecommendNewsList = await api.homeService.getVideoData();
  const initialSpeechGuideList = await api.homeService.getSpeechGuideData();

  return { props: { initialRecommendNewsList, initialSpeechGuideList } };
};

export default Home;

const StPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StHome = styled.main`
  position: relative;
  flex: 1;
  padding-top: 8.8rem;
`;

const StNews = styled.div<{ type: string }>`
  padding-left: 16rem;
  padding-bottom: ${({ type }) => (type === 'guide' ? '20rem' : '30rem')};

  & > section {
    margin: 0 auto;
    padding-right: 16rem;
  }

  h2 {
    min-width: 4.8rem;
    margin-bottom: 5.6rem;

    ${FONT_STYLES.SB_32_HEADLINE}
    color: ${COLOR.BLACK};
  }

  @media (max-width: 960px) {
    padding-left: 8.6rem;

    & > section {
      padding-right: 8.6rem;
    }
  }

  @media (max-width: 500px) {
    padding-left: 2.4rem;

    & > section {
      padding-right: 2.4rem;
    }

    h2 {
      margin-bottom: 3.2rem;
      ${FONT_STYLES.SB_21_BODY};
      zoom: 150%;
    }
  }
`;
