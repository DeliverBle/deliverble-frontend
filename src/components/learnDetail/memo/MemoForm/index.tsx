import { icCheckButton, icMemoXButton } from 'public/assets/icons';
import ImageDiv from '../../../common/ImageDiv';
import { StButtonContainer, StForm } from './style';

interface MemoFormProps {
  content?: string;
  setIsNewMemo: (isNewMemo: boolean) => void;
  setEdit: (edit: boolean) => void;
}

function MemoForm(props: MemoFormProps) {
  const { setIsNewMemo, content } = props;

  return (
    <>
      {content ? (
        <StForm maxLength={70} rows={Math.ceil(content.length / 30)}>
          {content}
        </StForm>
      ) : (
        <StForm maxLength={70} rows={3} autoFocus></StForm>
      )}
      <StButtonContainer>
        <button type="button" onClick={() => setIsNewMemo(false)}>
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
