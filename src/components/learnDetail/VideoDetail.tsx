import { useBodyScrollLock } from '@src/hooks/common';
import { Tag } from '@src/types/learnDetail/remote';
import { COLOR, FONT_STYLES } from '@src/styles';
import styled from 'styled-components';

interface VideoDetailProps {
  channel: string;
  category: string;
  reportDate: string;
  title: string;
  tagsForView: Tag[];
  setIsGuideModalOpen: (isOpen: boolean) => void;
}

function VideoDetail(props: VideoDetailProps) {
  const { channel, category, reportDate, title, tagsForView, setIsGuideModalOpen } = props;
  const { lockScroll } = useBodyScrollLock();

  const handleGuideModalOpen = () => {
    lockScroll();
    setIsGuideModalOpen(true);
  };

  return (
    <StVideoDetail>
      <StLeft>
        <div>
          {channel} | {category} | {reportDate.replaceAll('-', '.')}
        </div>
        <h1>{title}</h1>
        <StTagContainer>
          {tagsForView.map(({ id, name }) => (
            <span key={id}>{name}</span>
          ))}
        </StTagContainer>
      </StLeft>
      <StRight>
        <button onClick={handleGuideModalOpen}>어떻게 학습하나요?</button>
      </StRight>
    </StVideoDetail>
  );
}

export default VideoDetail;

const StVideoDetail = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const StLeft = styled.div`
  & > div {
    display: flex;
    color: ${COLOR.GRAY_30};
    ${FONT_STYLES.SB_21_BODY};
  }

  & > h1 {
    width: 135rem;
    margin-top: 1.2rem;
    margin-bottom: 2rem;
    color: ${COLOR.BLACK};
    ${FONT_STYLES.B_32_HEADLINE};
    word-break: keep-all;
  }
`;

const StTagContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 4.8rem;

  & > span {
    padding: 1rem 1.6rem;
    border-radius: 2.4rem;
    color: ${COLOR.WHITE};
    background-color: ${COLOR.MAIN_BLUE};
    ${FONT_STYLES.R_18_CAPTION};
  }
`;

const StRight = styled.div`
  padding-top: 0.4rem;
  min-width: fit-content;

  & > button {
    padding: 0;
    color: ${COLOR.MAIN_BLUE};
    ${FONT_STYLES.SB_18_CAPTION};
    text-decoration: underline;
    text-underline-position: under;
  }
`;
