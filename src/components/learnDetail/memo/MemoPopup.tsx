import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import styled from 'styled-components';

interface MemoPopupProps {
  memoEdit: () => void;
}

function MemoPopup(props: MemoPopupProps) {
  const { memoEdit } = props;

  return (
    <>
      <StMemoPopup>
        <StMemoEdit onClick={memoEdit}>메모 수정</StMemoEdit>
        <StMemoDelete>메모 삭제</StMemoDelete>
      </StMemoPopup>
    </>
  );
}

export default MemoPopup;

const StMemoPopup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 4.8rem;
  right: 0;
  z-index: 100;

  width: 10.3rem;
  height: 8rem;

  border: 1px solid ${COLOR.GRAY_10};
  border-radius: 1.2rem;
  background-color: ${COLOR.WHITE};

  & > button:hover {
    transition: background-color 0.3s ease-in-out;
    background-color: ${COLOR.GRAY_5};
  }
`;

const StMemoEdit = styled.button`
  width: 9.1rem;
  height: 3.2rem;

  color: ${COLOR.BLACK};
  ${FONT_STYLES.SB_16_CAPTION};
`;

const StMemoDelete = styled.button`
  width: 9.1rem;
  height: 3.2rem;

  color: ${COLOR.BLACK};
  ${FONT_STYLES.SB_16_CAPTION};
`;
