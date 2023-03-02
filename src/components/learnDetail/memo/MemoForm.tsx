import { MemoConfirmModalKey } from '@src/components/learnDetail/ConfirmModal';
import { MemoState } from '@src/pages/learn/[id]';
import { api } from '@src/services/api';
import { MemoData } from '@src/services/api/types/learn-detail';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { INITIAL_MEMO_STATE, INITIAL_NUMBER, MEMO_CONTENT_MAX_LENGTH } from '@src/utils/constant';
import { icCheckButton, icMemoXButton, icInactiveCheckButton } from 'public/assets/icons';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import ImageDiv from '../../common/ImageDiv';

interface MemoFormProps {
  scriptId: number;
  memoData: MemoData;
  memoState: MemoState;
  setMemoList: (memoList: MemoData[]) => void;
  setMemoState: Dispatch<SetStateAction<MemoState>>;
  onMemoModal: (type: MemoConfirmModalKey) => void;
}

function MemoForm(props: MemoFormProps) {
  const { scriptId, memoData, memoState, setMemoList, setMemoState, onMemoModal } = props;
  const { id, keyword, content, order, startIndex, highlightId } = memoData;
  const { newMemoId, editMemoId } = memoState;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textLength, setTextLength] = useState(0);

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
    newMemoId !== INITIAL_NUMBER && onMemoModal('new');
    editMemoId !== INITIAL_NUMBER && onMemoModal('edit');
  };

  const createMemo = async (newContent: string) => {
    const memoList = await api.learnDetailService.postMemoData(
      {
        keyword,
        order,
        startIndex,
        content: newContent,
        highlightId,
      },
      scriptId,
    );
    memoList && setMemoList(memoList);
    setMemoState(INITIAL_MEMO_STATE);
  };

  const updateMemo = async (newContent: string) => {
    const memoList = id && (await api.learnDetailService.updateMemoData(id, newContent));
    memoList && setMemoList(memoList);
    setMemoState(INITIAL_MEMO_STATE);
  };

  const handleDone = async (target?: HTMLElement) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const newContent = textarea.value;
    if (newContent) {
      newMemoId !== INITIAL_NUMBER && createMemo(newContent);
      editMemoId !== INITIAL_NUMBER && updateMemo(newContent);
      return;
    }

    if (target) {
      newMemoId !== INITIAL_NUMBER && handleModalOpen();
      editMemoId !== INITIAL_NUMBER && setMemoState(INITIAL_MEMO_STATE);
    }
  };

  const handleClickCancel = () => {
    const newContent = textareaRef.current?.value;
    if (newMemoId !== INITIAL_NUMBER || (newContent && newContent !== content)) {
      handleModalOpen();
      return;
    }
    setMemoState(INITIAL_MEMO_STATE);
  };

  useEffect(() => {
    content && setTextLength(content.length);
  }, [content]);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const eventTarget = e.target as HTMLElement;
      const memo = eventTarget.closest('.memo');
      if (!memo && eventTarget.className !== 'modal-button') {
        handleDone(eventTarget);
      }
    };

    const { newMemoId, editMemoId } = memoState;
    if (newMemoId !== INITIAL_NUMBER || editMemoId !== INITIAL_NUMBER) {
      window.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('contextmenu', handleClickOutside);
    }
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('contextmenu', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoState]);

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
        <button type="button" onClick={handleClickCancel}>
          <ImageDiv src={icMemoXButton} alt="취소" />
        </button>
        <StDoneButton type="button" onClick={() => handleDone()} textLength={textLength}>
          {textLength ? (
            <ImageDiv src={icCheckButton} alt="완료" />
          ) : (
            <ImageDiv src={icInactiveCheckButton} alt="비활성화" />
          )}
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
      disabled: true;
    `}
`;
