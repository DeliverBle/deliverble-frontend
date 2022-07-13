import styled from 'styled-components';
import ImageDiv from '../common/ImageDiv';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { icGuideHighlight, icGuideSpacing, icXButton } from 'public/assets/icons';

interface GuideModalProps {
  closeModal: () => void;
}

function GuideModal(props: GuideModalProps) {
  const { closeModal } = props;

  return (
    <StGuideModal>
      <StGuideModalBackground />
      <StGuideModalContent>
        <div>
          <StModalTitle>딜리버블 학습 기능 설명</StModalTitle>
          <ImageDiv onClick={closeModal} src={icXButton} className="x-button" layout="fill" alt="" />
        </div>
        <div>
          <ImageDiv src={icGuideHighlight} className="icon" layout="fill" alt="" />
          <StDescription>
            <StModalSubtitle>하이라이트</StModalSubtitle>
            <p>
              아나운서가 강조하는 핵심 키워드, 발음이 어려운 키워드를 표시해보세요.
              <br />
              아이콘을 누르고 드래그하면 하이라이트 완료! 우클릭하여 메모도 남길 수 있습니다.
            </p>
          </StDescription>
        </div>
        <div>
          <ImageDiv src={icGuideSpacing} className="icon" layout="fill" alt="" />
          <StDescription>
            <StModalSubtitle>끊어 읽기</StModalSubtitle>
            <p>
              아나운서처럼 자연스럽게 끊어서 읽어봐요!
              <br />
              아이콘을 누르고 단어 사이의 공백에 끊어 읽기를 표시해보세요.
            </p>
          </StDescription>
        </div>
      </StGuideModalContent>
    </StGuideModal>
  );
}

export default GuideModal;

const StGuideModal = styled.div`
  .x-button {
    position: relative;
    width: 4.8rem;
    height: 4.8rem;
    cursor: pointer;
  }

  .icon {
    position: relative;
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const StGuideModalBackground = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.78);
  z-index: 1;
`;

const StGuideModalContent = styled.div`
  width: 66.3rem;
  height: 34.5rem;
  padding: 1.6rem 1.6rem 4rem 2.8rem;
  border-radius: 1.6rem;
  background-color: ${COLOR.WHITE};
  box-shadow: 0.4rem 0.4rem 2rem rgba(22, 15, 53, 0.15);

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  & > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3.2rem;
  }

  & > div:not(:first-child) {
    display: flex;
    gap: 1.2rem;
  }

  & > div:last-child {
    margin-top: 3.6rem;
  }
`;

const StModalTitle = styled.div`
  color: ${COLOR.BLACK};
  ${FONT_STYLES.SB_24_HEADLINE};
`;

const StModalSubtitle = styled.div`
  margin-bottom: 0.8rem;
  color: ${COLOR.MAIN_BLUE};
  ${FONT_STYLES.SB_20_BODY};
`;

const StDescription = styled.div`
  p {
    color: ${COLOR.GRAY_80};
    ${FONT_STYLES.R_18_CAPTION};
  }
`;
