import styled from 'styled-components';
import { useState } from 'react';
import { icDeliverbleBlue, icDeliverbleWhite } from 'public/assets/icons';
import LoginModal from '../login/LoginModal';
import { COLOR } from 'src/styles/color';
import { FONT_STYLES } from 'src/styles/fontStyle';
import ImageDiv from '../common/ImageDiv';
import { loginState } from '@src/stores/loginState';
import { useRecoilValue } from 'recoil';
import { useBodyScrollLock } from '@src/hooks/useBodyScrollLock';

interface HeaderProps {
  isFirstScrolled?: boolean;
  isSecondScrolled?: boolean;
}

function Header(props: HeaderProps) {
  const { isFirstScrolled = false, isSecondScrolled = false } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = useRecoilValue(loginState);
  const { lockScroll, unlockScroll } = useBodyScrollLock();

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
