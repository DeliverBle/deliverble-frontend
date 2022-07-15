import styled from 'styled-components';
import ImageDiv from '../common/ImageDiv';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icAlert, icCheckedBox, icEmptyBox } from 'public/assets/icons';
import { useState } from 'react';

interface HighlightModalProps {
  closeModal: () => void;
}

function HighlightModal(props: HighlightModalProps) {
  const { closeModal } = props;
  const [isClicked, setIsClicked] = useState(false);
  const handleCheck = () => {
    setIsClicked((prev) => !prev);
  };
  return (
    <StHighlightModal>
      <ImageDiv src={icAlert} className="alert" layout="fill" alt="" />
      <p>같은 단어를 하이라이트할 수 없어요!</p>
      <StTodayClose onClick={handleCheck}>
        {isClicked ? (
          <ImageDiv src={icCheckedBox} className="box checked" />
        ) : (
          <ImageDiv src={icEmptyBox} className="box empty" />
        )}
        <span>다시 보지 않기</span>
      </StTodayClose>
      <StOkayButton onClick={closeModal}>확인</StOkayButton>
    </StHighlightModal>
  );
}

export default HighlightModal;

const StHighlightModal = styled.div`
  position: relative;
  width: 37rem;
  height: 19.2rem;
  border-radius: 1.6rem;
  background-color: ${COLOR.WHITE};
  ${FONT_STYLES.SB_20_BODY};
  border: solid 0.2rem ${COLOR.GRAY_10};
  box-shadow: 0.2rem 0.4rem 4rem 0 rgba(22, 15, 53, 0.15);

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

  .box {
    position: relative;
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const StTodayClose = styled.div`
  position: absolute;
  left: 2.4rem;
  bottom: 2.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12.2rem;
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
