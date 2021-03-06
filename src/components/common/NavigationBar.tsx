import styled, { css } from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { imgLogo } from 'public/assets/images';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ImageDiv from './ImageDiv';
import LoginModal from '../login/LoginModal';
import { icMypageButton } from 'public/assets/icons';
import ProfileModal from './ProfileModal';

function NavigationBar() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    handleLoginState();
  }, []);

  const handleLoginState = () => {
    const tokenValue = localStorage.getItem('token');
    if (tokenValue) {
      setLoginState(true);
    }
  };

  return (
    <>
      <StNavigationBar>
        <Link href="/home">
          <a>
            <ImageDiv className="logo" priority src={imgLogo} layout="fill" alt="DeliverBle" />
          </a>
        </Link>
        <nav>
          <StTabList>
            <StTab isActive={router.pathname === '/home'}>
              <Link href="/home">
                <a>홈</a>
              </Link>
            </StTab>
            <StTab isActive={router.pathname === '/learn'}>
              <Link href="/learn">
                <a>학습하기</a>
              </Link>
            </StTab>
            <StTab isActive={router.pathname === '/review'}>
              <Link href="/review">
                <a>복습하기</a>
              </Link>
            </StTab>
          </StTabList>
        </nav>
        {loginState && (
          <ImageDiv
            onClick={() => setIsProfileModalOpen((prev) => !prev)}
            className="profile"
            src={icMypageButton}
            layout="fill"
            alt=""
          />
        )}
        {!loginState && <StLogin onClick={() => setIsModalOpen(true)}>로그인</StLogin>}
        {isProfileModalOpen && <ProfileModal />}
      </StNavigationBar>
      {isModalOpen && <LoginModal closeModal={() => setIsModalOpen(false)} />}
    </>
  );
}

export default NavigationBar;

const StNavigationBar = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  position: sticky;
  top: 0;
  z-index: 1;

  width: 100%;
  height: 8.8rem;
  padding: 0 6.4rem;

  box-shadow: 0.2rem 0.4rem 4rem 0 rgba(22, 15, 53, 0.1);
  background-color: ${COLOR.WHITE};

  .logo {
    position: relative;

    width: 14rem;
    height: 5.6rem;
    margin-right: 5.6rem;
  }

  .profile {
    position: absolute;
    right: 6.4rem;
    width: 4rem;
    height: 4rem;

    cursor: pointer;
  }
`;

const StTabList = styled.ul`
  display: flex;
  gap: 4rem;
  ${FONT_STYLES.M_24_HEADLINE};
`;

const StTab = styled.li<{ isActive: boolean }>`
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

  ${({ isActive }) =>
    isActive &&
    css`
      border-bottom: 0.45rem solid transparent;
      border-image: linear-gradient(45deg, ${COLOR.SUB_PURPLE}, ${COLOR.MAIN_BLUE});
      border-image-slice: 1;
      & > a {
        color: ${COLOR.BLACK};
        ${FONT_STYLES.SB_24_HEADLINE};
      }
    `}
`;

const StLogin = styled.button`
  position: absolute;
  right: 6.4rem;

  color: ${COLOR.MAIN_BLUE};
  ${FONT_STYLES.B_20_BODY};
`;
