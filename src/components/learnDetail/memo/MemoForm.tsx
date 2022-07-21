import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icCheckButton, icMemoXButton } from 'public/assets/icons';
import styled from 'styled-components';
import ImageDiv from '../../common/ImageDiv';

interface MemoFormProps {
  content?: string;
  setCreate: (cancel: boolean) => void;
  setEdit: (cancel: boolean) => void;
}

function MemoForm(props: MemoFormProps) {
  const { content, setCreate, setEdit } = props;

  return (
    <>
      {content ? (
        <StForm maxLength={70} rows={Math.ceil(content.length / 30)}>
          {content}
        </StForm>
      ) : (
        <StForm maxLength={70} rows={3}></StForm>
      )}
      <StButtonContainer>
        <button
          type="button"
          onClick={() => {
            setCreate(false);
            setEdit(false);
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
