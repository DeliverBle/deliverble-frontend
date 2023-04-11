import { MemoInfo, MemoState } from '@src/pages/learn/[id]';
import { MemoData } from '@src/types/learn-detail';
import { INITIAL_MEMO, INITIAL_NUMBER } from '@src/utils/constant';
import { useState } from 'react';

interface useRightClickHandlerProps {
  memoState: MemoState;
  memoList: MemoData[];
}

function useRightClickHandler(props: useRightClickHandlerProps) {
  const { memoState, memoList } = props;
  const [rightClickedElement, setRightClickedElement] = useState<HTMLElement>();
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);
  const [memoInfo, setMemoInfo] = useState<MemoInfo>(INITIAL_MEMO);

  const handleRightClick = (e: React.MouseEvent, scriptId: number, order: number) => {
    const clickedElement = e.target as HTMLElement;
    setRightClickedElement(clickedElement);

    const element = clickedElement.closest('mark, span') as HTMLElement;
    if (element?.tagName === 'MARK') {
      handleRightClickOnMark(element, scriptId, order);
    } else if (element?.tagName === 'SPAN') {
      setIsContextMenuOpen(true);
    }
  };

  const handleRightClickOnMark = (highlight: HTMLElement, scriptId: number, order: number) => {
    const { newMemoId, editMemoId } = memoState;
    if (newMemoId === INITIAL_NUMBER && editMemoId === INITIAL_NUMBER) {
      setIsContextMenuOpen(true);

      const startIndex = getHighlightIndex(highlight, highlight.id);
      if (startIndex) {
        const keyword = highlight.innerText.replace(/\//g, ' ');
        const highlightId = highlight.id;
        const id = memoList.find((memo) => memo.highlightId === highlightId)?.id ?? INITIAL_NUMBER;
        setMemoInfo((prev) => ({ ...prev, id, scriptId, order, startIndex, keyword, highlightId }));
      }
    }
  };

  const getHighlightIndex = (highlight: HTMLElement, targetId: string) => {
    const childNodes = Array.from(highlight.parentNode?.childNodes || []);
    let stringLength = 0;
    for (const childNode of childNodes) {
      const { id, textContent: text } = childNode as HTMLElement;
      if (id === targetId) return stringLength;
      stringLength += text !== '/' ? text?.replace(/\//g, ' ').length ?? 0 : 1;
    }
  };

  return { rightClickedElement, memoInfo, isContextMenuOpen, setIsContextMenuOpen, handleRightClick };
}

export default useRightClickHandler;
