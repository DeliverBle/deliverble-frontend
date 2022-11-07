import { useEffect, useRef, useState } from 'react';
import { Script } from '@src/services/api/types/learn-detail';
import HighlightModal from './HighlightModal';
import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { api } from '@src/services/api';
interface ScriptEditProps {
  scriptsId: number;
  scripts: Script[];
  isHighlight: boolean;
  isSpacing: boolean;
}

function ScriptEdit(props: ScriptEditProps) {
  const { scriptsId, scripts, isHighlight, isSpacing } = props;
  const [highlightAlert, setHighlightAlert] = useState<boolean>(false);
  const [firstLineId, setFirstLineId] = useState<number>(); // 첫번째 줄의 id값
  const [order, setOrder] = useState<number>();
  const learnRef = useRef<HTMLDivElement>(null);

  //첫번째 라인의 id를 저장하는 코드
  useEffect(() => {
    setFirstLineId(scripts[0].id);
  }, [firstLineId, scripts]);

  useEffect(() => {
    if (highlightAlert) {
      const now = new Date().getTime();
      const timeSaved = Number(localStorage.getItem('timeClicked'));
      if (timeSaved) {
        const gapHour = (now - timeSaved) / 1000 / 60 / 60;
        if (gapHour < 72) {
          setHighlightAlert(false);
        }
      }
    }
  }, [highlightAlert]);

  const handleClick = () => {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    const startIdx = range?.startOffset;

    const selectedDiv = range?.startContainer as Node;
    const serializer = new XMLSerializer();
    const selectedLine = serializer.serializeToString(selectedDiv);

    //빈칸인 지 빈칸의 왼쪽, 오른쪽 탐지 해서 중간 위치하도록
    const isLeftBlank = startIdx && selectedLine[startIdx - 1] === ' ';
    const isRightBlank = startIdx && selectedLine[startIdx] === ' ';
    const isValidate = isLeftBlank || isRightBlank;

    //하이라이트 중복 검사
    let isOverlap = false;
    if (selection?.type === 'Range') {
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

    //끊어읽기 표시
    if (selection?.type === 'Caret' && isValidate && isSpacing) {
      const frag = document.createDocumentFragment();
      const div = document.createElement('div');
      isLeftBlank ? (div.innerHTML = '<span class=left >/</span>') : (div.innerHTML = '<span class=right >/</span>');

      while (div.firstChild) {
        frag.appendChild(div.firstChild);
      }
      range?.insertNode(frag);
    } else if (!isOverlap && selection?.type === 'Range' && isHighlight) {
      //하이라이트 표시
      let text = selection.toString();

      //문장간 하이라이팅의 경우 조기 return
      if (text.includes('\n')) {
        selection?.collapseToEnd();
        return;
      }

      //하이라이트 중간에 끊어읽기 표시 들어가있으면 span 넣은걸로 대체하기
      if (text.includes('/')) {
        const texts = text.split('/');
        text = texts.join('<span>/</span>');
      }

      const frag = document.createDocumentFragment();
      const div = document.createElement('div');
      div.innerHTML = '<mark>' + text + '</mark>';
      while (div.firstChild) {
        frag.appendChild(div.firstChild);
      }
      range?.deleteContents();
      range?.insertNode(frag);
    }
    selection?.collapseToEnd();

    nodeToText(selection?.anchorNode);
  };

  const findLineOrder = (currentLineId: number | undefined) => {
    if (currentLineId && firstLineId) {
      const order = currentLineId - firstLineId + 1;
      setOrder(order);
    }
  };

  let isHiglightOverSpacing = false;

  const [resText, setResText] = useState<string>();
  //수정된 html을 text로 직렬화 하는 함수
  const nodeToText = (anchorNode: Node | null | undefined) => {
    let textVal = '';
    if (anchorNode?.nodeName === 'MARK') {
      nodeToText(anchorNode.parentNode);
      isHiglightOverSpacing = true;
      return;
    }

    isHiglightOverSpacing = false;

    if (!isHiglightOverSpacing && anchorNode?.childNodes) {
      for (let i = 0; i < anchorNode?.childNodes.length; i++) {
        switch (anchorNode?.childNodes[i].nodeName) {
          case '#text':
            textVal += anchorNode?.childNodes[i].nodeValue;
            break;

          case 'MARK':
            if (anchorNode?.childNodes[i].textContent?.includes('/')) {
              let text = anchorNode?.childNodes[i].textContent;
              if (text) {
                const texts = text.split('/');
                text = texts.join('<span>/</span>');
              }
              textVal += '<mark>' + text + '</mark>';
            } else {
              textVal += '<mark>' + anchorNode?.childNodes[i].textContent + '</mark>';
            }
            break;

          case 'SPAN':
            textVal += '<span>/</span>';
            break;
          default:
        }
      }
      setResText(textVal);
    }
  };

  //다음 작업 전 임시 콘솔
  useEffect(() => {
    (async () => {
      if (order && resText && scriptsId) {
        await api.learnDetailService.postSentenceData(
          {
            order: order,
            text: resText,
          },
          scriptsId,
        );
      }
    })();
  }, [order, resText, scriptsId]);

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
          <StScriptText
            key={id}
            onClick={() => findLineOrder(id)}
            dangerouslySetInnerHTML={{ __html: text }}></StScriptText>
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
