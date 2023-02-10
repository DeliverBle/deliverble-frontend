import { MemoState } from '@src/pages/learn/[id]';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { calcContextMenuPoint } from '@src/utils/contextMenu';
import React, { Dispatch, SetStateAction } from 'react';
import styled, { css } from 'styled-components';

interface ContextMenuProps {
  clickedMemoId?: number;
  rightClickedElement: HTMLElement;
  isEditing: boolean;
  setMemoState?: Dispatch<SetStateAction<MemoState>>;
  setIsContextMenuOpen: (open: boolean) => void;
  setDeletedType: (type: string) => void;
  setIsDeleteBtnClicked: (isDelete: boolean) => void;
}

function ContextMenu(props: ContextMenuProps) {
  const {
    clickedMemoId,
    rightClickedElement,
    isEditing,
    setMemoState,
    setIsContextMenuOpen,
    setDeletedType,
    setIsDeleteBtnClicked,
  } = props;
  const { x, y } = calcContextMenuPoint(rightClickedElement);
  const clickedTag = rightClickedElement.tagName;

  const handleMemoState = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (setMemoState) {
      setMemoState((prev: MemoState) =>
        clickedMemoId ? { ...prev, editMemoId: clickedMemoId } : { ...prev, newMemoId: 0 },
      );
    }
    setIsContextMenuOpen(false);
  };

  const handleContextMenu = (e: React.MouseEvent, type: string) => {
    e.stopPropagation();
    setIsDeleteBtnClicked(true);
    setDeletedType(type);
    setIsContextMenuOpen(false);
  };

  if (!clickedTag) return null;

  return (
    <StContextMenu top={y} left={x} clickedTag={clickedTag} isEditing={isEditing}>
      <ul>
        {clickedTag === 'MARK' && !isEditing && (
          <li>
            <button type="button" onClick={(e) => handleMemoState(e)}>
              {clickedMemoId ? '메모 수정' : '메모 추가'}
            </button>
          </li>
        )}
        <li>
          <button type="button" onClick={(e) => handleContextMenu(e, clickedTag)}>
            {clickedTag === 'MARK' ? '하이라이트' : '끊어읽기'} 삭제
          </button>
        </li>
      </ul>
    </StContextMenu>
  );
}

export default ContextMenu;

const StContextMenu = styled.div<{ top: number; left: number; clickedTag: string; isEditing: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;

  ${({ clickedTag, isEditing }) =>
    clickedTag === 'MARK' && !isEditing
      ? css`
          width: 14.4rem;
          height: 8rem;
        `
      : css`
          width: 13rem;
          height: 4.4rem;
        `}

  z-index: 1;

  border-radius: 1.2rem;
  border: 0.1rem solid ${COLOR.GRAY_10};
  background-color: ${COLOR.WHITE};
  box-shadow: 0.4rem 0.4rem 2rem rgba(22, 15, 53, 0.15);

  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}

  & > ul > li {
    display: flex;
    justify-content: center;
    border-radius: 0.8rem;

    ${({ clickedTag, isEditing }) =>
      clickedTag === 'MARK' && !isEditing
        ? css`
            & > button {
              width: 13.2rem;
              height: 3.2rem;
              padding: 0.5rem 1.6rem;
            }
          `
        : css`
            & > button {
              width: 11.8rem;
              height: 3.2rem;
            }
          `}

    & > button {
      ${FONT_STYLES.SB_16_CAPTION}
      color: ${COLOR.BLACK};
    }
  }

  & > ul > li:hover {
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    background-color: ${COLOR.GRAY_5};
  }
`;
