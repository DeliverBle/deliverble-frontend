import { HighlightData } from '@src/services/api/types/learn-detail';
import { useEffect, useState } from 'react';
import Memo from '../Memo';
import { StMemoList } from './style';

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
