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
      </StHome>
      <StNews>
        <h3>딜리버블의 추천 뉴스를 만나보세요.</h3>
        <div>{isLoading ? <VideoListSkeleton itemNumber={8} /> : <NewsList newsList={newsList} />}</div>
      </StNews>
      <Footer />
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
