import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icArrow } from 'public/assets/icons';
import styled from 'styled-components';
import ImageDiv from './common/ImageDiv';

interface SelectionBoxProps {
  categoryName: string;
}

function SelectionBox(props: SelectionBoxProps) {
  const { categoryName } = props;
  return (
    <StSelectionBox>
      <span>{categoryName}</span>
      <button>
        전체 <ImageDiv src={icArrow} className="arrow" layout="fill" alt="" />
      </button>
    </StSelectionBox>
  );
}

export default SelectionBox;

const StSelectionBox = styled.div`
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
`;
