import { HighlightData } from '@src/services/api/types/learn-detail';
import { COLOR } from '@src/styles/color';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Memo from './Memo';

interface MemoListProps {
  highlightList: HighlightData[];
  memoHighlightId: number[];
  setMemoHighlightId: (idList: number[]) => void;
  highlightId?: number;
  keyword?: string;
  setIsConfirmOpen: (open: boolean) => void;
  setConfirmModalText: (textList: string[]) => void;
}

function MemoList(props: MemoListProps) {
  const {
    highlightList,
    memoHighlightId,
    setMemoHighlightId,
    highlightId,
    keyword,
    setIsConfirmOpen,
    setConfirmModalText,
  } = props;
  const [index, setIndex] = useState<number>();
  const [deleteMemo, setDeleteMemo] = useState<number>();

  useEffect(() => {
    setIndex(highlightList.findIndex((item) => item.highlightId === highlightId));
    setDeleteMemo(highlightList.findIndex((item) => Object.keys(item.memo).length === 1));
  }, [highlightId, highlightList]);

  if (index && index !== -1) {
    if (memoHighlightId[0]) {
      highlightList[index].memo = { keyword: keyword };
    } else if (Object.keys(highlightList[index].memo).length === 1) {
      highlightList[index].memo = {};
    }
  }

  if (deleteMemo && deleteMemo !== -1 && !memoHighlightId[0]) {
    highlightList[deleteMemo].memo = {};
  }

  return (
    <StMemoList>
      {highlightList.map(
        ({ highlightId, memo }) =>
          Object.keys(memo).length > 0 && (
            <Memo
              key={highlightId}
              highlightId={highlightId}
              isEditMemo={memoHighlightId[1] == highlightId}
              setMemoHighlightId={setMemoHighlightId}
              keyword={memo.keyword}
              content={memo.content}
              setIsConfirmOpen={setIsConfirmOpen}
              setConfirmModalText={setConfirmModalText}
            />
          ),
      )}
    </StMemoList>
  );
}

export default MemoList;

const StMemoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  height: 47.5rem;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${COLOR.GRAY_10};
    border-radius: 1.3rem;
  }
`;
