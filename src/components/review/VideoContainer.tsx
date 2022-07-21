import styled from 'styled-components';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { COLOR } from '@src/styles/color';
import { VideoData } from '@src/services/api/types/review';
import NewsList from '../common/NewsList';
import Empty from './Empty';

interface VideoContainerProps {
  tab: string;
  videoList: VideoData[];
}

function VideoContainer(props: VideoContainerProps) {
  const { tab, videoList } = props;

  return (
    <StVideoContainer>
      {tab === 'isLiked' && (
        <StCountVideo>
          전체
          <span> {videoList.length}개 </span>
          영상
        </StCountVideo>
      )}
      <StVideoWrapper>
        {tab === 'isLiked' ? (
          videoList.length ? (
            <NewsList newsList={videoList} />
          ) : (
            <Empty tab={tab} />
          )
        ) : (
          <Empty tab={tab} />
        )}
      </StVideoWrapper>
    </StVideoContainer>
  );
}

export default VideoContainer;

const StVideoContainer = styled.div``;

const StCountVideo = styled.div`
  margin-bottom: 2.4rem;
  ${FONT_STYLES.M_20_BODY};
  color: ${COLOR.GRAY_30};

  & > span {
    color: ${COLOR.MAIN_BLUE};
  }
`;

const StVideoWrapper = styled.section`
  margin: 0 auto;
`;
