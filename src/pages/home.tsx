import styled from 'styled-components';
import NavigationBar from '@src/components/common/NavigationBar';
import NewsList from '@src/components/common/NewsList';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { COLOR } from '@src/styles/color';
import { api } from '@src/services/api';
import { VideoData } from '@src/services/api/types/home';
import Footer from '@src/components/common/Footer';
import SEO from '@src/components/common/SEO';
import { useEffect, useState } from 'react';
import VideoListSkeleton from '@src/components/common/VideoListSkeleton';
import ImageDiv from '@src/components/common/ImageDiv';
import { imgBannerMic } from 'public/assets/images';

function Home() {
  const [newsList, setNewsList] = useState<VideoData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { videoList } = await api.homeService.getVideoData();
      setNewsList(videoList);
      setIsLoading(false);
    })();
  }, []);

  const handleClickLike = () => {
    console.log('하트 클릭');
  };

  return (
    <>
      <SEO title="Deliverble" />
      <NavigationBar />
      <StHome>
        <StBannerText>
          <h1>
            우리는 말하는 법은 배웠지만,
            <br />잘 말하는 법은 배우지 못했다!
          </h1>
          <p>딜리버블과 함께 잘 말하는 법을 배워봐요!</p>
        </StBannerText>
        <ImageDiv className="mic" src={imgBannerMic} alt="" />
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

  height: 60rem;
  margin: 13.6rem 0 14.4rem 0;

  background: no-repeat url('/assets/images/img_banner_background.svg');
  background-size: cover;

  .mic {
    margin-right: 6.4rem;

    min-width: 122.4rem;
    min-height: 68.6rem;
  }
`;

const StBannerText = styled.div`
  margin: 20.1rem 0 20.1rem 16rem;

  min-width: 50.4rem;
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
  padding: 0 0 16rem 16rem;

  & > div {
    margin: 0 auto;
    padding-right: 16rem;
  }

  & > h3 {
    min-width: 4.8rem;
    margin-bottom: 7.2rem;

    ${FONT_STYLES.SB_32_HEADLINE}
    color: ${COLOR.BLACK};
  }
`;
