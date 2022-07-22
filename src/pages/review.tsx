import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SEO from '@src/components/common/SEO';
import NavigationBar from '@src/components/common/NavigationBar';
import VideoListSkeleton from '@src/components/common/VideoListSkeleton';
import HeadlineContainer from '@src/components/review/HeadlineContainer';
import VideoContainer from '@src/components/review/VideoContainer';
import Footer from '@src/components/common/Footer';
import { COLOR } from 'src/styles/color';
import { FONT_STYLES } from 'src/styles/fontStyle';
import { api } from '@src/services/api';
import { VideoData } from '@src/services/api/types/review';
import LoginModal from '@src/components/login/LoginModal';

function Review() {
  const [tab, setTab] = useState('isLiked');
  const [favoriteList, setFavoriteList] = useState<VideoData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const getAccessToken = () => localStorage.getItem('token') ?? '';
      if (getAccessToken()) {
        setIsLoading(true);
        const { favoriteNews } = await api.reviewService.getFavoriteVideoList();
        setFavoriteList(favoriteNews);
        setIsLoading(false);
      } else {
        setIsModalOpen(true);
      }
    })();
  }, []);

  return (
    <>
      <SEO title="복습하기 | Deliverble" />
      <NavigationBar />
      {isModalOpen && <LoginModal closeModal={() => setIsModalOpen(false)} />}
      <StReview>
        <HeadlineContainer />
        <nav>
          <StTab>
            <StButton isActive={tab === 'isLiked'} onClick={() => setTab('isLiked')}>
              내 즐겨찾기 기록
            </StButton>
            <span> | </span>
            <StButton isActive={tab === 'isLearned'} onClick={() => setTab('isLearned')}>
              내 학습 기록
            </StButton>
          </StTab>
        </nav>
        {isLoading ? <VideoListSkeleton itemNumber={12} /> : <VideoContainer tab={tab} videoList={favoriteList} />}
      </StReview>
      <Footer />
    </>
  );
}

export default Review;

const StReview = styled.div`
  padding: 16rem 16rem 34.8rem 16rem;
`;

const StTab = styled.ul`
  display: flex;
  gap: 2.4rem;
  ${FONT_STYLES.SB_28_HEADLINE};
  color: ${COLOR.GRAY_30};
  margin-bottom: 14.8rem;
`;

const StButton = styled.li<{ isActive: boolean }>`
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? COLOR.BLACK : COLOR.GRAY_30)};
  ${FONT_STYLES.SB_28_HEADLINE}
`;
