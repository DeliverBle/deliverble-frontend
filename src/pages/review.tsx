import { Footer, NavigationBar, SEO, VideoListSkeleton } from '@src/components/common';
import { HeadlineContainer, VideoContainer } from '@src/components/review';
import { usePostLikeData } from '@src/services/queries/common';
import { usePostReviewVideoList } from '@src/services/queries/review';
import { COLOR, FONT_STYLES } from '@src/styles';
import { ReviewTab } from '@src/types/review/remote';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function Review() {
  const [tab, setTab] = useState<ReviewTab>('favorite');
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = usePostReviewVideoList(currentPage, tab);
  const postLikeData = usePostLikeData();
  const videoList = data?.videoList ?? [];
  const { lastPage, totalCount } = data?.paging ?? { lastPage: 1, totalCount: 0 };

  const handlePageChange = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [tab]);

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
        {!data && videoList.length ? (
          <VideoListSkeleton itemNumber={12} hasCountSection />
        ) : (
          <VideoContainer
            tab={tab}
            videoList={videoList}
            onClickLike={postLikeData.mutate}
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
