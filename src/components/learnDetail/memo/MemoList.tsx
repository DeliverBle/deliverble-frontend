import { HighlightData } from '@src/services/api/types/learn-detail';
import { COLOR } from '@src/styles/color';
import styled from 'styled-components';
import Memo from './Memo';

interface MemoListProps {
  highlightList: HighlightData[];
}

function MemoList(props: MemoListProps) {
  const { highlightList } = props;

  return (
    <StMemoList>
      {highlightList.map(
        ({ memo }) =>
          Object.keys(memo).length !== 0 && <Memo key={memo.id} keyword={memo.keyword} content={memo.content} />,
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
