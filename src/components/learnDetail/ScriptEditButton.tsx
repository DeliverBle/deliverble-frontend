import ImageDiv from '@src/components/common/ImageDiv';
import styled from 'styled-components';
import {
  icHighlighterClicked,
  icHighlighterDefault,
  icHighlighterHover,
  icSpacingClicked,
  icSpacingDefault,
  icSpacingHover,
} from 'public/assets/icons';

interface ScriptEditButtonProps {
  handleLoginModalOpen: () => void;
  isHighlight?: boolean;
  isSpacing?: boolean;
  setIsHighlight: (isHighlight: boolean) => void;
  setIsSpacing: (isSpacing: boolean) => void;
  setHoveredChild: (child: number) => void;
}

function ScriptEditButton(props: ScriptEditButtonProps) {
  const { handleLoginModalOpen, isHighlight, isSpacing, setIsHighlight, setIsSpacing, setHoveredChild } = props;
  const getLoginStatus = () => localStorage.getItem('token') ?? '';
  const type = isHighlight !== undefined ? 'highlight' : 'spacing';
  const icClicked = isHighlight !== undefined ? icHighlighterClicked : icSpacingClicked;
  const icDefault = isHighlight !== undefined ? icHighlighterDefault : icSpacingDefault;
  const icHover = isHighlight !== undefined ? icHighlighterHover : icSpacingHover;

  const handleClick = () => {
    if (isHighlight !== undefined) {
      setIsHighlight(isHighlight ? false : true);
      setIsSpacing(false);
    } else {
      setIsSpacing(isSpacing ? false : true);
      setIsHighlight(false);
    }
    setHoveredChild(0);
  };

  return (
    <StButton
      aria-describedby={`${type}-tooltip`}
      onClick={(e) => {
        e.stopPropagation();
        if (getLoginStatus() === '') {
          handleLoginModalOpen();
        } else {
          handleClick();
        }
      }}>
      {isHighlight || isSpacing ? (
        <ImageDiv className="function-button" src={icClicked} alt={type} />
      ) : (
        <>
          <ImageDiv className="function-button" src={icHover} alt={type} />
          <ImageDiv
            className="default function-button"
            src={icDefault}
            alt={type}
            onMouseOver={() => setHoveredChild(isHighlight !== undefined ? 1 : 2)}
            onMouseOut={(e) => {
              e.stopPropagation();
              setHoveredChild(0);
            }}
          />
        </>
      )}
    </StButton>
  );
}

export default ScriptEditButton;

const StButton = styled.button`
  width: 4.8rem;
  height: 4.8rem;

  &:hover .default img {
    transition: opacity 0.3s;
    opacity: 0;
  }

  .function-button {
    cursor: pointer;
    position: absolute;
    top: 0;
  }
`;
