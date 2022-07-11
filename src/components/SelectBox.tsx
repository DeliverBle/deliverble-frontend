import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icArrow, icCheckedBox, icEmptyBox } from 'public/assets/icons';
import { useState } from 'react';
import styled from 'styled-components';
import ImageDiv from './common/ImageDiv';

interface SelectBoxProps {
  categoryName: string;
  selectionList: string[];
}

function SelectBox(props: SelectBoxProps) {
  const { categoryName, selectionList } = props;
  const [selection, setSelection] = useState('전체');
  const [isClicked, setIsClicked] = useState(false);

  return (
    <StSelectBox>
      <span>{categoryName}</span>
      <button onClick={() => setIsClicked((prev) => !prev)}>
        {selection} <ImageDiv src={icArrow} className="arrow" layout="fill" alt="" />
      </button>
      {isClicked && (
        <ul>
          {selectionList.map((selectionItem) => {
            return (
              <li key={selectionItem} onClick={() => setSelection(selectionItem)}>
                <ImageDiv className="checkbox" src={selection === selectionItem ? icCheckedBox : icEmptyBox} />
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

const StSelectBox = styled.div`
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
    border: 0.2rem solid ${COLOR.GRAY_5};
    box-shadow: 0.4rem 0.4rem 2rem rgba(22, 15, 53, 0.05);
    border-radius: 1.4rem;
  }

  & > button:hover {
    border: 0.2rem solid ${COLOR.MAIN_BLUE};
  }

  .arrow {
    position: relative;
    width: 0.8rem;
    height: 0.4rem;
  }

  ul {
    width: 17.6rem;
    padding: 0.8rem 1.6rem;
    border: 0.1rem solid ${COLOR.GRAY_5};
    box-shadow: 0.4rem 0.4rem 2rem rgba(22, 15, 53, 0.05);
    border-radius: 1.4rem;
    margin-top: 1.2rem;
    position: absolute;
    z-index: 1;

    li {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 1rem 0;
      ${FONT_STYLES.M_18_CAPTION};
      color: ${COLOR.BLACK};
    }

    .checkbox {
      position: relative;
      width: 2.4rem;
      height: 2.4rem;
    }
  }
`;
