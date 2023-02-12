import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useMutation, useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import YouTube from 'react-youtube';
import VideoListSkeleton from '@src/components/common/VideoListSkeleton';
import NavigationBar from '@src/components/common/NavigationBar';
import ImageDiv from '@src/components/common/ImageDiv';
import Like from '@src/components/common/Like';
import SEO from '@src/components/common/SEO';
import NewsList from '@src/components/common/NewsList';
import ConfirmModal, { ConfirmModalText, MemoConfirmModalKey } from '@src/components/learnDetail/ConfirmModal';
import ContextMenu from '@src/components/learnDetail/ContextMenu';
import GuideModal from '@src/components/learnDetail/GuideModal';
import EmptyMemo from '@src/components/learnDetail/memo/EmptyMemo';
import MemoList from '@src/components/learnDetail/memo/MemoList';
import ScriptEdit from '@src/components/learnDetail/ScriptEdit';
import VideoDetail from '@src/components/learnDetail/VideoDetail';
import LoginModal from '@src/components/login/LoginModal';
import ScriptTitle from '@src/components/learnDetail/ScriptTitle';
import RecordStatusBar from '@src/components/learnDetail/record/RecordStatusBar';
import RecordLog from '@src/components/learnDetail/record/RecordLog';
import { api } from '@src/services/api';
import { MemoData, Name, VideoData } from '@src/services/api/types/learn-detail';
import { VideoData as simpleVideoData } from '@src/services/api/types/home';
import { loginState } from '@src/stores/loginState';
import { isGuideAtom } from '@src/stores/newsState';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import {
  INITIAL_NUMBER,
  INITIAL_MEMO_STATE,
  INITIAL_MEMO,
  DELETE_SCRIPT_CONFIRM_MODAL_TEXT,
  SCRIPT_MAX_COUNT,
  SPEECH_GUIDE_TOOLTIP_TEXT,
  VIDEO_STATE_CUED,
  VIDEO_STATE_PAUSED,
  NEW_MEMO_CONFIRM_MODAL_TEXT,
  MemoConfirmModalTextByType,
} from '@src/utils/constant';
import { useBodyScrollLock } from '@src/hooks/useBodyScrollLock';
import {
  icHighlighterClicked,
  icHighlighterDefault,
  icHighlighterHover,
  icSpacingClicked,
  icSpacingDefault,
  icSpacingHover,
  icSpeechGuideInfo,
  icXButton,
} from 'public/assets/icons';

export interface MemoState {
  newMemoId: number;
  editMemoId: number;
  deleteMemoId: number;
}
export interface MemoInfo {
  scriptId: number;
  order: number;
  startIndex: number;
  keyword: string;
  highlightId: string;
}

