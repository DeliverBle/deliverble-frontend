import ImageDiv from '@src/components/common/ImageDiv';
import { icDotDefault, icDotHover } from 'public/assets/icons';
import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import MemoPopup from './MemoPopup';

interface MemoDotButtonProps {
  setEditMemoHighlightId: (id: number) => void;
  highlightId: number;
}

function MemoDotButton(props: MemoDotButtonProps) {
  const { setEditMemoHighlightId, highlightId } = props;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const memoPopupRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const eventTarget = e.target as HTMLElement;
      if (isPopupOpen && !memoPopupRef?.current?.contains(eventTarget)) {
        setIsPopupOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('contextmenu', handleClickOutside);
  }, [isPopupOpen]);

  return (
    <StMemoDotButton ref={memoPopupRef} type="button" onClick={() => setIsPopupOpen((prev) => !prev)}>
      <StMemoDotImage isPopupOpen={isPopupOpen}>
        <ImageDiv className="dot" src={icDotHover} alt="dot" />
        <ImageDiv className="dot default" src={icDotDefault} alt="like" />
      </StMemoDotImage>
      {isPopupOpen && <MemoPopup highlightId={highlightId} setEditMemoHighlightId={setEditMemoHighlightId} />}
    </StMemoDotButton>
  );
}

export default MemoDotButton;

const StMemoDotButton = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  display: inline-block;

  width: 4rem;
  height: 4rem;
  padding: 0;
`;

const StMemoDotImage = styled.div<{ isPopupOpen: boolean }>`
  position: relative;

  .dot {
    position: absolute;
    top: -2rem;
    opacity: ${({ isPopupOpen }) => (isPopupOpen ? 1 : 0)};
  }

  &:hover .default img {
    transition: opacity 0.3s;
    opacity: 0;
  }
`;
