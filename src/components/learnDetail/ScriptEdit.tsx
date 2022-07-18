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
  isHighlight: boolean;
  isSpacing: boolean;
}
function ScriptEdit(props: ScriptEdit) {
  const { scripts, isHighlight, isSpacing } = props;
  let scriptRef: MutableRefObject<HTMLDivElement | null> | undefined;

  const handleClick = () => {
    const selection = window.getSelection(); // 커서의 위치를 알 수 있음
    const range = selection?.getRangeAt(0); // 커서의 startOffset과 endOffset을 갖고 있는 객체이다.
    const startIdx = range?.startOffset; // 커서의 시작인덱스
    // const endIdx = range?.endOffset; // 커서의 종료인덱스

    // 선택한 텍스트가 빈칸인지 확인하는 로직
    const selectedDiv = range?.startContainer as Node;
    const serializer = new XMLSerializer();
    console.log(serializer.serializeToString(selectedDiv));
    const selectedLine = serializer.serializeToString(selectedDiv);
    startIdx && console.log(selectedLine[startIdx - 1]); //커서 왼쪽 단어
    startIdx && console.log(selectedLine[startIdx]); //커서 오른쪽 단어
    const isLeftBlank = startIdx && selectedLine[startIdx - 1] === ' '; //왼쪽이 빈칸
    const isRightBlank = startIdx && selectedLine[startIdx] === ' '; //오른쪽이 빈칸
    const isValidate = isLeftBlank || isRightBlank; //빈칸인지 여부

    //클릭시 이벤트
    if (selection?.type === 'Caret' && isValidate && isSpacing) {
      const frag = document.createDocumentFragment();
      const div = document.createElement('div');
      console.log(isLeftBlank);
      isLeftBlank ? (div.innerHTML = '<span class=left >/</span>') : (div.innerHTML = '<span class=right >/</span>');
      while (div.firstChild) {
        frag.appendChild(div.firstChild);
      }
      range?.deleteContents();
      range?.insertNode(frag);
    }

    //드래깅 이벤트
    else if (selection?.type === 'Range' && isHighlight) {
      //   let selection = document.getSelection();
      //   let selected = input.value.slice(input.selectionStart, input.selectionEnd);
      //   input.setRangeText(`<mark>${selected}</mark>`);
      //   // Clone DOM nodes from ranges (we support multiselect here)
      //   for (let i = 0; i < selection?.rangeCount; i++) {
      //     cloned.append(selection.getRangeAt(i).cloneContents());
      //   }
      //   // Get as text
      //   astext.innerHTML += selection;
      //   const frag = document.createDocumentFragment();
      //   const div = document.createElement('div');
      //   div.innerHTML = '<span>/</span>';
      //   while (div.firstChild) {
      //     frag?.appendChild(div.firstChild);
      //   }
      //   range?.deleteContents();
      //   range?.insertNode(frag);
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

  & > .left {
    margin-right: 0.4rem;
  }

  & > .right {
    margin-left: 0.4rem;
  }
`;
