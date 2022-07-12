import styled from 'styled-components';
import ImageDiv from '../../components/common/ImageDiv';
import { icCloseButton, icGuide } from 'public/assets/icons';
import { COLOR } from '@src/styles/color';

function LearnDetail() {
  return (
    <StLearnDetail>
      <ImageDiv src={icCloseButton} className="close" layout="fill" alt="" />
      <StLearnSection>
        <ImageDiv src={icGuide} className="guide" layout="fill" alt="" />
      </StLearnSection>
    </StLearnDetail>
  );
}

export default LearnDetail;

const StLearnDetail = styled.div`
  padding: 16rem 10rem;
  min-height: 100vh;
  background: rgba(229, 238, 255, 0.85);
  backdrop-filter: blur(2.8rem);

  .close {
    position: fixed;
    width: 4.8rem;
    height: 4.8rem;
    top: 2.4rem;
    right: 10rem;
    cursor: pointer;
  }

  .guide {
    position: relative;
    width: 3.2rem;
    height: 3.2rem;
    cursor: pointer;
  }
`;

const StLearnSection = styled.section`
  height: 111.9rem;
  border-radius: 3rem;
  background-color: ${COLOR.WHITE};
`;
