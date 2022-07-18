import styled from 'styled-components';
import { MutableRefObject } from 'react';
import { COLOR } from '@src/styles/color';
// import { FONT_STYLES } from '@src/styles/fontStyle';
interface ScriptType {
  id: number;
  text: string;
  startTime: number;
  endTime: number;
}

interface ScriptEdit {
  scripts: ScriptType[];
}
function ScriptEdit(props: ScriptEdit) {
  const { scripts } = props;
  let scriptRef: MutableRefObject<HTMLDivElement | null> | undefined;

  const handleClick = () => {
    const selection = window.getSelection(); // 커서의 위치를 알 수 있음
    const range = selection?.getRangeAt(0); // 커서의 startOffset과 endOffset을 갖고 있는 객체이다.
    const frag = document.createDocumentFragment();

    // const startIdx = range?.startOffset; // 커서의 시작인덱스
    // const startCont = range?.startContainer; // 커서의 시작인덱스
    // const endIdx = range?.endOffset; // 커서의 종료인덱스

    // const tokenNameDiv = range?.startContainer as Node;
    // console.log(tokenNameDiv);
    // const tokenName = tokenNameDiv[0].text();
    // console.log(tokenName);

    // const isLeftBlank = startIdx && range?.startContainer.data[startIdx] === ' '; //왼쪽이 빈칸
    // const isRightBlank = range?.startContainer.data[startIdx - 1] === ' '; //오른쪽이 빈칸
    // const isValidate = isLeftBlank || isRightBlank; //빈칸인지 여부

    //클릭 이벤트
    if (selection?.type === 'Caret') {
      const div = document.createElement('div');
      div.innerHTML = '<span>/</span>';
      while (div.firstChild) {
        frag.appendChild(div.firstChild);
      }
      range?.deleteContents();
      range?.insertNode(frag);
    }

    //드래깅 이벤트
    else if (selection?.type === 'Range') {
      // let selection = document.getSelection();
      // cloned.innerHTML = astext.innerHTML = "";
      // console.log(selection?.value.slice(selection?.selectionStart, selection?.selectionEnd));
      // let selected = input.value.slice(input.selectionStart, input.selectionEnd);
      // input.setRangeText(`<mark>${selected}</mark>`);
      // // Clone DOM nodes from ranges (we support multiselect here)
      // for (let i = 0; i < selection.rangeCount; i++) {
      //   cloned.append(selection.getRangeAt(i).cloneContents());
      // }
      // // Get as text
      // astext.innerHTML += selection;
      // const frag = document.createDocumentFragment();
      // const div = document.createElement('div');
      // div.innerHTML = '<span>/</span>';
      // while (div.firstChild) {
      //   frag?.appendChild(div.firstChild);
      // }
      // range?.deleteContents();
      // range?.insertNode(frag);
    }
  };
  return (
    <>
      <StWrapper contentEditable="true" onClick={handleClick} suppressContentEditableWarning={true} ref={scriptRef}>
        {scripts.map(({ id, text }) => (
          <StScriptText key={id}>{text}</StScriptText>
        ))}
      </StWrapper>
    </>
  );
}

export default ScriptEdit;

const StWrapper = styled.div`
  cursor: pointer;

  font: 12px;
`;

const StScriptText = styled.p`
  font-size: 2.6rem;
  color: ${COLOR.BLACK};
  cursor: pointer;

  & > span {
    font-size: 3.2rem;
    font-weight: 600;
    color: #4e8aff;
  }
`;
