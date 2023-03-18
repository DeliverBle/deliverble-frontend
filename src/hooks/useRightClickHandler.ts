import { MemoInfo, MemoState } from '@src/pages/learn/[id]';
import { MemoData } from '@src/services/api/types/learn-detail';
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
  const [clickedMemo, setClickedMemo] = useState<MemoData>();

  const getHighlightIndex = (contextTarget: HTMLElement, targetId: string) => {
    const childNodes = contextTarget.parentNode?.childNodes;
    if (childNodes) {
      let stringLength = 0;
      for (let i = 0; i < childNodes.length; i++) {
        const { id, textContent: text } = childNodes[i] as HTMLElement;
        if (id === targetId) {
          return stringLength;
        }
        if (text) {
          stringLength += text !== '/' ? text.replaceAll('/', ' ').length : 1;
        }
      }
    }
  };

  const handleRightClick = (e: React.MouseEvent, scriptId: number, order: number) => {
    const contextTarget = e.target as HTMLElement;
    setRightClickedElement(contextTarget);
    if (contextTarget.closest('span')) {
      setIsContextMenuOpen(true);
      return;
    }
    const markTag = contextTarget.closest('mark');
    if (markTag) {
      const startIndex = getHighlightIndex(contextTarget, markTag.id);
      const { newMemoId, editMemoId } = memoState;
      if (newMemoId === INITIAL_NUMBER && editMemoId === INITIAL_NUMBER) {
        setIsContextMenuOpen(true);
        if (startIndex) {
          setMemoInfo({
            scriptId,
            order,
            startIndex,
            keyword: markTag.innerText.replaceAll('/', ' '),
            highlightId: markTag.id,
          });
          setClickedMemo(memoList.find((memo) => memo.highlightId === markTag.id));
        }
      }
    }
  };

  return { rightClickedElement, isContextMenuOpen, setIsContextMenuOpen, memoInfo, clickedMemo, handleRightClick };
}

export default useRightClickHandler;
