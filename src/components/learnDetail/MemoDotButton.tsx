import { icDotDefault, icDotHover } from 'public/assets/icons';
import styled from 'styled-components';
import ImageDiv from '../common/ImageDiv';

function MemoDotButton() {
  return (
    <StMemoDotButton
      type="button"
      onClick={() => {
        console.log('test');
      }}>
      <StMemoDotImage>
        <ImageDiv className="dot" src={icDotHover} alt="dot" />
        <ImageDiv className="dot default" src={icDotDefault} alt="like" />
      </StMemoDotImage>
    </StMemoDotButton>
  );
}

export default MemoDotButton;

const StMemoDotButton = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;

  width: 4rem;
  height: 4rem;
  padding: 0;
`;

const StMemoDotImage = styled.div`
  position: relative;

  .dot {
    position: absolute;
    top: -2rem;
    opacity: 0;
  }

  &:hover .default img {
    transition: opacity 0.3s;
    opacity: 0;
  }
`;
