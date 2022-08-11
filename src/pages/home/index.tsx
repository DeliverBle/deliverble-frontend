import NavigationBar from '@src/components/common/NavigationBar';
import NewsList from '@src/components/common/NewsList';
import { api } from '@src/services/api';
import { VideoData } from '@src/services/api/types/home';
import Footer from '@src/components/common/Footer';
import SEO from '@src/components/common/SEO';
import { useEffect, useState } from 'react';
import VideoListSkeleton from '@src/components/common/VideoListSkeleton';
import { StBannerText, StHome, StNews } from './style';

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
            우리는 말하는 법은 배웠지만,
            <br />잘 말하는 법은 배우지 못했다!
          </h1>
          <p>딜리버블과 함께 잘 말하는 법을 배워봐요!</p>
        </StBannerText>
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
