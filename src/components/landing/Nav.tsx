import styled from 'styled-components';
import { useState } from 'react';
import { icDeliverbleBlue, icDeliverbleWhite } from 'public/assets/icons';
import LoginModal from '../login/LoginModal';
import { COLOR } from 'src/styles/color';
import { FONT_STYLES } from 'src/styles/fontStyle';
import ImageDiv from '../common/ImageDiv';

interface NavProps {
  isFirstScrolled?: boolean;
  isSecondScrolled?: boolean;
}

function Nav(props: NavProps) {
  const { isFirstScrolled = false, isSecondScrolled = false } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <StNav isSecondScrolled={isSecondScrolled}>
        {isFirstScrolled ? (
          <ImageDiv src={icDeliverbleBlue} className="logo" layout="fill" alt="" />
        ) : (
          <ImageDiv src={icDeliverbleWhite} className="logo" layout="fill" alt="" />
        )}

        <StLogin isFirstScrolled={isFirstScrolled} onClick={() => setIsModalOpen(true)}>
          로그인
        </StLogin>
      </StNav>
      {isModalOpen && <LoginModal closeModal={() => setIsModalOpen(false)} />}
    </>
  );
}

export default Nav;

const StNav = styled.nav<{ isSecondScrolled: boolean }>`
  display: flex;
  gap: 160rem;
  position: fixed;
  z-index: 1;

  width: 100%;
  height: 8.8rem;

  background: ${({ isSecondScrolled }) => isSecondScrolled && COLOR.WHITE};

  .logo {
    position: relative;
    width: 14rem;
    height: 5.6rem;

    top: 1.6rem;
    left: 6.4rem;
  }
`;

const StLogin = styled.button<{ isFirstScrolled: boolean }>`
  position: fixed;
  margin-top: 2.9rem;
  right: 6.4rem;
  ${FONT_STYLES.SB_20_BODY};
  color: ${({ isFirstScrolled }) => (isFirstScrolled ? COLOR.MAIN_BLUE : COLOR.WHITE)};
`;
