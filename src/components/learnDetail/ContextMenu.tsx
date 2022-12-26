import { MemoState } from '@src/pages/learn/[id]';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import React, { Dispatch, SetStateAction } from 'react';
import styled, { css } from 'styled-components';

interface ContextMenuProps {
  contextMenuPoint: {
    x: number;
    y: number;
  };
  clickedMemoId?: number;
  contextElementType: string;
  isEditing: boolean;
  setMemoState?: Dispatch<SetStateAction<MemoState>>;
  setIsContextMenuOpen: (open: boolean) => void;
  setDeletedType: (type: string) => void;
  setIsDeleteBtnClicked: (isDelete: boolean) => void;
}

function ContextMenu(props: ContextMenuProps) {
  const {
    contextMenuPoint,
    clickedMemoId,
    contextElementType,
    isEditing,
    setMemoState,
    setIsContextMenuOpen,
    setDeletedType,
    setIsDeleteBtnClicked,
  } = props;
  const { x, y } = contextMenuPoint;

  const handleMemoState = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (setMemoState) {
      setMemoState((prev: MemoState) =>
        clickedMemoId ? { ...prev, editMemoId: clickedMemoId } : { ...prev, newMemoId: 0 },
      );
    }
    setIsContextMenuOpen(false);
  };

  const handleHighlightDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteBtnClicked(true);
    setDeletedType('MARK');
    setIsContextMenuOpen(false);
  };

  const handleSpacingDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteBtnClicked(true);
    setDeletedType('SPAN');
    setIsContextMenuOpen(false);
  };

  return (
    <StContextMenu top={y} left={x} contextElementType={contextElementType} isEditing={isEditing}>
      {contextElementType === 'MARK' && !isEditing && (
        <ul>
          <li>
            <button type="button" onClick={(e) => handleMemoState(e)}>
              {clickedMemoId ? '메모 수정' : '메모 추가'}
            </button>
          </li>
          <li>
            <button type="button" onClick={(e) => handleHighlightDelete(e)}>
              하이라이트 삭제
            </button>
          </li>
        </ul>
      )}
      {contextElementType === 'MARK' && isEditing && (
        <ul>
          <li>
            <button type="button" onClick={(e) => handleHighlightDelete(e)}>
              하이라이트 삭제
            </button>
          </li>
        </ul>
      )}
      {contextElementType === 'SPAN' && (
        <ul>
          <li>
            <button type="button" onClick={(e) => handleSpacingDelete(e)}>
              끊어읽기 삭제
            </button>
          </li>
        </ul>
      )}
    </StContextMenu>
  );
}

export default ContextMenu;

const StContextMenu = styled.div<{ top: number; left: number; contextElementType: string; isEditing: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;

  ${({ contextElementType, isEditing }) =>
    contextElementType === 'MARK' && !isEditing
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
    ${({ contextElementType, isEditing }) =>
      contextElementType === 'MARK' && !isEditing
        ? css`
      & > button {
        width: 13.2rem;
        height: 3.2rem;
        padding: 0.5rem 1.6rem;
        `
        : css`
        & > button {
          width: 11.8rem;
          height: 3.2rem;
          `}

      ${FONT_STYLES.SB_16_CAPTION}
      color: ${COLOR.BLACK};
    }
  }

  & > ul > li:hover {
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    background-color: ${COLOR.GRAY_5};
  }
`;
