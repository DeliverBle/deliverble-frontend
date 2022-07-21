import { HighlightData } from '@src/services/api/types/learn-detail';
import { COLOR } from '@src/styles/color';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Memo from './Memo';

interface MemoListProps {
  highlightList: HighlightData[];
  newMemo: boolean;
  setNewMemo: (newMemo: boolean) => void;
  highlightId?: number;
  keyword?: string;
}

function MemoList(props: MemoListProps) {
  const { highlightList, newMemo, setNewMemo, highlightId, keyword } = props;
  const [index, setIndex] = useState<number>();

  useEffect(() => {
    setIndex(highlightList.findIndex((item) => item.highlightId === highlightId));
  }, [highlightId, highlightList, index]);

  if (index !== undefined && index !== -1) {
    highlightList[index].memo = newMemo ? { keyword: keyword } : {};
  }

  return (
    <StMemoList>
      {highlightList.map(({ highlightId, memo }) =>
        Object.keys(memo).length ? (
          <Memo
            key={highlightId}
            newMemo={newMemo}
            setNewMemo={setNewMemo}
            keyword={memo.keyword}
            content={memo.content}
          />
        ) : null,
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
