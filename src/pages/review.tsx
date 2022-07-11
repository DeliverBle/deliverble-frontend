import styled from 'styled-components';
import HeadlineContainer from '@src/components/review/HeadlineContainer';
import { COLOR } from 'src/styles/color';
import { FONT_STYLES } from 'src/styles/fontStyle';
import { useState, useEffect } from 'react';

function Review() {
  const [tab, setTab] = useState('bookmarked');

  useEffect(() => {
    console.log(tab);
  }, [tab]);

  return (
    <StReview>
      <HeadlineContainer />
      <nav>
        <StTab>
          <StButton className="bookmarked" isActive={tab === 'bookmarked'} onClick={() => setTab('bookmarked')}>
            내 즐겨찾기 기록
          </StButton>
          <span> | </span>
          <StButton className="learned" isActive={tab === 'learned'} onClick={() => setTab('learned')}>
            내 학습기록
          </StButton>
        </StTab>
      </nav>
    </StReview>
  );
}

export default Review;
const StReview = styled.div`
  widith: 100%;
`;

const StTab = styled.ul`
  display: flex;
  gap: 2.4rem;
  margin: 16rem;
  ${FONT_STYLES.SB_28_HEADLINE};
  color: ${COLOR.GRAY_30};
`;

const StButton = styled.li<{ isActive: boolean }>`
  cursor: pointer;
  color: ${(props) => (props.isActive ? COLOR.BLACK : COLOR.GRAY_30)};
  ${FONT_STYLES.SB_28_HEADLINE}
`;
