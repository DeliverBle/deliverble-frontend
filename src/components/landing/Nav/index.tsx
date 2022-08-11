import { useState } from 'react';
import { icDeliverbleBlue, icDeliverbleWhite } from 'public/assets/icons';
import LoginModal from '../../login/LoginModal';
import ImageDiv from '../../common/ImageDiv';
import { StLogin, StNav } from './style';

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
        <ImageDiv src={isFirstScrolled ? icDeliverbleBlue : icDeliverbleWhite} className="logo" layout="fill" alt="" />

        <StLogin isFirstScrolled={isFirstScrolled} onClick={() => setIsModalOpen(true)}>
          로그인
        </StLogin>
      </StNav>
      {isModalOpen && <LoginModal closeModal={() => setIsModalOpen(false)} />}
    </>
  );
}

export default Nav;
