import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { useState } from 'react';
import MemoForm from './MemoForm';
import MemoDotButton from './MemoDotButton';
import { IConfirmModalText } from '../ConfirmModal';
import { MEMO_CONTENT_MAX } from '@src/utils/constant';
import { IMemoHighlightId } from '@src/pages/learn/[id]';

interface MemoProps {
  highlightId: number;
  memoData: (string | undefined)[];
  isEditMemo: boolean;
  setMemoHighlightId: (id: IMemoHighlightId) => void;
  setIsConfirmOpen: (open: boolean) => void;
  setConfirmModalText: (text: IConfirmModalText) => void;
}

function Memo(props: MemoProps) {
  const { highlightId, memoData, isEditMemo, setMemoHighlightId, setIsConfirmOpen, setConfirmModalText } = props;
  const [keyword, content] = memoData;
  const [moreButton, setMoreButton] = useState(false);

  const showContent = () => {
    if (content && content.length > MEMO_CONTENT_MAX && !moreButton) {
      return (
        <>
          {content.slice(0, 26)}
          <button type="button" onClick={() => setMoreButton((prev) => !prev)}>
            ... 더보기
          </button>
        </>
      );
    } else if (moreButton) {
      return (
        <>
          {content}
          <button type="button" onClick={() => setMoreButton((prev) => !prev)}>
            접기
          </button>
        </>
      );
    }
    return content;
  };

  return (
    <StMemo>
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

const StMemo = styled.div`
  position: relative;

  margin-right: 0.8rem;
  padding: 2.8rem 3.2rem 2.8rem 3.2rem;
  width: 67rem;

  background-color: ${COLOR.SUB_BLUE_8};
  border-radius: 2.5rem;

  &:hover .dot {
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

  & > button {
    color: ${COLOR.GRAY_30};
    ${FONT_STYLES.R_23_MEMO};

    &:hover {
      color: ${COLOR.MAIN_BLUE};
    }
  }
`;
