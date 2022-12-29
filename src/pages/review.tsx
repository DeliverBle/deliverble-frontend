import Footer from '@src/components/common/Footer';
import SEO from '@src/components/common/SEO';
import VideoListSkeleton from '@src/components/common/VideoListSkeleton';
import HeadlineContainer from '@src/components/review/HeadlineContainer';
import VideoContainer from '@src/components/review/VideoContainer';
import { api } from '@src/services/api';
import { VideoData } from '@src/services/api/types/review';
import { loginState } from '@src/stores/loginState';
import { LIST_SIZE } from '@src/utils/constant';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { COLOR } from 'src/styles/color';
import { FONT_STYLES } from 'src/styles/fontStyle';
import styled from 'styled-components';

function Review() {
  const NavigationBar = dynamic(() => import('@src/components/common/NavigationBar'), { ssr: false });
  const [tab, setTab] = useState('isFavorite');
  const [favoriteList, setFavoriteList] = useState<VideoData[]>([]);
  const [historyList, setHistoryList] = useState<VideoData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const isLoggedIn = useRecoilValue(loginState);

  const getNewsList = async () => {
    setIsLoading(true);

    const { favoritePaging, favoriteList } = await api.reviewService.postFavoriteVideoList({
      currentPage: 1,
      listSize: LIST_SIZE,
    });

    const { historyPaging, historyList } = await api.reviewService.postHistoryVideoList({
      currentPage: 1,
      listSize: LIST_SIZE,
    });

    setCurrentPage(1);
    tab === 'isFavorite'
      ? (setTotalCount(favoritePaging.totalCount), setLastPage(favoritePaging.lastPage), setFavoriteList(favoriteList))
      : (setTotalCount(historyPaging.totalCount), setLastPage(historyPaging.lastPage), setHistoryList(historyList));
    setIsLoading(false);
  };

  const handlePageChange = async (page: number) => {
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
        <nav>
          <StTab>
            <StButton isActive={tab === 'isFavorite'} onClick={() => setTab('isFavorite')}>
              내 즐겨찾기 기록
            </StButton>
            <span> | </span>
            <StButton isActive={tab === 'isLearned'} onClick={() => setTab('isLearned')}>
              내 학습 기록
            </StButton>
          </StTab>
        </nav>
        {isLoading ? (
          <VideoListSkeleton itemNumber={12} />
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
  padding: 16rem 16rem 13.6rem 16rem;

  @media (max-width: 960px) {
    padding: 16rem 8.6rem;
  }

  @media (max-width: 500px) {
    padding: 16rem 2.4rem;
  }
`;

const StTab = styled.ul`
  display: flex;
  gap: 2.4rem;
  ${FONT_STYLES.SB_28_HEADLINE};
  color: ${COLOR.GRAY_30};
  margin-bottom: 14.8rem;

  & > span {
    font-weight: 400;
  }
`;

const StButton = styled.li<{ isActive: boolean }>`
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? COLOR.BLACK : COLOR.GRAY_30)};
  ${({ isActive }) => (isActive ? FONT_STYLES.SB_28_HEADLINE : FONT_STYLES.M_28_HEADLINE)};
`;
