import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { imgLogo } from 'public/assets/images';
import ImageDiv from 'src/components/common/ImageDiv';
import Link from 'next/link';
import { useRouter } from 'next/router';

function NavigationBar() {
  const router = useRouter();

  return (
    <StNavigationBar>
      <ImageDiv className="logo" src={imgLogo} priority={true} layout="fill" alt="" />
      <nav>
        <StTabList>
          <StTab>
            <Link href="/home">
              <a style={{ color: router.pathname === '/home' ? 'red' : 'blue' }}>홈</a>
            </Link>
          </StTab>
          <StTab>
            <Link href="/learn">
              <a>학습하기</a>
            </Link>
          </StTab>
          <StTab>
            <Link href="/review">
              <a>복습하기</a>
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
  ${FONT_STYLES.SB_24_HEADLINE};
`;

const StTab = styled.li`
  & > a {
    color: ${COLOR.GRAY_30};
  }
`;

const StLogin = styled.button`
  position: absolute;
  right: 6.4rem;
  color: ${COLOR.MAIN_BLUE};
  ${FONT_STYLES.B_20_BODY};
`;
