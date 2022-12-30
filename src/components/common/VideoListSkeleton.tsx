import styled from 'styled-components';
import VideoItemSkeleton from './VideoItemSkeleton';
import { COLOR } from '@src/styles/color';

interface VideoListSkeleton {
  itemNumber: number;
  haveCountSection?: boolean;
}

function VideoListSkeleton(props: VideoListSkeleton) {
  const { itemNumber, haveCountSection } = props;

  return (
    <StVideoListSkeleton>
      {haveCountSection && <StHeader />}
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

    @media (max-width: 1280px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 960px) {
      grid-template-columns: repeat(2, 1fr);
      grid-row-gap: 5.6rem;
    }

    @media (max-width: 500px) {
      grid-template-columns: repeat(1, 1fr);
      grid-row-gap: 2.4rem;
      zoom: 150%;
    }
  }
`;

const StHeader = styled.div`
  margin-bottom: 2.4rem;
  width: 13rem;
  height: 2rem;
  background-color: ${COLOR.GRAY_5};
  border-radius: 0.6rem;
`;
