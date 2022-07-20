import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icCheckButton, icMemoXButton } from 'public/assets/icons';
import styled from 'styled-components';
import ImageDiv from '../../common/ImageDiv';

interface MemoEditFormProps {
  content: string | undefined;
  setMemoEdit: (edit: boolean) => void;
}

function MemoEditForm(props: MemoEditFormProps) {
  const { content, setMemoEdit } = props;

  return (
    <>
      {content && (
        <StEditForm maxLength={70} rows={Math.ceil(content.length / 30)}>
          {content}
        </StEditForm>
      )}
      <StButtonContainer>
        <button type="button" onClick={() => setMemoEdit(false)}>
          <ImageDiv src={icMemoXButton} alt="x" />
        </button>
        <button type="button">
          <ImageDiv src={icCheckButton} alt="ok" />
        </button>
      </StButtonContainer>
    </>
  );
}

export default MemoEditForm;

const StEditForm = styled.textarea`
  padding: 0.8rem 0.8rem 0.8rem 1.2rem;
  width: 60.6rem;

  border: 2px solid ${COLOR.SUB_BLUE_50};
  border-radius: 1.2rem;
  background-color: transparent;

  font-family: 'Pretendard';
  ${FONT_STYLES.R_23_MEMO};
  color: ${COLOR.GRAY_80};

  overflow-y: hidden;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const StButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 60.6rem;
  height: 3rem;
  margin-top: 1.2rem;
`;
