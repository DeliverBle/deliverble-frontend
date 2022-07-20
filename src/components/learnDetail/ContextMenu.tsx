import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import styled, { css } from 'styled-components';

interface ContextMenuProps {
  points: {
    x: number;
    y: number;
  };
}

function ContextMenu(props: ContextMenuProps) {
  const { x, y } = props.points;

  return (
    <StContextMenu top={y} left={x} className="test">
      <ul>
        <li>메모 추가</li>
        <li>하이라이트 삭제</li>
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
  border: 1px solid ${COLOR.GRAY_10};
  background-color: ${COLOR.WHITE};
  box-shadow: 0.4rem 0.4rem 2rem rgba(22, 15, 53, 0.15);

  ${({ top, left }) => css`
    top: ${top}rem;
    left: ${left}rem;
  `}

  & > ul > li {
    display: flex;
    justify-content: center;

    width: 13.2rem;
    height: 3.2rem;
    padding: 0.5rem 1.6rem;

    border-radius: 0.8rem;
    ${FONT_STYLES.SB_16_CAPTION}
    color: ${COLOR.BLACK};
  }

  & > ul > li:hover {
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    background-color: ${COLOR.GRAY_5};
  }
`;
