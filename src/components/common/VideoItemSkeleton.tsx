import styled from 'styled-components';
import { COLOR } from '@src/styles/color';

function SkeletonItem() {
  return (
    <div>
      <StVideo />
      <StLongDescription />
      <StMiddleDescription />
      <StShortDescription />
    </div>
  );
}

export default SkeletonItem;

const StVideo = styled.div`
  width: 100%;
  height: 21.6rem;
  background-color: ${COLOR.GRAY_10};
  border-radius: 1rem;
`;

const StDescription = styled.div`
  background-color: ${COLOR.GRAY_5};
  border-radius: 0.6rem;
`;

const StLongDescription = styled(StDescription)`
  width: 100%;
  height: 1.8rem;
  margin-top: 2.2rem;
  margin-bottom: 0.8rem;
`;

const StMiddleDescription = styled(StDescription)`
  width: 30.5rem;
  height: 1.8rem;
  margin-bottom: 2.8rem;
`;

const StShortDescription = styled(StDescription)`
  width: 22.6rem;
  height: 1.6rem;
`;
