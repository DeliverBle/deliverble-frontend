import ImageDiv from '@src/components/common/ImageDiv';
import { icDotDefault, icDotHover } from 'public/assets/icons';
import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import MemoPopup from './MemoPopup';
import { ConfirmModalText } from '../ConfirmModal';
import { MemoHighlightId } from '@src/pages/learn/[id]';

interface MemoDotButtonProps {
  highlightId: number;
  setMemoHighlightId: (id: MemoHighlightId) => void;
  setIsConfirmOpen: (open: boolean) => void;
  setConfirmModalText: (text: ConfirmModalText) => void;
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
    if (isPopupOpen) {
      window.addEventListener('click', handleClickOutside);
      window.addEventListener('contextmenu', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('contextmenu', handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    <StMemoDotButton ref={memoPopupRef} onClick={() => setIsPopupOpen((prev) => !prev)}>
      <StMemoDotImage isPopupOpen={isPopupOpen}>
        <ImageDiv className="dot" src={icDotHover} alt="..." layout="fill" />
        <ImageDiv className="dot default" src={icDotDefault} alt="..." layout="fill" />
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

  width: 4rem;
  height: 4rem;

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
