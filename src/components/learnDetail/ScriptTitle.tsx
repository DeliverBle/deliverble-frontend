import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { SCRIPT_TITLE_MAX_LENGTH } from '@src/utils/constant';

interface ScriptTitleProps {
  name: string;
  isOne: boolean;
  isScriptTitleInputVisible: boolean;
  currentScriptTitleIndex: number;
  clickedScriptTitleIndex: number;
  scriptTitleInputIndex: number;
  setIsScriptTitleInputVisible: (isScriptTitleInputVisible: boolean) => void;
  setClickedScriptTitleIndex: (index: number) => void;
  onScriptDelete: () => void;
  onScriptRename: (index: number) => void;
}

function ScriptTitle(props: ScriptTitleProps) {
  const {
    name,
    isOne,
    isScriptTitleInputVisible,
    setIsScriptTitleInputVisible,
    currentScriptTitleIndex,
    clickedScriptTitleIndex,
    scriptTitleInputIndex,
    setClickedScriptTitleIndex,
    onScriptDelete,
    onScriptRename,
  } = props;
  const [text, setText] = useState(name);
  const scriptTitleInputRef = useRef<HTMLInputElement>(null);
  const isEditing = isScriptTitleInputVisible && scriptTitleInputIndex === currentScriptTitleIndex;

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const eventTarget = e.target as HTMLInputElement;
      if (eventTarget.tagName !== 'INPUT') {
        setIsScriptTitleInputVisible(false);
      }
    };

    if (isScriptTitleInputVisible) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isScriptTitleInputVisible, setIsScriptTitleInputVisible]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length >= SCRIPT_TITLE_MAX_LENGTH) {
      value = value.substring(0, SCRIPT_TITLE_MAX_LENGTH);
    }
    setText(value);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const length = value.length;

    if (e.key === 'Enter' && length && length <= SCRIPT_TITLE_MAX_LENGTH) {
      // 엔터 눌렀을 때 value를 request body에 담아 patch
      setIsScriptTitleInputVisible(false);
    }
  };

  return (
    <StScriptTitle
      onClick={() => setClickedScriptTitleIndex(currentScriptTitleIndex)}
      onDoubleClick={() => onScriptRename(currentScriptTitleIndex)}
      onContextMenu={(e) => {
        e.preventDefault();
        onScriptRename(currentScriptTitleIndex);
      }}
      isClicked={currentScriptTitleIndex === clickedScriptTitleIndex}
      isEditing={isEditing}>
      {isEditing ? (
        <input ref={scriptTitleInputRef} value={text} onChange={handleInputChange} onKeyUp={handleKeyUp} />
      ) : (
        <div>{name}</div>
      )}
      {!isOne && <StScriptDeleteButton onClick={onScriptDelete} isEditing={isEditing} />}
    </StScriptTitle>
  );
}

export default ScriptTitle;

const StScriptTitle = styled.div<{ isClicked: boolean; isEditing: boolean }>`
  opacity: ${({ isClicked }) => (isClicked ? 1 : 0.6)};
  &:hover > div {
    opacity: 0.8;
  }

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 20.9rem;
  height: 4.8rem;
  padding: ${({ isEditing }) => (isEditing ? '0.6rem 0.8rem' : '1rem 1.2rem 1rem 2.4rem')};
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
    border: 0.2rem solid ${COLOR.MAIN_BLUE};
    border-radius: 0.4rem;
    padding: 0.4rem 0.8rem;
    ${FONT_STYLES.M_20_BODY};
  }
`;

const StScriptDeleteButton = styled.button<{ isEditing: boolean }>`
  display: ${({ isEditing }) => (isEditing ? 'none' : 'block')};
  width: 2.4rem;
  height: 2.4rem;
  padding: 0;
  background-image: url('/assets/icons/ic_script_delete_light.svg');
  &:hover,
  &:active {
    background-image: url('/assets/icons/ic_script_delete_dark.svg');
  }
`;
