import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ImageDiv from '../../components/common/ImageDiv';
import GuideModal from '@src/components/learnDetail/GuideModal';
import HighlightModal from '@src/components/learnDetail/HighlightModal';
import ScriptEdit from '@src/components/learnDetail/ScriptEdit';
import {
  icXButton,
  icGuide,
  icMemo,
  icAnnounce,
  icHighlighterDefault,
  icHighlighterHover,
  icHighlighterClicked,
  icSpacingDefault,
  icSpacingHover,
  icSpacingClicked,
  icLikeDefault,
} from 'public/assets/icons';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { GetServerSidePropsContext } from 'next';
import { api } from '@src/services/api';
import { VideoData } from '@src/services/api/types/learn-detail';
import YouTube from 'react-youtube';
import SEO from '@src/components/common/SEO';

function LearnDetail({ videoData }: { videoData: VideoData }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  //같은 부분 하이라이트 했을 경우로 로직 변경해야 함.
  //useEffect의 빈 배열 -> '하이라이트 경고가 뜰 때 바뀌는 상태'로 바꿔주기.
  const [highlightAlert, setHighlightAlert] = useState(false);
  useEffect(() => {
    const now = new Date().getTime();
    const timeSaved = Number(localStorage.getItem('timeClicked'));
    if (timeSaved) {
      const gapHour = (now - timeSaved) / 1000 / 60 / 60;
      if (gapHour > 72) {
        setHighlightAlert(true);
      }
    } else {
      setHighlightAlert(true);
    }
  }, []);

  const [player, setPlayer] = useState<YT.Player | null>();
  const [videoState, setVideoState] = useState(-1);
  const [currentTime, setCurrentTime] = useState(0);
  const { title, category, channel, reportDate, tags, link, startTime, endTime, scripts } = videoData;

  useEffect(() => {
    if (!player) return;

    const interval =
      player &&
      setInterval(() => {
        setCurrentTime(player.getCurrentTime());
      }, 1000);

    if (videoState === 2 || videoState === 5) {
      interval && clearInterval(interval);
    }
    return () => interval && clearInterval(interval);
  }, [player, videoState]);

  const [isHighlight, setIsHighlight] = useState(false);
  const [isSpacing, setIsSpacing] = useState(false);

  return (
    <>
      <SEO title="학습하기 | Deliverble" />
      <StLearnDetail>
        <ImageDiv onClick={() => router.back()} src={icXButton} className="close" layout="fill" alt="x" />
        <StLearnMain>
          <aside>
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
              <ImageDiv src={icLikeDefault} className="like-button" layout="fill" />
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
                onStateChange={(e) => setVideoState(e.target.getPlayerState())}
                onEnd={(e) => e.target.seekTo(startTime)}
              />
            </StVideoWrapper>
            <StMemoWrapper>
              <ImageDiv src={icMemo} className="memo" layout="fill" />
              <h2>메모</h2>
            </StMemoWrapper>
          </aside>
          <StLearnSection>
            <div>
              <ImageDiv src={icAnnounce} className="announce" layout="fill" />
              <h2>아나운서의 목소리를 듣고, 스크립트를 보며 따라 말해보세요.</h2>
            </div>
            <article>
              <div>
                {!isHighlight &&
                  !isSpacing &&
                  scripts.map(({ id, text, startTime, endTime }) => (
                    <StScriptText
                      key={id}
                      onClick={() => player?.seekTo(startTime, true)}
                      isActive={startTime <= currentTime && currentTime <= endTime ? true : false}>
                      {text}
                    </StScriptText>
                  ))}
                {(isHighlight || isSpacing) && (
                  <ScriptEdit scripts={scripts} isHighlight={isHighlight} isSpacing={isSpacing} />
                )}
                {highlightAlert && <HighlightModal closeModal={() => setHighlightAlert(false)} />}
              </div>
              <div>
                <ImageDiv onClick={() => setIsModalOpen(true)} src={icGuide} className="guide" layout="fill" alt="?" />
                <StButtonContainer>
                  <StButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSpacing(false);
                      setIsHighlight(true);
                    }}>
                    {isHighlight ? (
                      <ImageDiv className="function-button" src={icHighlighterClicked} alt="하이라이트" />
                    ) : (
                      <>
                        <ImageDiv className="function-button" src={icHighlighterHover} alt="하이라이트" />
                        <ImageDiv className="default function-button" src={icHighlighterDefault} alt="하이라이트" />
                      </>
                    )}
                  </StButton>
                  <StButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSpacing(true);
                      setIsHighlight(false);
                    }}>
                    {isSpacing ? (
                      <ImageDiv className="spacing function-button" src={icSpacingClicked} alt="끊어 읽기" />
                    ) : (
                      <>
                        <ImageDiv className="spacing function-button" src={icSpacingHover} alt="끊어 읽기" />
                        <ImageDiv className="spacing default function-button" src={icSpacingDefault} alt="끊어 읽기" />
                      </>
                    )}
                  </StButton>
                </StButtonContainer>
              </div>
            </article>
          </StLearnSection>
        </StLearnMain>
        {isModalOpen && <GuideModal closeModal={() => setIsModalOpen(false)} />}
      </StLearnDetail>
    </>
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

const StLearnMain = styled.main`
  display: flex;
  margin: 0 auto;
  gap: 4.8rem;
  width: 172rem;
  height: 111.9rem;
  padding: 8rem 8rem 0 8rem;
  border-radius: 3rem;
  background-color: ${COLOR.WHITE};
`;

const StLearnSection = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 8rem;

  & > div {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    margin-top: 14rem;
    margin-bottom: 2.4rem;
  }

  & > div > h2 {
    color: ${COLOR.BLACK};
    ${FONT_STYLES.SB_24_HEADLINE};
  }

  .announce {
    position: relative;
    width: 3.2rem;
    height: 3.2rem;
  }

  article {
    display: flex;
    flex-direction: column;
    width: 84.2rem;
    height: 76rem;
    padding: 1.8rem 1.2rem 1.8rem 2rem;
    border: 0.2rem solid ${COLOR.GRAY_10};
    border-radius: 2.4rem;
    color: ${COLOR.BLACK};
    font-size: 2.6rem;
    line-height: 5.8rem;
    word-break: keep-all;

    & > div:first-child {
      position: relative;
      flex: 1;
      padding: 0.6rem 1.2rem;
      height: 62.8rem;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 1rem;
      }

      &::-webkit-scrollbar-thumb {
        background-color: ${COLOR.GRAY_10};
        border-radius: 1.3rem;
      }

      &::-webkit-scrollbar-track-piece {
        height: 13.6rem;
        max-height: 13.6rem;
      }
    }

    & > div:last-child {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 1.8rem;
      margin-top: 2.4rem;
      border-top: 0.2rem solid ${COLOR.GRAY_10};
    }
  }
`;

const StScriptText = styled.p<{ isActive: boolean }>`
  font-size: 2.6rem;
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  color: ${({ isActive }) => (isActive ? COLOR.MAIN_BLUE : COLOR.BLACK)};
  cursor: pointer;

  &:hover {
    color: ${COLOR.MAIN_BLUE};
    font-weight: 600;
  }
`;

const StButtonContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  position: relative;
`;

const StButton = styled.button`
  width: 4.8rem;
  height: 4.8rem;

  &:hover .default img {
    transition: opacity 1s;
    opacity: 0;
  }

  .function-button {
    cursor: pointer;
    position: absolute;
    top: 0;
  }
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

  .like-button {
    position: absolute;
    width: 4.8rem;
    height: 4.8rem;
    cursor: pointer;
    top: 2.4rem;
    right: 2.4rem;
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
