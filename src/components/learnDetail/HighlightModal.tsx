import styled from 'styled-components';
import ImageDiv from '../common/ImageDiv';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icAlert } from 'public/assets/icons';

function HighlightModal() {
  return (
    <StHighlightModal>
      <ImageDiv src={icAlert} className="alert" layout="fill" alt="" />
      하이라이트 모달
    </StHighlightModal>
  );
}

export default HighlightModal;

const StHighlightModal = styled.div`
  width: 50rem;
  height: 50rem;
  background-color: ${COLOR.MAIN_BLUE};
  ${FONT_STYLES.B_20_BODY};

  .alert {
    position: relative;
    width: 3.2rem;
    height: 3.2rem;
  }
`;
