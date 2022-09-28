import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { useState } from 'react';
import MemoForm from './MemoForm';
import MemoDotButton from './MemoDotButton';
import { ConfirmModalText } from '../ConfirmModal';
import { MEMO_CONTENT_MAX } from '@src/utils/constant';
import { MemoHighlightId } from '@src/pages/learn/[id]';
import ImageDiv from '@src/components/common/ImageDiv';
import { icArrowUp } from 'public/assets/icons';

interface MemoProps {
  highlightId: number;
  memoData: (string | undefined)[];
  isEditMemo: boolean;
  setMemoHighlightId: (id: MemoHighlightId) => void;
  setIsConfirmOpen: (open: boolean) => void;
  setConfirmModalText: (text: ConfirmModalText) => void;
}

function Memo(props: MemoProps) {
  const { highlightId, memoData, isEditMemo, setMemoHighlightId, setIsConfirmOpen, setConfirmModalText } = props;
  const [keyword, content] = memoData;
  const [foldButton, setFoldButton] = useState(false);

  const showContent = () => {
    if (content && content.length > MEMO_CONTENT_MAX) {
      return (
        <>
          {foldButton ? content : content.slice(0, 26)}
          <StFoldbutton className="fold-button" onClick={() => setFoldButton((prev) => !prev)} fold={foldButton}>
            {foldButton ? (
              <>
                <ImageDiv src={icArrowUp} className="fold-icon" alt="" />
                {'접기'}
              </>
            ) : (
              '...더보기'
            )}
          </StFoldbutton>
        </>
      );
    }
    return content;
  };

  return (
    <StMemo fold={foldButton}>
      {keyword && <StKeyword>{keyword}</StKeyword>}
      {!content || isEditMemo ? (
        <MemoForm
          content={content}
          setMemoHighlightId={setMemoHighlightId}
          setIsConfirmOpen={setIsConfirmOpen}
          setConfirmModalText={setConfirmModalText}
        />
      ) : (
        <>
          <StContent>{showContent()}</StContent>
          <MemoDotButton
            highlightId={highlightId}
            setMemoHighlightId={setMemoHighlightId}
            setIsConfirmOpen={setIsConfirmOpen}
            setConfirmModalText={setConfirmModalText}
          />
        </>
      )}
    </StMemo>
  );
}

export default Memo;

const StMemo = styled.div<{ fold: boolean }>`
  position: relative;

  margin-right: 0.8rem;
  padding: 2.8rem 3.2rem 2.8rem 3.2rem;
  width: 67rem;

  background-color: ${COLOR.SUB_BLUE_8};
  border-radius: 2.5rem;

  &:hover .dot {
    opacity: 1;
  }

  &:hover .fold-button {
    opacity: 1;
  }
`;

const StKeyword = styled.h1`
  margin-bottom: 0.8rem;

  color: ${COLOR.BLACK};
  ${FONT_STYLES.SB_25_MEMO};
`;

const StContent = styled.div`
  color: ${COLOR.GRAY_80};
  ${FONT_STYLES.R_23_MEMO};
`;

const StFoldbutton = styled.div<{ fold: boolean }>`
  position: absolute;
  right: 3.2rem;
  bottom: 2.8rem;

  display: flex;
  .fold-icon {
    display: flex;
    align-items: center;
  }

  color: ${({ fold }) => (fold ? COLOR.MAIN_BLUE : COLOR.GRAY_30)};
  ${FONT_STYLES.R_23_MEMO};
  &:hover {
    color: ${({ fold }) => !fold && COLOR.MAIN_BLUE};
  }

  cursor: pointer;
  opacity: ${({ fold }) => fold && 0};
  background: linear-gradient(
    to left,
    rgb(241, 246, 255) 38.54%,
    rgba(241, 246, 255, 0.8) 79.69%,
    rgba(241, 246, 255, 0) 100%
  );
`;