function LearnDetail() {
  const router = useRouter();
  const { id: detailId } = router.query;
  const [isGuide, setIsGuide] = useRecoilState(isGuideAtom);
  const isLoggedIn = useRecoilValue(loginState);
  const [videoData, setVideoData] = useState<VideoData>();
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const { lockScroll, unlockScroll } = useBodyScrollLock();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmModalText, setConfirmModalText] = useState<ConfirmModalText>(NEW_MEMO_CONFIRM_MODAL_TEXT);
  const [isHighlight, setIsHighlight] = useState(false);
  const [isSpacing, setIsSpacing] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [player, setPlayer] = useState<YT.Player | null>();
  const [videoState, setVideoState] = useState(INITIAL_NUMBER);
  const [currentTime, setCurrentTime] = useState(0);
  const learnRef = useRef<HTMLDivElement>(null);
  const getLoginStatus = () => localStorage.getItem('token') ?? '';
  const [prevLink, setPrevLink] = useState('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [hoveredChild, setHoveredChild] = useState<number>(0);
  const [isGuideOver, setIsGuideOver] = useState<boolean>(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(INITIAL_NUMBER);
  const [titleList, setTitleList] = useState<Name[]>([]);
  const [clickedTitleIndex, setClickedTitleIndex] = useState(0);
  const [isTitleInputVisible, setIsTitleInputVisible] = useState(false);
  const [titleInputIndex, setTitleInputIndex] = useState(-1);
  const [memoList, setMemoList] = useState<MemoData[]>([]);
  const [memoState, setMemoState] = useState<MemoState>(INITIAL_MEMO_STATE);
  const [memoInfo, setMemoInfo] = useState<MemoInfo>(INITIAL_MEMO);
  const [clickedMemo, setClickedMemo] = useState<MemoData>();
  const [clickedDeleteMemo, setClickedDeleteMemo] = useState<boolean>(false);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);
  const [rightClickedElement, setRightClickedElement] = useState<HTMLElement>();
  const [studyLogTab, setStudyLogTab] = useState<string>('memo');
  const [isRecordSaved, setIsRecordSaved] = useState<boolean>(false);
  const [clickedDeleteType, setClickedDeleteType] = useState<string>('');
  const [order, setOrder] = useState<number>();
  const [text, setText] = useState<string>();
  const [similarNewsList, setSimilarNewsList] = useState<simpleVideoData[]>([]);
  const [currentScriptId, setCurrentScriptId] = useState(0);

  useEffect(() => {
    isRecordSaved &&
      setTimeout(() => {
        setStudyLogTab('record');
      }, 1000);
  }, [isRecordSaved]);

  useEffect(() => {
    videoData?.scriptsId && setCurrentScriptId(videoData?.scriptsId);
  }, [videoData, currentScriptId]);

  const getHighlightIndex = (parentNode: ParentNode | null, targetId: string) => {
    const childNodes = parentNode?.childNodes;
    if (childNodes) {
      let stringLength = 0;
      for (let i = 0; i < childNodes.length; i++) {
        const childElement = childNodes[i] as HTMLElement;
        if (childElement.id === targetId) {
          setHighlightIndex(stringLength);
          return stringLength;
        }
        if (childNodes[i].textContent !== '/') {
          stringLength += childNodes[i]?.textContent?.replaceAll('/', ' ').length ?? 0;
        } else {
          stringLength += 1;
        }
      }
    }
  };

  const createMarkStyles = (script: string) => {
    let styles = ``;
    const markIdList = [];
    let startIndex = script.indexOf('<mark id=');
    let endIndex = script.indexOf('>', startIndex + 9);
    let markId = '';
    if (startIndex !== -1 && endIndex !== -1) {
      markId = script.substring(startIndex + 9, endIndex);
    }

    while (markId) {
      markIdList.push(markId);
      startIndex = script.indexOf('<mark id=', endIndex);
      endIndex = script.indexOf('>', startIndex + 9);
      if (startIndex === -1 || endIndex === -1) break;
      markId = script.substring(startIndex + 9, endIndex);
    }

    markIdList.forEach((id, i) => {
      if (memoList.find(({ highlightId, content }) => highlightId === id && content)) {
        styles += `
          mark:nth-of-type(${i + 1}) {
            border-bottom: 0.7rem solid #4E8AFF;
            border-image: linear-gradient(white 94%, #4E8AFF 90%);
            border-image-slice: 4;
          }
        `;
      }
    });
    return styles;
  };

  useEffect(() => {
    (async () => {
      if (order !== -1 && text !== '' && order && text && videoData?.names) {
        const id = videoData?.names[clickedTitleIndex].id;
        await api.learnDetailService.postSentenceData(
          {
            order,
            text,
          },
          id,
          clickedTitleIndex,
        );
        const data = await api.learnDetailService.getPrivateVideoData(Number(detailId), clickedTitleIndex);
        setVideoData(data);
        setText('');
        setOrder(-1);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, text]);

  const nodeToText = (anchorNode: Node | null | undefined) => {
    let textValue = '';
    if (anchorNode?.nodeName === 'MARK') {
      nodeToText(anchorNode.parentNode);
      return;
    }

    if (anchorNode?.childNodes) {
      for (let i = 0; i < anchorNode?.childNodes.length; i++) {
        const childNodeItem = anchorNode?.childNodes[i];
        const elementId = childNodeItem.firstChild?.parentElement?.id;
        switch (childNodeItem.nodeName) {
          case '#text':
            textValue += childNodeItem.nodeValue;
            break;
          case 'MARK':
            if (childNodeItem.textContent?.includes('/')) {
              const markInnerHTML = childNodeItem.firstChild?.parentElement?.innerHTML;
              textValue += `<mark id=${elementId}>${markInnerHTML}</mark>`;
            } else {
              textValue += `<mark id=${elementId}>${childNodeItem.textContent}</mark>`;
            }
            break;
          case 'SPAN':
            textValue += `<span id=${elementId}>/</span>`;
            break;
        }
      }
      setText(textValue);
    }
  };

  const isHighlightInMemo = () => {
    const highlightId = rightClickedElement && rightClickedElement.id;
    const deleteMemoId = memoList.find((memo) => memo.highlightId === highlightId)?.id;
    deleteMemoId && setMemoState((prev: MemoState) => ({ ...prev, deleteMemoId }));
    setClickedDeleteMemo(true);
  };

  const deleteElement = () => {
    if (rightClickedElement) {
      const parentElement = rightClickedElement.parentElement;
      const removeElement = document.getElementById(rightClickedElement.id);
      const fragment = document.createDocumentFragment();
      const div = document.createElement('div');
      const blank = document.createTextNode(' ');

      switch (clickedDeleteType) {
        case 'MARK':
          if (removeElement?.innerHTML) {
            div.innerHTML = removeElement?.innerHTML;
          }
          while (div.firstChild) {
            fragment.appendChild(div.firstChild);
          }
          removeElement?.replaceWith(fragment);
          nodeToText(parentElement);
          isHighlightInMemo();
          break;
        case 'SPAN':
          if (removeElement) {
            removeElement.replaceWith(blank);
          }
          nodeToText(parentElement);
          break;
      }
    }
  };

  useEffect(() => {
    setClickedDeleteType('');
    if (clickedDeleteType) {
      deleteElement();
      setIsContextMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedDeleteType]);

  const handleRightClick = (e: React.MouseEvent, scriptId: number, order: number) => {
    const contextTarget = e.target as HTMLElement;
    setRightClickedElement(contextTarget);

    if (contextTarget.closest('span')) {
      setIsContextMenuOpen(true);
    }

    const markTag = contextTarget.closest('mark');
    const startIndex = markTag && getHighlightIndex(contextTarget?.parentNode, contextTarget.id);
    if (startIndex && markTag) {
      setMemoInfo({
        scriptId,
        order,
        startIndex,
        keyword: markTag.innerText.replaceAll('/', ' '),
        highlightId: markTag.id,
      });
      setClickedMemo(memoList.find((memo) => memo.highlightId === markTag.id));
    }
  };

  const handleScriptAdd = async () => {
    const response = await api.learnDetailService.postNewScriptData(Number(detailId));
    if (response.isSuccess) {
      const newIndex = titleList.length;
      setClickedTitleIndex(newIndex);
      setTitleInputIndex(newIndex);
    }
  };

  const handleScriptDelete = async () => {
    const scriptId = videoData?.scriptsId ?? INITIAL_NUMBER;
    const response = await api.learnDetailService.deleteScriptData(scriptId);
    if (response.isSuccess && clickedTitleIndex) {
      setClickedTitleIndex(0);
      return;
    }
    if (response.isSuccess && clickedTitleIndex === 0) {
      const data = await api.learnDetailService.getPrivateVideoData(Number(detailId), clickedTitleIndex);
      setVideoData(data);
      const { memos, names } = data;
      if (memos && names) {
        setMemoList(memos);
        setTitleList(names);
      }
      return;
    }
  };

  const handleMemoModal = (type: MemoConfirmModalKey) => {
    setIsConfirmOpen(true);
    setConfirmModalText(MemoConfirmModalTextByType[type]);
  };

  const handleTitleDeleteModal = () => {
    setConfirmModalText(DELETE_SCRIPT_CONFIRM_MODAL_TEXT);
    setIsConfirmOpen(true);
  };

  const renameScriptTitle = async (name: string) => {
    const scriptId = videoData?.scriptsId ?? INITIAL_NUMBER;
    return await api.learnDetailService.updateScriptNameData(scriptId, name);
  };

  const { mutate: mutateRenameScript } = useMutation(renameScriptTitle, {
    onSuccess: (data) => {
      if (videoData?.names) {
        const newNameList = videoData.names.slice();
        newNameList[clickedTitleIndex] = data;
        setVideoData({
          ...videoData,
          names: newNameList,
        });
      }
    },
  });

  const handleTitleChange = (index: number) => {
    setClickedTitleIndex(index);
    setTitleInputIndex(index);
    setIsTitleInputVisible(true);
  };

  const handleClickLike = async (id: number) => {
    const { id: likeId, isFavorite } = await api.likeService.postLikeData(id);
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

  useEffect(() => {
    (async () => {
      const { deleteMemoId } = memoState;
      if (clickedDeleteMemo && deleteMemoId !== INITIAL_NUMBER) {
        const memoList = await api.learnDetailService.deleteMemoData(deleteMemoId);
        if (memoList) {
          setMemoList(memoList);
          setClickedDeleteMemo(false);
          setMemoState(INITIAL_MEMO_STATE);
        }
      }
    })();
  }, [clickedDeleteMemo, memoState]);

  useEffect(() => {
    const { newMemoId, editMemoId } = memoState;
    if (highlightIndex !== INITIAL_NUMBER && newMemoId === INITIAL_NUMBER && editMemoId === INITIAL_NUMBER) {
      setIsContextMenuOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightIndex]);

  useEffect(() => {
    const { newMemoId, editMemoId } = memoState;
    if (newMemoId === INITIAL_NUMBER && editMemoId === INITIAL_NUMBER) {
      setHighlightIndex(INITIAL_NUMBER);
    }
  }, [memoState]);

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
    (async () => {
      const id = Number(detailId);
      if (!id) return;
      const data = isGuide
        ? await api.learnDetailService.getSpeechGuideData(id)
        : isLoggedIn
        ? await api.learnDetailService.getPrivateVideoData(id, clickedTitleIndex)
        : await api.learnDetailService.getPublicVideoData(id);
      setVideoData(data);
      const { memos, names } = data;
      setMemoList(memos ?? []);
      setTitleList(names ?? []);
    })();
  }, [isLoggedIn, detailId, isEditing, isGuide, clickedTitleIndex]);

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

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const eventTarget = e.target as HTMLElement;

      if (
        isContextMenuOpen &&
        !contextMenuRef?.current?.contains(eventTarget) &&
        eventTarget.tagName !== 'MARK' &&
        eventTarget.tagName !== 'SPAN'
      ) {
        setIsContextMenuOpen(false);
        setHighlightIndex(INITIAL_NUMBER);
      }
    };
    if (isContextMenuOpen) {
      window.addEventListener('click', handleClickOutside);
      window.addEventListener('contextmenu', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('contextmenu', handleClickOutside);
    };
  }, [isContextMenuOpen]);

  useEffect(() => {
    const storage = globalThis?.sessionStorage;
    const prevPath = storage.getItem('prevPath');
    if (prevPath?.includes('/learn/')) {
      setPrevLink(storage.getItem('prevPrevPath') || '/');
    } else {
      setPrevLink(prevPath || '/');
    }
  }, []);

  const { isLoading } = useQuery(
    ['getSimilarNewsList'],
    async () => await api.learnDetailService.getSimilarVideoData(Number(detailId)),
    {
      onSuccess: (data) => setSimilarNewsList(data.videoList),
      enabled: !!detailId,
    },
  );

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
          {videoData?.haveGuide && (
            <StGuideTitle isGuide={isGuide} onClick={() => !isGuide && setIsGuide((prev) => !prev)}>
              <p>스피치 가이드</p>
              <ImageDiv
                aria-describedby="guide-tooltip"
                className="guide-info"
                src={icSpeechGuideInfo}
                alt="스피치 가이드 설명"
                onMouseOver={() => isGuide && setIsGuideOver(true)}
                onMouseOut={() => isGuide && setIsGuideOver(false)}
              />
            </StGuideTitle>
          )}
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
                onTitleRename={mutateRenameScript}
              />
            ))}
          {videoData?.names && titleList.length > 0 && titleList.length !== SCRIPT_MAX_COUNT && (
            <StScriptAddButton aria-label="스크립트 추가" onClick={handleScriptAdd} />
          )}
        </StScriptTitleContainer>
        {videoData && (
          <StLearnBox isGuide={isGuide}>
            <VideoDetail {...videoData} setIsGuideModalOpen={setIsGuideModalOpen} />
            <main>
              <StLearnSection isGuide={isGuide}>
                <article>
                  <div ref={learnRef}>
                    {!isEditing &&
                      videoData.scripts.map(({ id, order, text, startTime, endTime }, i) => (
                        <StScriptText
                          ref={contextMenuRef}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            setOrder(i + 1);
                            !isGuide && handleRightClick(e, videoData.scriptsId, order);
                          }}
                          key={id}
                          onClick={() => player?.seekTo(startTime, true)}
                          markStyles={createMarkStyles(text)}
                          isActive={startTime <= currentTime && currentTime < endTime}>
                          <div id={id.toString()} dangerouslySetInnerHTML={{ __html: text }}></div>
                        </StScriptText>
                      ))}
                    {!isEditing && isContextMenuOpen && rightClickedElement && (
                      <ContextMenu
                        clickedMemoId={clickedMemo?.id}
                        rightClickedElement={rightClickedElement}
                        isEditing={isEditing}
                        setMemoState={setMemoState}
                        setIsContextMenuOpen={setIsContextMenuOpen}
                        setClickedDeleteType={setClickedDeleteType}
                      />
                    )}
                    {isEditing && (
                      <ScriptEdit
                        isEditing={isEditing}
                        isHighlight={isHighlight}
                        isSpacing={isSpacing}
                        clickedTitleIndex={clickedTitleIndex}
                        memoList={memoList}
                        setMemoState={setMemoState}
                        setClickedDeleteMemo={setClickedDeleteMemo}
                      />
                    )}
                  </div>
                  <div>
                    <StButtonContainer isGuide={isGuide}>
                      <RecordStatusBar
                        scriptId={videoData.scriptsId}
                        isRecordSaved={isRecordSaved}
                        setIsRecordSaved={setIsRecordSaved}
                        onLoginModalOpen={handleLoginModalOpen}
                      />
                      <StButton
                        aria-describedby="highlight-tooltip"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (getLoginStatus() === '') {
                            handleLoginModalOpen();
                          } else {
                            isHighlight ? setIsHighlight(false) : setIsHighlight(true);
                            setIsSpacing(false);
                            setHoveredChild(0);
                          }
                        }}>
                        {isHighlight ? (
                          <ImageDiv className="function-button" src={icHighlighterClicked} alt="하이라이트" />
                        ) : (
                          <>
                            <ImageDiv className="function-button" src={icHighlighterHover} alt="하이라이트" />
                            <ImageDiv
                              className="default function-button"
                              src={icHighlighterDefault}
                              alt="하이라이트"
                              onMouseOver={() => {
                                setHoveredChild(1);
                              }}
                              onMouseOut={(e) => {
                                e.stopPropagation();
                                setHoveredChild(0);
                              }}
                            />
                          </>
                        )}
                      </StButton>
                      <StButton
                        aria-describedby="spacing-tooltip"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (getLoginStatus() === '') {
                            handleLoginModalOpen();
                          } else {
                            isSpacing ? setIsSpacing(false) : setIsSpacing(true);
                            setIsHighlight(false);
                            setHoveredChild(0);
                          }
                        }}>
                        {isSpacing ? (
                          <ImageDiv className="spacing function-button" src={icSpacingClicked} alt="끊어 읽기" />
                        ) : (
                          <>
                            <ImageDiv
                              className="spacing function-button spacing-hover"
                              src={icSpacingHover}
                              alt="끊어 읽기"
                            />
                            <ImageDiv
                              className="spacing default function-button"
                              src={icSpacingDefault}
                              alt="끊어 읽기"
                              onMouseOver={(e) => {
                                e.stopPropagation();
                                setHoveredChild(2);
                              }}
                              onMouseOut={(e) => {
                                e.stopPropagation();
                                setHoveredChild(0);
                              }}
                            />
                          </>
                        )}
                      </StButton>
                      <StTooltipContainer hoveredChild={hoveredChild}>
                        <p id="highlight-tooltip" role="tooltip">
                          드래그해서 하이라이트를
                          <br />
                          표시해보세요.
                        </p>
                        <p id="spacing-tooltip" role="tooltip">
                          클릭해서 끊어읽기를
                          <br />
                          표시해보세요.
                        </p>
                      </StTooltipContainer>
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
                <StStudyLogContainer>
                  <StStudyLogTabList role="tablist">
                    <StStudyLogTab
                      role="tab"
                      aria-selected={studyLogTab === 'memo'}
                      isActive={studyLogTab === 'memo'}
                      onClick={() => setStudyLogTab('memo')}>
                      메모
                    </StStudyLogTab>
                    <StStudyLogTab
                      role="tab"
                      aria-selected={studyLogTab === 'record'}
                      isActive={studyLogTab === 'record'}
                      onClick={() => setStudyLogTab('record')}>
                      녹음
                    </StStudyLogTab>
                  </StStudyLogTabList>
                  {studyLogTab === 'memo' ? (
                    <StMemoWrapper>
                      {memoList.length || memoState.newMemoId !== INITIAL_NUMBER ? (
                        <MemoList
                          memoList={memoList}
                          memoState={memoState}
                          memoInfo={memoInfo}
                          setMemoList={setMemoList}
                          setMemoState={setMemoState}
                          onMemoModal={handleMemoModal}
                        />
                      ) : (
                        <EmptyMemo />
                      )}
                    </StMemoWrapper>
                  ) : (
                    <RecordLog scriptId={currentScriptId} isRecordSaved={isRecordSaved} />
                  )}
                </StStudyLogContainer>
              </aside>
            </main>
            {isGuideOver && (
              <StGuideTooltip id="guide-tooltip" role="tooltip">
                <p>{SPEECH_GUIDE_TOOLTIP_TEXT.title}</p>
                <p>{SPEECH_GUIDE_TOOLTIP_TEXT.description}</p>
              </StGuideTooltip>
            )}
            {isGuide && <StLearnButton onClick={() => setIsGuide((prev) => !prev)}>학습하러 가기</StLearnButton>}
          </StLearnBox>
        )}
        {!isGuide && videoData && (
          <StNews>
            <h2>비슷한 주제의 영상으로 계속 연습해보세요.</h2>
            {isLoading ? (
              <VideoListSkeleton itemNumber={4} />
            ) : (
              <NewsList onClickLike={handleClickLike} newsList={similarNewsList} type="normal" />
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
            setMemoState={setMemoState}
            setIsConfirmOpen={setIsConfirmOpen}
            setClickedDeleteMemo={setClickedDeleteMemo}
            onTitleDelete={handleScriptDelete}
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

const StGuideTitle = styled.div<{ isGuide: boolean }>`
  display: flex;
  align-items: center;
  position: relative;

  padding: 1rem 0 1rem 2.4rem;
  width: 19.2rem;
  height: 4.8rem;
  border-radius: 1.6rem 1.6rem 0 0;
  background-color: ${COLOR.MAIN_BLUE};

  color: ${COLOR.WHITE};
  ${FONT_STYLES.B_20_BODY};

  ${({ isGuide }) =>
    !isGuide &&
    css`
      opacity: 0.6;
      cursor: pointer;

      &: hover {
        opacity: 0.8;
      }
    `}

  & > .guide-info {
    display: flex;
    align-items: center;
    padding-left: 1.2rem;
  }
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

const StLearnBox = styled.div<{ isGuide: boolean }>`
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

  ${({ isGuide }) => {
    return (
      isGuide &&
      css`
        outline: 0.6rem solid ${COLOR.MAIN_BLUE};
      `
    );
  }}
`;

const StGuideTooltip = styled.div`
  position: absolute;
  left: 17.8rem;
  top: 1.6rem;

  padding: 1.6rem;
  width: 46.3rem;
  height: 10.9rem;
  border-radius: 0.6rem;

  background: rgba(22, 15, 53, 0.7);
  color: white;
  white-space: pre-line;

  & > p:first-child {
    ${FONT_STYLES.B_20_BODY}
  }

  & > p:last-child {
    ${FONT_STYLES.M_16_CAPTION}
  }

  &::after {
    content: '';
    position: absolute;
    left: 2.6rem;
    bottom: 100%;

    border: solid transparent;
    border-width: 0.8rem;
    border-bottom-color: rgba(22, 15, 53, 0.7);
    pointer-events: none;
  }
`;

const StLearnButton = styled.button`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 20.9rem;
  height: 8.2rem;
  border-radius: 4.8rem;

  background-color: ${COLOR.MAIN_BLUE};
  box-shadow: 0.4rem 0.4rem 2rem rgba(22, 15, 53, 0.15);
  color: ${COLOR.WHITE};
  ${FONT_STYLES.SB_24_HEADLINE}
`;

const StLearnSection = styled.section<{ isGuide: boolean }>`
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
      border-top: ${({ isGuide }) => !isGuide && `0.2rem solid ${COLOR.GRAY_10}`};
    }
  }
`;

const StScriptText = styled.div<{ isActive: boolean; markStyles: string }>`
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

  ${({ markStyles }) => markStyles};

  & > mark:hover {
    color: ${COLOR.MAIN_BLUE};
    font-weight: 600;
  }
`;

const StButtonContainer = styled.div<{ isGuide: boolean }>`
  visibility: ${({ isGuide }) => (isGuide ? 'hidden' : 'visible')};
  display: flex;
  gap: 0.8rem;
  position: relative;
  padding-right: 0.8rem;
  width: 100%;
`;

const StTooltipContainer = styled.div<{ hoveredChild: number }>`
  position: relative;
  z-index: 2;

  & > p {
    display: none;
  }

  ${({ hoveredChild }) =>
    hoveredChild &&
    css`
      & > p:nth-child(${hoveredChild}) {
        display: block;
        position: absolute;
        top: 6.2rem;
        right: ${hoveredChild === 1 ? '5.6rem' : '-8.8rem'};
        width: ${hoveredChild === 1 ? '16.5rem' : '13.9rem'};
        padding: 1rem;
        border-radius: 0.6rem;
        background: rgba(22, 15, 53, 0.7);
        ${FONT_STYLES.SB_15_CAPTION}
        color: ${COLOR.WHITE};
        cursor: default;
      }

      & > p:nth-child(${hoveredChild})::after {
        position: absolute;
        bottom: 100%;
        right: ${hoveredChild === 1 ? '1.6rem' : '10.7rem'};
        width: 0;
        height: 0;
        border: solid transparent;
        border-width: 0.8rem;
        border-bottom-color: rgba(22, 15, 53, 0.7);
        pointer-events: none;
        content: '';
      }
    `}
`;

const StButton = styled.button`
  width: 4.8rem;
  height: 4.8rem;

  &:hover .default img {
    transition: opacity 0.3s;
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
  margin-bottom: 4rem;
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

const StStudyLogContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StStudyLogTabList = styled.ul`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const StStudyLogTab = styled.li<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? COLOR.BLACK : COLOR.GRAY_30)};
  ${FONT_STYLES.SB_24_HEADLINE};
  cursor: pointer;

  &:not(:last-child):after {
    content: '|';
    margin: 0 1.6rem;
    color: ${COLOR.GRAY_30};
    font-weight: 400;
  }
`;

const StMemoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;
