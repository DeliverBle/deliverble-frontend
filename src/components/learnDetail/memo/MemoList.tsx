import { MemoData } from '@src/services/api/types/learn-detail';
import { COLOR } from '@src/styles/color';
import styled from 'styled-components';
import MemoItem from './MemoItem';
import { MemoInfo, MemoState } from '@src/pages/learn/[id]';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { INITIAL_NUMBER } from '@src/utils/constant';
import { MemoConfirmModalKey } from '@src/components/learnDetail/ConfirmModal';

interface MemoListProps {
  memoList: MemoData[];
  memoState: MemoState;
  memoInfo: MemoInfo;
  setMemoList: Dispatch<SetStateAction<MemoData[]>>;
  setMemoState: Dispatch<SetStateAction<MemoState>>;
  onMemoModal: (type: MemoConfirmModalKey) => void;
}

function MemoList(props: MemoListProps) {
  const { memoList, memoState, memoInfo, setMemoList, setMemoState, onMemoModal } = props;

  useEffect(() => {
    setMemoList((prev: MemoData[]) => prev.filter((memo) => memo.content !== ''));
    if (memoState.newMemoId !== INITIAL_NUMBER) {
      const { order, startIndex, keyword, highlightId } = memoInfo;
      setMemoList((prev: MemoData[]) =>
        [
          ...prev,
          {
            id: INITIAL_NUMBER,
            order,
            startIndex,
            keyword,
            content: '',
            highlightId,
          },
        ].sort((a, b) => {
          if (a.order > b.order) return 1;
          if (a.order < b.order) return -1;
          if (a.startIndex > b.startIndex) return 1;
          if (a.startIndex < b.startIndex) return -1;
          return 0;
        }),
      );
    }
  }, [memoState, memoInfo, setMemoList]);

  return (
    <StMemoList>
      {memoList.map((memo) => {
        const tempMemo = {
          id: memo.id,
          order: memoInfo.order,
          startIndex: memoInfo.startIndex,
          keyword: memo.keyword,
          content: memo.content,
          highlightId: memo.highlightId,
        };

        return (
          <MemoItem
            key={memo.id}
            scriptId={memoInfo.scriptId}
            memoData={tempMemo}
            memoState={memoState}
            setMemoList={setMemoList}
            setMemoState={setMemoState}
            onMemoModal={onMemoModal}
          />
        );
      })}
    </StMemoList>
  );
}

export default MemoList;

const StMemoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  height: 40.7rem;
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
