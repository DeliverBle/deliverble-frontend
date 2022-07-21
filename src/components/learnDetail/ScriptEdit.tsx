import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { COLOR } from '@src/styles/color';
import HighlightModal from './HighlightModal';

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
  const [highlightAlert, setHighlightAlert] = useState<boolean>(false);

  useEffect(() => {
    if (highlightAlert) {
      const now = new Date().getTime();
      const timeSaved = Number(localStorage.getItem('timeClicked'));
      if (timeSaved) {
        const gapHour = (now - timeSaved) / 1000 / 60 / 60;
        if (gapHour > 72) {
          setHighlightAlert(true);
        } else {
          setHighlightAlert(false);
        }
      } else {
        setHighlightAlert(true);
      }
    }
  }, [highlightAlert]);

  const handleClick = (e: any) => {
    console.log('아ㅣ이디값을 내놔라', e.target.id);
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    const startIdx = range?.startOffset;

    const selectedDiv = range?.startContainer as Node;
    const serializer = new XMLSerializer();
    const selectedLine = serializer.serializeToString(selectedDiv);

    const isLeftBlank = startIdx && selectedLine[startIdx - 1] === ' ';
    const isRightBlank = startIdx && selectedLine[startIdx] === ' ';
    const isValidate = isLeftBlank || isRightBlank;

    let isOverlap = false;
    if (selection?.type === 'Range') {
      //중복여부를 검사하자
      const marks = document.getElementsByTagName('mark'); //mark라는 태그를 모두 담은 html collection

      //marks를 돌면서 현재 셀렉션이 marks와 겹치는 애가 있는 지 확인
      for (let i = 0; i < marks.length; i++) {
        if (selection?.containsNode(marks[i], true) === true) {
          isOverlap = true;
          setHighlightAlert(true);
          break;
        }
      }
    }

    if (selection?.type === 'Caret' && isValidate && isSpacing) {
      const frag = document.createDocumentFragment();
      const div = document.createElement('div');
      isLeftBlank ? (div.innerHTML = '<span class=left >/</span>') : (div.innerHTML = '<span class=right >/</span>');
      while (div.firstChild) {
        frag.appendChild(div.firstChild);
      }
      range?.deleteContents();
      range?.insertNode(frag);
      handleClickIdx(selection);
    } else if (!isOverlap && selection?.type === 'Range' && isHighlight) {
      let text = selection.toString();

      if (text.includes('/')) {
        const texts = text.split('/');
        const res = texts.join('<span>/</span>');
        text = res;
      }

      if (!text.includes('\n')) {
        const frag = document.createDocumentFragment();
        const div = document.createElement('div');
        div.innerHTML = '<mark>' + text + '</mark>';
        while (div.firstChild) {
          frag.appendChild(div.firstChild);
        }
        range?.deleteContents();
        range?.insertNode(frag);
        handleHighlightIdx(selection); //하이라이트의 인덱스를 구하는 함수
      }
    }
    selection?.collapseToEnd();
  };

  const [currentLine, setCurrentLine] = useState<number>(); //현재 스크립트 아이디

  //끊어읽기 인덱스 구하기
  // 끊어읽기는 두가지 경우 존재 1.plain 텍스트 안에 있는 경우 2.하이라이트 안에 있는 경우
  //spacingIdx는 text로 접근해서 위치를 구해야해서 state를 사용했다.
  const [spacingIdx, setSpacingIdx] = useState<number[]>([]);

  useEffect(() => {
    //서버에서 받아온 인덱스와 비교 후 post하는 함수 들어갈 예정
    //currentLine이 겹쳐서 관련 조건 넣어주어야할듯
    console.log(spacingIdx, currentLine);
  }, [spacingIdx, currentLine]);

  const handleClickIdx = (selection: any) => {
    const range2 = selection?.getRangeAt(0);

    let textCount = 0;
    if (range2.commonAncestorContainer.nodeName === 'DIV') {
      const innertext = range2.commonAncestorContainer.innerText;
      const deleteMarks = innertext.split('/');

      for (let i = 0; i < deleteMarks.length - 1; i++) {
        textCount += deleteMarks[i].length;
        setSpacingIdx([...spacingIdx, textCount]);
      }
    } else if (range2.commonAncestorContainer.nodeName === 'MARK') {
      const innertext = range2.commonAncestorContainer.parentNode.innerText;
      const deleteMarks = innertext.split('/');

      for (let i = 0; i < deleteMarks.length - 1; i++) {
        textCount += deleteMarks[i].length;
        setSpacingIdx([...spacingIdx, textCount]);
      }
    }
  };

  //하이라이트 인덱스 구하기
  const [highlightStartIdx, setHighlightStartIdx] = useState<number>();
  const [highlightEndIdx, setHighlightEndIdx] = useState<number>();

  useEffect(() => {
    //서버에서 받아온 인덱스와 비교 후 post하는 함수 들어갈 예정
    //currentLine이 겹쳐서 관련 조건 넣어주어야할듯
    console.log(highlightStartIdx, highlightEndIdx, currentLine);
  }, [highlightStartIdx, highlightEndIdx, currentLine]);

  const handleHighlightIdx = (selection: any) => {
    const range2 = selection?.getRangeAt(0);

    //여기서 node가 children을 가지면 mark태그임.
    let textCount = 0;
    for (const node of range2.commonAncestorContainer.childNodes) {
      if (node.length) {
        textCount += node.length;
      }
      if (node.hasChildNodes()) {
        setHighlightStartIdx(textCount);
        textCount += node.childNodes[0].length;
        setHighlightEndIdx(textCount);
      }
    }
  };

  return (
    <>
      <StWrapper
        contentEditable="true"
        onClick={(e) => handleClick(e)}
        suppressContentEditableWarning={true}
        spellCheck="false"
        onCut={(e) => e.preventDefault()}
        onCopy={(e) => e.preventDefault()}
        onPaste={(e) => e.preventDefault()}
        onKeyDown={(e) => e.preventDefault()}>
        {scripts.map(({ id, text }) => (
          <StScriptText key={id} onClick={() => setCurrentLine(id)}>
            {text}
          </StScriptText>
        ))}
      </StWrapper>
      {highlightAlert && <HighlightModal closeModal={() => setHighlightAlert(false)} />}
    </>
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
`;

const StScriptText = styled.div`
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
