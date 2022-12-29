import { Tag } from '@src/services/api/types/learn-detail';
import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';

interface VideoDetailProps {
  channel: string;
  category: string;
  reportDate: string;
  title: string;
  tags: Tag[];
  setIsModalOpen: (isOpen: boolean) => void;
}

function VideoDetail(props: VideoDetailProps) {
  const { channel, category, reportDate, title, tags, setIsModalOpen } = props;

  return (
    <StVideoDetail>
      <StLeft>
        <div>
          {channel} | {category} | {reportDate.replaceAll('-', '.')}
        </div>
        <h1>{title}</h1>
        <StTagContainer>
          {tags.map(({ id, name }) => (
            <span key={id}>{name}</span>
          ))}
        </StTagContainer>
      </StLeft>
      <StRight>
        <button onClick={() => setIsModalOpen(true)}>어떻게 학습하나요?</button>
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
