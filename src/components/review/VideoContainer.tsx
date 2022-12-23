import styled from 'styled-components';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { COLOR } from '@src/styles/color';
import { VideoData } from '@src/services/api/types/review';
import NewsList from '../common/NewsList';
import Pagination from '../common/Pagination';
import Empty from './Empty';
import { BLOCK_SIZE, LIST_SIZE } from '@src/utils/constant';

interface VideoContainerProps {
  tab: string;
  videoList: VideoData[];
  onClickLike: (id: number) => void;
  totalCount: number;
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

function VideoContainer(props: VideoContainerProps) {
  const { tab, videoList, onClickLike, totalCount, currentPage, lastPage, onPageChange } = props;

  return (
    <>
      {tab === 'isFavorite' && totalCount > 0 && (
        <StCountVideo>
          전체
          <span> {totalCount}개 </span>
          영상
        </StCountVideo>
      )}
      <StVideoWrapper>
        {tab === 'isFavorite' ? (
          videoList.length ? (
            <StNewsList>
              <NewsList newsList={videoList} onClickLike={onClickLike} type="normal" />
              <Pagination
                listSize={LIST_SIZE}
                blockSize={BLOCK_SIZE}
                currentPage={currentPage}
                lastPage={lastPage}
                onPageChange={onPageChange}
              />
            </StNewsList>
          ) : (
            <Empty tab={tab} />
          )
        ) : (
          <Empty tab={tab} />
        )}
      </StVideoWrapper>
    </>
  );
}

export default VideoContainer;

const StCountVideo = styled.div`
  margin-bottom: 2.4rem;
  ${FONT_STYLES.M_20_BODY};
  color: ${COLOR.GRAY_30};

  & > span {
    color: ${COLOR.MAIN_BLUE};
    font-weight: 600;
  }
`;

const StVideoWrapper = styled.section`
  margin: 0 auto;
`;

const StNewsList = styled.div`
  & > section {
    margin-bottom: 13.6rem;
  }
`;
