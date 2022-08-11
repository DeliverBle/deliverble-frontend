import { useState } from 'react';
import MemoForm from '../MemoForm';
import MemoDotButton from '../MemoPopupButton';
import { StContent, StKeyword, StMemo } from './style';

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
