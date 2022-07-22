import { HighlightData } from '@src/services/api/types/learn-detail';
import { COLOR } from '@src/styles/color';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Memo from './Memo';

interface MemoListProps {
  highlightList: HighlightData[];
  isNewMemo: boolean;
  setIsNewMemo: (isNewMemo: boolean) => void;
  highlightId?: number;
  keyword?: string;
}

function MemoList(props: MemoListProps) {
  const { highlightList, isNewMemo, setIsNewMemo, highlightId, keyword } = props;
  const [index, setIndex] = useState<number>();

  useEffect(() => {
    setIndex(highlightList.findIndex((item) => item.highlightId === highlightId));
  }, [highlightId, highlightList, index]);

  if (index !== undefined && index !== -1) {
    highlightList[index].memo = isNewMemo ? { keyword: keyword } : {};
  }

  return (
    <StMemoList>
      {highlightList.map(
        ({ highlightId, memo }) =>
          Object.keys(memo).length > 0 && (
            <Memo
              key={highlightId}
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
