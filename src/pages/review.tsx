import { Footer, NavigationBar, SEO, VideoListSkeleton } from '@src/components/common';
import { HeadlineContainer, VideoContainer } from '@src/components/review';
import { api } from '@src/services/api';
import { ReviewTab } from '@src/services/api/types/review';
import { loginState } from '@src/stores/loginState';
import { LIST_SIZE } from '@src/utils/constant';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import { COLOR, FONT_STYLES } from '@src/styles';
import styled from 'styled-components';

function Review() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [tab, setTab] = useState<ReviewTab>('favorite');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: postReviewListData, isLoading } = useQuery(
    ['postReviewList', currentPage, tab],
    async () => {
      if (isLoggedIn) {
        return await api.reviewService.postReviewVideoList({ currentPage, listSize: LIST_SIZE }, tab);
      }
    },
    {
      onError: () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.reload();
      },
    },
  );

  const videoList = postReviewListData?.videoList ?? [];
  const { lastPage, totalCount } = postReviewListData?.paging ?? { lastPage: 1, totalCount: 0 };

  const handlePageChange = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const { mutate: mutatePostLike } = useMutation(
    async (id: number) => {
      return await api.commonService.postLikeData(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('postReviewList');
      },
    },
  );

  useEffect(() => {
    isLoggedIn && setCurrentPage(1);
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
            aria-selected={tab === 'favorite'}
            isActive={tab === 'favorite'}
            onClick={() => setTab('favorite')}>
            내 즐겨찾기 기록
          </StTab>
          <StTab
            role="tab"
            aria-selected={tab === 'history'}
            isActive={tab === 'history'}
            onClick={() => setTab('history')}>
            내 학습 기록
          </StTab>
        </StTabList>
        {isLoading ? (
          <VideoListSkeleton itemNumber={12} hasCountSection />
        ) : (
          <VideoContainer
            tab={tab}
            videoList={videoList}
            onClickLike={mutatePostLike}
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
