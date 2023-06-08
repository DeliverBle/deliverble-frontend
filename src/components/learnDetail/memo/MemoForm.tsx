import { ImageDiv } from '@src/components/common';
import { MEMO_CONTENT_MAX_LENGTH, INITIAL_MEMO_STATE, INITIAL } from '@src/constants/learnDetail/memo';
import { useClickOutside } from '@src/hooks/common';
import { COLOR, FONT_STYLES } from '@src/styles';
import { MemoConfirmModalKey, MemoState } from '@src/types/learnDetail';
import { MemoData } from '@src/types/learnDetail/remote';
import { icCheckButton, icInactiveCheckButton, icMemoXButton } from 'public/assets/icons';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

interface MemoFormProps {
  memoData: MemoData;
  memoState: MemoState;
  setMemoState: Dispatch<SetStateAction<MemoState>>;
  onMemoModal: (type: MemoConfirmModalKey) => void;
  updateMemoList: (type: MemoConfirmModalKey, content?: string) => void;
}

function MemoForm(props: MemoFormProps) {
  const { memoData, memoState, setMemoState, onMemoModal, updateMemoList } = props;
  const { content } = memoData;
  const { newMemoId, editMemoId } = memoState;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textLength, setTextLength] = useState(0);

  useClickOutside({
    isEnabled: newMemoId !== INITIAL || editMemoId !== INITIAL,
    handleClickOutside: (e: Event) => {
      const eventTarget = e.target as HTMLElement;
      const memo = eventTarget.closest('.memo');
      if (!memo && eventTarget.className !== 'modal-button') {
        handleDone(eventTarget);
      }
    },
  });

  const handleChange = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const text = [...new Intl.Segmenter().segment(textarea.value)];
      let length = text.length;
      if (length > MEMO_CONTENT_MAX_LENGTH) {
        textarea.value = text
          .slice(0, MEMO_CONTENT_MAX_LENGTH)
          .map((el) => el.segment)
          .join('');
        length = MEMO_CONTENT_MAX_LENGTH;
      }
      setTextLength(length);

      textarea.style.height = '0.1rem';
      textarea.style.height = (12 + textarea.scrollHeight) / 10 + 'rem';
      textarea.style.border = `0.2rem solid ${COLOR.SUB_BLUE_50}`;
    }
  };

  const handleModalOpen = () => {
    newMemoId !== INITIAL && onMemoModal('new');
    editMemoId !== INITIAL && onMemoModal('edit');
  };

  const handleDone = (target?: HTMLElement) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const newContent = textarea.value;
    if (newContent) {
      newMemoId !== INITIAL && updateMemoList('new', newContent);
      editMemoId !== INITIAL && updateMemoList('edit', newContent);
      return;
    }

    if (target) {
      newMemoId !== INITIAL && handleModalOpen();
      editMemoId !== INITIAL && setMemoState(INITIAL_MEMO_STATE);
    }
  };

  const handleClickCancel = () => {
    const newContent = textareaRef.current?.value;
    if (newMemoId !== INITIAL || (newContent && newContent !== content)) {
      handleModalOpen();
      return;
    }
    setMemoState(INITIAL_MEMO_STATE);
  };

  useEffect(() => {
    content && setTextLength(content.length);
  }, [content]);

  return (
    <StMemoForm>
      <StForm
        ref={textareaRef}
        rows={content ? Math.ceil(content.length / 30) : 1}
        autoFocus={content ? false : true}
        defaultValue={content}
        onChange={handleChange}
      />
      <StTextCounter>{textLength}/70</StTextCounter>
      <StButtonContainer>
        <button aria-label="취소" type="button" onClick={handleClickCancel}>
          <ImageDiv src={icMemoXButton} alt="취소" />
        </button>
        <StDoneButton
          aria-label="완료"
          type="button"
          onClick={() => handleDone()}
          textLength={textLength}
          disabled={!textLength}>
          <ImageDiv src={textLength ? icCheckButton : icInactiveCheckButton} alt="완료" />
        </StDoneButton>
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

const StDoneButton = styled.button<{ textLength: number }>`
  ${({ textLength }) =>
    !textLength &&
    css`
      cursor: url('/assets/icons/ic_not_allowed_cursor.svg'), not-allowed;
    `}
`;
