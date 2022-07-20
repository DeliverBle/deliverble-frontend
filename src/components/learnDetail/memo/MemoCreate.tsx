import { HighlightData } from '@src/services/api/types/learn-detail';
import styled from 'styled-components';

interface MemoCreateProps {
  highlightList: HighlightData[];
  keyword: string;
}

function MemoCreate(props: MemoCreateProps) {
  const { highlightList, keyword } = props;

  const getInsertMemoIndex = () => {
    let count = 0;
    for (let i = 0; i < highlightList.length; i++) {
      if (highlightList[i].memo.keyword === keyword) {
        return count;
      }
      if (Object.keys(highlightList[i].memo).length !== 0) {
        count = count + 1;
      }
    }
  };

  return <StMemoCreate></StMemoCreate>;
}

export default MemoCreate;

const StMemoCreate = styled.div``;
