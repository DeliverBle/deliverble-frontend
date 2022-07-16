import styled from 'styled-components';
import { icDeliverbleBlue, icDeliverbleWhite } from 'public/assets/icons';
import { COLOR } from 'src/styles/color';
import { FONT_STYLES } from 'src/styles/fontStyle';
import ImageDiv from '../common/ImageDiv';
import Link from 'next/link';

interface NavProps {
  isFirstScrolled?: boolean;
  isSecondScrolled?: boolean;
}

function Nav(props: NavProps) {
  const { isFirstScrolled = false, isSecondScrolled = false } = props;

  return (
    <StNav isSecondScrolled={isSecondScrolled}>
      {isFirstScrolled ? (
        <ImageDiv src={icDeliverbleBlue} className="logo" layout="fill" alt="" />
      ) : (
        <ImageDiv src={icDeliverbleWhite} className="logo" layout="fill" alt="" />
      )}

      <Link href="/login">
        <StLogin isFirstScrolled={isFirstScrolled}>
          <a>로그인</a>
        </StLogin>
      </Link>
    </StNav>
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

  & > a {
    ${FONT_STYLES.SB_20_BODY};
    color: ${({ isFirstScrolled }) => (isFirstScrolled ? COLOR.MAIN_BLUE : COLOR.WHITE)};
  }
`;
