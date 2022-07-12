import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ImageDiv from './ImageDiv';
import { imgLogo } from 'public/assets/images';

function NavigationBar() {
  const router = useRouter();

  return (
    <StNavigationBar>
      <ImageDiv className="logo" priority src={imgLogo} layout="fill" alt="" />
      <nav>
        <StTabList>
          <StTab>
            <Link href="/">
              <a className={router.pathname === '/' ? 'clicked' : ''}>홈</a>
            </Link>
          </StTab>
          <StTab>
            <Link href="/learn">
              <a className={router.pathname === '/learn' ? 'clicked' : ''}>학습하기</a>
            </Link>
          </StTab>
          <StTab>
            <Link href="/review">
              <a className={router.pathname === '/review' ? 'clicked' : ''}>복습하기</a>
            </Link>
          </StTab>
        </StTabList>
      </nav>
      <StLogin>로그인</StLogin>
    </StNavigationBar>
  );
}

export default NavigationBar;

const StNavigationBar = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  width: 100%;
  height: 8.8rem;
  padding: 0 6.4rem;

  box-shadow: 0.2rem 0.4rem 4rem 0 rgba(22, 15, 53, 0.1);

  .logo {
    position: relative;

    width: 14rem;
    height: 5.6rem;
    margin-right: 5.6rem;
  }
`;

const StTabList = styled.ul`
  display: flex;
  gap: 4rem;
  ${FONT_STYLES.M_24_HEADLINE};
`;

const StTab = styled.li`
  width: 9rem;

  &:first-of-type {
    width: 4rem;
  }

  & > a {
    display: block;
    text-align: center;
    padding: 2.7rem 0 2.5rem 0;

    color: ${COLOR.GRAY_30};
    :hover {
      color: ${COLOR.BLACK};
    }
  }

  .clicked {
    border-bottom: 0.3rem solid transparent;
    border-image: linear-gradient(45deg, ${COLOR.SUB_PURPLE}, ${COLOR.MAIN_BLUE});
    border-image-slice: 1;
    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_24_HEADLINE};
  }
`;

const StLogin = styled.button`
  position: fixed;
  right: 6.4rem;
  color: ${COLOR.MAIN_BLUE};
  ${FONT_STYLES.B_20_BODY};
`;
