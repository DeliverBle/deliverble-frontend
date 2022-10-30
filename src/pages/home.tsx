import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SEO from '@src/components/common/SEO';
import NavigationBar from '@src/components/common/NavigationBar';
import ImageDiv from '@src/components/common/ImageDiv';
import NewsList from '@src/components/common/NewsList';
import VideoListSkeleton from '@src/components/common/VideoListSkeleton';
import Footer from '@src/components/common/Footer';
import { api } from '@src/services/api';
import { VideoData } from '@src/services/api/types/home';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { COLOR } from '@src/styles/color';
import { imgBannerMic, imgBannerMic2 } from 'public/assets/images';
import { useMediaQuery } from 'react-responsive';

function Home() {
  const [newsList, setNewsList] = useState<VideoData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const is960 = useMediaQuery({
    query: '(min-width: 501px) and (max-width: 960px)',
  });
  const is500 = useMediaQuery({
    query: '(max-width: 500px)',
  });

  const getVideoList = async () => {
    const { videoList } = await api.homeService.getVideoData();
    setNewsList(videoList);
  };

  useEffect(() => {
    setIsLoading(true);
    getVideoList();
    setIsLoading(false);
  }, []);

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
    <>
      <SEO title="Deliverble" />
      <NavigationBar />
      <StHome>
        <>
          <StBannerText>
            <h1>
              우리는 말하는 법은 배웠지만,
              <br />잘 말하는 법은 배우지 못했다!
            </h1>
            <p>딜리버블과 함께 잘 말하는 법을 배워봐요!</p>
          </StBannerText>
          {is960 ? (
            <ImageDiv className="mic2" src={imgBannerMic2} alt="" />
          ) : (
            !is500 && <ImageDiv className="mic" src={imgBannerMic} alt="" layout="fill" />
          )}
        </>
      </StHome>
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
      <Footer />
    </>
  );
}

export default Home;

const StHome = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  position: relative;

  height: 60rem;
  margin: 13.6rem 0 14.4rem 0;

  background: no-repeat url('/assets/images/img_banner_background.png');
  background-size: cover;
  background-position: center;

  .mic {
    position: absolute;
    right: 6.4rem;

    min-width: 122.4rem;
    min-height: 68.6rem;
  }

  @media (max-width: 990px) {
    .mic {
      left: 16rem;
      right: 0px;
      width: 122.4rem;
    }
  }

  @media (max-width: 960px) {
    .mic2 {
      position: absolute;
      left: 22rem;
      top: 0px;

      min-width: 96rem;
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
      padding-top: 3.2rem;
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
    padding: 0 0 30rem 8.6rem;

    & > div {
      padding-right: 8.6rem;
    }
  }

  @media (max-width: 500px) {
    padding: 0 0 30rem 2.4rem;
    zoom: 150%;

    & > div {
      padding-right: 2.4rem;
    }

    & > h3 {
      margin-bottom: 3.2rem;
      ${FONT_STYLES.SB_21_BODY};
    }
  }
`;
