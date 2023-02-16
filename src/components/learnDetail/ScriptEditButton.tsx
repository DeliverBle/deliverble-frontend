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
import { useRecoilValue } from 'recoil';
import { loginState } from '@src/stores/loginState';

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
  const login = useRecoilValue(loginState);
  const highlightButton = isHighlight !== undefined;
  const alt = highlightButton ? '하이라이트' : '끊어 읽기';

  const handleClick = () => {
    setIsHighlight(highlightButton ? !isHighlight : false);
    setIsSpacing(highlightButton ? false : !isSpacing);
    setHoveredChild(0);
  };

  return (
    <StButton
      aria-describedby="script-edit-tooltip"
      onClick={(e) => {
        e.stopPropagation();
        !login ? handleLoginModalOpen() : handleClick();
      }}>
      {isHighlight || isSpacing ? (
        <ImageDiv
          className="function-button"
          src={highlightButton ? icHighlighterClicked : icSpacingClicked}
          alt={alt}
        />
      ) : (
        <>
          <ImageDiv className="function-button" src={highlightButton ? icHighlighterHover : icSpacingHover} alt={alt} />
          <ImageDiv
            className="default function-button"
            src={highlightButton ? icHighlighterDefault : icSpacingDefault}
            alt={alt}
            onMouseOver={() => setHoveredChild(highlightButton ? 1 : 2)}
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
