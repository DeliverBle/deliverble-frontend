import { MemoConfirmModalKey } from '@src/components/learnDetail/ConfirmModal';
import EmptyMemo from '@src/components/learnDetail/memo/EmptyMemo';
import MemoItem from '@src/components/learnDetail/memo/MemoItem';
import { MemoState } from '@src/pages/learn/[id]';
import { MemoData } from '@src/services/api/types/learn-detail';
import { COLOR } from '@src/styles/color';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface MemoLogProps {
  memoList: MemoData[];
  memoState: MemoState;
  setMemoState: Dispatch<SetStateAction<MemoState>>;
  onMemoModal: (type: MemoConfirmModalKey) => void;
  handleMemo: (type: MemoConfirmModalKey, content?: string) => Promise<void>;
}

function MemoLog(props: MemoLogProps) {
  const { memoList, memoState, setMemoState, onMemoModal, handleMemo } = props;

  return (
    <StMemoLog>
      {memoList.length ? (
        <StMemoList>
          {memoList.map((memo) => (
            <MemoItem
              key={memo.id}
              memoData={memo}
              memoState={memoState}
              setMemoState={setMemoState}
              onMemoModal={onMemoModal}
              handleMemo={handleMemo}
            />
          ))}
        </StMemoList>
      ) : (
        <EmptyMemo />
      )}
    </StMemoLog>
  );
}

export default MemoLog;

const StMemoLog = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

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
