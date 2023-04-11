import { MemoData } from '@src/types/learnDetail/remote';

export const underlineMemo = (script: string, memoList: MemoData[]) => {
  const regexp = /<mark id=(.*?)>/g;
  const matches = [...script.matchAll(regexp)];
  const ids = matches.map((match) => match[1]);

  let styles = ``;
  ids.forEach((id, i) => {
    if (memoList.find(({ highlightId, content }) => highlightId === id && content)) {
      styles += `
        mark:nth-of-type(${i + 1}) {
          border-bottom: 0.7rem solid #4E8AFF;
          border-image: linear-gradient(white 94%, #4E8AFF 90%);
          border-image-slice: 4;
        }
      `;
    }
  });
  return styles;
};
