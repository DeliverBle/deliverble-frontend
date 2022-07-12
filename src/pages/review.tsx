import styled from 'styled-components';
import HeadlineContainer from '@src/components/review/HeadlineContainer';
import VideoContainer from '@src/components/review/VideoContainer';
import { COLOR } from 'src/styles/color';
import { FONT_STYLES } from 'src/styles/fontStyle';
import { useState } from 'react';

function Review() {
  const [tab, setTab] = useState('isLiked');

  return (
    <>
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
