import { MemoData } from '@src/types/learnDetail/remote';
import { COLOR, FONT_STYLES } from '@src/styles';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { MemoState, MemoConfirmModalKey } from '@src/types/learnDetail';

interface MemoDropdownProps {
  memoData: MemoData;
  setMemoState: Dispatch<SetStateAction<MemoState>>;
  onMemoModal: (type: MemoConfirmModalKey) => void;
}

function MemoDropdown(props: MemoDropdownProps) {
  const { memoData, setMemoState, onMemoModal } = props;
  const { id } = memoData;

  const handleClickEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    id && setMemoState((prev: MemoState) => ({ ...prev, editMemoId: id }));
  };

  const handleClickDelete = () => {
    id && setMemoState((prev: MemoState) => ({ ...prev, deleteMemoId: id }));
    onMemoModal('delete');
  };

  return (
    <StMemoDropdown>
      <button aria-label="메모 수정" type="button" onClick={handleClickEdit}>
        메모 수정
      </button>
      <button aria-label="메모 삭제" type="button" onClick={handleClickDelete}>
        메모 삭제
      </button>
    </StMemoDropdown>
  );
}

export default MemoDropdown;

const StMemoDropdown = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 4.8rem;
  right: 0;
  z-index: 100;

  width: 10.3rem;
  height: 8rem;

  border: 0.1rem solid ${COLOR.GRAY_10};
  border-radius: 1.2rem;
  background-color: ${COLOR.WHITE};
  box-shadow: 0.4rem 0.4rem 2rem rgba(22, 15, 53, 0.15);

  & > button {
    width: 9.1rem;
    height: 3.2rem;

    border-radius: 0.8rem;
    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_16_CAPTION};
  }

  & > button:hover {
    transition: background-color 0.3s ease-in-out;
    background-color: ${COLOR.GRAY_5};
  }
`;
