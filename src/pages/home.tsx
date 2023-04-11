import { BannerSlider, Footer, NavigationBar, NewsList, SEO, VideoListSkeleton } from '@src/components/common';
import { api } from '@src/services/api';
import { VideoData } from '@src/services/api/types/home';
import { loginState } from '@src/stores/loginState';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useMediaQuery } from 'react-responsive';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

function Home() {
  const router = useRouter();
  const setIsLoggedIn = useSetRecoilState(loginState);
  const [newsList, setNewsList] = useState<VideoData[]>([]);
  const [speechGuideList, setSpeechGuideList] = useState<VideoData[]>([]);
  const [mounted, setMounted] = useState(false);
  const smallBanner = useMediaQuery({
    query: '(max-width: 500px)',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const { isLoading } = useQuery(
    ['getNewsList'],
    async () => {
      return {
        recommend: await api.homeService.getVideoData(),
        speechGuide: await api.homeService.getSpeechGuideData(),
      };
    },
    {
      onSuccess: (data) => {
        const { recommend, speechGuide } = data;
        setNewsList(recommend.videoList);
        setSpeechGuideList(speechGuide.videoList);
      },
      onError: () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.reload();
        return;
      },
      retry: 0,
    },
  );

  const handleClickLike = async (id: number) => {
    const { id: likeId, isFavorite } = await api.commonService.postLikeData(id);
    const setterList = [setNewsList, setSpeechGuideList];
    setterList.map((setter) =>
      setter((prev) => prev.map((news) => (news.id === likeId ? { ...news, isFavorite } : news))),
    );
  };

  return (
    <StPageWrapper>
      <SEO title="Deliverble" />
      <NavigationBar />
      <StHome>
        <BannerSlider />
        <main>
          <StNews type="guide">
            <h2>스스로 학습하기 전, {mounted && smallBanner && <br />}스피치 가이드를 살펴보세요.</h2>
            {isLoading ? (
              <VideoListSkeleton itemNumber={4} />
            ) : (
              <div>
                <NewsList onClickLike={handleClickLike} newsList={speechGuideList} type="guide" />
              </div>
            )}
          </StNews>
          <StNews type="normal">
            <h2>딜리버블의 추천 뉴스를 만나보세요.</h2>
            {isLoading ? (
              <VideoListSkeleton itemNumber={8} />
            ) : (
              <div>
                <NewsList onClickLike={handleClickLike} newsList={newsList} type="normal" />
              </div>
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
