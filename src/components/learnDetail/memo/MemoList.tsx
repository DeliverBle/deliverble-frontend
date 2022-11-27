import { MemoData } from '@src/services/api/types/learn-detail';
import { COLOR } from '@src/styles/color';
import styled from 'styled-components';
import Memo from './Memo';
import { ConfirmModalText } from '../ConfirmModal';
import { MemoInfo, MemoState } from '@src/pages/learn/[id]';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { INITIAL_NUMBER } from '@src/utils/constant';

interface MemoListProps {
  memoList: MemoData[];
  memoState: MemoState;
  memoInfo: MemoInfo;
  selectedKeyword: string;
  setMemoList: (memoList: MemoData[]) => void;
  setMemoState: Dispatch<SetStateAction<MemoState>>;
  setIsConfirmOpen: (open: boolean) => void;
  setConfirmModalText: (text: ConfirmModalText) => void;
}

function MemoList(props: MemoListProps) {
  const {
    memoList,
    memoState,
    memoInfo,
    selectedKeyword,
    setMemoList,
    setMemoState,
    setIsConfirmOpen,
    setConfirmModalText,
  } = props;
  const { newMemoId, editMemoId } = memoState;

  useEffect(() => {
    if (newMemoId !== INITIAL_NUMBER) {
      const { order, startIndex } = memoInfo;
      const newMemoList = [
        ...memoList,
        {
          id: INITIAL_NUMBER,
          order,
          startIndex,
          keyword: selectedKeyword,
          content: '',
        },
      ];
      newMemoList.sort((a, b) => {
        if (a.order > b.order) return 1;
        if (a.order < b.order) return -1;
        if (a.startIndex > b.startIndex) return 1;
        if (a.startIndex < b.startIndex) return -1;
        return 0;
      });
      setMemoList(newMemoList);

      if (editMemoId !== INITIAL_NUMBER) {
        setMemoList(memoList.filter((memo) => memo.content !== ''));
      }
    }
  }, [memoState]);

  return (
    <StMemoList>
      {memoList.map((memo) => {
        const tempMemo = {
          id: memo.id,
          order: memoInfo.order,
          startIndex: memoInfo.startIndex,
          keyword: memo.keyword,
          content: memo.content,
        };

        return (
          <Memo
            key={memo.id}
            scriptId={memoInfo.scriptId}
            memoData={tempMemo}
            memoState={memoState}
            setMemoList={setMemoList}
            setMemoState={setMemoState}
            setIsConfirmOpen={setIsConfirmOpen}
            setConfirmModalText={setConfirmModalText}
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
