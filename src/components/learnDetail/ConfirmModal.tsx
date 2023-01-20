import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { MemoState } from '@src/pages/learn/[id]';
import Portal from '../common/Portal';
import {
  DELETE_MEMO_CONFIRM_MODAL_TEXT,
  DELETE_SCRIPT_CONFIRM_MODAL_TEXT,
  INITIAL_MEMO_STATE,
} from '@src/utils/constant';

export interface ConfirmModalText {
  mainText: string;
  subText?: string;
  leftButtonText: string;
  rightButtonText: string;
}

interface ConfirmModalProps {
  confirmModalText: ConfirmModalText;
  setMemoState: Dispatch<SetStateAction<MemoState>>;
  setIsConfirmOpen: (close: boolean) => void;
  setClickedDeleteMemo: (clicked: boolean) => void;
  onScriptDelete: () => void;
}

function ConfirmModal(props: ConfirmModalProps) {
  const { confirmModalText, setMemoState, setIsConfirmOpen, setClickedDeleteMemo, onScriptDelete } = props;
  const { mainText, subText, leftButtonText, rightButtonText } = confirmModalText;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const handleButtonClick = () => {
    if (mainText === DELETE_SCRIPT_CONFIRM_MODAL_TEXT.mainText) {
      onScriptDelete();
      return;
    }

    if (mainText === DELETE_MEMO_CONFIRM_MODAL_TEXT.mainText) {
      setClickedDeleteMemo(true);
      return;
    }

    setMemoState(INITIAL_MEMO_STATE);
  };

  return (
    <Portal selector="#portal">
      <StConfirmModal>
        <StDescription>
          <h2>{mainText}</h2>
          <p>{subText}</p>
        </StDescription>
        <StButtonContainer>
          <button
            className="modal-button"
            onClick={() => {
              setIsConfirmOpen(false);
            }}>
            {leftButtonText}
          </button>
          <button
            className="modal-button"
            onClick={() => {
              setIsConfirmOpen(false);
              handleButtonClick();
            }}>
            {rightButtonText}
          </button>
        </StButtonContainer>
      </StConfirmModal>
    </Portal>
  );
}

export default ConfirmModal;

const StConfirmModal = styled.div`
  position: absolute;
  z-index: 3;
  top: 2.4rem;
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
    white-space: pre-line;
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
