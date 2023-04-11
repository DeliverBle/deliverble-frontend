import { ImageDiv } from '@src/components/common';
import { MemoDotButton, MemoForm } from '@src/components/learnDetail/memo';
import { MEMO_CONTENT_MAX } from '@src/constants/learnDetail/memo';
import { COLOR, FONT_STYLES } from '@src/styles';
import { MemoConfirmModalKey, MemoState } from '@src/types/learnDetail';
import { MemoData } from '@src/types/learnDetail/remote';
import { useRouter } from 'next/router';
import { icArrowUp } from 'public/assets/icons';
import { Dispatch, SetStateAction, useState } from 'react';
import styled, { css } from 'styled-components';

interface MemoProps {
  memoData: MemoData;
  memoState: MemoState;
  setMemoState: Dispatch<SetStateAction<MemoState>>;
  onMemoModal: (type: MemoConfirmModalKey) => void;
  updateMemoList: (type: MemoConfirmModalKey, content?: string) => void;
}

function MemoItem(props: MemoProps) {
  const { memoData, memoState, setMemoState, onMemoModal, updateMemoList } = props;
  const { id, keyword, content } = memoData;
  const [foldButton, setFoldButton] = useState(false);
  const isSpeechGuide = useRouter().query.speechGuide;

  const showContent = () => {
    if (content && content.length > MEMO_CONTENT_MAX) {
      return (
        <>
          <StText fold={foldButton}>{content}</StText>
          <StFoldButton className="fold-button" onClick={() => setFoldButton((prev) => !prev)} fold={foldButton}>
            {foldButton ? (
              <>
                <ImageDiv src={icArrowUp} className="fold-icon" alt="" />
                {'접기'}
              </>
            ) : (
              '...더보기'
            )}
          </StFoldButton>
        </>
      );
    }
    return content;
  };

  return (
    <StMemoItem className="memo" fold={foldButton}>
      <StKeyword>{keyword}</StKeyword>
      {!content || memoState.editMemoId === id ? (
        <MemoForm
          memoData={memoData}
          memoState={memoState}
          setMemoState={setMemoState}
          onMemoModal={onMemoModal}
          updateMemoList={updateMemoList}
        />
      ) : (
        <>
          <StContent>{showContent()}</StContent>
          {!isSpeechGuide && (
            <MemoDotButton memoData={memoData} setMemoState={setMemoState} onMemoModal={onMemoModal} />
          )}
        </>
      )}
    </StMemoItem>
  );
}

export default MemoItem;

const StMemoItem = styled.div<{ fold: boolean }>`
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
  word-break: break-all;
`;

const StText = styled.p<{ fold: boolean }>`
  ${({ fold }) =>
    !fold &&
    css`
      width: calc(100% - 7.6rem);
      height: 3.7rem;
      overflow: hidden;
      word-break: break-all;
    `};
`;

const StFoldButton = styled.div<{ fold: boolean }>`
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
