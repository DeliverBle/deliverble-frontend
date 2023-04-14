import { ImageDiv, Like, NavigationBar, NewsList, SEO, VideoListSkeleton } from '@src/components/common';
import { ScriptTitle, StudyLog, VideoDetail } from '@src/components/learnDetail';
import { RecordStatusBar } from '@src/components/learnDetail/record';
import { ScriptEdit, ScriptEditButtonContainer } from '@src/components/learnDetail/scriptEdit';
import { LearningButton, SpeechGuideTitle } from '@src/components/learnDetail/speechGuide';
import { SCRIPT_MAX_COUNT, VIDEO_STATE_CUED, VIDEO_STATE_PAUSED } from '@src/constants/learnDetail';
import { INITIAL, INITIAL_MEMO_STATE } from '@src/constants/learnDetail/memo';
import { DELETE_SCRIPT_MODAL_TEXT, MEMO_MODAL_TEXT_TYPE, NEW_MEMO_MODAL_TEXT } from '@src/constants/learnDetail/modal';
import { useBodyScrollLock, useClickOutside } from '@src/hooks/common';
import { useDeleteElement, useRightClickHandler, useUpdateMemoList } from '@src/hooks/learnDetail';
import { api } from '@src/services/api';
import {
  useDeleteScriptData,
  useGetSimilarVideoData,
  useGetVideoData,
  usePostNewScriptData,
  useUpdateScriptNameData,
} from '@src/services/queries/learn-detail';
import { COLOR, FONT_STYLES } from '@src/styles';
import { ConfirmModalText, MemoConfirmModalKey, MemoState } from '@src/types/learnDetail';
import { MemoData } from '@src/types/learnDetail/remote';
import { underlineMemo } from '@src/utils/underlineMemo';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { icXButton } from 'public/assets/icons';
import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import styled, { css } from 'styled-components';
import ContextMenu from '@src/components/learnDetail/ContextMenu';

