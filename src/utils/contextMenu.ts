import { ABSOLUTE_RIGHT_LIMIT, CONTEXT_MENU_WIDTH } from '@src/utils/constant';

export const calcContextMenuPoint = (target: HTMLElement) => {
  let x = 0,
    y = 0;

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
