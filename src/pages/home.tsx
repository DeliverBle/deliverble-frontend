import BannerSlider from '@src/components/common/BannerSlider';
import Footer from '@src/components/common/Footer';
import NewsList from '@src/components/common/NewsList';
import SEO from '@src/components/common/SEO';
import VideoListSkeleton from '@src/components/common/VideoListSkeleton';
import { api } from '@src/services/api';
import { VideoData } from '@src/services/api/types/home';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { loginState } from '@src/stores/loginState';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

function Home() {
  const NavigationBar = dynamic(() => import('@src/components/common/NavigationBar'), { ssr: false });
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
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
        recommend: isLoggedIn
          ? await api.homeService.getPrivateVideoData()
          : await api.homeService.getPublicVideoData(),
        speechGuide: isLoggedIn
          ? await api.homeService.getPrivateSpeechGuideData()
          : await api.homeService.getPublicSpeechGuideData(),
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
    const { id: likeId, isFavorite } = await api.likeService.postLikeData(id);
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
        <StNews type="guide">
          <h3>스스로 학습하기 전, {mounted && smallBanner && <br />}스피치 가이드를 살펴보세요.</h3>
          {isLoading ? (
            <VideoListSkeleton itemNumber={4} />
          ) : (
            <div>
              <NewsList onClickLike={handleClickLike} newsList={speechGuideList} type="guide" />
            </div>
          )}
        </StNews>
        <StNews type="normal">
          <h3>딜리버블의 추천 뉴스를 만나보세요.</h3>
          {isLoading ? (
            <VideoListSkeleton itemNumber={8} />
          ) : (
            <div>
              <NewsList onClickLike={handleClickLike} newsList={newsList} type="normal" />
            </div>
          )}
        </StNews>
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

  & > h3 {
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

    & > h3 {
      margin-bottom: 3.2rem;
      ${FONT_STYLES.SB_21_BODY};
      zoom: 150%;
    }
  }
`;
