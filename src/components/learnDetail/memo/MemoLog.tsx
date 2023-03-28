import { MemoConfirmModalKey } from '@src/components/learnDetail/ConfirmModal';
import EmptyMemo from '@src/components/learnDetail/memo/EmptyMemo';
import MemoList from '@src/components/learnDetail/memo/MemoList';
import { MemoInfo, MemoState } from '@src/pages/learn/[id]';
import { MemoData } from '@src/services/api/types/learn-detail';
import { INITIAL_NUMBER } from '@src/utils/constant';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface MemoLogProps {
  memoInfo: MemoInfo;
  memoList: MemoData[];
  memoState: MemoState;
  setMemoList: Dispatch<SetStateAction<MemoData[]>>;
  setMemoState: Dispatch<SetStateAction<MemoState>>;
  onMemoModal: (type: MemoConfirmModalKey) => void;
}

function MemoLog(props: MemoLogProps) {
  const { memoInfo, memoList, memoState, setMemoList, setMemoState, onMemoModal } = props;

  return (
    <StMemoLog>
      {memoList.length || memoState.newMemoId !== INITIAL_NUMBER ? (
        <MemoList
          memoList={memoList}
          memoState={memoState}
          memoInfo={memoInfo}
          setMemoList={setMemoList}
          setMemoState={setMemoState}
          onMemoModal={onMemoModal}
        />
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