import styled from 'styled-components';
import { COLOR } from '@src/styles/color';

interface ScriptType {
  id: number;
  text: string;
  startTime: number;
  endTime: number;
}

interface ScriptEditProps {
  scripts: ScriptType[];
  isHighlight: boolean;
  isSpacing: boolean;
}

function ScriptEdit(props: ScriptEditProps) {
  const { scripts, isHighlight, isSpacing } = props;

  const handleClick = () => {
    const selection = window.getSelection(); // 커서의 위치를 알 수 있음
    const range = selection?.getRangeAt(0); // 커서의 startOffset과 endOffset을 갖고 있는 객체이다.
    const startIdx = range?.startOffset; // 커서의 시작인덱스
    // const endIdx = range?.endOffset; // 커서의 종료인덱스

    // 선택한 텍스트가 빈칸인지 확인하는 로직
    const selectedDiv = range?.startContainer as Node;
    const serializer = new XMLSerializer();
    const selectedLine = serializer.serializeToString(selectedDiv);

    const isLeftBlank = startIdx && selectedLine[startIdx - 1] === ' '; //왼쪽이 빈칸
    const isRightBlank = startIdx && selectedLine[startIdx] === ' '; //오른쪽이 빈칸
    const isValidate = isLeftBlank || isRightBlank; //빈칸인지 여부

    //클릭시 이벤트
    if (selection?.type === 'Caret' && isValidate && isSpacing) {
      const frag = document.createDocumentFragment();
      const div = document.createElement('div');
      isLeftBlank ? (div.innerHTML = '<span class=left >/</span>') : (div.innerHTML = '<span class=right >/</span>');
      while (div.firstChild) {
        frag.appendChild(div.firstChild);
      }
      range?.deleteContents();
      range?.insertNode(frag);
    }

    //드래깅 이벤트
    else if (selection?.type === 'Range' && isHighlight) {
      const frag = document.createDocumentFragment();
      const div = document.createElement('div');
      const text = selection.toString();

      div.innerHTML = '<mark>' + text + '</mark>';
      while (div.firstChild) {
        frag.appendChild(div.firstChild);
      }
      range?.deleteContents();
      range?.insertNode(frag);
    }
  };

  return (
    <StWrapper contentEditable="true" onClick={handleClick} suppressContentEditableWarning={true} spellCheck="false">
      {scripts.map(({ id, text }) => (
        <StScriptText key={id}>{text}</StScriptText>
      ))}
    </StWrapper>
  );
}

export default ScriptEdit;

const StWrapper = styled.div`
  cursor: pointer;
  :focus {
    outline: none;
  }
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

  & > mark {
    background: linear-gradient(259.3deg, #d8d9ff 0%, #a7c5ff 100%);

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
  }
`;
