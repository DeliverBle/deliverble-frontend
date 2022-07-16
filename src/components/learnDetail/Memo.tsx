import styled from 'styled-components';
import MemoDotButton from './MemoDotButton';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { useState } from 'react';

interface MemoProps {
  keyword: string;
  content: string;
}

function Memo(props: MemoProps) {
  const { keyword, content } = props;
  const [moreButton, setMoreButton] = useState(false);

  return (
    <StMemo>
      <StKeyword>{keyword.length <= 28 || moreButton ? keyword : `${keyword.slice(0, 27)}...`}</StKeyword>
      <StContent>
        {content.length <= 30 || moreButton ? (
          content
        ) : (
          <>
            {content.slice(0, 26)}
            <button type="button" onClick={() => setMoreButton(true)}>
              ... 더보기
            </button>
          </>
        )}
        <MemoDotButton />
      </StContent>
    </StMemo>
  );
}

export default Memo;

const StMemo = styled.div`
  position: relative;

  margin-right: 0.8rem;
  padding: 2.8rem 3.2rem 2.8rem 3.2rem;
  width: 67rem;

  background-color: ${COLOR.SUB_BLUE_8};
  border-radius: 2.5rem;

  &:hover .dot {
    opacity: 1;
  }
`;

const StKeyword = styled.h1`
  margin-bottom: 0.8rem;

  color: ${COLOR.BLACK};
  ${FONT_STYLES.SB_25_MEMO};
`;

const StContent = styled.p`
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
