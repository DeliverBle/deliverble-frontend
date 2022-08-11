import { Tag } from '@src/services/api/types/learn-detail';
import { StTagContainer, StVideoDetail } from './style';

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
