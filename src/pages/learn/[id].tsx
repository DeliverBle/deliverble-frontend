import React, { useState, useEffect, useRef } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import YouTube from 'react-youtube';
import SEO from '@src/components/common/SEO';
import ImageDiv from '@src/components/common/ImageDiv';
import Like from '@src/components/common/Like';
import GuideModal from '@src/components/learnDetail/GuideModal';
import EmptyMemo from '@src/components/learnDetail/memo/EmptyMemo';
import MemoList from '@src/components/learnDetail/memo/MemoList';
import ScriptEdit from '@src/components/learnDetail/ScriptEdit';
import ContextMenu from '@src/components/learnDetail/ContextMenu';
import VideoDetail from '@src/components/learnDetail/VideoDetail';
import ConfirmModal from '@src/components/learnDetail/ConfirmModal';
import LoginModal from '@src/components/login/LoginModal';
import { api } from '@src/services/api';
import { HighlightData, VideoData } from '@src/services/api/types/learn-detail';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import {
  icXButton,
  icMemo,
  icAnnounce,
  icHighlighterDefault,
  icHighlighterHover,
  icHighlighterClicked,
  icSpacingDefault,
  icSpacingHover,
  icSpacingClicked,
} from 'public/assets/icons';

function LearnDetail({ videoData, highlightData }: { videoData: VideoData; highlightData: HighlightData[] }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [mainText, setMainText] = useState('');
  const [subText, setSubText] = useState('');
  const [cancelButtonText, setCancelButtonText] = useState('');
  const [confirmButtonText, setConfirmButtonText] = useState('');
  const [isHighlight, setIsHighlight] = useState(false);
  const [isSpacing, setIsSpacing] = useState(false);
  const [clickedScriptId, setClickedScriptId] = useState<number>();
  const [clickedHighlightId, setClickedHighlightId] = useState<number>();
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [isNewMemo, setIsNewMemo] = useState(false);
  const [keyword, setKeyword] = useState<string>();
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isFirstClicked, setIsFirstClicked] = useState(false);
  const [player, setPlayer] = useState<YT.Player | null>();
  const [videoState, setVideoState] = useState(-1);
  const [currentTime, setCurrentTime] = useState(0);
  const { link, startTime, endTime, scripts } = videoData;
  const learnRef = useRef<HTMLDivElement>(null);
  const getLoginStatus = () => localStorage.getItem('token') ?? '';
  const [prevLink, setPrevLink] = useState('');

  const controlPointX = (e: React.MouseEvent) => {
    const x = e.nativeEvent.offsetX / 10;
    const y = e.nativeEvent.offsetY / 10;

    if (x > 40) {
      return { x: x + x * 0.2, y: y + y * 0.5 };
    }
    return { x: x + x * 0.5, y: y + y * 0.5 };
  };

  const handleRightClick = (e: React.MouseEvent, id: number) => {
    if (isNewMemo) {
      setClickedScriptId(-1);
      return setIsConfirmOpen(true);
    }
    setClickedScriptId(id);
    setPoints(controlPointX(e));
    setClickedHighlightId(() => Number((e.target as HTMLDivElement).id));
    setKeyword((e.target as HTMLDivElement).innerText);
  };

  useEffect(() => {
    if (!player) return;

    const interval =
      player &&
      setInterval(() => {
        setCurrentTime(player.getCurrentTime());
      }, 100);

    if (videoState === 2 || videoState === 5) {
      interval && clearInterval(interval);
    }
    return () => interval && clearInterval(interval);
  }, [player, videoState]);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const eventTarget = e.target as HTMLElement;
      if (clickedScriptId && !contextMenuRef?.current?.contains(eventTarget)) {
        setClickedScriptId(-1);
      }
    };
    window.addEventListener('click', handleClickOutside);
  }, [clickedScriptId]);

  useEffect(() => {
    setMainText('메모 작성을 취소하시겠습니까?');
    setSubText('작성 취소 선택시, 작성된 메모는 저장되지 않습니다.');
    setCancelButtonText('작성하기');
    setConfirmButtonText('작성 취소');
    const storage = globalThis?.sessionStorage;
    setPrevLink(storage.getItem('prevPrevPath') || '/');
  }, []);

  return (
    <>
      <SEO title="학습하기 | Deliverble" />
      <StLearnDetail>
        <ImageDiv
          onClick={() => {
            if (getLoginStatus() === '') {
              router.back();
            } else {
              router.push(prevLink);
            }
          }}
          src={icXButton}
          className="close"
          layout="fill"
          alt="x"
        />
        <StLearnMain>
          <aside>
            <VideoDetail {...videoData} />
            <StVideoWrapper>
              <Like
                isFromList={false}
                toggleLike={() => {
                  if (getLoginStatus() === '') {
                    setIsLoginModalOpen(true);
                  } else {
                    // 즐겨찾기 API 연결하는 코드
                  }
                }}
              />
              <YouTube
                videoId={link}
                opts={{
                  width: '670',
                  height: '376',
                  playerVars: {
                    modestbranding: 1,
                    start: startTime,
                    end: Math.ceil(endTime),
                    controls: 0,
                  },
                }}
                onReady={(e) => setPlayer(e.target)}
                onStateChange={(e) => setVideoState(e.target.getPlayerState())}
                onEnd={(e) => e.target.seekTo(startTime)}
              />
            </StVideoWrapper>
            <StMemoContainer>
              <StMemoTitle>
                <ImageDiv src={icMemo} className="memo" layout="fill" />
                <h2>메모</h2>
              </StMemoTitle>
              <StMemoWrapper>
                {highlightData ? (
                  <MemoList
                    highlightList={highlightData}
                    isNewMemo={isNewMemo}
                    setIsNewMemo={setIsNewMemo}
                    highlightId={clickedHighlightId}
                    keyword={keyword}
                  />
                ) : (
                  <EmptyMemo />
                )}
              </StMemoWrapper>
            </StMemoContainer>
          </aside>
          <StLearnSection>
            <div>
              <ImageDiv src={icAnnounce} className="announce" layout="fill" />
              <h2>아나운서의 목소리를 듣고, 스크립트를 보며 따라 말해보세요.</h2>
            </div>
            <article>
              <div ref={learnRef}>
                {!isFirstClicked &&
                  scripts.map(({ id, text, startTime, endTime }) => (
                    <StScriptText
                      ref={contextMenuRef}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        handleRightClick(e, id);
                      }}
                      key={id}
                      onClick={() => player?.seekTo(startTime, true)}
                      isActive={startTime <= currentTime && currentTime < endTime ? true : false}>
                      <p id={id.toString()}>{text}</p>
                      {clickedScriptId === id && !isNewMemo && (
                        <ContextMenu points={points} setIsNewMemo={setIsNewMemo} />
                      )}
                    </StScriptText>
                  ))}
                {isFirstClicked && <ScriptEdit scripts={scripts} isHighlight={isHighlight} isSpacing={isSpacing} />}
              </div>
              <div>
                <StGuideButton onClick={() => setIsModalOpen(true)} isModalOpen={isModalOpen} />
                <StButtonContainer>
                  <StButton
                    onClick={(e) => {
                      e.stopPropagation();
                      if (getLoginStatus() === '') {
                        setIsLoginModalOpen(true);
                      } else {
                        isHighlight ? setIsHighlight(false) : setIsHighlight(true);
                        setIsSpacing(false);
                        setIsFirstClicked(true);
                      }
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
                      if (getLoginStatus() === '') {
                        setIsLoginModalOpen(true);
                      } else {
                        isSpacing ? setIsSpacing(false) : setIsSpacing(true);
                        setIsHighlight(false);
                        setIsFirstClicked(true);
                      }
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
        {isConfirmOpen && (
          <ConfirmModal
            closeModal={setIsConfirmOpen}
            mainText={mainText}
            subText={subText}
            cancelButtonText={cancelButtonText}
            confirmButtonText={confirmButtonText}
            setIsNewMemo={setIsNewMemo}
          />
        )}
        {isLoginModalOpen && <LoginModal closeModal={() => setIsLoginModalOpen(false)} />}
      </StLearnDetail>
    </>
  );
}

