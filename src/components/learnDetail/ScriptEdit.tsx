import { useEffect, useRef, useState } from 'react';
import HighlightModal from './HighlightModal';
import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { api } from '@src/services/api';
import ContextMenu from '@src/components/learnDetail/ContextMenu';
import { VideoData } from '@src/services/api/types/learn-detail';
import { CONTEXT_MENU_WIDTH, ABSOLUTE_RIGHT_LIMIT } from '@src/utils/constant';
import { useRouter } from 'next/router';

interface ScriptEditProps {
  scriptsId: number;
  isEditing: boolean;
  isHighlight: boolean;
  isSpacing: boolean;
  clickedScriptTitleIndex: number;
}

function ScriptEdit(props: ScriptEditProps) {
  const router = useRouter();
  const { id: detailId } = router.query;
  const { scriptsId, isEditing, isHighlight, isSpacing, clickedScriptTitleIndex } = props;
  const [highlightAlert, setHighlightAlert] = useState<boolean>(false);
  const [firstLineId, setFirstLineId] = useState<number>();
  const [order, setOrder] = useState<number>();
  const [text, setText] = useState<string>();
  const [videoData, setVideoData] = useState<VideoData>();
  const learnRef = useRef<HTMLDivElement>(null);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [contextMenuPoint, setContextMenuPoint] = useState({ x: 0, y: 0 });
  const [contextElementType, setContextElementType] = useState<string>('');
  const [deletedType, setDeletedType] = useState<string>('');
  const [isDeleteBtnClicked, setIsDeleteBtnClicked] = useState<boolean>(false);
  const [contextHTML, setContextHTML] = useState<HTMLElement>();
  const [contextElementId, setContextElementId] = useState<string>('');

  const handleContextMenuPoint = (target: HTMLDivElement) => {
    let x = 0;
    let y = 0;

    const article = target.parentElement?.closest('article');
    if (article) {
      const articleAbsoluteTop = article.getBoundingClientRect().top;
      const articleAbsoluteLeft = article.getBoundingClientRect().left;

      const targetRect = target.getBoundingClientRect();
      const absoluteTop = targetRect.top + 20;
      const absoluteLeft = targetRect.left - 22;
      const absoluteRight = targetRect.right - 22;

      const highlightWidth = targetRect.right - targetRect.left;
      if (highlightWidth > CONTEXT_MENU_WIDTH || absoluteRight > ABSOLUTE_RIGHT_LIMIT - (scrollX + scrollX / 2)) {
        x = absoluteRight - articleAbsoluteLeft - CONTEXT_MENU_WIDTH;
      } else {
        x = absoluteLeft - articleAbsoluteLeft;
      }
      y = absoluteTop - articleAbsoluteTop;
    }

    return { x, y };
  };

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
    setFirstLineId(videoData?.scripts[0].id);
  }, [firstLineId, videoData?.scripts]);

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

  const deleteElem = (parentElement: HTMLElement | null | undefined, removeElement: HTMLElement | null | undefined) => {
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    const blank = document.createTextNode(' ');

    switch (deletedType) {
      case 'MARK':
        if (removeElement?.innerHTML) {
          div.innerHTML = removeElement?.innerHTML;
        }
        while (div.firstChild) {
          fragment.appendChild(div.firstChild);
        }
        removeElement?.replaceWith(fragment);
        nodeToText(parentElement);
        break;
      case 'SPAN':
        if (removeElement) {
          parentElement?.replaceChild(blank, removeElement);
        }
        nodeToText(parentElement);
        break;
    }
  };

  useEffect(() => {
    setIsDeleteBtnClicked(false);
    const parentElement = contextHTML?.parentElement;
    const removeElement = document.getElementById(contextElementId);

    if (isDeleteBtnClicked) {
      setIsContextMenuOpen(false);
      deleteElem(parentElement, removeElement);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextElementId, contextHTML?.parentElement, isDeleteBtnClicked]);

  const handleRightClick = (e: React.MouseEvent) => {
    const eventTarget = e.target as HTMLElement;
    setContextElementId(eventTarget.id);
    setContextHTML(eventTarget);
    setContextElementType(eventTarget.nodeName);
    if (eventTarget.closest('mark') || eventTarget.closest('span')) {
      setIsContextMenuOpen(true);
    }

    const contextTarget = e.target as HTMLDivElement;
    setContextMenuPoint(handleContextMenuPoint(contextTarget));
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
      if (blankIndex) {
        selectedLine =
          selectedLine.substring(0, blankIndex) +
          `<span id=${uniqueId}>/</span>` +
          selectedLine.substring(blankIndex + 1);
      }
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

  useEffect(() => {
    (async () => {
      const id = Number(detailId);
      const data = await api.learnDetailService.getPrivateVideoData(id);
      setVideoData(data);
    })();
  }, [detailId]);

  useEffect(() => {
    (async () => {
      const data = await api.learnDetailService.getPrivateVideoData(Number(detailId), clickedScriptTitleIndex);
      setVideoData(data);
    })();
  }, [clickedScriptTitleIndex, detailId]);

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
        {videoData?.scripts.map(({ id, text }) => (
          <StScriptText
            ref={contextMenuRef}
            onContextMenu={(e) => {
              e.preventDefault();
              handleRightClick(e);
              findLineOrder(id);
            }}
            key={id}
            onClick={() => findLineOrder(id)}
            dangerouslySetInnerHTML={{ __html: text }}></StScriptText>
        ))}
        {isContextMenuOpen && (
          <ContextMenu
            contextMenuPoint={contextMenuPoint}
            contextElementType={contextElementType}
            isEditing={isEditing}
            setIsContextMenuOpen={setIsContextMenuOpen}
            setDeletedType={setDeletedType}
            setIsDeleteBtnClicked={setIsDeleteBtnClicked}
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
