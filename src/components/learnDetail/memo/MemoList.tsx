import { MemoData } from '@src/services/api/types/learn-detail';
import { COLOR } from '@src/styles/color';
import styled from 'styled-components';
import MemoItem from './MemoItem';
import { MemoInfo, MemoState } from '@src/pages/learn/[id]';
import { Dispatch, SetStateAction } from 'react';
import { MemoConfirmModalKey } from '@src/components/learnDetail/ConfirmModal';

interface MemoListProps {
  memoList: MemoData[];
  memoState: MemoState;
  memoInfo: MemoInfo;
  setMemoState: Dispatch<SetStateAction<MemoState>>;
  onMemoModal: (type: MemoConfirmModalKey) => void;
  handleMemo: (type: MemoConfirmModalKey, content?: string) => Promise<void>;
}

function MemoList(props: MemoListProps) {
  const { memoList, memoState, memoInfo, setMemoState, onMemoModal, handleMemo } = props;

  return (
    <StMemoList>
      {memoList.map((memo) => (
        <MemoItem
          key={memo.id}
          scriptId={memoInfo.scriptId} // TODO: 수정 가능성 고려해볼 것
          memoData={memo}
          memoState={memoState}
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
