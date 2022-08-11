import { StButtonContainer, StConfirmModal, StDescription } from './style';

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
