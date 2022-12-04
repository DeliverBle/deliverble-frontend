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
  setMemoState: Dispatch<SetStateAction<MemoState>>;
  setIsContextMenuOpen: (open: boolean) => void;
}

function ContextMenu(props: ContextMenuProps) {
  const { contextMenuPoint, clickedMemoId, setMemoState, setIsContextMenuOpen } = props;
  const { x, y } = contextMenuPoint;

  const handleMemoState = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMemoState((prev: MemoState) =>
      clickedMemoId ? { ...prev, editMemoId: clickedMemoId } : { ...prev, newMemoId: 0 },
    );
    setIsContextMenuOpen(false);
  };

  return (
    <StContextMenu top={y} left={x}>
      <ul>
        <li>
          <button type="button" onClick={(e) => handleMemoState(e)}>
            {clickedMemoId ? '메모 수정' : '메모 추가'}
          </button>
        </li>
        <li>
          <button type="button">하이라이트 삭제</button>
        </li>
      </ul>
    </StContextMenu>
  );
}

export default ContextMenu;

const StContextMenu = styled.div<{ top: number; left: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  width: 14.4rem;
  height: 8rem;
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
    & > button {
      width: 13.2rem;
      height: 3.2rem;
      padding: 0.5rem 1.6rem;

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
