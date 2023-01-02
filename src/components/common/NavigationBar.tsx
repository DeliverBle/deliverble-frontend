import { useBodyScrollLock } from '@src/hooks/useBodyScrollLock';
import { loginState } from '@src/stores/loginState';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { icDeliverbleNav, icMypageButton } from 'public/assets/icons';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import LoginModal from '../login/LoginModal';
import ImageDiv from './ImageDiv';
import ProfileModal from './ProfileModal';

function NavigationBar() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const profileModalRef = useRef<HTMLDivElement>(null);
  const profileImageRef = useRef<HTMLButtonElement>(null);
  const login = useRecoilValue(loginState);
  const { lockScroll, unlockScroll } = useBodyScrollLock();

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const eventTarget = e.target as HTMLElement;
      if (
        isProfileModalOpen &&
        !profileModalRef?.current?.contains(eventTarget) &&
        !profileImageRef?.current?.contains(eventTarget)
      ) {
        setIsProfileModalOpen(false);
      }
    };
    if (isProfileModalOpen) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isProfileModalOpen]);

  return (
    <>
      <StNavigationBar>
        <Link href="/home">
          <a>
            <ImageDiv className="logo" priority src={icDeliverbleNav} layout="fill" alt="딜리버블" />
          </a>
        </Link>
        <nav>
          <StTabList>
            <StTab isActive={router.pathname === '/home'}>
              <Link href="/home">
                <a>홈</a>
              </Link>
            </StTab>
            <StTab isActive={router.pathname.includes('/learn')}>
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
        {login ? (
          <StLoginButton ref={profileImageRef}>
            <ImageDiv
              onClick={() => setIsProfileModalOpen((prev) => !prev)}
              className="profile"
              src={icMypageButton}
              layout="fill"
              alt=""
            />
          </StLoginButton>
        ) : (
          <StLoginButton
            onClick={() => {
              lockScroll();
              setIsModalOpen(true);
            }}>
            로그인
          </StLoginButton>
        )}
        {isProfileModalOpen && (
          <div ref={profileModalRef}>
            <ProfileModal />
          </div>
        )}
      </StNavigationBar>
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

export default dynamic(() => Promise.resolve(NavigationBar), { ssr: false });

const StNavigationBar = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 2;

  width: 100%;
  height: 8.8rem;

  box-shadow: 0.2rem 0.4rem 4rem 0 rgba(22, 15, 53, 0.1);
  background-color: ${COLOR.WHITE};

  .logo {
    position: relative;

    width: 12rem;
    height: 3.7rem;

    margin: 0 7.2rem 0 16rem;

    @media (max-width: 960px) {
      margin-left: 8.6rem;
    }

    @media (max-width: 500px) {
      margin: 0 3.2rem 0 2.4rem;
    }
  }

  .profile {
    position: relative;
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
    padding: 2.6rem 0 2.5rem 0;

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

const StLoginButton = styled.button`
  position: absolute;
  right: 16rem;

  @media (max-width: 960px) {
    right: 8.6rem;
  }

  @media (max-width: 500px) {
    display: none;
  }

  color: ${COLOR.MAIN_BLUE};
  ${FONT_STYLES.B_20_BODY};
`;
