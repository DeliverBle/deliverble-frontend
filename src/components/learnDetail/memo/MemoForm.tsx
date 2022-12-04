import { MemoState } from '@src/pages/learn/[id]';
import { api } from '@src/services/api';
import { MemoData } from '@src/services/api/types/learn-detail';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import {
  EDIT_MEMO_CONFIRM_MODAL_TEXT,
  INITIAL_MEMO_STATE,
  INITIAL_NUMBER,
  NEW_MEMO_CONFIRM_MODAL_TEXT,
} from '@src/utils/constant';
import { icCheckButton, icMemoXButton, icUnactiveCheckButton } from 'public/assets/icons';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import ImageDiv from '../../common/ImageDiv';
import { ConfirmModalText } from '../ConfirmModal';

interface MemoFormProps {
  scriptId: number;
  memoData: MemoData;
  memoState: MemoState;
  setMemoList: (memoList: MemoData[]) => void;
  setMemoState: Dispatch<SetStateAction<MemoState>>;
  setIsConfirmOpen: (open: boolean) => void;
  setConfirmModalText: (text: ConfirmModalText) => void;
}

function MemoForm(props: MemoFormProps) {
  const { scriptId, memoData, memoState, setMemoList, setMemoState, setIsConfirmOpen, setConfirmModalText } = props;
  const { id, keyword, content, order, startIndex } = memoData;
  const { newMemoId, editMemoId } = memoState;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textLength, setTextLength] = useState(0);

  const handleChange = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const length = [...new Intl.Segmenter().segment(textarea.value)].length;
      if (length > 70) {
        textarea.value = textarea.value.slice(0, 70);
      }
      setTextLength(length);

      textarea.style.height = '0.1rem';
      textarea.style.height = (12 + textarea.scrollHeight) / 10 + 'rem';
      textarea.style.border = `0.2rem solid ${COLOR.SUB_BLUE_50}`;
    }
  };

  const handleModalOpen = () => {
    newMemoId !== INITIAL_NUMBER && setConfirmModalText(NEW_MEMO_CONFIRM_MODAL_TEXT);
    editMemoId !== INITIAL_NUMBER && setConfirmModalText(EDIT_MEMO_CONFIRM_MODAL_TEXT);
    setIsConfirmOpen(true);
  };

  const createMemo = async (newContent: string) => {
    const memoList = await api.learnDetailService.postMemoData(
      {
        keyword,
        order,
        startIndex,
        content: newContent,
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

  const handleDone = async (target: HTMLElement) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const newContent = textarea.value;
    if (newContent) {
      newMemoId !== INITIAL_NUMBER && createMemo(newContent);
      editMemoId !== INITIAL_NUMBER && updateMemo(newContent);
      return;
    }

    if (target.tagName === 'BUTTON') {
      textarea.style.border = `0.2rem solid ${COLOR.RED}`;
    } else {
      newMemoId !== INITIAL_NUMBER && handleModalOpen();
      editMemoId !== INITIAL_NUMBER && setMemoState(INITIAL_MEMO_STATE);
    }
  };

  const handleClickCancel = () => {
    const newContent = textareaRef.current?.value;
    if (newContent !== '' && newContent !== content) {
      handleModalOpen();
      return;
    }
    setMemoState(INITIAL_MEMO_STATE);
  };

  useEffect(() => {
    content && setTextLength(content.length);
  }, [content]);

  useEffect(() => {
    console.log(memoState);
    const handleClickOutside = (e: Event) => {
      const eventTarget = e.target as HTMLElement;
      const memo = eventTarget.closest('.memo');
      if (!memo && eventTarget.className !== 'modal-left-button') {
        handleDone(eventTarget);
      }
    };

    const { newMemoId, editMemoId } = memoState;
    if (newMemoId !== INITIAL_NUMBER || editMemoId !== INITIAL_NUMBER) {
      window.addEventListener('click', handleClickOutside);
      window.addEventListener('contextmenu', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('contextmenu', handleClickOutside);
    };
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
        <StDoneButton type="button" onClick={(e) => handleDone(e.target as HTMLElement)} textLength={textLength}>
          {textLength ? (
            <ImageDiv src={icCheckButton} alt="완료" />
          ) : (
            <ImageDiv src={icUnactiveCheckButton} alt="완료 비활성화" />
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

const StDoneButton = styled.button<{ textLength: number }>`
  ${({ textLength }) =>
    !textLength &&
    css`
      cursor: url('/assets/icons/ic_not_allowed_cursor.svg'), not-allowed;
    `}
`;
