import { ImageDiv } from '@src/components/common';
import { useClickOutside } from '@src/hooks/common';
import { MemoConfirmModalKey, MemoState } from '@src/types/learnDetail';
import { MemoData } from '@src/types/learnDetail/remote';
import dynamic from 'next/dynamic';
import { icDotDefault, icDotHover } from 'public/assets/icons';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import styled from 'styled-components';

interface MemoDotButtonProps {
  memoData: MemoData;
  setMemoState: Dispatch<SetStateAction<MemoState>>;
  onMemoModal: (type: MemoConfirmModalKey) => void;
}

function MemoDotButton(props: MemoDotButtonProps) {
  const { memoData, setMemoState, onMemoModal } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const memoDropdownRef = useRef<HTMLDivElement>(null);
  const MemoDropdown = dynamic(() => import('./MemoDropdown'), { ssr: false });

  useClickOutside({
    isEnabled: isDropdownOpen,
    handleClickOutside: (e: Event) => {
      const eventTarget = e.target as HTMLElement;
      if (isDropdownOpen && !memoDropdownRef?.current?.contains(eventTarget)) {
        setIsDropdownOpen(false);
      }
    },
  });

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
