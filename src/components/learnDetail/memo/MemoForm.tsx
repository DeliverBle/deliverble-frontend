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
import { icCheckButton, icMemoXButton } from 'public/assets/icons';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [textLength, setTextLength] = useState(0);

  const handleChange = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0.1rem';
      textAreaRef.current.style.height = (12 + textAreaRef.current.scrollHeight) / 10 + 'rem';
      textAreaRef.current.style.border = `0.2rem solid ${COLOR.SUB_BLUE_50}`;

      setTextLength(textAreaRef.current.value.length);
    }
  };

  const changeModalText = () => {
    if (newMemoId !== INITIAL_NUMBER) {
      setConfirmModalText(NEW_MEMO_CONFIRM_MODAL_TEXT);
    } else if (editMemoId !== INITIAL_NUMBER) {
      setConfirmModalText(EDIT_MEMO_CONFIRM_MODAL_TEXT);
    }
  };

  const handleClickDone = async () => {
    const newContent = textAreaRef.current?.value;
    if (newContent && newContent !== content) {
      let memoList;
      if (newMemoId !== INITIAL_NUMBER) {
        memoList = await api.learnDetailService.postMemoData(
          {
            keyword,
            order,
            startIndex,
            content: newContent,
          },
          scriptId,
        );
      } else if (editMemoId !== INITIAL_NUMBER && id) {
        memoList = await api.learnDetailService.updateMemoData(id, newContent);
      }
      memoList && setMemoList(memoList);
      setMemoState(INITIAL_MEMO_STATE);
    }
    if (newContent === '' && textAreaRef.current) {
      textAreaRef.current.style.border = `0.2rem solid ${COLOR.RED}`;
    }
  };

  const handleClickCancel = () => {
    const newContent = textAreaRef.current?.value;
    if (newContent !== '' && newContent !== content) {
      changeModalText();
      setIsConfirmOpen(true);
    } else {
      setMemoState(INITIAL_MEMO_STATE);
    }
  };

  useEffect(() => {
    content && setTextLength(content.length);
  }, [content]);

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
        <button type="button" onClick={handleClickCancel}>
          <ImageDiv src={icMemoXButton} alt="취소" />
        </button>
        <button type="button" onClick={handleClickDone}>
          <ImageDiv src={icCheckButton} alt="완료" />
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