function LearnDetail() {
  const router = useRouter();
  const { id: detailId, speechGuide } = router.query;
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const { lockScroll, unlockScroll } = useBodyScrollLock();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmModalText, setConfirmModalText] = useState<ConfirmModalText>(NEW_MEMO_MODAL_TEXT);
  const [isHighlight, setIsHighlight] = useState(false);
  const [isSpacing, setIsSpacing] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [player, setPlayer] = useState<YT.Player | null>();
  const [videoState, setVideoState] = useState(INITIAL);
  const [currentTime, setCurrentTime] = useState(0);
  const learnRef = useRef<HTMLDivElement>(null);
  const getLoginStatus = () => localStorage.getItem('token') ?? '';
  const [prevLink, setPrevLink] = useState('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [clickedTitleIndex, setClickedTitleIndex] = useState(0);
  const [isTitleInputVisible, setIsTitleInputVisible] = useState(false);
  const [titleInputIndex, setTitleInputIndex] = useState(-1);
  const [memoState, setMemoState] = useState<MemoState>(INITIAL_MEMO_STATE);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [isRecordSaved, setIsRecordSaved] = useState<boolean>(false);
  const [currentScriptId, setCurrentScriptId] = useState(0);

  const { data: similarVideoData, isLoading } = useGetSimilarVideoData(Number(detailId));
  const { data: videoData } = useGetVideoData(!!speechGuide, Number(detailId), clickedTitleIndex);
  const titleList = videoData?.names ?? [];
  const memoList = videoData?.memos ?? [];

  const { rightClickedElement, isContextMenuOpen, setIsContextMenuOpen, memoInfo, handleRightClick } =
    useRightClickHandler({ memoList, memoState });
  const updateMemoList = useUpdateMemoList({ memoState, memoInfo, setMemoState });
  const { setOrder, setText, setClickedDeleteType, nodeToText } = useDeleteElement({
    rightClickedElement,
    clickedTitleIndex,
    detailId: Number(detailId),
    videoData,
    // setVideoData,
    updateMemoList,
  });

  const GuideModal = dynamic(() => import('@src/components/learnDetail/modal/GuideModal'), { ssr: false });
  const ConfirmModal = dynamic(() => import('@src/components/learnDetail/modal/ConfirmModal'), { ssr: false });
  const LoginModal = dynamic(() => import('@src/components/login/LoginModal'), { ssr: false });

  useEffect(() => {
    videoData?.scriptsId && setCurrentScriptId(videoData?.scriptsId);
  }, [videoData, currentScriptId]);

  const postNewScriptAdd = usePostNewScriptData();
  const handleScriptAdd = () => {
    postNewScriptAdd.mutate(Number(detailId), {
      onSuccess: () => {
        const newIndex = titleList.length;
        setClickedTitleIndex(newIndex);
        setTitleInputIndex(newIndex);
      },
    });
  };

  const deleteScriptData = useDeleteScriptData();
  const handleScriptDelete = () => {
    const scriptId = videoData?.scriptsId ?? INITIAL;
    deleteScriptData.mutate(scriptId, {
      onSuccess: () => clickedTitleIndex && setClickedTitleIndex(0),
    });
  };

  const handleTitleDeleteModal = () => {
    setConfirmModalText(DELETE_SCRIPT_MODAL_TEXT);
    setIsConfirmOpen(true);
  };

  const updateScriptNameData = useUpdateScriptNameData();
  const handleTitleRename = (name: string) => {
    const data = { id: videoData?.scriptsId ?? INITIAL, name };
    updateScriptNameData.mutate(data);
  };

  const handleTitleChange = (index: number) => {
    setClickedTitleIndex(index);
    setTitleInputIndex(index);
    setIsTitleInputVisible(true);
  };

  const handleClickLike = async (id: number) => {
    const { id: likeId, isFavorite } = await api.commonService.postLikeData(id);
    setVideoData((prev) => prev && (prev.id === likeId ? { ...prev, isFavorite } : prev));
    setSimilarNewsList((prev) => prev.map((news) => (news.id === likeId ? { ...news, isFavorite } : news)));
  };

  const handleLoginModalOpen = () => {
    lockScroll();
    setIsLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    unlockScroll();
    setIsLoginModalOpen(false);
  };

  const cancelCreateMemo = () => {
    setMemoList((prev: MemoData[]) => prev.filter(({ content }) => content !== ''));
  };

  const handleMemoModal = (type: MemoConfirmModalKey) => {
    setIsConfirmOpen(true);
    setConfirmModalText(MEMO_MODAL_TEXT_TYPE[type]);
  };

  const handleMemoState = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsContextMenuOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { scriptId, ...memo } = memoInfo;
    if (memo.id !== INITIAL) {
      setMemoState((prev: MemoState) => ({ ...prev, editMemoId: memo.id }));
      return;
    }
    // 메모 추가하는 경우
    setMemoState((prev: MemoState) => ({ ...prev, newMemoId: 0 }));
    setMemoList((prev: MemoData[]) => [...prev, memo].sort((a, b) => a.order - b.order || a.startIndex - b.startIndex));
  };

  useEffect(() => {
    if (isHighlight || isSpacing) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
      setClickedDeleteType('');
      setIsContextMenuOpen(false);
      setOrder(-1);
      setText('');
    }
  }, [isEditing, isHighlight, isSpacing]);

  useEffect(() => {
    setClickedTitleIndex(0);
  }, [detailId]);

  useEffect(() => {
    if (!player) return;

    const interval =
      player &&
      setInterval(() => {
        setCurrentTime(player.getCurrentTime());
      }, 100);

    if (videoState === VIDEO_STATE_PAUSED || videoState === VIDEO_STATE_CUED) {
      interval && clearInterval(interval);
    }
    return () => interval && clearInterval(interval);
  }, [player, videoState]);

  useClickOutside({
    isEnabled: isContextMenuOpen,
    handleClickOutside: (e: Event) => {
      const eventTarget = e.target as HTMLElement;
      if (
        isContextMenuOpen &&
        contextMenuRef.current instanceof HTMLElement &&
        !contextMenuRef.current.contains(eventTarget)
      ) {
        setIsContextMenuOpen(false);
      }
    },
  });

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
    <StPageWrapper>
      <SEO title="학습하기 | Deliverble" />
      <NavigationBar />
      <StLearnDetail>
        <ImageDiv
          onClick={() => router.push(prevLink)}
          src={icXButton}
          className="close"
          layout="fill"
          alt="이전 페이지로 돌아가기"
        />
        <StScriptTitleContainer>
          {videoData?.haveGuide && <SpeechGuideTitle />}
          {videoData?.names &&
            videoData.names.map(({ id, name }, i) => (
              <ScriptTitle
                key={id}
                name={name}
                isOne={titleList.length === 1}
                isClicked={i === clickedTitleIndex}
                isEditing={isTitleInputVisible && i === titleInputIndex}
                onTitleClick={() => setClickedTitleIndex(i)}
                onTitleDelete={handleTitleDeleteModal}
                onTitleChange={() => handleTitleChange(i)}
                onTitleInputChange={() => setIsTitleInputVisible(false)}
                onTitleRename={handleTitleRename}
              />
            ))}
          {videoData?.names && titleList.length > 0 && titleList.length !== SCRIPT_MAX_COUNT && (
            <StScriptAddButton aria-label="스크립트 추가" onClick={handleScriptAdd} />
          )}
        </StScriptTitleContainer>
        {videoData && (
          <StLearnBox isSpeechGuide={Boolean(speechGuide)}>
            <VideoDetail {...videoData} setIsGuideModalOpen={setIsGuideModalOpen} />
            <main>
              <StLearnSection isSpeechGuide={Boolean(speechGuide)}>
                <article>
                  <div ref={learnRef}>
                    {!isEditing &&
                      videoData.scripts.map(({ id, order, text, startTime, endTime }, i) => (
                        <StScriptText
                          onContextMenu={(e) => {
                            e.preventDefault();
                            setOrder(i + 1);
                            !speechGuide && handleRightClick(e, videoData.scriptsId, order);
                          }}
                          key={id}
                          onClick={() => player?.seekTo(startTime, true)}
                          underline={underlineMemo(text, memoList)}
                          isActive={startTime <= currentTime && currentTime < endTime}>
                          <div id={id.toString()} dangerouslySetInnerHTML={{ __html: text }}></div>
                        </StScriptText>
                      ))}
                    {isContextMenuOpen && rightClickedElement && (
                      <ContextMenu
                        ref={contextMenuRef}
                        clickedMemoId={memoInfo.id}
                        rightClickedElement={rightClickedElement}
                        isEditing={isEditing}
                        setIsContextMenuOpen={setIsContextMenuOpen}
                        setClickedDeleteType={setClickedDeleteType}
                        handleMemoState={handleMemoState}
                      />
                    )}
                    {isEditing && (
                      <ScriptEdit
                        videoData={videoData}
                        isHighlight={isHighlight}
                        isSpacing={isSpacing}
                        handleRightClick={handleRightClick}
                        nodeToText={nodeToText}
                        setOrder={setOrder}
                      />
                    )}
                  </div>
                  <div>
                    <StButtonContainer isSpeechGuide={Boolean(speechGuide)}>
                      <RecordStatusBar
                        scriptId={videoData.scriptsId}
                        isRecordSaved={isRecordSaved}
                        setIsRecordSaved={setIsRecordSaved}
                        onLoginModalOpen={handleLoginModalOpen}
                      />
                      <ScriptEditButtonContainer
                        handleLoginModalOpen={handleLoginModalOpen}
                        isHighlight={isHighlight}
                        isSpacing={isSpacing}
                        setIsHighlight={setIsHighlight}
                        setIsSpacing={setIsSpacing}
                      />
                    </StButtonContainer>
                  </div>
                </article>
              </StLearnSection>
              <aside>
                <StVideoWrapper>
                  <Like
                    isFromList={false}
                    isFavorite={videoData.isFavorite}
                    toggleLike={() => (getLoginStatus() ? handleClickLike(videoData.id) : handleLoginModalOpen())}
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
                <StudyLog
                  currentScriptId={currentScriptId}
                  isRecordSaved={isRecordSaved}
                  memoList={memoList}
                  memoState={memoState}
                  setMemoState={setMemoState}
                  onMemoModal={handleMemoModal}
                  updateMemoList={updateMemoList}
                />
              </aside>
            </main>
            {speechGuide && <LearningButton />}
          </StLearnBox>
        )}
        {!speechGuide && videoData && (
          <StNews>
            <h2>비슷한 주제의 영상으로 계속 연습해보세요.</h2>
            {isLoading ? (
              <VideoListSkeleton itemNumber={4} />
            ) : (
              similarVideoData && <NewsList onClickLike={handleClickLike} newsList={similarVideoData} type="normal" />
            )}
          </StNews>
        )}
        {isGuideModalOpen && (
          <GuideModal
            closeModal={() => {
              unlockScroll();
              setIsGuideModalOpen(false);
            }}
          />
        )}
        {isConfirmOpen && (
          <ConfirmModal
            confirmModalText={confirmModalText}
            updateMemoList={updateMemoList}
            setIsConfirmOpen={setIsConfirmOpen}
            setMemoState={setMemoState}
            onTitleDelete={handleScriptDelete}
            cancelCreateMemo={cancelCreateMemo}
          />
        )}
        {isLoginModalOpen && <LoginModal closeModal={handleLoginModalClose} />}
      </StLearnDetail>
    </StPageWrapper>
  );
}

