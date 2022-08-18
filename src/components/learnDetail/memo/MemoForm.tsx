import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icCheckButton, icMemoXButton } from 'public/assets/icons';
import { useRef } from 'react';
import styled from 'styled-components';
import ImageDiv from '../../common/ImageDiv';

interface MemoFormProps {
  content?: string;
  setNewMemoHighlightId: (id: number) => void;
  setEditMemoHighlightId: (id: number) => void;
}

function MemoForm(props: MemoFormProps) {
  const { setNewMemoHighlightId, setEditMemoHighlightId, content } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0.1rem';
      textareaRef.current.style.height = (12 + textareaRef.current.scrollHeight) / 10 + 'rem';
    }
  };

  return (
    <>
      {content ? (
        <StForm
          ref={textareaRef}
          maxLength={70}
          rows={Math.ceil(content.length / 30)}
          defaultValue={content}
          onKeyDown={autoResizeTextarea}
          onKeyUp={autoResizeTextarea}
        />
      ) : (
        <StForm
          ref={textareaRef}
          rows={1}
          maxLength={70}
          autoFocus
          onKeyDown={autoResizeTextarea}
          onKeyUp={autoResizeTextarea}
        />
      )}
      <StButtonContainer>
        <button
          type="button"
          onClick={() => {
            setNewMemoHighlightId(0);
            setEditMemoHighlightId(0);
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
