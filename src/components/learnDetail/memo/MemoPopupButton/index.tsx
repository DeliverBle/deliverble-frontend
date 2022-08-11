import ImageDiv from '@src/components/common/ImageDiv';
import { icDotDefault, icDotHover } from 'public/assets/icons';
import { useState, useRef, useEffect } from 'react';

import MemoPopup from '../MemoPopup';
import { StMemoDotButton, StMemoDotImage } from './style';

interface MemoPopupButtonProps {
  edit: () => void;
}

function MemoPopupButton(props: MemoPopupButtonProps) {
  const { edit } = props;
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
  }, [isPopupOpen]);

  return (
    <StMemoDotButton ref={memoPopupRef} type="button" onClick={() => setIsPopupOpen((prev) => !prev)}>
      <StMemoDotImage>
        <ImageDiv className="dot" src={icDotHover} alt="dot" />
        <ImageDiv className="dot default" src={icDotDefault} alt="like" />
      </StMemoDotImage>
      {isPopupOpen && <MemoPopup edit={edit} />}
    </StMemoDotButton>
  );
}

export default MemoPopupButton;
