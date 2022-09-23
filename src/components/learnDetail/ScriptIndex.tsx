import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';

interface ScriptIndexProps {
  isOne: boolean;
  isInputVisible: boolean;
  currentIndex: number;
  clickedIndex: number;
  inputIndex: number;
  setClickedIndex: (index: number) => void;
  onIndexDelete: () => void;
  onIndexRename: (index: number) => void;
}

function ScriptIndex(props: ScriptIndexProps) {
  const {
    isOne,
    isInputVisible,
    currentIndex,
    clickedIndex,
    inputIndex,
    setClickedIndex,
    onIndexDelete,
    onIndexRename,
  } = props;
  return (
    <StScriptIndex
      onClick={() => setClickedIndex(currentIndex)}
      onDoubleClick={() => onIndexRename(currentIndex)}
      onContextMenu={(e) => {
        e.preventDefault();
        onIndexRename(currentIndex);
      }}
      isClicked={currentIndex === clickedIndex}
      isInputVisible={isInputVisible && inputIndex === currentIndex}>
      {isInputVisible && inputIndex === currentIndex && inputIndex === clickedIndex ? (
        <input value={`스크립트 ${currentIndex + 1}`} />
      ) : (
        <div>스크립트 {currentIndex + 1}</div>
      )}
      {!isOne && !isInputVisible && <StScriptDeleteButton onClick={onIndexDelete} />}
    </StScriptIndex>
  );
}

export default ScriptIndex;

const StScriptIndex = styled.div<{ isClicked: boolean; isInputVisible: boolean }>`
  opacity: ${({ isClicked }) => (isClicked ? 1 : 0.6)};
  &:hover {
    opacity: 0.8;
  }

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 16.7rem;
  height: 4.8rem;
  padding: ${({ isInputVisible }) => (isInputVisible ? '0.7rem 0.8rem 0.6rem 0.7rem' : '1rem 2.4rem 1rem 1.6rem')};
  border-radius: 1.6rem 1.6rem 0 0;
  background-color: ${COLOR.WHITE};
  color: ${COLOR.MAIN_BLUE};
  ${FONT_STYLES.B_20_BODY};
  cursor: pointer;

  & > input {
    width: 15.1rem;
    height: 3.5rem;
    border: 0.2rem solid ${COLOR.MAIN_BLUE};
    border-radius: 0.4rem;
    padding: 0.3rem 0.8rem 0.4rem 0.8rem;
    ${FONT_STYLES.M_20_BODY};
  }
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
