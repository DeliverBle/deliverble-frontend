import { StContextMenu } from './style';

interface ContextMenuProps {
  points: {
    x: number;
    y: number;
  };
  setIsNewMemo: (create: boolean) => void;
}

function ContextMenu(props: ContextMenuProps) {
  const { points, setIsNewMemo } = props;

  return (
    <StContextMenu top={points.y} left={points.x} className="test">
      <ul>
        <li>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsNewMemo(true);
            }}>
            메모 추가
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
