import styled from 'styled-components';
import HeadlineContainer from '@src/components/review/HeadlineContainer';

function Review() {
  return (
    <StReview>
      <HeadlineContainer />
    </StReview>
  );
}

export default Review;
const StReview = styled.div`
  widith: 100%;
`;
