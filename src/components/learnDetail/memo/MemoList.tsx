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
  handleMemo: (type: MemoConfirmModalKey, content?: string) => Promise<void>;
}

function MemoList(props: MemoListProps) {
  const { memoList, memoState, memoInfo, setMemoList, setMemoState, onMemoModal, handleMemo } = props;

  //  TODO: 이 작업을 꼭 이 컴포넌트 안에서 해야할까?
  useEffect(() => {
    setMemoList((prev: MemoData[]) => prev.filter((memo) => memo.content !== ''));
    if (memoState.newMemoId !== INITIAL_NUMBER) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { scriptId, ...memo } = memoInfo;
      setMemoList((prev: MemoData[]) =>
        [...prev, memo].sort((a, b) => a.order - b.order || a.startIndex - b.startIndex),
      );
    }
  }, [memoState, memoInfo, setMemoList]);

  return (
    <StMemoList>
      {memoList.map((memo) => (
        <MemoItem
          key={memo.id}
          scriptId={memoInfo.scriptId} // TODO: 수정 가능성 고려해볼 것
          memoData={memo}
          memoState={memoState}
          setMemoList={setMemoList}
          setMemoState={setMemoState}
          onMemoModal={onMemoModal}
          handleMemo={handleMemo}
        />
      ))}
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