export default LearnDetail;

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  const id = +(params?.id ?? -1);
  const videoData = await api.learnDetailService.getVideoData(id);
  const highlightData = await api.learnDetailService.getHighlightData(id);

  if (videoData.id !== id) {
    return {
      notFound: true,
    };
  }
  return { props: { videoData: videoData, highlightData: highlightData } };
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

const StGuideButton = styled.button<{ isModalOpen: boolean }>`
  width: 3.2rem;
  height: 3.2rem;
  padding: 0;

  &:hover {
    background-image: url('/assets/icons/ic_guide_hover.svg');
  }

  ${({ isModalOpen }) =>
    isModalOpen
      ? css`
          background-image: url('/assets/icons/ic_guide_clicked.svg');
        `
      : css`
          background-image: url('/assets/icons/ic_guide.svg');
        `}
`;

const StLearnMain = styled.main`
  display: flex;
  margin: 0 auto;
  gap: 4rem;
  width: 172rem;
  height: 111.9rem;
  padding: 8rem 8rem 0 8rem;
  border-radius: 3rem;
  background-color: ${COLOR.WHITE};
  overflow: hidden;
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

    h2 {
      color: ${COLOR.BLACK};
      ${FONT_STYLES.SB_24_HEADLINE};
    }
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

    div::selection {
      background: ${COLOR.SUB_BLUE_30};
    }

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

const StScriptText = styled.div<{ isActive: boolean }>`
  position: relative;
  font-size: 2.6rem;
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  color: ${({ isActive }) => (isActive ? COLOR.MAIN_BLUE : COLOR.BLACK)};
  cursor: pointer;

  & > span {
    font-size: 3.2rem;
    font-weight: 600;
    color: ${COLOR.MAIN_BLUE};
    margin: 0 0.02rem 0 0.02rem;
  }

  & > mark {
    background: linear-gradient(259.3deg, #d8d9ff 0%, #a7c5ff 100%);
    font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
    color: ${({ isActive }) => (isActive ? COLOR.MAIN_BLUE : COLOR.BLACK)};

    & > span {
      font-size: 3.2rem;
      font-weight: 600;
      color: ${COLOR.MAIN_BLUE};
    }
  }

  & > mark:hover {
    color: ${COLOR.MAIN_BLUE};
    font-weight: 600;
  }
`;

const StButtonContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  position: relative;
  padding-right: 0.8rem;
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

const StMemoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StMemoTitle = styled.div`
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

const StMemoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
