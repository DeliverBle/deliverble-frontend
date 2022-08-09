import ImageDiv from '@src/components/common/ImageDiv';
import { icAlert, icEmptyBox } from 'public/assets/icons';
import { StHighlightModal, StHighlightModalContent, StOkayButton, StTimeClosedSet } from './style';

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
