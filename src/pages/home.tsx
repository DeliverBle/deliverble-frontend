import Footer from '@src/components/common/Footer';
import ImageDiv from '@src/components/common/ImageDiv';
import NewsList from '@src/components/common/NewsList';
import SEO from '@src/components/common/SEO';
import VideoListSkeleton from '@src/components/common/VideoListSkeleton';
import { api } from '@src/services/api';
import { VideoData } from '@src/services/api/types/home';
import { loginState } from '@src/stores/loginState';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import dynamic from 'next/dynamic';
import { icLeftArrowWhite, icRightArrowWhite } from 'public/assets/icons';
import { imgBannerVer1Mic } from 'public/assets/images';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

function Home() {
  const isLoggedIn = useRecoilValue(loginState);
  const NavigationBar = dynamic(() => import('@src/components/common/NavigationBar'), { ssr: false });
  const [newsList, setNewsList] = useState<VideoData[]>([]);
  const [speechGuideList, setSpeechGuideList] = useState<VideoData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const smallBanner = useMediaQuery({
    query: '(max-width: 500px)',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const { videoList } = isLoggedIn
        ? await api.homeService.getPrivateVideoData()
        : await api.homeService.getPublicVideoData();
      const { videoList: guideList } = isLoggedIn
        ? await api.homeService.getPrivateSpeechGuideData()
        : await api.homeService.getPublicSpeechGuideData();
      setNewsList(videoList);
      setSpeechGuideList(guideList);
    })();
    setIsLoading(false);
  }, [isLoggedIn]);

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
        <StBanner>
          <StBannerText>
            <h1>
              우리는 말하는 법은 배웠지만,
              <br />잘 말하는 법은 배우지 못했다!
            </h1>
            <p>딜리버블과 함께 잘 말하는 법을 배워봐요!</p>
            <StSlideButton>
              <button>
                <ImageDiv className="arrow" src={icLeftArrowWhite} alt="left-arrow" layout="fill" />
              </button>
              <p>1/3</p>
              <button>
                <ImageDiv className="arrow" src={icRightArrowWhite} alt="left-arrow" layout="fill" />
              </button>
            </StSlideButton>
          </StBannerText>
          <ImageDiv className="mic" src={imgBannerVer1Mic} alt="" layout="fill" />
        </StBanner>
        <StNews type="guide">
          <h3>스스로 학습하기 전, {mounted && smallBanner && <br />}스피치 가이드를 살펴보세요.</h3>
          <div>
            {isLoading ? (
              <VideoListSkeleton itemNumber={4} />
            ) : (
              <NewsList onClickLike={handleClickLike} newsList={speechGuideList} type="guide" />
            )}
          </div>
        </StNews>
        <StNews type="normal">
          <h3>딜리버블의 추천 뉴스를 만나보세요.</h3>
          <div>
            {isLoading ? (
              <VideoListSkeleton itemNumber={8} />
            ) : (
              <NewsList onClickLike={handleClickLike} newsList={newsList} type="normal" />
            )}
          </div>
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
  flex: 1;
`;

const StBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  position: relative;

  margin: 13.6rem 0 14.4rem 0;
  height: 60rem;
  background: url('/assets/images/img_banner_ver1_l.png') no-repeat left/cover;

  .mic {
    position: absolute;
    right: 0rem;
    width: 109.5rem;
    height: 68.8rem;
  }

  @media (min-width: 501px) {
    .mic {
      transition: opacity 0.2s ease-in;
    }
  }

  @media (max-width: 960px) {
    .mic {
      opacity: 0;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('/assets/images/img_banner_ver1_m.png') no-repeat center / 960px;
      transition: opacity 0.2s ease-in;
    }
  }

  @media (max-width: 500px) {
    &::before {
      opacity: 0;
      transition: opacity 0.2s ease-in;
    }
  }
`;

const StBannerText = styled.div`
  margin: 16rem 0 10rem 16rem;

  min-width: 50.4rem;
  height: fit-content;

  color: ${COLOR.WHITE};

  & > h1 {
    ${FONT_STYLES.SB_44_HEADLINE}
  }

  & > p {
    padding-top: 3.2rem;
    ${FONT_STYLES.M_24_HEADLINE}
  }

  @media (max-width: 960px) {
    margin-left: 6.4rem;
    min-width: 36.7rem;
  }
`;

const StSlideButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 12.8rem;
  width: 12.9rem;
  height: 4rem;

  background: rgba(22, 15, 53, 0.2);
  border-radius: 20px;
  ${FONT_STYLES.SB_16_CAPTION}
  letter-spacing: 0.8rem;

  & > p {
    width: 4.1rem;
    height: 2.2rem;
  }

  .arrow {
    position: relative;
    width: 2.4rem;
    height: 2.4rem;
  }
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
