import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import Link from 'next/link';
import styled from 'styled-components';

function Custom404() {
  return (
    <StCustom404>
      <StBackground>
        <StText>
          찾을 수 없는 페이지입니다.
          <br />
          입력한 주소가 맞는지 확인하신 후, 딜리버블과 다시 함께 해요!
        </StText>
        <Link href="/home">
          <StHomeButton>홈으로 돌아가기</StHomeButton>
        </Link>
      </StBackground>
    </StCustom404>
  );
}

export default Custom404;

const StCustom404 = styled.div``;

const StBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 108rem;
  background: url('/assets/images/img_background.svg') no-repeat center;
  background-size: cover;
`;

const StText = styled.h5`
  padding: 53.4rem 0 11rem 0;

  text-align: center;
  ${FONT_STYLES.M_28_HEADLINE};
  color: ${COLOR.BLACK};
`;

const StHomeButton = styled.button`
  width: 26rem;
  height: 7rem;
  padding: 1.8rem 5.5rem;

  border-radius: 1.4rem;
  background-color: ${COLOR.MAIN_BLUE};
  ${FONT_STYLES.SB_24_HEADLINE};
  color: ${COLOR.WHITE};
  cursor: pointer;
`;
