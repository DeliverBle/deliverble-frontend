import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import styled from 'styled-components';

interface MemoPopupProps {
  editClicked: () => void;
}

function MemoPopup(props: MemoPopupProps) {
  const { editClicked } = props;

  return (
    <StMemoPopup>
      <StMemoPopupContent>
        <StMemoEdit onClick={editClicked}>메모 수정</StMemoEdit>
        <StMemoDelete>메모 삭제</StMemoDelete>
      </StMemoPopupContent>
    </StMemoPopup>
  );
}

export default MemoPopup;

const StMemoPopup = styled.div``;

const StMemoPopupContent = styled.div`
  position: absolute;
  top: 4.8rem;
  z-index: 100;

  width: 10.3rem;
  height: 8rem;

  border: 1px solid ${COLOR.GRAY_10};
  border-radius: 1.2rem;
  background-color: ${COLOR.WHITE};
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
