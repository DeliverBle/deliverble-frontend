import React, { useState, useEffect, useRef } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
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
import {
  StButton,
  StButtonContainer,
  StGuideButton,
  StLearnDetail,
  StLearnMain,
  StLearnSection,
  StMemoContainer,
  StMemoTitle,
  StMemoWrapper,
  StScriptText,
  StVideoWrapper,
} from './style';

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
  }, []);

  return (
    <>
      <SEO title="학습하기 | Deliverble" />
      <StLearnDetail>
        <ImageDiv onClick={() => router.back()} src={icXButton} className="close" layout="fill" alt="x" />
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
