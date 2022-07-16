import { MemoData } from '@src/services/api/types/learn-detail';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import styled from 'styled-components';
import MemoDotButton from './MemoDotButton';

interface MemoListProps {
  memoList: MemoData[];
}

function MemoList(props: MemoListProps) {
  const { memoList } = props;

  return (
    <StMemoList>
      {memoList.map(({ id, keyword, content }) => (
        <StMemoWrapper key={id}>
          <StMemoKeyword>{keyword.length > 28 ? `${keyword.slice(0, 27)}...` : keyword}</StMemoKeyword>
          <StMemoContent>
            {content.length > 30 ? (
              <>
                {keyword.slice(0, 26)}
                <button type="button"> ... 더보기</button>
              </>
            ) : (
              keyword
            )}
            <MemoDotButton />
          </StMemoContent>
        </StMemoWrapper>
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
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${COLOR.GRAY_10};
    border-radius: 1.3rem;
  }
`;

const StMemoWrapper = styled.div`
  position: relative;

  margin-right: 0.8rem;
  padding: 2.8rem 3.2rem 2.8rem 3.2rem;
  width: 67rem;
  height: 136px;

  background-color: ${COLOR.SUB_BLUE_8};
  border-radius: 2.5rem;

  &:hover .dot {
    opacity: 1;
  }
`;

const StMemoKeyword = styled.h1`
  margin-bottom: 0.8rem;

  color: ${COLOR.BLACK};
  ${FONT_STYLES.SB_25_MEMO};
`;

const StMemoContent = styled.p`
  color: ${COLOR.GRAY_80};
  ${FONT_STYLES.R_23_MEMO};

  & > button {
    color: ${COLOR.GRAY_30};
    ${FONT_STYLES.R_23_MEMO};

    &:hover {
      color: ${COLOR.MAIN_BLUE};
    }
  }
`;