export default LearnDetail;

const StPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StNews = styled.div`
  margin: 0 auto;
  padding-top: 16rem;

  & > h2 {
    min-width: 53rem;
    margin-bottom: 2.8rem;

    ${FONT_STYLES.SB_32_HEADLINE}
    color: ${COLOR.BLACK};
  }
`;

const StLearnDetail = styled.div`
  flex: 1;
  padding: 19rem 10rem 16rem 10rem;
  background: rgba(229, 238, 255, 0.85);
  backdrop-filter: blur(2.8rem);

  .close {
    position: fixed;
    top: 16rem;
    right: 11.2rem;
    width: 4.8rem;
    height: 4.8rem;
    cursor: pointer;

    @media (max-width: 1280px) {
      display: none;
    }
  }
`;

const StScriptTitleContainer = styled.div`
  margin: 0 auto;
  height: 4.8rem;
  padding-left: 5.6rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const StScriptAddButton = styled.button`
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  padding: 0;
  background-image: url('/assets/icons/ic_script_add_light.svg');
  &:hover,
  &:active {
    background-image: url('/assets/icons/ic_script_add_dark.svg');
  }
`;

const StLearnBox = styled.div<{ isSpeechGuide: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;

  margin: 0 auto;
  height: 123.6rem;
  padding: 8rem 8rem 0 8rem;
  border-radius: 3rem;
  background-color: ${COLOR.WHITE};
  overflow: hidden;

  & > main {
    display: flex;
    gap: 4.8rem;

    & > aside {
      min-width: 68.8rem;
    }
  }

  ${({ isSpeechGuide }) => {
    return (
      isSpeechGuide &&
      css`
        outline: 0.6rem solid ${COLOR.MAIN_BLUE};
      `
    );
  }}
`;

