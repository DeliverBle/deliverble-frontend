import styled from 'styled-components';
import VideoItemSkeleton from './VideoItemSkeleton';
import { COLOR } from '@src/styles/color';

interface VideoListSkeleton {
  itemNumber: number;
}

function VideoListSkeleton(props: VideoListSkeleton) {
  const { itemNumber } = props;

  return (
    <StVideoListSkeleton>
      <StHeader />
      <div>
        {new Array(itemNumber).fill('').map((_, i) => (
          <VideoItemSkeleton key={i} />
        ))}
      </div>
    </StVideoListSkeleton>
  );
}

export default VideoListSkeleton;

const StVideoListSkeleton = styled.div`
  padding-top: 0.8rem;
  margin-bottom: 45.2rem;

  & > div {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 11.2rem;
    grid-column-gap: 2rem;
  }
`;

const StHeader = styled.div`
  margin-bottom: 2.4rem;
  width: 13rem;
  height: 2rem;
  background-color: ${COLOR.GRAY_5};
  border-radius: 0.6rem;
`;
