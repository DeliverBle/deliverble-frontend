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
import { imgBannerVer1Mic } from 'public/assets/images';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

function Home() {
  const isLoggedIn = useRecoilValue(loginState);
  const NavigationBar = dynamic(() => import('@src/components/common/NavigationBar'), { ssr: false });
  const [newsList, setNewsList] = useState<VideoData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const { videoList } = isLoggedIn
        ? await api.homeService.getPrivateVideoData()
        : await api.homeService.getPublicVideoData();
      setNewsList(videoList);
    })();
    setIsLoading(false);
  }, [isLoggedIn]);

  const handleClickLike = async (id: number) => {
    const { id: likeId, isFavorite } = await api.likeService.postLikeData(id);

    setNewsList((prev) => {
      return prev.map((news) => {
        if (news.id === likeId) {
          return {
            ...news,
            isFavorite,
          };
        }
        return news;
      });
    });
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
          </StBannerText>
          <ImageDiv className="mic" src={imgBannerVer1Mic} alt="" layout="fill" />
        </StBanner>
        <StNews>
          <h3>딜리버블의 추천 뉴스를 만나보세요.</h3>
          <div>
            {isLoading ? (
              <VideoListSkeleton itemNumber={8} />
            ) : (
              <NewsList onClickLike={handleClickLike} newsList={newsList} />
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
  margin: 20.1rem 0 20.1rem 16rem;

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
    margin: 23.2rem 0 23.1rem 6.4rem;
    min-width: 36.7rem;

    & > h1 {
      ${FONT_STYLES.SB_32_HEADLINE}
    }

    & > p {
      ${FONT_STYLES.M_18_CAPTION}
    }
  }
`;

const StNews = styled.div`
  padding: 0 0 30rem 16rem;

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
    }
  }
`;
