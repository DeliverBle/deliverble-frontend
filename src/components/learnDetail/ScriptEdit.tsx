import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { useState } from 'react';

interface ScriptType {
  id: number;
  text: string;
  startTime: number;
  endTime: number;
}

interface ScriptEditProps {
  scripts: ScriptType[];
  isHighlight: boolean;
  isSpacing: boolean;
}

function ScriptEdit(props: ScriptEditProps) {
  const { scripts, isHighlight, isSpacing } = props;

  const handleClick = () => {
    const selection = window.getSelection(); // 커서의 위치를 알 수 있음
    const range = selection?.getRangeAt(0); // 커서의 startOffset과 endOffset을 갖고 있는 객체이다.
    const startIdx = range?.startOffset; // 커서의 시작인덱스
    // const endIdx = range?.endOffset; // 커서의 종료인덱스

    // 선택한 텍스트가 빈칸인지 확인하는 로직
    const selectedDiv = range?.startContainer as Node;
    const serializer = new XMLSerializer();
    const selectedLine = serializer.serializeToString(selectedDiv);

    const isLeftBlank = startIdx && selectedLine[startIdx - 1] === ' '; //왼쪽이 빈칸
    const isRightBlank = startIdx && selectedLine[startIdx] === ' '; //오른쪽이 빈칸
    const isValidate = isLeftBlank || isRightBlank; //빈칸인지 여부

    //클릭시 이벤트
    if (selection?.type === 'Caret' && isValidate && isSpacing) {
      const frag = document.createDocumentFragment();
      const div = document.createElement('div');
      isLeftBlank ? (div.innerHTML = '<span class=left >/</span>') : (div.innerHTML = '<span class=right >/</span>');
      while (div.firstChild) {
        frag.appendChild(div.firstChild);
      }
      range?.deleteContents();
      range?.insertNode(frag);
    }

    //드래깅 이벤트
    else if (selection?.type === 'Range' && isHighlight) {
      let text = selection.toString(); //드래깅 된 텍스트

      //하이라이트 표시 안에 '/'끊어 읽기 들어가 있을 때 예외처리
      if (text.includes('/')) {
        const texts = text.split('/'); // 끊어 읽기 문자 단위로 자르고 해당 텍스트를 배열로 만든 것
        const res = texts.join('<span>/</span>');
        console.log('res', res);
        text = res;
      }

      //선택된 텍스트를 태그안에 넣어주는 부분
      const frag = document.createDocumentFragment();
      const div = document.createElement('div');
      div.innerHTML = '<mark>' + text + '</mark>';
      while (div.firstChild) {
        frag.appendChild(div.firstChild);
      }
      range?.deleteContents();
      range?.insertNode(frag);
    }
  };

  return (
    <StWrapper
      contentEditable="true"
      onClick={handleClick}
      suppressContentEditableWarning={true}
      spellCheck="false"
      onCut={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      onKeyDown={(e) => e.preventDefault()}>
      {scripts.map(({ id, text }) => (
        <StScriptText key={id}>{text}</StScriptText>
      ))}
    </StWrapper>
  );
}

export default ScriptEdit;

const StWrapper = styled.div`
  cursor: pointer;
  :focus {
    outline: none;
  }
  caret-color: transparent;

  & > mark {
    background: linear-gradient(259.3deg, #d8d9ff 0%, #a7c5ff 100%);
  }

  position: relative;
`;

const StScriptText = styled.div`
  position: relative;
  font-size: 2.6rem;
  color: ${COLOR.BLACK};
  cursor: pointer;

  & > span {
    font-size: 3.2rem;
    font-weight: 600;
    color: #4e8aff;
  }

  & > .left {
    margin-right: 0.4rem;
  }

  & > .right {
    margin-left: 0.4rem;
  }

  & > mark {
    background: linear-gradient(259.3deg, #d8d9ff 0%, #a7c5ff 100%);

    & > span {
      font-size: 3.2rem;
      font-weight: 600;
      color: #4e8aff;
    }

    & > .left {
      margin-right: 0.4rem;
    }

    & > .right {
      margin-left: 0.4rem;
    }
  }
`;
