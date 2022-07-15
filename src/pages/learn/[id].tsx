import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ImageDiv from '../../components/common/ImageDiv';
import GuideModal from '@src/components/learnDetail/GuideModal';
import { icXButton, icGuide, icMemo } from 'public/assets/icons';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { GetServerSidePropsContext } from 'next';
import { api } from '@src/services/api';
import { VideoData } from '@src/services/api/types/learn-detail';
import YouTube from 'react-youtube';

function LearnDetail({ videoData }: { videoData: VideoData }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [player, setPlayer] = useState();
  const { title, category, channel, reportDate, tags, link, startTime, endTime } = videoData;

  console.log(player);

  return (
    <StLearnDetail>
      <ImageDiv onClick={() => router.back()} src={icXButton} className="close" layout="fill" alt="x" />
      <StLearnSection>
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
        <StVideoWrapper>
          <button>하트</button>
          <YouTube
            videoId={link}
            opts={{
              width: '670',
              height: '376',
              playerVars: {
                modestbranding: 1,
                start: startTime,
                end: endTime,
                controls: 0,
              },
            }}
            onReady={(e) => setPlayer(e.target)}
            onEnd={(e) => e.target.seekTo(endTime)}
          />
        </StVideoWrapper>
        <StMemoWrapper>
          <ImageDiv src={icMemo} className="memo" layout="fill" />
          <h2>메모</h2>
        </StMemoWrapper>
        <ImageDiv onClick={() => setIsModalOpen(true)} src={icGuide} className="guide" layout="fill" alt="?" />
      </StLearnSection>
      {isModalOpen && <GuideModal closeModal={() => setIsModalOpen(false)} />}
    </StLearnDetail>
  );
}

export default LearnDetail;

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  const id = +(params?.id ?? -1);
  const response = await api.learnDetailService.getVideoData(id);
  if (response.id !== id) {
    return {
      notFound: true,
    };
  }
  return { props: { videoData: response } };
}

const StLearnDetail = styled.div`
  padding: 16rem 10rem;
  min-height: 100vh;
  background: rgba(229, 238, 255, 0.85);
  backdrop-filter: blur(2.8rem);

  .close {
    position: fixed;
    top: 2.4rem;
    right: 10rem;
    width: 4.8rem;
    height: 4.8rem;
    cursor: pointer;
  }

  .guide {
    position: relative;
    width: 3.4rem;
    height: 3.4rem;
    cursor: pointer;
  }
`;

const StLearnSection = styled.section`
  padding: 8rem;
  height: 111.9rem;
  border-radius: 3rem;
  background-color: ${COLOR.WHITE};
`;

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

const StVideoWrapper = styled.div`
  position: relative;
  margin-bottom: 4.8rem;
  width: fit-content;
  height: fit-content;
  border-radius: 2.4rem;
  overflow: hidden;

  & > button {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
    background: white;
  }

  video {
    position: relative;
    left: 0;
    top: 0;
    opacity: 1;
  }
`;

const StMemoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2.4rem;

  & > h2 {
    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_24_HEADLINE};
  }

  .memo {
    position: relative;
    width: 3.2rem;
    height: 3.2rem;
  }
`;
