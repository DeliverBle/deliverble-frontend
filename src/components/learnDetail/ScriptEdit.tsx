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
    const selection = window.getSelection();
    //mark 태그 안에 들어가있는 친구인지?
    const isInMark = document.getElementsByTagName('mark');
    let found;
    for (let i = 0; i < isInMark.length; i++) {
      selection?.containsNode(isInMark[i], true) ? (found = true) : (found = false);
    }
    const range = selection?.getRangeAt(0);
    const startIdx = range?.startOffset;
    // const endIdx = range?.endOffset;
    // const startContainer = range?.startContainer;
    const endContainer = range?.endContainer;
    // console.log('range', range);

    const selectedDiv = range?.startContainer as Node;
    const serializer = new XMLSerializer();
    const selectedLine = serializer.serializeToString(selectedDiv);

    const isLeftBlank = startIdx && selectedLine[startIdx - 1] === ' ';
    const isRightBlank = startIdx && selectedLine[startIdx] === ' ';
    const isValidate = isLeftBlank || isRightBlank;

    if (selection?.type === 'Caret' && isValidate && isSpacing) {
      const frag = document.createDocumentFragment();
      const div = document.createElement('div');
      isLeftBlank ? (div.innerHTML = '<span class=left >/</span>') : (div.innerHTML = '<span class=right >/</span>');
      while (div.firstChild) {
        frag.appendChild(div.firstChild);
      }
      range?.deleteContents();
      range?.insertNode(frag);
      endContainer && selection?.collapse(endContainer, 0);
    } else if (!found && selection?.type === 'Range' && isHighlight) {
      let text = selection.toString();

      if (text.includes('/')) {
        const texts = text.split('/');
        const res = texts.join('<span>/</span>');
        console.log('res', res);
        text = res;
      }

      const frag = document.createDocumentFragment();
      const div = document.createElement('div');
      div.innerHTML = '<mark>' + text + '</mark>';
      while (div.firstChild) {
        frag.appendChild(div.firstChild);
      }
      range?.deleteContents();
      range?.insertNode(frag);
    }
    endContainer && selection?.collapse(endContainer, 0);
  };

  return (
    <StWrapper
      contentEditable="true"
      onClick={handleClick}
      suppressContentEditableWarning={true}
      spellCheck="false"
      onCut={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      onKeyDown={(e) => e.preventDefault()}>
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
  caret-color: transparent;

  & > mark {
    background: linear-gradient(259.3deg, #d8d9ff 0%, #a7c5ff 100%);
  }
`;

const StScriptText = styled.div`
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
