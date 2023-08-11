import { useBodyScrollLock } from '@src/hooks/common';
import { loginState } from '@src/stores/loginState';
import { COLOR, FONT_STYLES } from '@src/styles';
import dynamic from 'next/dynamic';
import { icDeliverbleBlue, icDeliverbleWhite } from 'public/assets/icons';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import ImageDiv from '../common/ImageDiv';

const LoginModal = dynamic(() => import('@src/components/login/LoginModal'), { ssr: false });

interface HeaderProps {
  isFirstScrolled?: boolean;
  isSecondScrolled?: boolean;
}

function Header(props: HeaderProps) {
  const { isFirstScrolled = false, isSecondScrolled = false } = props;
  const { lockScroll, unlockScroll } = useBodyScrollLock();
  const loginValue = useRecoilValue(loginState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(loginValue);
  }, []);

  return (
    <>
      <StHeader isSecondScrolled={isSecondScrolled}>
        <ImageDiv
          src={isFirstScrolled ? icDeliverbleBlue : icDeliverbleWhite}
          className="logo"
          layout="fill"
          alt="딜리버블"
        />
        {!isLoggedIn && (
          <StLogin
            isFirstScrolled={isFirstScrolled}
            onClick={() => {
              lockScroll();
              setIsModalOpen(true);
            }}>
            로그인
          </StLogin>
        )}
      </StHeader>
      {isModalOpen && (
        <LoginModal
          closeModal={() => {
            unlockScroll();
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
}

export default Header;

const StHeader = styled.header<{ isSecondScrolled: boolean }>`
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 8.8rem;
  padding: 1.8rem 16rem;
  background: ${({ isSecondScrolled }) => isSecondScrolled && COLOR.WHITE};

  .logo {
    position: relative;
    width: 14rem;
    height: 5.6rem;
  }
`;

const StLogin = styled.button<{ isFirstScrolled: boolean }>`
  ${FONT_STYLES.SB_20_BODY};
  color: ${({ isFirstScrolled }) => (isFirstScrolled ? COLOR.MAIN_BLUE : COLOR.WHITE)};
`;
