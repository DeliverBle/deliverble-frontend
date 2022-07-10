import Image from 'next/image';
import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icSearch } from 'public/assets/icons';

function learn() {
  return (
    <StLearn>
      <StTitle>
        <Image src={icSearch} width={48} height={48} alt="" />
        <h1>원하는 영상을 찾아 쉐도잉 해보세요!</h1>
      </StTitle>
      <button>검색하기</button>
      <div></div>
    </StLearn>
  );
}

export default learn;

const StLearn = styled.div`
  zoom: 67%;
  margin: auto 16rem;

  & > button {
    background-color: ${COLOR.MAIN_BLUE};
    color: ${COLOR.WHITE};
    ${FONT_STYLES.B_20_BODY};
    padding: 1.4rem 4rem 1.4rem 3.9rem;
    border-radius: 1.4rem;
  }

  & > div:last-child {
    width: 384px;
    height: 216px;
    background-color: gray;
  }
`;

const StTitle = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 16rem;

  & > h1 {
    ${FONT_STYLES.SB_32_HEADLINE};
    color: ${COLOR.BLACK};
  }
`;
