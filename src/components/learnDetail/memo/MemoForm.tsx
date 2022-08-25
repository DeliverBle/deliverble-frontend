import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icCheckButton, icMemoXButton } from 'public/assets/icons';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import ImageDiv from '../../common/ImageDiv';
import { NEW_MEMO_CONFIRM_MODAL_TEXT, EDIT_MEMO_CONFIRM_MODAL_TEXT } from '@src/utils/constant';
import { ConfirmModalText } from '../ConfirmModal';
import { MemoHighlightId } from '@src/pages/learn/[id]';

interface MemoFormProps {
  content?: string;
  setMemoHighlightId: (id: MemoHighlightId) => void;
  setIsConfirmOpen: (open: boolean) => void;
  setConfirmModalText: (text: ConfirmModalText) => void;
}

function MemoForm(props: MemoFormProps) {
  const { setMemoHighlightId, content, setIsConfirmOpen, setConfirmModalText } = props;
  const [textLength, setTextLength] = useState(0);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleChange = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0.1rem';
      textAreaRef.current.style.height = (12 + textAreaRef.current.scrollHeight) / 10 + 'rem';

      setTextLength(textAreaRef.current.value.length);
    }
  };

  const changeModalText = () => {
    if (!content && textAreaRef.current?.value) {
      setConfirmModalText(NEW_MEMO_CONFIRM_MODAL_TEXT);
    } else if (textAreaRef.current?.value !== content) {
      setConfirmModalText(EDIT_MEMO_CONFIRM_MODAL_TEXT);
    }
  };

  return (
    <StMemoForm>
      <StForm
        ref={textAreaRef}
        maxLength={70}
        rows={content ? Math.ceil(content.length / 30) : 1}
        autoFocus={content ? false : true}
        defaultValue={content}
        onChange={handleChange}
      />
      <StTextCounter>{textLength}/70</StTextCounter>
      <StButtonContainer>
        <button
          type="button"
          onClick={() => {
            changeModalText();
            (content ? textAreaRef.current?.value !== '' : textAreaRef.current?.value !== content)
              ? setIsConfirmOpen(true)
              : setMemoHighlightId({ new: 0, edit: 0 });
          }}>
          <ImageDiv src={icMemoXButton} alt="취소" />
        </button>
        <button type="button">
          <ImageDiv src={icCheckButton} alt="수정" />
        </button>
      </StButtonContainer>
    </StMemoForm>
  );
}

export default MemoForm;

const StMemoForm = styled.div`
  position: relative;
`;

const StForm = styled.textarea`
  padding: 0.8rem 0.8rem 4.9rem 1.2rem;
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

const StTextCounter = styled.div`
  position: absolute;
  right: 1.2rem;
  bottom: 5rem;

  display: flex;
  justify-content: right;

  width: 6.3rem;
  height: 3.7rem;

  ${FONT_STYLES.R_23_MEMO};
  color: ${COLOR.GRAY_30};
`;

const StButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 60.6rem;
  height: 3rem;
  margin-top: 1.2rem;
`;
