import { HighlightData } from '@src/services/api/types/learn-detail';
import { COLOR } from '@src/styles/color';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Memo from './Memo';
import { ConfirmModalText } from '../ConfirmModal';
import { MemoHighlightId } from '@src/pages/learn/[id]';

interface MemoListProps {
  highlightList: HighlightData[];
  highlightId?: number;
  keyword?: string;
  memoHighlightId: MemoHighlightId;
  setMemoHighlightId: (id: MemoHighlightId) => void;
  setIsConfirmOpen: (open: boolean) => void;
  setConfirmModalText: (text: ConfirmModalText) => void;
}

function MemoList(props: MemoListProps) {
  const {
    highlightList,
    highlightId,
    keyword,
    memoHighlightId,
    setMemoHighlightId,
    setIsConfirmOpen,
    setConfirmModalText,
  } = props;
  const [index, setIndex] = useState<number>();
  const [memoIndexToDelete, setMemoIndexToDelete] = useState<number>();

  useEffect(() => {
    setIndex(highlightList.findIndex((item) => item.highlightId === highlightId));
    setMemoIndexToDelete(highlightList.findIndex((item) => Object.keys(item.memo).length === 1));
  }, [highlightId, highlightList]);

  if (index && index !== -1) {
    if (memoHighlightId.new) {
      highlightList[index].memo = { keyword: keyword };
    } else if (Object.keys(highlightList[index].memo).length === 1) {
      highlightList[index].memo = {};
    }
  }

  if (memoIndexToDelete && memoIndexToDelete !== -1 && !memoHighlightId.new) {
    highlightList[memoIndexToDelete].memo = {};
  }

  return (
    <StMemoList>
      {highlightList.map(
        ({ highlightId, memo }) =>
          Object.keys(memo).length > 0 && (
            <Memo
              key={highlightId}
              highlightId={highlightId}
              memoData={[memo.keyword, memo.content]}
              isEditMemo={memoHighlightId.edit == highlightId}
              setMemoHighlightId={setMemoHighlightId}
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
