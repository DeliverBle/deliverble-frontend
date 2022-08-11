import { StMemoPopup } from './style';

interface MemoPopupProps {
  edit: () => void;
}

function MemoPopup(props: MemoPopupProps) {
  const { edit } = props;

  return (
    <>
      <StMemoPopup>
        <button type="button" onClick={edit}>
          메모 수정
        </button>
        <button type="button">메모 삭제</button>
      </StMemoPopup>
    </>
  );
}

export default MemoPopup;
