import styled from 'styled-components';
import ImageDiv from '../common/ImageDiv';
import { icMypageButton, icLogout } from 'public/assets/icons';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '@src/services/api';
import { useSetRecoilState } from 'recoil';
import { LoginState } from 'src/stores/LoginState';

function ProfileModal() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const setIsLoggedIn = useSetRecoilState(LoginState);
  useEffect(() => {
    const access_token = localStorage.getItem('token');
    if (access_token) {
      api.loginUserService
        .getUserInfo(access_token)
        .then((response) => {
          setNickname(response.nickname);
          setEmail(response.email ?? 'NO_EMAIL');
        })
        .catch((error) => console.error(error));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.reload();
  };

  return (
    <StProfileModal>
      <StProfileInfo>
        <ImageDiv className="profile-image" src={icMypageButton} layout="fill" alt="" />
        <p>{nickname}</p>
        {email !== 'NO_EMAIL' && <div>{email}</div>}
      </StProfileInfo>
      <StLogoutButton onClick={handleLogout}>
        <ImageDiv className="logout" src={icLogout} layout="fill" alt="" />
        로그아웃
      </StLogoutButton>
    </StProfileModal>
  );
}

export default ProfileModal;

const StProfileModal = styled.div`
  position: absolute;
  text-align: center;
  top: 7.6rem;
  right: 4rem;
  width: 38rem;
  background-color: ${COLOR.WHITE};
  box-shadow: 4px 4px 20px 0px #160f3526;
  border-radius: 1.034rem;

  z-index: 2;

  .profile-image {
    position: relative;
    margin: 4rem auto 2rem auto;
    width: 5.6rem;
    height: 5.6rem;
  }

  .logout {
    position: relative;
    width: 2.4rem;
    height: 2.4rem;
    margin-right: 0.8rem;
  }
`;

const StProfileInfo = styled.div`
  text-align: center;

  & > p {
    ${FONT_STYLES.SB_20_BODY};
  }

  & > div {
    height: 2.6rem;
    ${FONT_STYLES.R_17_CAPTION};
    color: ${COLOR.GRAY_45};
    margin: 0.4rem 0 4rem 0;
  }
`;

const StLogoutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 7.1rem;
  margin-top: 4rem;
  ${FONT_STYLES.R_18_CAPTION};
  color: ${COLOR.GRAY_45};
  border-top: 0.1rem ${COLOR.GRAY_10} solid;
  padding: 0;
`;
