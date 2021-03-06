import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';

interface ConfirmModalProps {
  closeModal: (close: boolean) => void;
  mainText: string;
  subText: string;
  cancelButtonText: string;
  confirmButtonText: string;
  setIsNewMemo: (newMemo: boolean) => void;
}

function ConfirmModal(props: ConfirmModalProps) {
  const { closeModal, mainText, subText, cancelButtonText, confirmButtonText, setIsNewMemo } = props;

  return (
    <StConfirmModal>
      <StDescription>
        <h2>{mainText}</h2>
        <p>{subText}</p>
      </StDescription>
      <StButtonContainer>
        <button onClick={() => closeModal(false)}>{cancelButtonText}</button>
        <button
          onClick={() => {
            setIsNewMemo(false);
            closeModal(false);
          }}>
          {confirmButtonText}
        </button>
      </StButtonContainer>
    </StConfirmModal>
  );
}

export default ConfirmModal;

const StConfirmModal = styled.div`
  position: absolute;
  top: 1.6rem;
  left: 50%;
  transform: translate(-50%, 0);
  width: 67rem;
  height: 26rem;
  border-radius: 1.6rem;
  border: solid 0.2rem ${COLOR.GRAY_10};
  background-color: ${COLOR.WHITE};
  box-shadow: 0.2rem 0.4rem 4rem 0 rgba(22, 15, 53, 0.15);
`;

const StDescription = styled.div`
  margin: 4rem 0 0 4rem;
  & > h2 {
    margin-bottom: 0.8rem;
    ${FONT_STYLES.SB_24_HEADLINE};
    color: ${COLOR.BLACK};
  }

  & > p {
    ${FONT_STYLES.M_20_BODY};
    color: ${COLOR.GRAY_45};
  }
`;

const StButtonContainer = styled.div`
  position: absolute;
  right: 2.4rem;
  bottom: 2.4rem;

  button {
    width: 11.8rem;
    height: 4.8rem;
    border-radius: 1rem;
    ${FONT_STYLES.SB_20_BODY};

    :first-of-type {
      color: ${COLOR.MAIN_BLUE};
    }

    :nth-of-type(2) {
      margin-left: 1.2rem;
      color: ${COLOR.WHITE};
      background-color: ${COLOR.MAIN_BLUE};
    }
  }
`;
