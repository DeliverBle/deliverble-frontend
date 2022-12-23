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
  clickedScriptTitleIndex: number;
}

function ScriptEdit(props: ScriptEditProps) {
  const { scriptsId, scripts, isHighlight, isSpacing, clickedScriptTitleIndex } = props;
  const [highlightAlert, setHighlightAlert] = useState<boolean>(false);
  const [firstLineId, setFirstLineId] = useState<number>();
  const [order, setOrder] = useState<number>();
  const [text, setText] = useState<string>();
  const learnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      if (order && text && scriptsId) {
        await api.learnDetailService.postSentenceData(
          {
            order,
            text,
          },
          scriptsId,
          clickedScriptTitleIndex,
        );
      }
    })();
  }, [order, text, scriptsId, clickedScriptTitleIndex]);

  useEffect(() => {
    setFirstLineId(scripts[0].id);
  }, [firstLineId, scripts]);

  const findLineOrder = (currentLineId: number) => {
    if (currentLineId && firstLineId) {
      const order = currentLineId - firstLineId + 1;
      setOrder(order);
    }
  };

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

  const handleClick = (e: React.MouseEvent) => {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    const startIndex = range?.startOffset;

    const selectedDiv = range?.startContainer as Node;
    const serializer = new XMLSerializer();
    const selectedLine = serializer.serializeToString(selectedDiv);

    const isLeftBlank = startIndex && selectedLine[startIndex - 1] === ' ';
    const isRightBlank = startIndex && selectedLine[startIndex] === ' ';
    const isValidate = isLeftBlank || isRightBlank;

    let isOverlap = false;
    if (selection?.type === 'Range' && isHighlight) {
      const markList = document.getElementsByTagName('mark');
      for (let i = 0; i < markList.length; i++) {
        if (selection?.containsNode(markList[i], true) === true) {
          isOverlap = true;
          setHighlightAlert(true);
          break;
        }
      }
    }

    if (selection?.type === 'Caret' && isValidate && isSpacing) {
      const fragment = document.createDocumentFragment();
      const div = document.createElement('div');
      const uniqueId = e.clientX + '.' + e.clientY + '.' + selection.anchorOffset;
      isLeftBlank
        ? (div.innerHTML = `<span id=${uniqueId}>/</span>`)
        : (div.innerHTML = `<span id=${uniqueId}>/</span>`);

      while (div.firstChild) {
        fragment.appendChild(div.firstChild);
      }
      range?.insertNode(fragment);
    } else if (!isOverlap && selection?.type === 'Range' && isHighlight) {
      let text = selection.toString();

      if (text.includes('\n')) {
        selection?.collapseToEnd();
        return;
      }

      // 끊어읽기 위에 하이라이팅이 될 때
      if (text.includes('/')) {
        const spanIdList = [];
        let textList = [];
        let htmlText = '';
        textList = text.split('/');
        if (range?.commonAncestorContainer) {
          for (let i = 0; i < range?.commonAncestorContainer?.childNodes?.length; i++) {
            const childNodeItem = range?.commonAncestorContainer.childNodes[i];
            if (childNodeItem.nodeName == 'SPAN') {
              spanIdList.push(`<span id=${childNodeItem.firstChild?.parentElement?.id}>/</span>`);
            }
          }
        }
        for (let i = 0; i < textList.length - 1; i++) {
          htmlText += textList[i] + spanIdList[i];
        }
        htmlText += textList[textList.length - 1];
        text = htmlText;
      }
      const fragment = document.createDocumentFragment();
      const div = document.createElement('div');
      const uniqueId = e.clientX + '.' + e.clientY + '.' + selection.anchorOffset; // id에 넣을 값
      div.innerHTML = `<mark id=${uniqueId}>${text}</mark>`;
      while (div.firstChild) {
        fragment.appendChild(div.firstChild);
      }
      range?.deleteContents();
      range?.insertNode(fragment);
    }
    selection?.collapseToEnd();

    nodeToText(selection?.anchorNode);
  };

  let isHighlightOverSpacing = false;
  const nodeToText = (anchorNode: Node | null | undefined) => {
    let textValue = '';
    if (anchorNode?.nodeName === 'MARK') {
      nodeToText(anchorNode.parentNode);
      isHighlightOverSpacing = true;
      return;
    }

    isHighlightOverSpacing = false;
    if (!isHighlightOverSpacing && anchorNode?.childNodes) {
      for (let i = 0; i < anchorNode?.childNodes.length; i++) {
        const childNodeItem = anchorNode?.childNodes[i];
        const elementId = childNodeItem.firstChild?.parentElement?.id;
        switch (childNodeItem.nodeName) {
          case '#text':
            textValue += childNodeItem.nodeValue;
            break;
          case 'MARK':
            if (childNodeItem.textContent?.includes('/')) {
              const markInnerHTML = childNodeItem.firstChild?.parentElement?.innerHTML;
              textValue += `<mark id=${elementId}>${markInnerHTML}</mark>`;
            } else {
              textValue += `<mark id=${elementId}>${childNodeItem.textContent}</mark>`;
            }
            break;
          case 'SPAN':
            textValue += `<span id=${elementId}>/</span>`;
            break;
        }
      }
      setText(textValue);
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
