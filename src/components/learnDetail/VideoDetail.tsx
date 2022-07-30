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
}

function VideoDetail(props: VideoDetailProps) {
  const { channel, category, reportDate, title, tags } = props;

  return (
    <StVideoDetail>
      <div>
        {channel} | {category} | {reportDate.replaceAll('-', '.')}
      </div>
      <h1>{title}</h1>
      <StTagContainer>
        {tags.map(({ id, name }) => (
          <span key={id}>{name}</span>
        ))}
      </StTagContainer>
    </StVideoDetail>
  );
}

export default VideoDetail;

const StVideoDetail = styled.div`
  & > div {
    display: flex;
    color: ${COLOR.GRAY_30};
    ${FONT_STYLES.M_21_BODY};
  }

  & > h1 {
    margin-top: 1.2rem;
    margin-bottom: 2rem;
    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_32_HEADLINE};
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
    ${FONT_STYLES.SB_18_CAPTION};
  }
`;
