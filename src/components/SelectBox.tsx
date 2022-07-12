import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icArrow, icCheckedBox, icEmptyBox } from 'public/assets/icons';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import ImageDiv from './common/ImageDiv';

interface SelectBoxProps {
  categoryName: string;
  selectionList: string[];
}

function SelectBox(props: SelectBoxProps) {
  const { categoryName, selectionList } = props;
  const [selection, setSelection] = useState(selectionList);
  const [isClicked, setIsClicked] = useState(false);
  const [isAllClicked, setIsAllClicked] = useState(true);

  const handleClick = (selectionItem: string) => {
    selection.indexOf(selectionItem) !== -1
      ? setSelection(selection.filter((item) => item !== selectionItem))
      : setSelection(Array.from(new Set([...selection, selectionItem])));
  };

  const handleAllClick = () => {
    // 전체 선택/해제 관련
    isAllClicked ? setSelection([]) : setSelection([...selectionList]);
    setIsAllClicked((prev) => !prev);
  };

  useEffect(() => {
    if (isAllClicked && selection.length !== selectionList.length) {
      // 전체 버튼이 선택된 상태에서 다른 조건 눌렀을 때 전체 버튼에 있는 체크 없애기
      setIsAllClicked(false);
    }

    if (!isAllClicked && selection.length === selectionList.length) {
      // 전체 버튼이 선택되지 않은 상태에서 모든 조건 눌렀을 때 전체 버튼에 체크하기
      setSelection(selectionList);
      setIsAllClicked(true);
    }
  }, [selection, selectionList, isAllClicked]);

  return (
    <StSelectBox isClicked={isClicked}>
      <span>{categoryName}</span>
      <StCategoryButton onClick={() => setIsClicked((prev) => !prev)}>
        <div>{isAllClicked ? '전체' : selection.join(', ')}</div>
        <ImageDiv src={icArrow} className="arrow" layout="fill" alt="" />
      </StCategoryButton>
      {isClicked && (
        <ul>
          <li onClick={() => handleAllClick()}>
            <ImageDiv className="checkbox" src={isAllClicked ? icCheckedBox : icEmptyBox} />
            전체
          </li>
          {selectionList.map((selectionItem) => {
            return (
              <li key={selectionItem} onClick={() => handleClick(selectionItem)}>
                <ImageDiv className="checkbox" src={selection.includes(selectionItem) ? icCheckedBox : icEmptyBox} />
                {selectionItem}
              </li>
            );
          })}
        </ul>
      )}
    </StSelectBox>
  );
}

export default SelectBox;

const StSelectBox = styled.div<{ isClicked: boolean }>`
  & > span {
    color: ${COLOR.GRAY_30};
    ${FONT_STYLES.SB_16_CAPTION};
    margin-left: 1.2rem;
    margin-bottom: 1rem;
  }

  .arrow {
    position: relative;
    width: 0.8rem;
    height: 0.4rem;
    transition: 0.3s all ease;
  }

  ${({ isClicked }) =>
    isClicked &&
    css`
      .arrow {
        transform: rotate(180deg);
      }
    `}

  ul {
    width: 17.6rem;
    padding: 0.8rem;
    border: 0.1rem solid ${COLOR.GRAY_5};
    box-shadow: 0.4rem 0.4rem 2rem rgba(22, 15, 53, 0.05);
    border-radius: 1.4rem;
    margin-top: 1.2rem;
    position: absolute;
    z-index: 1;
    background-color: ${COLOR.WHITE};

    li {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 1rem 0;
      ${FONT_STYLES.M_18_CAPTION};
      color: ${COLOR.BLACK};
      cursor: pointer;
    }

    li:hover {
      background-color: ${COLOR.SUB_BLUE_15};
      border-radius: 1rem;
    }

    .checkbox {
      position: relative;
      width: 2.4rem;
      height: 2.4rem;
      margin-left: 0.8rem;
    }
  }
`;

const StCategoryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 17.6rem;
  height: 5.6rem;
  padding: 1.6rem;
  color: ${COLOR.BLACK};
  ${FONT_STYLES.SB_18_CAPTION};
  border: 0.2rem solid ${({ isClicked }) => (isClicked ? COLOR.MAIN_BLUE : COLOR.GRAY_5)};
  box-shadow: 0.4rem 0.4rem 2rem rgba(22, 15, 53, 0.05);
  border-radius: 1.4rem;
  gap: 0.8rem;
  overflow: hidden;

  &:hover {
    border: 0.2rem solid ${COLOR.MAIN_BLUE};
  }

  & > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
