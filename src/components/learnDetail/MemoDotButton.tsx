import { icDotDefault, icDotHover } from 'public/assets/icons';
import { useState } from 'react';
import styled from 'styled-components';
import ImageDiv from '../common/ImageDiv';
import MemoPopup from './MemoPopup';

interface MemoDotButtonProps {
  editClicked: () => void;
}

function MemoDotButton(props: MemoDotButtonProps) {
  const { editClicked } = props;

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <StMemoDotButton type="button" onClick={() => setIsPopupOpen(true)}>
      <StMemoDotImage>
        <ImageDiv className="dot" src={icDotHover} alt="dot" />
        <ImageDiv className="dot default" src={icDotDefault} alt="like" />
      </StMemoDotImage>
      {isPopupOpen && <MemoPopup openPopup={() => setIsPopupOpen(false)} editClicked={editClicked} />}
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
