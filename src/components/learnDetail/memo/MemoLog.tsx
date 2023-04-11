import { EmptyMemo, MemoItem } from '@src/components/learnDetail/memo';
import { COLOR } from '@src/styles';
import { MemoState, MemoConfirmModalKey } from '@src/types/learnDetail';
import { MemoData } from '@src/types/learnDetail/remote';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface MemoLogProps {
  memoList: MemoData[];
  memoState: MemoState;
  setMemoState: Dispatch<SetStateAction<MemoState>>;
  onMemoModal: (type: MemoConfirmModalKey) => void;
  updateMemoList: (type: MemoConfirmModalKey, content?: string) => void;
}

function MemoLog(props: MemoLogProps) {
  const { memoList, memoState, setMemoState, onMemoModal, updateMemoList } = props;

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
              updateMemoList={updateMemoList}
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
