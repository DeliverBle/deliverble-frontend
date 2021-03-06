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
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  const getNewsList = async () => {
    setIsLoading(true);

    const [{ videoList }, { favoriteList }] = await Promise.all([
      api.homeService.getVideoData(),
      api.likeService.getLikeData(),
    ]);

    setNewsList(
      videoList.map((news) => {
        return {
          ...news,
          isLiked: favoriteList.map((like) => like.id).includes(news.id),
        };
      }),
    );

    setIsLoading(false);
  };

  const getNewsListWithoutToken = async () => {
    setIsLoading(true);
    const { videoList } = await api.homeService.getVideoData();
    setNewsList(videoList);
    setIsLoading(false);
  };

  const handleClickLike = async (id: number, isLiked?: boolean) => {
    if (!isLiked) {
      await api.likeService.postLikeData({
        news_id: id,
        access_token: token,
        user_id: userId,
      });
    } else {
      await api.likeService.deleteLikeData({
        news_id: id,
        access_token: token,
        user_id: userId,
      });
    }
    getNewsList();
  };

  useEffect(() => {
    (async () => {
      const getAccessToken = () => localStorage.getItem('token') ?? '';
      const getUserId = () => localStorage.getItem('userId') ?? '';
      if (getAccessToken()) {
        setToken(getAccessToken());
      }
      if (getUserId()) {
        setUserId(getUserId());
      }
    })();
  }, []);

  useEffect(() => {
    const getAccessToken = () => localStorage.getItem('token') ?? '';
    if (getAccessToken()) {
      getNewsList();
    } else {
      getNewsListWithoutToken();
    }
  }, []);

  return (
    <>
      <SEO title="Deliverble" />
      <NavigationBar />
      <StHome>
        <StBannerText>
          <h1>
            ????????? ????????? ?????? ????????????,
            <br />??? ????????? ?????? ????????? ?????????!
          </h1>
          <p>??????????????? ?????? ??? ????????? ?????? ????????????!</p>
        </StBannerText>
      </StHome>
      <StNews>
        <h3>??????????????? ?????? ????????? ???????????????.</h3>
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
