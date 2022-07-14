import styled from 'styled-components';
import { FONT_STYLES } from '@src/styles/fontStyle';
import ImageDiv from '../common/ImageDiv';
import { KAKAO_AUTH_URL } from 'src/pages/api/OAuth';
import Link from 'next/link';
import { icXButton, icKakao, icMicrophone } from 'public/assets/icons';
import { imgLogo } from 'public/assets/images';

function LoginModal() {
  return (
    <StLoginModal>
      <ImageDiv src={icXButton} className="x-button" layout="fill" alt="x" />
      <ImageDiv src={imgLogo} className="logo" layout="fill" alt="DeliverBle" />
      <ImageDiv src={icMicrophone} className="microphone" layout="fill" alt="마이크 아이콘" />
      <span>로그인하고 더 다양한 기능을 누려보세요.</span>
      <Link href={KAKAO_AUTH_URL}>
        <StLoginButton>
          <ImageDiv src={icKakao} className="kakao-button" layout="fill" alt="" />
          <a>카카오로 3초만에 시작하기</a>
        </StLoginButton>
      </Link>
    </StLoginModal>
  );
}

export default LoginModal;

const StLoginModal = styled.div`
  width: 46.2rem;
  height: 58.8rem;
  border: 1px black solid;

  .x-button {
    position: relative;
    width: 4.8rem;
    height: 4.8rem;
    cursor: pointer;
  }

  .logo {
    position: relative;
    width: 15.6rem;
    height: 6rem;
  }

  .microphone {
    position: relative;
    width: 24.8rem;
    height: 24.8rem;
  }
`;

const StLoginButton = styled.button`
  display: flex;
  align-items: center;
  width: 35rem;
  height: 6.4rem;
  border-radius: 1.4rem;
  background-color: #fee500;
  ${FONT_STYLES.M_18_CAPTION};

  .kakao-button {
    position: relative;
    width: 2.4rem;
    height: 2.4rem;
    margin: 0 3.6rem 0 2rem;
  }
`;
