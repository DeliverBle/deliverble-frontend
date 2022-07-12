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
              <a
                style={{
                  color: router.pathname === '/' ? `${COLOR.BLACK}` : `${COLOR.GRAY_30}`,
                }}>
                홈
                <StUnderline />
              </a>
            </Link>
          </StTab>
          <StTab>
            <Link href="/learn">
              <a style={{ color: router.pathname === '/learn' ? `${COLOR.BLACK}` : `${COLOR.GRAY_30}` }}>학습하기</a>
            </Link>
          </StTab>
          <StTab>
            <Link href="/review">
              <a style={{ color: router.pathname === '/review' ? `${COLOR.BLACK}` : `${COLOR.GRAY_30}` }}>복습하기</a>
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
  position: relative;
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
    display: block;
  }
`;

const StUnderline = styled.div`
  background: linear-gradient(45deg, ${COLOR.SUB_PURPLE}, ${COLOR.MAIN_BLUE});
  //홈 글자의 너비만큼 하려면?
  //display: inline-block;
  width: 4rem;
  height: 0.3rem;
  position: absolute;
  bottom: 0;
`;

const StLogin = styled.button`
  position: fixed;
  right: 6.4rem;
  color: ${COLOR.MAIN_BLUE};
  ${FONT_STYLES.B_20_BODY};
`;
