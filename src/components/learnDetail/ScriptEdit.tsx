import { useEffect, useRef, useState } from 'react';
import { Script } from '@src/services/api/types/learn-detail';
import HighlightModal from './HighlightModal';
import styled from 'styled-components';
import { COLOR } from '@src/styles/color';

interface ScriptEditProps {
  scripts: Script[];
  isHighlight: boolean;
  isSpacing: boolean;
}

function ScriptEdit(props: ScriptEditProps) {
  const { scripts, isHighlight, isSpacing } = props;
  const [highlightAlert, setHighlightAlert] = useState<boolean>(false);
  const learnRef = useRef<HTMLDivElement>(null);

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

  const HighlightData = [
    {
      scriptId: 6,
      highlightId: 8,
      startingIndex: 0,
      endingIndex: 3,
    },
    {
      scriptId: 7,
      highlightId: 1,
      startingIndex: 11,
      endingIndex: 58,
    },
    {
      scriptId: 8,
      highlightId: 3,
      startingIndex: 0,
      endingIndex: 3,
    },
  ];

  // 객체들을 내가 뽑기 좋은 형태로 바꾸는 것
  function groupBy(objectArray: any[], property: string) {
    return objectArray.reduce(function (acc, obj) {
      const key = obj[property]; // 스크립트 아이디의 값을 키로 선언
      // 만약 지금 키가 없으면
      if (!acc[key]) {
        // 키에 대한 배열을 생성함
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  const scriptsIdNum = scripts.map((item) => {
    return item.id;
  });

  const hlGroupedById = groupBy(HighlightData, 'scriptId');

  // 하이라이트 get
  useEffect(() => {
    const hlKeys = Object.keys(hlGroupedById);

    for (let i = 0; i < hlKeys.length; i++) {
      const hlKey = hlKeys[i];
      const value = hlGroupedById[hlKey];
      const hlStartIndexArr = [];
      const hlEndIndexArr = [];
      const hlIdArr = [];

      for (let j = 0; j < value.length; j++) {
        hlStartIndexArr.push(value[j].startingIndex);
        hlEndIndexArr.push(value[j].endingIndex);
        hlIdArr.push(value[j].highlightId);
      }

      // 현재 내가 바꿔야 하는 문장이 몇 번째 childNode인지 알아야 함.
      // How? 지금 받아온 scriptsIdNum 돌면서 +keys[i]와 같은 친구가 몇 번째 넘버인지 확인
      let nodeNum = 0;
      scriptsIdNum.map((item, index) => {
        if (item === +hlKeys[i]) {
          nodeNum = index;
        }
      });

      // 받아온 스크립트 아이디에 해당하는 노드에 접근해서 하이라이트 넣어주는 것
      const currentNode = learnRef.current?.childNodes[nodeNum];
      if (learnRef.current?.childNodes) {
        let count = 0;
        let tempText = '';
        if (currentNode?.textContent) {
          for (let j = 0; j < currentNode.textContent?.length; j++) {
            if (hlStartIndexArr[count] === j) {
              tempText += '<mark id=' + hlIdArr[count] + '>' + currentNode.textContent[j];
            } else if (hlEndIndexArr[count] === j) {
              tempText += currentNode.textContent[j] + '</mark>';
              count++;
            } else {
              tempText += currentNode.textContent[j];
            }
          }
        }

        // HTML로 파싱
        const frag = document.createDocumentFragment();
        const div = document.createElement('div');
        div.innerHTML = tempText;
        while (div.firstChild) {
          frag.appendChild(div.firstChild);
        }
        if (currentNode?.textContent) {
          currentNode.textContent = '';
        }
        currentNode?.appendChild(frag);
      }
    }
  }, [scripts]);

  const handleClick = () => {
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
      // 중복 여부 검사
      const marks = document.getElementsByTagName('mark'); //mark라는 태그를 모두 담은 html collection

      // marks를 돌면서 현재 셀렉션 중 marks와 겹치는 것이 있는지 확인
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
        handleHighlightIdx(selection); // 하이라이트의 인덱스를 구하는 함수
      }
    }
    selection?.collapseToEnd();
  };

  const [currentLine, setCurrentLine] = useState<number>(); // 현재 스크립트 아이디

  // 끊어 읽기 인덱스 구하기
  // 끊어 읽기는 두가지 경우 존재 1.plain 텍스트 안에 있는 경우 2.하이라이트 안에 있는 경우
  // spacingIdx는 text로 접근해서 위치를 구해야 해서 state를 사용
  const [spacingIdx, setSpacingIdx] = useState<number[]>([]);

  useEffect(() => {
    // 서버에서 받아온 인덱스와 비교 후 post하는 함수 들어갈 예정
    // currentLine이 겹쳐서 관련 조건 넣어주어야할듯
    console.log(spacingIdx, currentLine);
  }, [spacingIdx, currentLine]);

  const handleClickIdx = (selection: Selection | null) => {
    const range2 = selection?.getRangeAt(0);

    let textCount = 0;
    if (range2?.commonAncestorContainer.nodeName === 'DIV') {
      const innertext = range2?.commonAncestorContainer.textContent;
      const deleteMarks = innertext?.split('/');
      if (deleteMarks) {
        for (let i = 0; i < deleteMarks.length - 1; i++) {
          textCount += deleteMarks[i].length;
          setSpacingIdx([...spacingIdx, textCount]);
        }
      }
    } else if (range2?.commonAncestorContainer.nodeName === 'MARK') {
      const innertext = range2.commonAncestorContainer.parentNode?.textContent;
      const deleteMarks = innertext?.split('/');

      if (deleteMarks) {
        for (let i = 0; i < deleteMarks.length - 1; i++) {
          textCount += deleteMarks[i].length;
          setSpacingIdx([...spacingIdx, textCount]);
        }
      }
    }
  };

  // 하이라이트 인덱스 구하기
  const [highlightStartIdx, setHighlightStartIdx] = useState<number>();
  const [highlightEndIdx, setHighlightEndIdx] = useState<number>();

  useEffect(() => {
    // 서버에서 받아온 인덱스와 비교 후 post하는 함수 들어갈 예정
    // currentLine이 겹쳐서 관련 조건 넣어주어야 할 듯
    console.log(highlightStartIdx, highlightEndIdx, currentLine);
  }, [highlightStartIdx, highlightEndIdx, currentLine]);

  const handleHighlightIdx = (selection: Selection | null) => {
    const range2 = selection?.getRangeAt(0);

    // 여기서 node가 children을 가지면 mark 태그
    let textCount = 0;
    if (range2?.commonAncestorContainer) {
      if (range2?.commonAncestorContainer?.childNodes) {
        for (let i = 0; i < range2.commonAncestorContainer.childNodes.length; i++) {
          const node = range2.commonAncestorContainer.childNodes[i];
          if (node.textContent?.length) {
            textCount += node.textContent.length;
          }
          if (node.hasChildNodes()) {
            // 하이라이트 발견 시작
            setHighlightStartIdx(textCount);
            if (node.childNodes[0].textContent?.length) {
              textCount += node.childNodes[0].textContent?.length;
            }
            setHighlightEndIdx(textCount);
          }
        }
      }
    }
  };

  return (
    <>
      <StWrapper
        contentEditable="true"
        onClick={handleClick}
        suppressContentEditableWarning={true}
        spellCheck="false"
        onCut={(e) => e.preventDefault()}
        onCopy={(e) => e.preventDefault()}
        onPaste={(e) => e.preventDefault()}
        onKeyDown={(e) => e.preventDefault()}
        ref={learnRef}>
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
  position: relative;
  caret-color: transparent;
  cursor: pointer;

  :focus {
    outline: none;
  }

  & > mark {
    background: linear-gradient(259.3deg, #d8d9ff 0%, #a7c5ff 100%);
  }
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
      color: ${COLOR.MAIN_BLUE};
    }

    & > .left {
      margin-right: 0.4rem;
    }

    & > .right {
      margin-left: 0.4rem;
    }
  }
`;
