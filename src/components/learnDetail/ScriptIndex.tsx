import styled, { css } from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { useState } from 'react';
import { SCRIPT_INDEX_MAX } from '@src/utils/constant';

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

  const handleInputChange = (e) => {
    let value = e.target.value;
    if (value.length >= SCRIPT_INDEX_MAX) {
      value = value.substr(0, SCRIPT_INDEX_MAX + 1);
    }
    setText(value);
  };

  const handleKeyUp = (e) => {
    const value = e.target.value;
    if (e.key === 'Enter' && value.length <= SCRIPT_INDEX_MAX) {
      // 엔터 눌렀을 때 value를 request body에 담아 patch
      setIsInputVisible(false);
    }
  };

  return (
    <StScriptIndex
      onClick={() => setClickedIndex(currentIndex)}
      onDoubleClick={() => onIndexRename(currentIndex)}
      onContextMenu={(e) => {
        e.preventDefault();
        onIndexRename(currentIndex);
      }}
      isClicked={currentIndex === clickedIndex}
      isMinError={text.length === 0}
      isMaxError={text.length >= 28}
      isInputVisible={isInputVisible && inputIndex === currentIndex}>
      {isInputVisible && inputIndex === currentIndex ? (
        <>
          <input value={text} onChange={handleInputChange} onKeyUp={handleKeyUp} />
          <p>최대 글자수를 초과했어요!</p>
        </>
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

const StScriptIndex = styled.div<{
  isClicked: boolean;
  isMinError: boolean;
  isMaxError: boolean;
  isInputVisible: boolean;
}>`
  opacity: ${({ isClicked }) => (isClicked ? 1 : 0.6)};
  &:hover > div {
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
  position: relative;

  & > div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  & > input {
    width: 100%;
    height: 3.5rem;
    border: 0.2rem solid ${({ isMinError, isMaxError }) => (isMinError || isMaxError ? COLOR.RED : COLOR.MAIN_BLUE)};
    border-radius: 0.4rem;
    padding: 0.4rem 0.8rem;
    ${FONT_STYLES.M_20_BODY};
  }

  ${({ isMaxError }) =>
    isMaxError
      ? css`
          & > p {
            position: absolute;
            top: 5.5rem;
            background: rgba(255, 79, 79, 0.2);
            color: ${COLOR.RED};
            width: 17.3rem;
            padding: 1rem;
            cursor: default;
            border-radius: 0.6rem;
            ${FONT_STYLES.SB_15_CAPTION}
          }

          & > p:after {
            position: absolute;
            bottom: 100%;
            left: 1.6rem;
            border: solid transparent;
            content: '';
            width: 0;
            height: 0;
            pointer-events: none;
            border-width: 0.8rem;
            border-bottom-color: rgba(255, 79, 79, 0.2);
          }
        `
      : css`
          & > p {
            display: none;
          }
        `}
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
