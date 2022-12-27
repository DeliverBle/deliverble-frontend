import ImageDiv from '@src/components/common/ImageDiv';
import { icDotDefault, icDotHover } from 'public/assets/icons';
import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import RecordDropdown from './RecordDropdown';

interface RecordDotButtonProps {
  link: string;
  scriptId: number;
  setIsDataChanged: Dispatch<SetStateAction<boolean>>;
}

function RecordDotButton(props: RecordDotButtonProps) {
  const { link, scriptId, setIsDataChanged } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const recordDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const eventTarget = e.target as HTMLElement;
      if (isDropdownOpen && !recordDropdownRef?.current?.contains(eventTarget)) {
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
    <StRecordDotButton ref={recordDropdownRef} onClick={() => setIsDropdownOpen((prev) => !prev)}>
      <StRecordDotImage isDropdownOpen={isDropdownOpen}>
        <ImageDiv className="dot" src={icDotHover} alt="..." layout="fill" />
        <ImageDiv className="dot default" src={icDotDefault} alt="..." layout="fill" />
      </StRecordDotImage>
      {isDropdownOpen && <RecordDropdown link={link} scriptId={scriptId} setIsDataChanged={setIsDataChanged} />}
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
