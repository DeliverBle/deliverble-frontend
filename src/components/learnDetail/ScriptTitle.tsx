import { SCRIPT_TITLE_MAX_LENGTH } from '@src/constants/learnDetail';
import { COLOR, FONT_STYLES } from '@src/styles';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import styled from 'styled-components';

interface ScriptTitleProps {
  name: string;
  isOne: boolean;
  isClicked: boolean;
  isEditing: boolean;
  onTitleClick: () => void;
  onTitleDelete: () => void;
  onTitleChange: () => void;
  onTitleInputChange: () => void;
  onTitleRename: (name: string) => void;
}

function ScriptTitle(props: ScriptTitleProps) {
  const {
    name,
    isOne,
    isClicked,
    isEditing,
    onTitleClick,
    onTitleDelete,
    onTitleChange,
    onTitleInputChange,
    onTitleRename,
  } = props;
  const [text, setText] = useState(name);
  const scriptTitleInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.length >= SCRIPT_TITLE_MAX_LENGTH) {
      value = value.substring(0, SCRIPT_TITLE_MAX_LENGTH);
    }
    setText(value);
  };

  const changeName = () => {
    const length = text.length;
    if (length && length <= SCRIPT_TITLE_MAX_LENGTH) {
      onTitleRename(text);
      onTitleInputChange();
      return;
    }
    setText(name);
    onTitleInputChange();
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      changeName();
    }
  };

  return (
    <StScriptTitle
      isClicked={isClicked}
      isEditing={isEditing}
      onClick={onTitleClick}
      onDoubleClick={onTitleChange}
      onContextMenu={(e) => {
        e.preventDefault();
        onTitleChange();
      }}>
      {isEditing ? (
        <input
          ref={scriptTitleInputRef}
          value={text}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
          onBlur={changeName}
        />
      ) : (
        <div>{name}</div>
      )}
      {!isOne && <StScriptDeleteButton aria-label="스크립트 삭제" onClick={onTitleDelete} isEditing={isEditing} />}
    </StScriptTitle>
  );
}

export default ScriptTitle;

const StScriptTitle = styled.div<{ isClicked: boolean; isEditing: boolean }>`
  opacity: ${({ isClicked }) => (isClicked ? 1 : 0.6)};
  &:hover {
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
