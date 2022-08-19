import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icCheckButton, icMemoXButton } from 'public/assets/icons';
import { useRef } from 'react';
import styled from 'styled-components';
import ImageDiv from '../../common/ImageDiv';
import { NEW_MEMO_CONFIRM_MODAL_TEXT, EDIT_MEMO_CONFIRM_MODAL_TEXT } from '@src/utils/constant';

interface IConfirmModalText {
  mainText: string;
  subText: string;
  confirmText: string;
  cancelText: string;
}

interface MemoFormProps {
  content?: string;
  setMemoHighlightId: (idList: number[]) => void;
  setIsConfirmOpen: (open: boolean) => void;
  setConfirmModalText: (text: IConfirmModalText) => void;
}

function MemoForm(props: MemoFormProps) {
  const { setMemoHighlightId, content, setIsConfirmOpen, setConfirmModalText } = props;

  const newFormRef = useRef<HTMLTextAreaElement>(null);
  const editFormRef = useRef<HTMLTextAreaElement>(null);
  const autoResizeTextarea = () => {
    const formRef = newFormRef.current || editFormRef.current;
    if (formRef) {
      formRef.style.height = '0.1rem';
      formRef.style.height = (12 + formRef.scrollHeight) / 10 + 'rem';
    }
  };

  const changeModalText = () => {
    if (newFormRef.current?.value) {
      setConfirmModalText(NEW_MEMO_CONFIRM_MODAL_TEXT);
    } else if (editFormRef.current?.value !== content) {
      setConfirmModalText(EDIT_MEMO_CONFIRM_MODAL_TEXT);
    }
  };

  return (
    <>
      {content ? (
        <StForm
          ref={editFormRef}
          maxLength={70}
          rows={Math.ceil(content.length / 30)}
          defaultValue={content}
          onKeyDown={autoResizeTextarea}
          onKeyUp={autoResizeTextarea}
        />
      ) : (
        <StForm
          ref={newFormRef}
          maxLength={70}
          rows={1}
          autoFocus
          onKeyDown={autoResizeTextarea}
          onKeyUp={autoResizeTextarea}
        />
      )}
      <StButtonContainer>
        <button
          type="button"
          onClick={() => {
            changeModalText();
            newFormRef.current?.value || editFormRef.current?.value !== content
              ? setIsConfirmOpen(true)
              : setMemoHighlightId([0, 0]);
          }}>
          <ImageDiv src={icMemoXButton} alt="x" />
        </button>
        <button type="button">
          <ImageDiv src={icCheckButton} alt="ok" />
        </button>
      </StButtonContainer>
    </>
  );
}

export default MemoForm;

const StForm = styled.textarea`
  padding: 0.8rem 0.8rem 0.8rem 1.2rem;
  width: 60.6rem;

  border: 0.2rem solid ${COLOR.SUB_BLUE_50};
  border-radius: 1.2rem;
  background-color: transparent;

  font-family: 'Pretendard';
  ${FONT_STYLES.R_23_MEMO};
  color: ${COLOR.GRAY_80};

  resize: none;
  &:focus {
    outline: none;
  }
  &::-webkit-scrollbar {
    width: 1rem;
    background-color: transparent;
  }
`;

const StButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 60.6rem;
  height: 3rem;
  margin-top: 1.2rem;
`;
