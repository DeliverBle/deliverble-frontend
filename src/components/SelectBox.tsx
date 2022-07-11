import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icArrow, icCheckedBox, icEmptyBox } from 'public/assets/icons';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import ImageDiv from './common/ImageDiv';

interface SelectBoxProps {
  categoryName: string;
  selectionList: string[];
}

function SelectBox(props: SelectBoxProps) {
  const { categoryName, selectionList } = props;
  const [selection, setSelection] = useState(['전체']);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <StSelectBox isClicked={isClicked}>
      <span>{categoryName}</span>
      <button onClick={() => setIsClicked((prev) => !prev)}>
        {selection.join(', ')} <ImageDiv src={icArrow} className="arrow" layout="fill" alt="" />
      </button>
      {isClicked && (
        <ul>
          {selectionList.map((selectionItem) => {
            return (
              <li
                key={selectionItem}
                onClick={() => {
                  setSelection(Array.from(new Set([...selection, selectionItem])));
                  console.log('click');
                }}>
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

  & > button {
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & > button:hover {
    border: 0.2rem solid ${COLOR.MAIN_BLUE};
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
