import styled from 'styled-components';
import ImageDiv from '../common/ImageDiv';
import { icButtonMypage, icLogout } from 'public/assets/icons';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { useEffect, useState } from 'react';

function ProfileModal() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    const userNickname = localStorage.getItem('nickname');
    const userEmail = localStorage.getItem('email');
    if (userNickname && userEmail) {
      setNickname(userNickname);
      setEmail(userEmail);
    }
  }, []);

  return (
    <StProfileModal>
      <ImageDiv className="profile-image" src={icButtonMypage} layout="fill" alt="profileImage" />
      <StProfileInfo>
        <p>{nickname}</p>
        <h2>{email}</h2>
      </StProfileInfo>
      <hr />
      <StLogoutButton>
        <ImageDiv className="logout" src={icLogout} layout="fill" alt="" />
        로그아웃
      </StLogoutButton>
    </StProfileModal>
  );
}

export default ProfileModal;

const StProfileModal = styled.div`
  position: absolute;
  top: 7.6rem;
  right: 4rem;
  width: 38rem;
  height: 28.5rem;
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

  & > hr {
    height: 0.1rem;
    margin: 0;
    border: 0;
    background-color: ${COLOR.GRAY_10};
  }
`;

const StProfileInfo = styled.div`
  text-align: center;

  & > p {
    ${FONT_STYLES.SB_20_BODY};
  }

  & > h2 {
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
  ${FONT_STYLES.R_18_CAPTION};
  color: ${COLOR.GRAY_45};
`;
