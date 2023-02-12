import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import HighlightModal from './HighlightModal';
import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { api } from '@src/services/api';
import ContextMenu from '@src/components/learnDetail/ContextMenu';
import { MemoData, VideoData } from '@src/services/api/types/learn-detail';
import { useRouter } from 'next/router';
import { MemoState } from '@src/pages/learn/[id]';

interface ScriptEditProps {
  isEditing: boolean;
  isHighlight: boolean;
  isSpacing: boolean;
  clickedTitleIndex: number;
  memoList: MemoData[];
  setMemoState: Dispatch<SetStateAction<MemoState>>;
  setClickedDeleteMemo: (isDelete: boolean) => void;
}

function ScriptEdit(props: ScriptEditProps) {
  const router = useRouter();
  const { id: detailId } = router.query;
  const { isEditing, isHighlight, isSpacing, clickedTitleIndex, memoList, setMemoState, setClickedDeleteMemo } = props;
  const [highlightAlert, setHighlightAlert] = useState<boolean>(false);
  const [order, setOrder] = useState<number>();
  const [text, setText] = useState<string>();
  const [videoData, setVideoData] = useState<VideoData>();
  const learnRef = useRef<HTMLDivElement>(null);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);
  const [rightClickedElement, setRightClickedElement] = useState<HTMLElement>();
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [clickedDeleteType, setClickedDeleteType] = useState<string>('');

  useEffect(() => {
    (async () => {
      if (order !== -1 && text !== '' && order && text && videoData?.names) {
        const id = videoData?.names[clickedTitleIndex].id;
        await api.learnDetailService.postSentenceData(
          {
            order,
            text,
          },
          id,
          clickedTitleIndex,
        );
        const data = await api.learnDetailService.getPrivateVideoData(Number(detailId), clickedTitleIndex);
        setVideoData(data);
        setText('');
        setOrder(-1);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, text]);

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

  const isHighlightInMemo = () => {
    const highlightId = rightClickedElement && rightClickedElement.id;
    const deleteMemoId = memoList.find((memo) => memo.highlightId === highlightId)?.id;
    deleteMemoId && setMemoState((prev: MemoState) => ({ ...prev, deleteMemoId }));
    setClickedDeleteMemo(true);
  };

  const deleteElement = () => {
    if (rightClickedElement) {
      const parentElement = rightClickedElement.parentElement;
      const removeElement = document.getElementById(rightClickedElement.id);
      const fragment = document.createDocumentFragment();
      const div = document.createElement('div');
      const blank = document.createTextNode(' ');

      switch (clickedDeleteType) {
        case 'MARK':
          if (removeElement?.innerHTML) {
            div.innerHTML = removeElement?.innerHTML;
          }
          while (div.firstChild) {
            fragment.appendChild(div.firstChild);
          }
          removeElement?.replaceWith(fragment);
          nodeToText(parentElement);
          isHighlightInMemo();
          break;
        case 'SPAN':
          if (removeElement) {
            removeElement.replaceWith(blank);
          }
          nodeToText(parentElement);
          break;
      }
    }
  };

  useEffect(() => {
    setClickedDeleteType('');
    if (clickedDeleteType) {
      deleteElement();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedDeleteType]);

  const handleRightClick = (e: React.MouseEvent) => {
    const contextTarget = e.target as HTMLElement;
    if (contextTarget.closest('mark') || contextTarget.closest('span')) {
      setIsContextMenuOpen(true);
      setRightClickedElement(contextTarget);
    }
  };

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

  const nodeToText = (anchorNode: Node | null | undefined) => {
    let textValue = '';
    if (anchorNode?.nodeName === 'MARK') {
      nodeToText(anchorNode.parentNode);
      return;
    }

    if (anchorNode?.childNodes) {
      for (let i = 0; i < anchorNode?.childNodes.length; i++) {
        const childNodeItem = anchorNode?.childNodes[i] as HTMLElement;
        const elementId = childNodeItem?.id;
        switch (childNodeItem.nodeName) {
          case '#text':
            textValue += childNodeItem.nodeValue;
            break;
          case 'MARK':
            if (childNodeItem.textContent?.includes('/')) {
              const markInnerHTML = childNodeItem.innerHTML;
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

  useEffect(() => {
    (async () => {
      const data = await api.learnDetailService.getPrivateVideoData(Number(detailId), clickedTitleIndex);
      setVideoData(data);
    })();
  }, [clickedTitleIndex, detailId]);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const eventTarget = e.target as HTMLElement;

      if (
        isContextMenuOpen &&
        !contextMenuRef?.current?.contains(eventTarget) &&
        eventTarget.tagName !== 'MARK' &&
        eventTarget.tagName !== 'SPAN'
      ) {
        setIsContextMenuOpen(false);
      }
    };

    if (isContextMenuOpen) {
      window.addEventListener('click', handleClickOutside);
      window.addEventListener('contextmenu', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('contextmenu', handleClickOutside);
    };
  }, [isContextMenuOpen]);

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
        {videoData?.scripts.map(({ id, text }, i) => (
          <StScriptText
            ref={contextMenuRef}
            onContextMenu={(e) => {
              e.preventDefault();
              handleRightClick(e);
              setOrder(i + 1);
            }}
            key={id}
            onClick={() => setOrder(i + 1)}
            dangerouslySetInnerHTML={{ __html: text }}></StScriptText>
        ))}
        {isContextMenuOpen && rightClickedElement && (
          <ContextMenu
            rightClickedElement={rightClickedElement}
            isEditing={isEditing}
            setIsContextMenuOpen={setIsContextMenuOpen}
            setClickedDeleteType={setClickedDeleteType}
          />
        )}
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
