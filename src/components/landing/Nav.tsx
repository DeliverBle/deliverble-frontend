import styled from 'styled-components';
import { icDeliverble } from 'public/assets/icons';
import { COLOR } from 'src/styles/color';
import { FONT_STYLES } from 'src/styles/fontStyle';
import ImageDiv from '../common/ImageDiv';
import Link from 'next/link';

function Nav() {
  return (
    <StNav>
      <ImageDiv src={icDeliverble} className="logo" layout="fill" alt="" />
      <Link href="/login">
        <StLogin>로그인</StLogin>
      </Link>
    </StNav>
  );
}

export default Nav;

const StNav = styled.nav`
  display: flex;
  height: 8.8rem;
  gap: 160rem;
  background-color: rgba(0, 0, 0, 0);
  position: fixed;

  .logo {
    position: relative;
    width: 14rem;
    height: 5.6rem;

    top: 1.6rem;
    left: 6.4rem;
  }
`;

const StLogin = styled.a`
  position: fixed;
  margin-top: 2.9rem;
  right: 6.4rem;

  color: ${COLOR.MAIN_BLUE};
  ${FONT_STYLES.SB_20_BODY};

  cursor: pointer;
`;
