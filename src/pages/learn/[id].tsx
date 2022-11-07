import React, { useState, useEffect, useRef } from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import { useRecoilValue } from 'recoil';
import { loginState } from '@src/stores/loginState';
import SEO from '@src/components/common/SEO';
import NavigationBar from '@src/components/common/NavigationBar';
import ImageDiv from '@src/components/common/ImageDiv';
import Like from '@src/components/common/Like';
import GuideModal from '@src/components/learnDetail/GuideModal';
import EmptyMemo from '@src/components/learnDetail/memo/EmptyMemo';
import MemoList from '@src/components/learnDetail/memo/MemoList';
import ScriptEdit from '@src/components/learnDetail/ScriptEdit';
import ContextMenu from '@src/components/learnDetail/ContextMenu';
import VideoDetail from '@src/components/learnDetail/VideoDetail';
import ConfirmModal, { ConfirmModalText } from '@src/components/learnDetail/ConfirmModal';
import LoginModal from '@src/components/login/LoginModal';
import { api } from '@src/services/api';
import { HighlightData, VideoData } from '@src/services/api/types/learn-detail';
import { NEW_MEMO_CONFIRM_MODAL_TEXT, EDIT_MEMO_CONFIRM_MODAL_TEXT } from '@src/utils/constant';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import {
  icXButton,
  icMemo,
  icHighlighterDefault,
  icHighlighterHover,
  icHighlighterClicked,
  icSpacingDefault,
  icSpacingHover,
  icSpacingClicked,
} from 'public/assets/icons';

export interface MemoHighlightId {
  new: number;
  edit: number;
}

