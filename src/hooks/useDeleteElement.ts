import { MemoConfirmModalKey } from '@src/components/learnDetail/ConfirmModal';
import { api } from '@src/services/api';
import { VideoData } from '@src/services/api/types/learn-detail';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface useDeleteElementProps {
  rightClickedElement?: HTMLElement;
  clickedTitleIndex: number;
  detailId?: string | string[];
  videoData?: VideoData;
  setVideoData: Dispatch<SetStateAction<VideoData | undefined>>;
  updateMemoList: (type: MemoConfirmModalKey, content?: string) => void;
}

function useDeleteElement(props: useDeleteElementProps) {
  const { rightClickedElement, clickedTitleIndex, detailId, videoData, setVideoData, updateMemoList } = props;
  const [clickedDeleteType, setClickedDeleteType] = useState<string>('');
  const [order, setOrder] = useState<number>();
  const [text, setText] = useState<string>();

  const nodeToText = (anchorNode: Node | null | undefined) => {
    let textValue = '';
    if (anchorNode?.nodeName === 'MARK') {
      nodeToText(anchorNode.parentNode);
      return;
    }

    if (anchorNode?.childNodes) {
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
          updateMemoList('delete');
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

  useEffect(() => {
    (async () => {
      console.log('order', order);
      console.log('text', text);
      if (order !== -1 && text !== '' && order && text && videoData?.names) {
        const id = videoData?.names[clickedTitleIndex].id;
        await api.learnDetailService.postSentenceData({ order, text }, id, clickedTitleIndex);
        const data = await api.learnDetailService.getPrivateVideoData(Number(detailId), clickedTitleIndex);
        setVideoData(data);
        setText('');
        setOrder(-1);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, text]);

  return { setOrder, setText, setClickedDeleteType, nodeToText };
}

export default useDeleteElement;
