import ImageDiv from '@src/components/common/ImageDiv';
import { icGuideHighlight, icGuideSpacing, icXButton } from 'public/assets/icons';
import {
  StDescription,
  StGuideModal,
  StGuideModalBackground,
  StGuideModalContent,
  StModalSubtitle,
  StModalTitle,
} from './style';

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
          <ImageDiv onClick={closeModal} src={icXButton} className="x-button" layout="fill" alt="x" />
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