function LearnDetail({ highlightData }: { highlightData: HighlightData[] }) {
  const router = useRouter();
  const { id: detailId } = router.query;
  const isLoggedIn = useRecoilValue(loginState);
  const [videoData, setVideoData] = useState<VideoData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmModalText, setConfirmModalText] = useState<ConfirmModalText>(NEW_MEMO_CONFIRM_MODAL_TEXT);
  const [isHighlight, setIsHighlight] = useState(false);
  const [isSpacing, setIsSpacing] = useState(false);
  const [clickedHighlightId, setClickedHighlightId] = useState<number>();
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [memoHighlightId, setMemoHighlightId] = useState<MemoHighlightId>({ new: 0, edit: 0 });
  const [hasMemo, setHasMemo] = useState(false);
  const [keyword, setKeyword] = useState<string>();
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [player, setPlayer] = useState<YT.Player | null>();
  const [videoState, setVideoState] = useState(-1);
  const [currentTime, setCurrentTime] = useState(0);
  const learnRef = useRef<HTMLDivElement>(null);
  const getLoginStatus = () => localStorage.getItem('token') ?? '';
  const [prevLink, setPrevLink] = useState('');
  const { new: newMemoHighlightId, edit: editMemoHighlightId } = memoHighlightId;

  const controlPointX = (e: React.MouseEvent) => {
    const x = e.nativeEvent.offsetX / 10;
    const y = e.nativeEvent.offsetY / 10;

    if (x > 40) {
      return { x: x + x * 0.2, y: y + y * 0.5 };
    }
    return { x: x + x * 0.5, y: y + y * 0.5 };
  };

  const handleRightClick = (e: React.MouseEvent, id: number) => {
    if (highlightData) {
      const index = highlightData.findIndex((item) => item.highlightId === id);
      if (index !== -1) {
        const target = e.target as HTMLDivElement;
        setHasMemo(Object.keys(highlightData[index].memo).length > 0);
        setPoints(controlPointX(e));
        setClickedHighlightId(() => Number(target.id));
        setKeyword(target.innerText);
      }
      if (newMemoHighlightId || editMemoHighlightId) {
        newMemoHighlightId && setConfirmModalText(NEW_MEMO_CONFIRM_MODAL_TEXT);
        editMemoHighlightId && setConfirmModalText(EDIT_MEMO_CONFIRM_MODAL_TEXT);
        setClickedHighlightId(-1);
        return setIsConfirmOpen(true);
      }
    }
  };

  const handleClickLike = async (id: number) => {
    const { id: likeId, isFavorite } = await api.likeService.postLikeData(id);
    if (videoData && videoData.id === likeId) {
      setVideoData({
        ...videoData,
        isFavorite,
      });
    }
  };

  useEffect(() => {
    (async () => {
      const id = Number(detailId);
      const data = isLoggedIn
        ? await api.learnDetailService.getPrivateVideoData(id)
        : await api.learnDetailService.getPublicVideoData(id);
      data && setVideoData(data);
    })();
  }, [isLoggedIn, detailId]);

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
      if (clickedHighlightId && !contextMenuRef?.current?.contains(eventTarget)) {
        setClickedHighlightId(-1);
      }
    };
    if (clickedHighlightId) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [clickedHighlightId]);

  useEffect(() => {
    const storage = globalThis?.sessionStorage;
    const prevPath = storage.getItem('prevPath');
    if (prevPath?.includes('/learn/')) {
      setPrevLink(storage.getItem('prevPrevPath') || '/');
    } else {
      setPrevLink(prevPath || '/');
    }
  }, []);

  return (
    <>
      <SEO title="학습하기 | Deliverble" />
      <NavigationBar />
      <StLearnDetail>
        <ImageDiv onClick={() => router.push(prevLink)} src={icXButton} className="close" layout="fill" alt="x" />
        {videoData && (
          <StLearnMain>
            <VideoDetail {...videoData} setIsModalOpen={setIsModalOpen} />
            <div>
              <StLearnSection>
                <article>
                  <div ref={learnRef}>
                    {!isHighlight &&
                      !isSpacing &&
                      videoData.scripts.map(({ id, text, startTime, endTime }) => (
                        <StScriptText
                          ref={contextMenuRef}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            handleRightClick(e, id);
                          }}
                          key={id}
                          onClick={() => player?.seekTo(startTime, true)}
                          isActive={startTime <= currentTime && currentTime < endTime ? true : false}>
                          <div id={id.toString()} dangerouslySetInnerHTML={{ __html: text }}></div>
                          {clickedHighlightId === id && !newMemoHighlightId && !editMemoHighlightId && (
                            <ContextMenu
                              points={points}
                              hasMemo={hasMemo}
                              id={id}
                              setMemoHighlightId={setMemoHighlightId}
                            />
                          )}
                        </StScriptText>
                      ))}
                    {(isHighlight || isSpacing) && (
                      <ScriptEdit
                        scriptsId={videoData.scriptsId}
                        scripts={videoData.scripts}
                        isHighlight={isHighlight}
                        isSpacing={isSpacing}
                      />
                    )}
                  </div>
                  <div>
                    <StButtonContainer>
                      <StButton
                        onClick={(e) => {
                          e.stopPropagation();
                          if (getLoginStatus() === '') {
                            setIsLoginModalOpen(true);
                          } else {
                            isHighlight ? setIsHighlight(false) : setIsHighlight(true);
                            setIsSpacing(false);
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
                          }
                        }}>
                        {isSpacing ? (
                          <ImageDiv className="spacing function-button" src={icSpacingClicked} alt="끊어 읽기" />
                        ) : (
                          <>
                            <ImageDiv className="spacing function-button" src={icSpacingHover} alt="끊어 읽기" />
                            <ImageDiv
                              className="spacing default function-button"
                              src={icSpacingDefault}
                              alt="끊어 읽기"
                            />
                          </>
                        )}
                      </StButton>
                    </StButtonContainer>
                  </div>
                </article>
              </StLearnSection>
              <aside>
                <StVideoWrapper>
                  <Like
                    isFromList={false}
                    isFavorite={videoData.isFavorite}
                    toggleLike={() => (getLoginStatus() ? handleClickLike(videoData.id) : setIsLoginModalOpen(true))}
                  />
                  <YouTube
                    videoId={videoData.link}
                    opts={{
                      width: '670',
                      height: '376',
                      playerVars: {
                        modestbranding: 1,
                        start: videoData.startTime,
                        end: Math.ceil(videoData.endTime),
                        controls: 0,
                      },
                    }}
                    onReady={(e) => setPlayer(e.target)}
                    onStateChange={(e) => setVideoState(e.target.getPlayerState())}
                    onEnd={(e) => e.target.seekTo(videoData.startTime)}
                  />
                </StVideoWrapper>
                <StMemoContainer>
                  <StMemoTitle>
                    <ImageDiv src={icMemo} className="memo" layout="fill" />
                    <h2>메모</h2>
                  </StMemoTitle>
                  <StMemoWrapper>
                    {highlightData ? (
                      <>
                        <MemoList
                          highlightList={highlightData}
                          memoHighlightId={memoHighlightId}
                          setMemoHighlightId={setMemoHighlightId}
                          highlightId={clickedHighlightId}
                          keyword={keyword}
                          setIsConfirmOpen={setIsConfirmOpen}
                          setConfirmModalText={setConfirmModalText}
                        />
                        <StMemoGradient />
                        <StMemoFooter />
                      </>
                    ) : (
                      <EmptyMemo />
                    )}
                  </StMemoWrapper>
                </StMemoContainer>
              </aside>
            </div>
          </StLearnMain>
        )}
        {isModalOpen && <GuideModal closeModal={() => setIsModalOpen(false)} />}
        {isConfirmOpen && (
          <ConfirmModal
            closeModal={setIsConfirmOpen}
            confirmModalText={confirmModalText}
            setMemoHighlightId={setMemoHighlightId}
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
  const highlightData = await api.learnDetailService.getHighlightData(id);
  return { props: { highlightData: highlightData } };
}

const StLearnDetail = styled.div`
  padding: 14.8rem 10rem 15rem 10rem;
  min-height: 100vh;
  background: rgba(229, 238, 255, 0.85);
  backdrop-filter: blur(2.8rem);

  .close {
    position: fixed;
    top: 7rem;
    right: 11.2rem;
    width: 4.8rem;
    height: 4.8rem;
    cursor: pointer;
  }
`;

const StLearnMain = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 172rem;
  height: 123.6rem;
  padding: 8rem 8rem 0 8rem;
  border-radius: 3rem;
  background-color: ${COLOR.WHITE};
  overflow: hidden;

  & > div:last-child {
    display: flex;
    gap: 4.8rem;
  }
`;

const StLearnSection = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 8rem;

  article {
    display: flex;
    flex-direction: column;
    width: 84.2rem;
    height: 87.7rem;
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
      justify-content: flex-end;
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
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const StMemoGradient = styled.div`
  position: absolute;
  bottom: 0;
  width: 67rem;
  height: 7rem;
  pointer-events: none;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
`;

const StMemoFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 67rem;
  height: 2.4rem;
  pointer-events: none;

  background: ${COLOR.WHITE};
`;
