import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import ImageDiv from './common/ImageDiv';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icArrow, icCheckedBox, icEmptyBox } from 'public/assets/icons';

interface SelectBoxProps {
  optionName: string;
  optionList: string[];
}

function SelectBox(props: SelectBoxProps) {
  const { optionName, optionList } = props;
  const [isClicked, setIsClicked] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(true);
  const [checkedList, setCheckedList] = useState(optionList);

  const handleCheck = (checkedItem: string) => {
    checkedList.indexOf(checkedItem) !== -1
      ? setCheckedList(checkedList.filter((item) => item !== checkedItem))
      : setCheckedList(Array.from(new Set([...checkedList, checkedItem])));
  };

  const handleAllClick = () => {
    isAllChecked ? setCheckedList([]) : setCheckedList([...optionList]);
    setIsAllChecked((prev) => !prev);
  };

  useEffect(() => {
    if (isAllChecked && checkedList.length !== optionList.length) {
      setIsAllChecked(false);
    }

    if (!isAllChecked && checkedList.length === optionList.length) {
      setCheckedList(optionList);
      setIsAllChecked(true);
    }
  }, [checkedList, optionList, isAllChecked]);

  return (
    <StSelectBox isClicked={isClicked}>
      <span>{optionName}</span>
      <StCategoryButton onClick={() => setIsClicked((prev) => !prev)}>
        <div>{isAllChecked ? '전체' : checkedList.join(', ')}</div>
        <ImageDiv src={icArrow} className="arrow" layout="fill" alt="" />
      </StCategoryButton>
      {isClicked && (
        <ul>
          <li onClick={() => handleAllClick()}>
            <ImageDiv className="checkbox" src={isAllChecked ? icCheckedBox : icEmptyBox} />
            전체
          </li>
          {optionList.map((checkedItem) => {
            return (
              <li key={checkedItem} onClick={() => handleCheck(checkedItem)}>
                <ImageDiv className="checkbox" src={checkedList.includes(checkedItem) ? icCheckedBox : icEmptyBox} />
                {checkedItem}
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

      button {
        border: 0.2rem solid ${isClicked ? COLOR.MAIN_BLUE : COLOR.GRAY_5};
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
