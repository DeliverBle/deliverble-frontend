import { ImageDiv } from '@src/components/common';
import { useClickOutside } from '@src/hooks/common';
import dynamic from 'next/dynamic';
import { icDotDefault, icDotHover } from 'public/assets/icons';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import styled from 'styled-components';

interface RecordDotButtonProps {
  link: string;
  scriptId: number;
  setIsDataChanged: Dispatch<SetStateAction<boolean>>;
  setIsNameChanging: Dispatch<SetStateAction<boolean>>;
  setRecordLinkChanging: Dispatch<SetStateAction<string>>;
}

function RecordDotButton(props: RecordDotButtonProps) {
  const { link, scriptId, setIsDataChanged, setIsNameChanging, setRecordLinkChanging } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const recordDropdownRef = useRef<HTMLDivElement>(null);
  const RecordDropdown = dynamic(() => import('./RecordDropdown'), { ssr: false });

  useClickOutside({
    isEnabled: isDropdownOpen,
    handleClickOutside: (e: Event) => {
      const eventTarget = e.target as HTMLElement;
      if (isDropdownOpen && !recordDropdownRef?.current?.contains(eventTarget)) {
        setIsDropdownOpen(false);
      }
    },
  });

  return (
    <StRecordDotButton ref={recordDropdownRef} onClick={() => setIsDropdownOpen((prev) => !prev)}>
      <StRecordDotImage isDropdownOpen={isDropdownOpen}>
        <ImageDiv className="dot" src={icDotHover} alt="추가 작업" layout="fill" />
        <ImageDiv className="dot default" src={icDotDefault} alt="추가 작업" layout="fill" />
      </StRecordDotImage>
      {isDropdownOpen && (
        <RecordDropdown
          link={link}
          scriptId={scriptId}
          setIsDataChanged={setIsDataChanged}
          setIsNameChanging={setIsNameChanging}
          setRecordLinkChanging={setRecordLinkChanging}
        />
      )}
    </StRecordDotButton>
  );
}

export default RecordDotButton;

const StRecordDotButton = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;

  width: 4rem;
  height: 4rem;

  cursor: pointer;
`;

const StRecordDotImage = styled.div<{ isDropdownOpen: boolean }>`
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
