import { HighlightModal } from '@src/components/learnDetail/modal';
import { VideoData } from '@src/types/learnDetail/remote';
import { COLOR } from '@src/styles';
import { Dispatch, MouseEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface ScriptEditProps {
  videoData: VideoData;
  isHighlight: boolean;
  isSpacing: boolean;
  handleRightClick: (e: MouseEvent, scriptId: number, order: number) => void;
  setOrder: Dispatch<SetStateAction<number | undefined>>;
  nodeToText: (anchorNode: Node | null | undefined) => void;
}

function ScriptEdit(props: ScriptEditProps) {
  const { isHighlight, isSpacing, handleRightClick, videoData, setOrder, nodeToText } = props;
  const [highlightAlert, setHighlightAlert] = useState<boolean>(false);
  const learnRef = useRef<HTMLDivElement>(null);

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

    const selectedDiv = range?.startContainer as HTMLElement;
    const serializer = new XMLSerializer();
    let selectedLine = serializer.serializeToString(selectedDiv);

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
      const blankIndex = isLeftBlank ? startIndex - 1 : startIndex;

      selectedLine =
        selectedLine.substring(0, blankIndex) +
        `<span id=${uniqueId}>/</span>` +
        selectedLine.substring(blankIndex + 1);

      div.innerHTML = selectedLine;
      while (div.firstChild) {
        fragment.appendChild(div.firstChild);
      }
      range.selectNode(range?.startContainer);
      range?.deleteContents();
      range?.insertNode(fragment);
    } else if (!isOverlap && selection?.type === 'Range' && isHighlight) {
      let text = selection.toString();

      if (text.includes('\n')) {
        selection?.collapseToEnd();
        return;
      }

      if (text.includes('/')) {
        const spanIdList = [];
        let textList = [];
        let htmlText = '';
        textList = text.split('/').filter((text) => text != '');

        const startContainer = range?.startContainer.nextSibling as HTMLElement;
        let startSpacingId = 0;
        if (range?.commonAncestorContainer) {
          for (let i = 0; i < range?.commonAncestorContainer?.childNodes?.length; i++) {
            const childNodeItem = range?.commonAncestorContainer.childNodes[i] as HTMLElement;
            if (childNodeItem?.id === startContainer.id) {
              startSpacingId = i;
              break;
            }
          }
        }

        if (range?.commonAncestorContainer) {
          for (let i = startSpacingId; i < range?.commonAncestorContainer?.childNodes?.length; i++) {
            const childNodeItem = range?.commonAncestorContainer.childNodes[i] as HTMLElement;
            if (childNodeItem.nodeName == 'SPAN') {
              spanIdList.push(`<span id=${childNodeItem.id}>/</span>`);
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
      const uniqueId = e.clientX + '.' + e.clientY + '.' + selection.anchorOffset;
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
        {videoData?.sentences.map(({ id, text, order }, i) => (
          <StScriptText
            onContextMenu={(e) => {
              e.preventDefault();
              handleRightClick(e, videoData.scriptId, order);
              setOrder(i + 1);
            }}
            key={id}
            onClick={() => setOrder(i + 1)}
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
    color: ${COLOR.MAIN_BLUE};
    margin-right: 0.4rem;
    margin-left: 0.4rem;
  }

  & > mark {
    background: linear-gradient(259.3deg, #d8d9ff 0%, #a7c5ff 100%);

    & > span {
      font-size: 3.2rem;
      font-weight: 600;
      color: ${COLOR.MAIN_BLUE};
      margin-right: 0.4rem;
      margin-left: 0.4rem;
    }
  }
`;
