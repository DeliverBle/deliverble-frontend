import styled from 'styled-components';
import { useState } from 'react';
import { COLOR } from 'src/styles/color';
import { FONT_STYLES } from 'src/styles/fontStyle';
import SEO from '@src/components/common/SEO';
import NavigationBar from '@src/components/common/NavigationBar';
import HeadlineContainer from '@src/components/review/HeadlineContainer';
import VideoContainer from '@src/components/review/VideoContainer';
import Empty from '@src/components/review/Empty';
import Footer from '@src/components/common/Footer';

function Review() {
  const [tab, setTab] = useState('isLiked');
  // const [videoData, setVideoData] = useState([]);

  return (
    <>
      <SEO title="복습하기 | Deliverble" />
      <NavigationBar />
      <HeadlineContainer />
      <nav>
        <StTab>
          <StButton isActive={tab === 'isLiked'} onClick={() => setTab('isLiked')}>
            내 즐겨찾기 기록
          </StButton>
          <span> | </span>
          <StButton isActive={tab === 'isLearned'} onClick={() => setTab('isLearned')}>
            내 학습기록
          </StButton>
        </StTab>
      </nav>
      <VideoContainer tab={tab} />
      <Empty tab={tab} />
      <Footer />
    </>
  );
}

export default Review;

const StTab = styled.ul`
  display: flex;
  gap: 2.4rem;
  margin: 16rem;
  ${FONT_STYLES.SB_28_HEADLINE};
  color: ${COLOR.GRAY_30};
`;

const StButton = styled.li<{ isActive: boolean }>`
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? COLOR.BLACK : COLOR.GRAY_30)};
  ${FONT_STYLES.SB_28_HEADLINE}
`;
