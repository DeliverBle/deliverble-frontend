import { MemoData } from '@src/services/api/types/learn-detail';
import { COLOR } from '@src/styles/color';
import styled from 'styled-components';
import Memo from './Memo';

interface MemoListProps {
  memoList: MemoData[];
}

function MemoList(props: MemoListProps) {
  const { memoList } = props;

  return (
    <StMemoList>
      {memoList.map(({ id, keyword, content }) => (
        <Memo key={id} keyword={keyword} content={content} />
      ))}
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
