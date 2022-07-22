import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { useState } from 'react';
import MemoForm from './MemoForm';
import MemoDotButton from './MemoPopupButton';

interface MemoProps {
  isNewMemo: boolean;
  setIsNewMemo: (cancel: boolean) => void;
  keyword?: string;
  content?: string;
}

function Memo(props: MemoProps) {
  const { isNewMemo, setIsNewMemo, keyword, content } = props;
  const [moreButton, setMoreButton] = useState(false);
  const [edit, setEdit] = useState(false);

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
      {!content || edit ? (
        <MemoForm content={content} setIsNewMemo={setIsNewMemo} setEdit={setEdit} />
      ) : (
        <StContent>
          {showContent()}
          <MemoDotButton edit={() => setEdit(true)} />
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
