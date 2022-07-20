import styled, { css } from 'styled-components';
import { COLOR } from '@src/styles/color';
import { useEffect, useRef, useState } from 'react';

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
    // console.log(range);

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
      let text = selection.toString(); //드래깅 된 텍스트

      //하이라이트 표시 안에 '/'끊어 읽기 들어가 있을 때 예외처리
      if (text.includes('/')) {
        const texts = text.split('/'); // 끊어 읽기 문자 단위로 자르고 해당 텍스트를 배열로 만든 것
        const res = texts.join('<span>/</span>');
        console.log('res', res);
        text = res;
      }

      //선택된 텍스트를 태그안에 넣어주는 부분
      const frag = document.createDocumentFragment();
      const div = document.createElement('div');
      div.innerHTML = '<mark>' + text + '</mark>';
      while (div.firstChild) {
        frag.appendChild(div.firstChild);
      }
      range?.deleteContents();
      range?.insertNode(frag);
    }
  };

  // const testRef = useRef<any>();

  // let x: any;
  // let y: any;
  // document.addEventListener('contextmenu', function (e) {
  //   e.preventDefault(); // 원래 있던 오른쪽 마우스 이벤트를 무효화한다.
  //   x = e.pageX + 'px'; // 현재 마우스의 X좌표
  //   y = e.pageY + 'px'; // 현재 마우스의 Y좌표
  //   // console.log('x', x);
  // });

  // function handleCreateContextMenu(event: any) {
  //   event.preventDefault();

  //   // console.log('event', event.target);
  //   console.log('pageX', event.pageX);
  //   console.log('pageY', event.pageY);
  //   // console.log('X', event.pageX - 578);
  //   // console.log('Y', event.pageY - 301);

  //   // console.log('getBoundingClientRect', event.target.getBoundingClientRect());

  //   console.log('getBoundingClientRect x', event.target.getBoundingClientRect().x);
  //   console.log('getBoundingClientRect y', event.target.getBoundingClientRect().y);
  //   // console.log('getBoundingClientRect width', event.target.getBoundingClientRect().width);
  //   // console.log('getBoundingClientRect height', event.target.getBoundingClientRect().height);

  //   if (event.target.outerHTML.slice(0, 6) === '<mark>') {
  //     testRef.current.style.position = 'absolute';
  //     // testRef.current.style.left = event.pageX - event.target.getBoundingClientRect().x + 'px';
  //     // testRef.current.style.top = event.pageY - event.target.getBoundingClientRect().y + 'px';
  //     testRef.current.style.left = event.pageX - event.target.getBoundingClientRect().x + 'px';
  //     testRef.current.style.top = event.pageY - event.target.getBoundingClientRect().y + 'px';
  //     // testRef.current.style.left = '30px';
  //     // testRef.current.style.top = '30px';
  //     testRef.current.style.display = 'block';
  //     testRef.current.style.backgroundColor = 'red';
  //   }
  // }

  // const testRef = useRef();

  //   const popMenu = document.getElementById('popMenu'); // 팝업창을 담아옴
  //   // const popMenu = testRef.current();
  //   console.log('test');
  //   console.log(popMenu);

  //   // popMenu.style.position = 'relative';
  //   // popMenu.style.left = x;
  //   // popMenu.style.top = y;
  //   // popMenu.style.display = 'block';
  // });

  //클릭시 메뉴 숨기기
  // document.addEventListener('click', function (e) {
  //   // 노출 초기화
  //   popMenu.style.display = 'none';
  //   popMenu.style.top = null;
  //   popMenu.style.left = null;
  // });

  const [show, setShow] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleClick = () => setShow(false);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <StWrapper
      contentEditable="true"
      onClick={handleClick}
      onContextMenu={(e) => {
        e.preventDefault();
        setShow(true);
        console.log(e.target);
        console.log('offsetX', e.nativeEvent.offsetX);
        console.log('offsetY', e.nativeEvent.offsetY);
        setPoints({
          x: e.nativeEvent.offsetX / 10 + (e.nativeEvent.offsetX / 10) * 0.5,
          y: e.nativeEvent.offsetY / 10 + (e.nativeEvent.offsetY / 10) * 2,
        });
      }}
      suppressContentEditableWarning={true}
      spellCheck="false"
      onCut={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      onKeyDown={(e) => e.preventDefault()}>
      {scripts.map(({ id, text }) => (
        <StScriptText key={id}>
          {text}
          {show && (
            <StContextMenu top={points.y} left={points.x}>
              <ul>
                <li>Delete</li>
                <li>Edit</li>
              </ul>
            </StContextMenu>
          )}
        </StScriptText>
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

  position: relative;
`;

const StScriptText = styled.div`
  position: relative;
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

type ContextMenuProps = {
  top: number;
  left: number;
};

const StContextMenu = styled.div<ContextMenuProps>`
  border-radius: 4px;
  box-sizing: border-box;
  position: absolute;
  width: 100px;
  background-color: white;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.1);
  ${({ top, left }) => css`
    top: ${top}rem;
    left: ${left}rem;
  `}
  ul {
    list-style-type: none;
    box-sizing: border-box;
    margin: 0;
    padding: 10px;
  }
  ul li {
    /* padding: 8px 2px;
    border-radius: 4px; */
  }

  ul li:hover {
    cursor: pointer;
  }
`;
