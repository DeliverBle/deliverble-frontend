import { BannerSlider, Footer, NavigationBar, NewsList, SEO, VideoListSkeleton } from '@src/components/common';
import { usePostLikeData } from '@src/services/queries/common';
import { useGetRecommendVideoList, useGetSpeechGuideList } from '@src/services/queries/home';
import { COLOR, FONT_STYLES } from '@src/styles';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

function Home() {
  const [mounted, setMounted] = useState(false);
  const smallBanner = useMediaQuery({ query: '(max-width: 500px)' });
  const newsList = useGetRecommendVideoList();
  const speechGuideList = useGetSpeechGuideList();
  const postLikeData = usePostLikeData();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <StPageWrapper>
      <SEO title="Deliverble" />
      <NavigationBar />
      <StHome>
        <BannerSlider />
        <main>
          <StNews type="guide">
            <h2>스스로 학습하기 전, {mounted && smallBanner && <br />}스피치 가이드를 살펴보세요.</h2>
            {speechGuideList.isLoading ? (
              <VideoListSkeleton itemNumber={4} />
            ) : (
              speechGuideList.data && (
                <div>
                  <NewsList onClickLike={postLikeData.mutate} newsList={speechGuideList.data} type="guide" />
                </div>
              )
            )}
          </StNews>
          <StNews type="normal">
            <h2>딜리버블의 추천 뉴스를 만나보세요.</h2>
            {newsList.isLoading ? (
              <VideoListSkeleton itemNumber={8} />
            ) : (
              newsList.data && (
                <div>
                  <NewsList onClickLike={postLikeData.mutate} newsList={newsList.data} type="normal" />
                </div>
              )
            )}
          </StNews>
        </main>
      </StHome>
      <Footer />
    </StPageWrapper>
  );
}

export default Home;

const StPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StHome = styled.div`
  position: relative;
  flex: 1;
  padding-top: 8.8rem;
`;

const StNews = styled.div<{ type: string }>`
  padding-left: 16rem;
  padding-bottom: ${({ type }) => (type === 'guide' ? '20rem' : '30rem')};

  & > div {
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

    & > div {
      padding-right: 8.6rem;
    }
  }

  @media (max-width: 500px) {
    padding-left: 2.4rem;

    & > div {
      padding-right: 2.4rem;
    }

    h2 {
      margin-bottom: 3.2rem;
      ${FONT_STYLES.SB_21_BODY};
      zoom: 150%;
    }
  }
`;
