import NavigationBar from '@src/components/common/NavigationBar';
import Footer from '@src/components/common/Footer';
import SEO from '@src/components/common/SEO';
import VideoListSkeleton from '@src/components/common/VideoListSkeleton';
import HeadlineContainer from '@src/components/review/HeadlineContainer';
import VideoContainer from '@src/components/review/VideoContainer';
import { api } from '@src/services/api';
import { VideoData } from '@src/services/api/types/review';
import { loginState } from '@src/stores/loginState';
import { LIST_SIZE } from '@src/utils/constant';
import { useEffect, useState } from 'react';
import { COLOR } from 'src/styles/color';
import { FONT_STYLES } from 'src/styles/fontStyle';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

function Review() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [tab, setTab] = useState('isFavorite');
  const [favoriteList, setFavoriteList] = useState<VideoData[]>([]);
  const [historyList, setHistoryList] = useState<VideoData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getNewsList = async () => {
    setIsLoading(true);

    const { favoritePaging, favoriteList } = await api.reviewService
      .postFavoriteVideoList({
        currentPage: 1,
        listSize: LIST_SIZE,
      })
      .catch(() => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.reload();
        return {
          favoritePaging: {
            totalCount: 0,
            lastPage: 0,
          },
          favoriteList: [],
        };
      });

    const { historyPaging, historyList } = await api.reviewService
      .postHistoryVideoList({
        currentPage: 1,
        listSize: LIST_SIZE,
      })
      .catch(() => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.reload();
        return {
          historyPaging: {
            totalCount: 0,
            lastPage: 0,
          },
          historyList: [],
        };
      });

    setCurrentPage(1);
    tab === 'isFavorite'
      ? (setTotalCount(favoritePaging.totalCount), setLastPage(favoritePaging.lastPage), setFavoriteList(favoriteList))
      : (setTotalCount(historyPaging.totalCount), setLastPage(historyPaging.lastPage), setHistoryList(historyList));
    setIsLoading(false);
  };

  const handlePageChange = async (page: number) => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    const { favoritePaging, favoriteList } = await api.reviewService.postFavoriteVideoList({
      currentPage: page,
      listSize: LIST_SIZE,
    });

    const { historyPaging, historyList } = await api.reviewService.postHistoryVideoList({
      currentPage: page,
      listSize: LIST_SIZE,
    });

    setCurrentPage(page);
    setTotalCount(tab === 'isFavorite' ? favoritePaging.totalCount : historyPaging.totalCount);
    setLastPage(tab === 'isFavorite' ? favoritePaging.lastPage : historyPaging.lastPage);
    setFavoriteList(favoriteList);
    setHistoryList(historyList);
    setIsLoading(false);
  };

  const handleClickLike = async (id: number) => {
    await api.likeService.postLikeData(id);
    getNewsList();
  };

  useEffect(() => {
    isLoggedIn && getNewsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, isLoggedIn]);

  return (
    <StPageWrapper>
      <SEO title="복습하기 | Deliverble" />
      <NavigationBar />
      <StReview>
        <HeadlineContainer />
        <StTab>
          <StButton isActive={tab === 'isFavorite'} onClick={() => setTab('isFavorite')}>
            내 즐겨찾기 기록
          </StButton>
          <span> | </span>
          <StButton isActive={tab === 'isLearned'} onClick={() => setTab('isLearned')}>
            내 학습 기록
          </StButton>
        </StTab>
        {isLoading ? (
          <VideoListSkeleton itemNumber={12} hasCountSection={true} />
        ) : (
          <VideoContainer
            tab={tab}
            videoList={tab === 'isFavorite' ? favoriteList : historyList}
            onClickLike={handleClickLike}
            totalCount={totalCount}
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={handlePageChange}
          />
        )}
      </StReview>
      <Footer />
    </StPageWrapper>
  );
}

export default Review;

const StPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StReview = styled.div`
  flex: 1;
  padding: 24.8rem 16rem 13.6rem 16rem;

  @media (max-width: 960px) {
    padding: 16rem 8.6rem;
  }

  @media (max-width: 500px) {
    padding: 16rem 2.4rem;
  }
`;

const StTab = styled.div`
  display: flex;
  gap: 2.4rem;
  ${FONT_STYLES.SB_28_HEADLINE};
  color: ${COLOR.GRAY_30};
  margin-bottom: 14.8rem;

  & > span {
    font-weight: 400;
  }
`;

const StButton = styled.button<{ isActive: boolean }>`
  padding: 0;
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? COLOR.BLACK : COLOR.GRAY_30)};
  ${({ isActive }) => (isActive ? FONT_STYLES.SB_28_HEADLINE : FONT_STYLES.M_28_HEADLINE)};
`;
