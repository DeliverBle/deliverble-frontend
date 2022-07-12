import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { COLOR } from '@src/styles/color';

// interface VideoList {
//   id: number;
//   videoId: string;
//   title: string;
//   channel: string;
//   category: string;
//   date: string;
// }

interface VideoContainerProps {
  tab: string;
}
function VideoContainer(props: VideoContainerProps) {
  const { tab } = props;
  const [countVideo, setCountVideo] = useState(0);
  // const [videoList, setVideoList] = useState<VideoList[]>([]);

  useEffect(() => {
    setCountVideo(13);
    // setVideoList();
  }, []);

  return (
    <StVideoContainer>
      <StCountVideo>
        <p>전체</p>
        <span>{countVideo}개</span>
        <p>영상</p>
      </StCountVideo>
      <StVideoWrapper>
        {tab === 'isLiked' ? <p>isLiked</p> : <p>isLearned</p>}
        {/* {videoList ? videoList.map(item:VideoList,idx :number)=>{
        const {id, videoId, title, channel, category, data}=item;
      }):"novideo"} */}
      </StVideoWrapper>
    </StVideoContainer>
  );
}

export default VideoContainer;

const StVideoContainer = styled.div`
  margin-top: 9.6rem;
  margin-left: 16rem;
`;

const StCountVideo = styled.article`
  display: flex;
  gap: 0.4rem;

  ${FONT_STYLES.M_20_BODY};
  color: ${COLOR.GRAY_30};

  & > span {
    color: ${COLOR.MAIN_BLUE};
  }
`;

const StVideoWrapper = styled.section`
  display: flex;
  margin-top: 2.4rem;
`;
