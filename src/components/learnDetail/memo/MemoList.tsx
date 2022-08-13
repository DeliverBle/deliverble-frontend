import { HighlightData } from '@src/services/api/types/learn-detail';
import { COLOR } from '@src/styles/color';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Memo from './Memo';

interface MemoListProps {
  highlightList: HighlightData[];
  editMemoHighlightId?: number;
  setEditMemoHighlightId: (id: number) => void;
  isNewMemo: boolean;
  setIsNewMemo: (isNewMemo: boolean) => void;
  highlightId?: number;
  keyword?: string;
}

function MemoList(props: MemoListProps) {
  const { highlightList, editMemoHighlightId, setEditMemoHighlightId, isNewMemo, setIsNewMemo, highlightId, keyword } =
    props;
  const [index, setIndex] = useState<number>();
  const [deleteMemo, setDeleteMemo] = useState<number>();

  useEffect(() => {
    setIndex(highlightList.findIndex((item) => item.highlightId === highlightId));
    setDeleteMemo(highlightList.findIndex((item) => Object.keys(item.memo).length === 1));
  }, [highlightId, highlightList]);

  if (index && index !== -1) {
    if (isNewMemo) {
      highlightList[index].memo = { keyword: keyword };
    } else if (Object.keys(highlightList[index].memo).length === 1) {
      highlightList[index].memo = {};
    }
  }

  if (deleteMemo && deleteMemo !== -1 && !isNewMemo) {
    highlightList[deleteMemo].memo = {};
  }

  return (
    <StMemoList>
      {highlightList.map(
        ({ highlightId, memo }) =>
          Object.keys(memo).length > 0 && (
            <Memo
              key={highlightId}
              isEditMemo={editMemoHighlightId == highlightId}
              setEditMemoHighlightId={setEditMemoHighlightId}
              isNewMemo={isNewMemo}
              setIsNewMemo={setIsNewMemo}
              keyword={memo.keyword}
              content={memo.content}
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

  height: 35.8rem;
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
