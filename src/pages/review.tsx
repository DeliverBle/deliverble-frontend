import NavigationBar from '@src/components/common/NavigationBar';
import Footer from '@src/components/common/Footer';
import SEO from '@src/components/common/SEO';
import VideoListSkeleton from '@src/components/common/VideoListSkeleton';
import HeadlineContainer from '@src/components/review/HeadlineContainer';
import VideoContainer from '@src/components/review/VideoContainer';
import { api } from '@src/services/api';
import { PostReviewRequestBody, VideoData } from '@src/services/api/types/review';
import { loginState } from '@src/stores/loginState';
import { LIST_SIZE } from '@src/utils/constant';
import { useEffect, useState } from 'react';
import { COLOR } from 'src/styles/color';
import { FONT_STYLES } from 'src/styles/fontStyle';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

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

  const handleLoginError = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.reload();
  };

  const { mutate: mutatePostFavorite } = useMutation(
    async (requestBody: PostReviewRequestBody) => {
      return await api.reviewService.postFavoriteVideoList(requestBody);
    },
    {
      onSuccess: (data) => {
        const { favoritePaging, favoriteList } = data;
        setTotalCount(favoritePaging.totalCount);
        setLastPage(favoritePaging.lastPage);
        setFavoriteList(favoriteList);
      },
      onError: () => {
        handleLoginError();
      },
    },
  );

  const { mutate: mutatePostHistory } = useMutation(
    async (requestBody: PostReviewRequestBody) => {
      return await api.reviewService.postHistoryVideoList(requestBody);
    },
    {
      onSuccess: (data) => {
        const { historyPaging, historyList } = data;
        setTotalCount(historyPaging.totalCount);
        setLastPage(historyPaging.lastPage);
        setHistoryList(historyList);
      },
      onError: () => {
        handleLoginError();
      },
    },
  );

  const getNewsList = async () => {
    setIsLoading(true);
    setCurrentPage(1);
    tab === 'isFavorite'
      ? mutatePostFavorite({ currentPage: 1, listSize: LIST_SIZE })
      : mutatePostHistory({ currentPage: 1, listSize: LIST_SIZE });
    setIsLoading(false);
  };

  const handlePageChange = async (page: number) => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    setCurrentPage(page);
    tab === 'isFavorite'
      ? mutatePostFavorite({ currentPage: page, listSize: LIST_SIZE })
      : mutatePostHistory({ currentPage: page, listSize: LIST_SIZE });
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
        <StTabList role="tablist">
          <StTab
            role="tab"
            aria-selected={tab === 'isFavorite'}
            isActive={tab === 'isFavorite'}
            onClick={() => setTab('isFavorite')}>
            내 즐겨찾기 기록
          </StTab>
          <StTab
            role="tab"
            aria-selected={tab === 'isLearned'}
            isActive={tab === 'isLearned'}
            onClick={() => setTab('isLearned')}>
            내 학습 기록
          </StTab>
        </StTabList>
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

const StTabList = styled.ul`
  display: flex;
  ${FONT_STYLES.SB_28_HEADLINE};
  color: ${COLOR.GRAY_30};
  margin-bottom: 14.8rem;
`;

const StTab = styled.li<{ isActive: boolean }>`
  padding: 0;
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? COLOR.BLACK : COLOR.GRAY_30)};
  ${({ isActive }) => (isActive ? FONT_STYLES.SB_28_HEADLINE : FONT_STYLES.M_28_HEADLINE)};

  &:not(:last-child):after {
    content: '|';
    margin: 0 2.4rem;
    color: ${COLOR.GRAY_30};
    font-weight: 400;
  }
`;
