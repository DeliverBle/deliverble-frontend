import ImageDiv from '@src/components/common/ImageDiv';
import { icDotDefault, icDotHover } from 'public/assets/icons';
import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import MemoPopup from './MemoPopup';

interface MemoDotButtonProps {
  highlightId: number;
  setMemoHighlightId: (idList: number[]) => void;
  setIsConfirmOpen: (open: boolean) => void;
  setConfirmModalText: (textList: string[]) => void;
}

function MemoDotButton(props: MemoDotButtonProps) {
  const { highlightId, setMemoHighlightId, setIsConfirmOpen, setConfirmModalText } = props;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const memoPopupRef = useRef<HTMLDivElement>(null);

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
    <StMemoDotButton ref={memoPopupRef} onClick={() => setIsPopupOpen((prev) => !prev)}>
      <StMemoDotImage isPopupOpen={isPopupOpen}>
        <ImageDiv className="dot" src={icDotHover} alt="dot" layout="fill" />
        <ImageDiv className="dot default" src={icDotDefault} alt="like" layout="fill" />
      </StMemoDotImage>
      {isPopupOpen && (
        <MemoPopup
          highlightId={highlightId}
          setMemoHighlightId={setMemoHighlightId}
          setIsConfirmOpen={setIsConfirmOpen}
          setConfirmModalText={setConfirmModalText}
        />
      )}
    </StMemoDotButton>
  );
}

export default MemoDotButton;

const StMemoDotButton = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  display: inline-block;

  width: 4rem;
  height: 4rem;
  padding: 0;

  cursor: pointer;
`;

const StMemoDotImage = styled.div<{ isPopupOpen: boolean }>`
  position: relative;

  .dot {
    position: absolute;
    width: 4rem;
    height: 4rem;
    opacity: ${({ isPopupOpen }) => (isPopupOpen ? 1 : 0)};
  }

  &:hover .default img {
    transition: opacity 0.3s;
    opacity: 0;
  }
`;
