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
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const isLoggedIn = useRecoilValue(loginState);

  const getFavoriteNewsList = async () => {
    setIsLoading(true);

    const { paging, favoriteList } = await api.reviewService.postFavoriteVideoList({
      currentPage: 1,
      listSize: LIST_SIZE,
    });

    setCurrentPage(1);
    setTotalCount(paging.totalCount);
    setLastPage(paging.lastPage);
    setFavoriteList(favoriteList);
    setIsLoading(false);
  };

  const handlePageChange = async (page: number) => {
    setIsLoading(true);

    const { paging, favoriteList } = await api.reviewService.postFavoriteVideoList({
      currentPage: page,
      listSize: LIST_SIZE,
    });

    setCurrentPage(page);
    setTotalCount(paging.totalCount);
    setLastPage(paging.lastPage);
    setFavoriteList(favoriteList);
    setIsLoading(false);
  };

  const handleClickLike = async (id: number) => {
    await api.likeService.postLikeData(id);
    getFavoriteNewsList();
  };

  useEffect(() => {
    isLoggedIn && getFavoriteNewsList();
  }, [isLoggedIn]);

  return (
    <>
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
            videoList={favoriteList}
            onClickLike={handleClickLike}
            totalCount={totalCount}
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={handlePageChange}
          />
        )}
      </StReview>
      <Footer />
    </>
  );
}

export default Review;

const StReview = styled.div`
  padding: 16rem 16rem 13.6rem 16rem;
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
  ${FONT_STYLES.SB_28_HEADLINE}
`;
