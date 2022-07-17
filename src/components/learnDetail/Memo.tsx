import styled from 'styled-components';
import MemoDotButton from './MemoDotButton';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { useState } from 'react';
import { icCheckButton, icMemoXButton } from 'public/assets/icons';
import ImageDiv from '../common/ImageDiv';

interface MemoProps {
  keyword: string;
  content: string;
}

function Memo(props: MemoProps) {
  const { keyword, content } = props;
  const [moreButton, setMoreButton] = useState(false);
  const [editClicked, setEditClicked] = useState(false);

  return (
    <StMemo>
      <StKeyword>{keyword.length <= 28 || moreButton ? keyword : `${keyword.slice(0, 27)}...`}</StKeyword>
      {editClicked ? (
        <>
          <StEditForm maxLength={70} rows={Math.ceil(content.length / 30)}>
            {content}
          </StEditForm>
          <StButtonContainer>
            <button type="button" onClick={() => setEditClicked(false)}>
              <ImageDiv src={icMemoXButton} alt="x" />
            </button>
            <button type="button">
              <ImageDiv src={icCheckButton} alt="ok" />
            </button>
          </StButtonContainer>
        </>
      ) : (
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
          <MemoDotButton editClicked={() => setEditClicked(true)} />
        </StContent>
      )}
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

const StEditForm = styled.textarea`
  padding: 0.8rem 0.8rem 0.8rem 1.2rem;
  width: 60.6rem;

  border: 2px solid ${COLOR.SUB_BLUE_50};
  border-radius: 1.2rem;
  background-color: transparent;

  font-family: 'Pretendard';
  ${FONT_STYLES.R_23_MEMO};
  color: ${COLOR.GRAY_80};

  overflow-y: hidden;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const StButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 60.6rem;
  height: 3rem;
  margin-top: 1.2rem;
`;
