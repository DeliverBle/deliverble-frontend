import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import styled from 'styled-components';

interface MemoPopupProps {
  edit: () => void;
}

function MemoPopup(props: MemoPopupProps) {
  const { edit } = props;

  return (
    <>
      <StMemoPopup>
        <button type="button" onClick={edit}>
          메모 수정
        </button>
        <button type="button">메모 삭제</button>
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
  box-shadow: 0.4rem 0.4rem 2rem rgba(22, 15, 53, 0.15);

  & > button {
    width: 9.1rem;
    height: 3.2rem;

    border-radius: 0.8rem;
    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_16_CAPTION};
  }

  & > button:hover {
    transition: background-color 0.3s ease-in-out;
    background-color: ${COLOR.GRAY_5};
  }
`;
