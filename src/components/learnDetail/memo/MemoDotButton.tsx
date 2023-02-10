import ImageDiv from '@src/components/common/ImageDiv';
import { icDotDefault, icDotHover } from 'public/assets/icons';
import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import MemoDropdown from './MemoDropdown';
import { MemoState } from '@src/pages/learn/[id]';
import { MemoData } from '@src/services/api/types/learn-detail';

interface MemoDotButtonProps {
  memoData: MemoData;
  setMemoState: Dispatch<SetStateAction<MemoState>>;
  onMemoModal: (type: string) => void;
}

function MemoDotButton(props: MemoDotButtonProps) {
  const { memoData, setMemoState, onMemoModal } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const memoDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const eventTarget = e.target as HTMLElement;
      if (isDropdownOpen && !memoDropdownRef?.current?.contains(eventTarget)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      window.addEventListener('click', handleClickOutside);
      window.addEventListener('contextmenu', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('contextmenu', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <StMemoDotButton ref={memoDropdownRef} onClick={() => setIsDropdownOpen((prev) => !prev)}>
      <StMemoDotImage isDropdownOpen={isDropdownOpen}>
        <ImageDiv className="dot" src={icDotHover} alt="추가 작업" layout="fill" />
        <ImageDiv className="dot default" src={icDotDefault} alt="추가 작업" layout="fill" />
      </StMemoDotImage>
      {isDropdownOpen && <MemoDropdown memoData={memoData} setMemoState={setMemoState} onMemoModal={onMemoModal} />}
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

const StMemoDotImage = styled.div<{ isDropdownOpen: boolean }>`
  position: relative;

  .dot {
    position: absolute;
    width: 4rem;
    height: 4rem;
    opacity: ${({ isDropdownOpen }) => (isDropdownOpen ? 1 : 0)};
  }

  &:hover .default img {
    transition: opacity 0.3s;
    opacity: 0;
  }
`;
