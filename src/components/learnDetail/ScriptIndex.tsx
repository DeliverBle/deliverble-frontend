import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';

interface ScriptIndexProps {
  isOne: boolean;
  currentIndex: number;
  clickedIndex: number;
  setClickedIndex: (index: number) => void;
  onIndexDelete: () => void;
}

function ScriptIndex(props: ScriptIndexProps) {
  const { isOne, currentIndex, clickedIndex, setClickedIndex, onIndexDelete } = props;
  return (
    <StScriptIndex onClick={() => setClickedIndex(currentIndex)} isClicked={currentIndex === clickedIndex}>
      스크립트 {currentIndex + 1}
      {!isOne && <StScriptDeleteButton onClick={onIndexDelete} />}
    </StScriptIndex>
  );
}

export default ScriptIndex;

const StScriptIndex = styled.div<{ isClicked: boolean }>`
  opacity: ${({ isClicked }) => (isClicked ? 1 : 0.6)};
  &:hover {
    opacity: 0.8;
  }

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 16.7rem;
  height: 4.8rem;
  padding: 1rem 2.4rem 1rem 1.6rem;
  border-radius: 1.6rem 1.6rem 0 0;
  background-color: ${COLOR.WHITE};
  color: ${COLOR.MAIN_BLUE};
  ${FONT_STYLES.B_20_BODY};
  cursor: pointer;
`;

const StScriptDeleteButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  padding: 0;
  background-image: url('/assets/icons/ic_script_delete_light.svg');
  &:hover,
  &:active {
    background-image: url('/assets/icons/ic_script_delete_dark.svg');
  }
`;
