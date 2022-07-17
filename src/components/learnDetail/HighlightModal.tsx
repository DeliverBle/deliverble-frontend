import styled from 'styled-components';
import ImageDiv from '../common/ImageDiv';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icAlert, icEmptyBox } from 'public/assets/icons';

interface HighlightModalProps {
  closeModal: () => void;
}

function HighlightModal(props: HighlightModalProps) {
  const { closeModal } = props;

  const handleExpireTime = () => {
    const timeClicked = JSON.stringify(new Date().getTime());
    localStorage.setItem('timeClicked', timeClicked);
  };

  return (
    <StHighlightModal>
      <StHighlightModalContent>
        <ImageDiv src={icAlert} className="alert" layout="fill" alt="" />
        <p>같은 단어를 하이라이트할 수 없어요!</p>
        <StTimeClosedSet
          onClick={() => {
            closeModal();
            handleExpireTime();
          }}>
          <ImageDiv src={icEmptyBox} className="checkbox" layout="fill" alt="checkbox" />
          <span>3일 동안 보지 않기</span>
        </StTimeClosedSet>
        <StOkayButton onClick={closeModal}>확인</StOkayButton>
      </StHighlightModalContent>
    </StHighlightModal>
  );
}

export default HighlightModal;

const StHighlightModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const StHighlightModalContent = styled.div`
  position: fixed;
  transform: translate(-50%, -50%);
  width: 37rem;
  height: 19.2rem;
  border-radius: 1.6rem;
  border: solid 0.2rem ${COLOR.GRAY_10};
  background-color: ${COLOR.WHITE};
  box-shadow: 0.2rem 0.4rem 4rem 0 rgba(22, 15, 53, 0.15);
  ${FONT_STYLES.SB_20_BODY};

  p {
    text-align: center;
    margin-top: 1.2rem;
  }

  .alert {
    position: relative;
    width: 3.2rem;
    height: 3.2rem;
    margin: 3.2rem auto 0 auto;
  }

  .checkbox {
    position: relative;
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const StTimeClosedSet = styled.div`
  position: absolute;
  left: 2.4rem;
  bottom: 2.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14.9rem;
  height: 2.5rem;
  cursor: pointer;

  span {
    ${FONT_STYLES.M_16_CAPTION};
    color: ${COLOR.GRAY_45};
    margin-left: 0.8rem;
  }
`;

const StOkayButton = styled.button`
  position: absolute;
  bottom: 2.2rem;
  right: 3.2rem;
  ${FONT_STYLES.SB_20_BODY};
  color: ${COLOR.MAIN_BLUE};
`;
