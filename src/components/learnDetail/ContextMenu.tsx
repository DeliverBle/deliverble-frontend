import { INITIAL } from '@src/constants/learnDetail/memo';
import { COLOR, FONT_STYLES } from '@src/styles';
import { calcContextMenuPoint } from '@src/utils/contextMenu';
import { forwardRef, Ref } from 'react';
import styled, { css } from 'styled-components';

interface ContextMenuProps {
  clickedMemoId?: number;
  rightClickedElement: HTMLElement;
  isEditing: boolean;
  setIsContextMenuOpen: (open: boolean) => void;
  setClickedDeleteType: (type: string) => void;
  handleMemoState?: (e: React.MouseEvent) => void;
}

function ContextMenu(props: ContextMenuProps, ref: Ref<HTMLDivElement>) {
  const { clickedMemoId, rightClickedElement, isEditing, setIsContextMenuOpen, setClickedDeleteType, handleMemoState } =
    props;
  const { x, y } = calcContextMenuPoint(rightClickedElement);
  const clickedTag = rightClickedElement.tagName;

  const handleContextMenu = (e: React.MouseEvent, type: string) => {
    e.stopPropagation();
    setClickedDeleteType(type);
    setIsContextMenuOpen(false);
  };

  if (!clickedTag) return null;
  return (
    <StContextMenu top={y} left={x} clickedTag={clickedTag} isEditing={isEditing} ref={ref}>
      {clickedTag === 'MARK' && !isEditing && (
        <button type="button" onClick={handleMemoState}>
          {clickedMemoId !== INITIAL ? '메모 수정' : '메모 추가'}
        </button>
      )}
      <button type="button" onClick={(e) => handleContextMenu(e, clickedTag)}>
        {clickedTag === 'MARK' ? '하이라이트' : '끊어읽기'} 삭제
      </button>
    </StContextMenu>
  );
}

export default forwardRef(ContextMenu);

const StContextMenu = styled.div<{ top: number; left: number; clickedTag: string; isEditing: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;

  width: ${({ clickedTag, isEditing }) => (clickedTag === 'MARK' && !isEditing ? '14.4rem' : '14rem')};
  padding: 0.7rem 0;
  border: 0.1rem solid ${COLOR.GRAY_10};
  border-radius: 1.2rem;

  background-color: ${COLOR.WHITE};
  box-shadow: 0.4rem 0.4rem 2rem rgba(22, 15, 53, 0.15);
  z-index: 1;

  ${({ top, left }) => css`
    top: ${top / 10}rem;
    left: ${left / 10}rem;
  `}

  button {
    display: flex;
    justify-content: center;
    border-radius: 0.8rem;

    width: ${({ clickedTag, isEditing }) => (clickedTag === 'MARK' && !isEditing ? '13.2rem' : '13.2rem')};
    padding: 0.5rem 1.6rem;
    ${FONT_STYLES.SB_16_CAPTION}
    color: ${COLOR.BLACK};

    &:hover {
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      background-color: ${COLOR.GRAY_5};
    }
  }
`;
