import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { useState } from 'react';
import MemoForm from './MemoForm';
import MemoDotButton from './MemoDotButton';

interface MemoProps {
  isEditMemo: boolean;
  setEditMemoHighlightId: (id: number) => void;
  isNewMemo: boolean;
  setNewMemoHighlightId: (id: number) => void;
  keyword?: string;
  content?: string;
}

function Memo(props: MemoProps) {
  const { isEditMemo, setEditMemoHighlightId, isNewMemo, setNewMemoHighlightId, keyword, content } = props;
  const [moreButton, setMoreButton] = useState(false);
  const [clickedPopupEdit, setClickedPopupEdit] = useState(false);

  const CONTENT_MAX = 30;
  const KEYWORD_MAX = 28;

  const showContent = () => {
    if (content && content.length > CONTENT_MAX && !moreButton) {
      return (
        <>
          {content.slice(0, 26)}
          <button type="button" onClick={() => setMoreButton(true)}>
            ... 더보기
          </button>
        </>
      );
    }
    return content;
  };

  return (
    <StMemo>
      {keyword && (
        <StKeyword>
          {keyword.length <= KEYWORD_MAX || moreButton || isNewMemo ? keyword : `${keyword.slice(0, 27)}...`}
        </StKeyword>
      )}
      {!content || clickedPopupEdit || isEditMemo ? (
        <MemoForm
          content={content}
          setEditMemoHighlightId={setEditMemoHighlightId}
          setNewMemoHighlightId={setNewMemoHighlightId}
          setClickedPopupEdit={setClickedPopupEdit}
        />
      ) : (
        <StContent>
          {showContent()}
          <MemoDotButton edit={() => setClickedPopupEdit(true)} />
        </StContent>
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

  &:not(:hover) {
    .dot {
      opacity: 0;
    }
  }
`;

const StKeyword = styled.h1`
  margin-bottom: 0.8rem;

  color: ${COLOR.BLACK};
  ${FONT_STYLES.SB_25_MEMO};
`;

const StContent = styled.p`
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
