import { ImageDiv, Portal } from '@src/components/common';
import { COLOR, FONT_STYLES } from '@src/styles';
import Link from 'next/link';
import { icDeliverbleBlue, icKakao, icMicrophone, icXButton } from 'public/assets/icons';
import styled from 'styled-components';
import { KAKAO_AUTH_URL } from './OAuth';

interface LoginModalProps {
  closeModal: () => void;
}

function LoginModal(props: LoginModalProps) {
  const { closeModal } = props;
  return (
    <Portal selector="#portal">
      <StLoginModal>
        <StLoginModalBackground />
        <StLoginModalContent role="dialog" aria-modal="true" aria-labelledby="title">
          <ImageDiv onClick={closeModal} src={icXButton} className="x-button" layout="fill" alt="닫기" />
          <ImageDiv src={icDeliverbleBlue} className="logo" layout="fill" alt="딜리버블" />
          <p id="title">로그인하고 더 다양한 기능을 누려보세요.</p>
          <ImageDiv src={icMicrophone} className="microphone" layout="fill" alt="" />
          <Link href={KAKAO_AUTH_URL}>
            <StLoginButton>
              <ImageDiv src={icKakao} className="kakao-icon" layout="fill" alt="" />
              <a>카카오로 3초만에 시작하기</a>
            </StLoginButton>
          </Link>
        </StLoginModalContent>
      </StLoginModal>
    </Portal>
  );
}

export default LoginModal;

const StLoginModal = styled.div`
  .x-button {
    position: relative;
    width: 4.8rem;
    height: 4.8rem;
    margin: 1.6rem 0 0 39.8rem;
    cursor: pointer;
  }

  .logo {
    position: relative;
    width: 15.6rem;
    height: 6rem;
    margin: 0 auto;
  }

  .microphone {
    position: relative;
    width: 24.8rem;
    height: 24.8rem;
    margin: 3.6rem auto 4rem auto;
  }
`;

const StLoginModalBackground = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.78);

  z-index: 2;
`;

const StLoginModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 46.2rem;
  height: 58.8rem;
  border-radius: 2rem;
  background-color: white;

  z-index: 3;

  p {
    margin-top: 0.8rem;
    text-align: center;
    color: ${COLOR.MAIN_BLUE};
    ${FONT_STYLES.SB_20_BODY};
  }
`;

const StLoginButton = styled.button`
  display: flex;
  align-items: center;
  width: 35rem;
  height: 6.4rem;
  margin: 0 auto;
  border-radius: 1.4rem;
  background-color: #fee500;
  ${FONT_STYLES.M_18_CAPTION};

  .kakao-icon {
    position: relative;
    width: 2.4rem;
    height: 2.4rem;
    margin: 0 3.6rem 0 2rem;
  }
`;
