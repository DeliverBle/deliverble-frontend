import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { useState } from 'react';

interface ScriptIndexProps {
  isOne: boolean;
  isInputVisible: boolean;
  currentIndex: number;
  clickedIndex: number;
  inputIndex: number;
  setIsInputVisible: (isInputVisible: boolean) => void;
  setClickedIndex: (index: number) => void;
  onIndexDelete: () => void;
  onIndexRename: (index: number) => void;
}

function ScriptIndex(props: ScriptIndexProps) {
  const {
    isOne,
    isInputVisible,
    setIsInputVisible,
    currentIndex,
    clickedIndex,
    inputIndex,
    setClickedIndex,
    onIndexDelete,
    onIndexRename,
  } = props;
  const [text, setText] = useState(`스크립트 ${currentIndex + 1}`);

  return (
    <StScriptIndex
      onClick={() => setClickedIndex(currentIndex)}
      onDoubleClick={() => onIndexRename(currentIndex)}
      onContextMenu={(e) => {
        e.preventDefault();
        onIndexRename(currentIndex);
      }}
      isClicked={currentIndex === clickedIndex}
      isError={text.length === 0}
      isInputVisible={isInputVisible && inputIndex === currentIndex}>
      {isInputVisible && inputIndex === currentIndex ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              console.log(e.target.value);
              setIsInputVisible(false);
            }
          }}
        />
      ) : (
        <div>스크립트 {currentIndex + 1}</div>
      )}
      {!isOne && (
        <StScriptDeleteButton onClick={onIndexDelete} isInputVisible={isInputVisible && inputIndex === currentIndex} />
      )}
    </StScriptIndex>
  );
}

export default ScriptIndex;

const StScriptIndex = styled.div<{ isClicked: boolean; isError: boolean; isInputVisible: boolean }>`
  opacity: ${({ isClicked }) => (isClicked ? 1 : 0.6)};
  &:hover {
    opacity: 0.8;
  }

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 20.9rem;
  height: 4.8rem;
  padding: ${({ isInputVisible }) => (isInputVisible ? '0.6rem 0.8rem' : '1rem 1.2rem 1rem 2.4rem')};
  border-radius: 1.6rem 1.6rem 0 0;
  background-color: ${COLOR.WHITE};
  color: ${COLOR.MAIN_BLUE};
  ${FONT_STYLES.B_20_BODY};
  cursor: pointer;

  & > div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  & > input {
    width: 100%;
    height: 3.5rem;
    border: 0.2rem solid ${({ isError }) => (isError ? COLOR.RED : COLOR.MAIN_BLUE)};
    border-radius: 0.4rem;
    padding: 0.4rem 0.8rem;
    ${FONT_STYLES.M_20_BODY};
  }
`;

const StScriptDeleteButton = styled.button<{ isInputVisible: boolean }>`
  display: ${({ isInputVisible }) => (isInputVisible ? 'none' : 'block')};
  width: 2.4rem;
  height: 2.4rem;
  padding: 0;
  background-image: url('/assets/icons/ic_script_delete_light.svg');
  &:hover,
  &:active {
    background-image: url('/assets/icons/ic_script_delete_dark.svg');
  }
`;
