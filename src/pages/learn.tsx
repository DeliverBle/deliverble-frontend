import Image from 'next/image';
import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icSearch } from 'public/assets/icons';
import SelectionBox from '@src/components/SelectionBox';

function learn() {
  return (
    <StLearn>
      <StTitle>
        <Image src={icSearch} width={48} height={48} alt="" />
        <h1>원하는 영상을 찾아 쉐도잉 해보세요!</h1>
      </StTitle>
      <StSearch>
        <StSelectBoxContainer>
          <SelectionBox categoryName="방송사" />
          <SelectionBox categoryName="분야" />
          <SelectionBox categoryName="발화자" />
        </StSelectBoxContainer>
        <button>검색하기</button>
      </StSearch>
    </StLearn>
  );
}

export default learn;

const StLearn = styled.div`
  margin: auto 16rem;
`;

const StTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-top: 16rem;
  margin-bottom: 4.8rem;

  & > h1 {
    ${FONT_STYLES.SB_32_HEADLINE};
    color: ${COLOR.BLACK};
  }
`;

const StSearch = styled.div`
  display: flex;
  margin-bottom: 8rem;

  & > button {
    background-color: ${COLOR.MAIN_BLUE};
    color: ${COLOR.WHITE};
    ${FONT_STYLES.B_20_BODY};
    padding: 1.4rem 4rem 1.4rem 3.9rem;
    border-radius: 1.4rem;
    margin-left: 4rem;
  }
`;

const StSelectBoxContainer = styled.div`
  display: flex;
  gap: 1.6rem;
`;