const StLearnSection = styled.section<{ isSpeechGuide: boolean }>`
  display: flex;
  flex-direction: column;
  padding-bottom: 8rem;
  width: 100%;

  article {
    display: flex;
    flex-direction: column;
    height: 87.7rem;
    padding: 1.8rem 2rem 1.8rem 2rem;
    border: 0.2rem solid ${COLOR.GRAY_10};
    border-radius: 2.4rem;
    color: ${COLOR.BLACK};
    font-size: 2.6rem;
    line-height: 5.8rem;
    word-break: keep-all;
    box-sizing: border-box;

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
      border-top: ${({ isSpeechGuide }) => !isSpeechGuide && `0.2rem solid ${COLOR.GRAY_10}`};
    }
  }
`;

const StScriptText = styled.div<{ isActive: boolean; underline: string }>`
  position: relative;
  font-size: 2.6rem;
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  color: ${({ isActive }) => (isActive ? COLOR.MAIN_BLUE : COLOR.BLACK)};
  cursor: pointer;

  span {
    font-size: 3.2rem;
    font-weight: 600;
    color: ${COLOR.MAIN_BLUE};
    margin: 0 0.4rem 0 0.4rem;
  }

  mark {
    background: linear-gradient(259.3deg, #d8d9ff 0%, #a7c5ff 100%);
    font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
    color: ${({ isActive }) => (isActive ? COLOR.MAIN_BLUE : COLOR.BLACK)};
  }

  ${({ underline }) => underline};

  & > mark:hover {
    color: ${COLOR.MAIN_BLUE};
    font-weight: 600;
  }
`;

const StButtonContainer = styled.div<{ isSpeechGuide: boolean }>`
  visibility: ${({ isSpeechGuide }) => (isSpeechGuide ? 'hidden' : 'visible')};
  display: flex;
  gap: 0.8rem;
  position: relative;
  padding-right: 0.8rem;
  width: 100%;
`;

const StVideoWrapper = styled.div`
  position: relative;
  margin-bottom: 4rem;
  width: 67rem;
  height: 37.6rem;
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
