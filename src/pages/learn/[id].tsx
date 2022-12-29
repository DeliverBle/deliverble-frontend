import ImageDiv from '@src/components/common/ImageDiv';
import Like from '@src/components/common/Like';
import SEO from '@src/components/common/SEO';
import ConfirmModal, { ConfirmModalText } from '@src/components/learnDetail/ConfirmModal';
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
import { loginState } from '@src/stores/loginState';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import {
  NEW_MEMO_CONFIRM_MODAL_TEXT,
  INITIAL_NUMBER,
  INITIAL_MEMO_STATE,
  INITIAL_MEMO,
  DELETE_SCRIPT_CONFIRM_MODAL_TEXT,
  SCRIPT_MAX_COUNT,
  SPEECH_GUIDE_TOOLTIP_TEXT,
  CONTEXT_MENU_WIDTH,
  ABSOLUTE_RIGHT_LIMIT,
} from '@src/utils/constant';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
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
import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { useMutation } from 'react-query';
import { isGuideAtom } from '@src/stores/newsState';
import NewsList from '@src/components/common/NewsList';
import { VideoData as simpleVideoData } from '@src/services/api/types/home';

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
}

function LearnDetail() {
  const NavigationBar = dynamic(() => import('@src/components/common/NavigationBar'), { ssr: false });
  const router = useRouter();
  const { id: detailId } = router.query;
  const [isGuide, setIsGuide] = useRecoilState(isGuideAtom);
  const isLoggedIn = useRecoilValue(loginState);
  const [videoData, setVideoData] = useState<VideoData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const [scriptTitleList, setScriptTitleList] = useState<Name[]>([]);
  const [clickedScriptTitleIndex, setClickedScriptTitleIndex] = useState(0);
  const [isScriptTitleInputVisible, setIsScriptTitleInputVisible] = useState(false);
  const [scriptTitleInputIndex, setTitleInputIndex] = useState(-1);
  const [memoList, setMemoList] = useState<MemoData[]>([]);
  const [memoState, setMemoState] = useState<MemoState>(INITIAL_MEMO_STATE);
  const [memoInfo, setMemoInfo] = useState<MemoInfo>(INITIAL_MEMO);
  const [clickedMemo, setClickedMemo] = useState<MemoData>();
  const [clickedDeleteMemo, setClickedDeleteMemo] = useState<boolean>(false);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [contextMenuPoint, setContextMenuPoint] = useState({ x: 0, y: 0 });
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);
  const [studyLogTab, setStudyLogTab] = useState<string>('memo');
  const [isRecordSaved, setIsRecordSaved] = useState<boolean>(false);
  const [contextElementId, setContextElementId] = useState<string>('');
  const [contextHTML, setContextHTML] = useState<HTMLElement>();
  const [contextElementType, setContextElementType] = useState<string>('');
  const [deletedType, setDeletedType] = useState<string>('');
  const [isDeleteBtnClicked, setIsDeleteBtnClicked] = useState<boolean>(false);
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

  const handleContextMenuPoint = (target: HTMLElement) => {
    let x = 0;
    let y = 0;

    const article = target.parentElement?.closest('article');
    if (article) {
      const articleAbsoluteTop = article.getBoundingClientRect().top;
      const articleAbsoluteLeft = article.getBoundingClientRect().left;

      const targetRect = target.getBoundingClientRect();
      const absoluteTop = targetRect.top + 20;
      const absoluteLeft = targetRect.left - 22;
      const absoluteRight = targetRect.right - 22;

      const highlightWidth = targetRect.right - targetRect.left;
      if (highlightWidth > CONTEXT_MENU_WIDTH || absoluteRight > ABSOLUTE_RIGHT_LIMIT - (scrollX + scrollX / 2)) {
        x = absoluteRight - articleAbsoluteLeft - CONTEXT_MENU_WIDTH;
      } else {
        x = absoluteLeft - articleAbsoluteLeft;
      }
      y = absoluteTop - articleAbsoluteTop;
    }

    return { x, y };
  };

  const getHighlightIndex = (parentNode: ParentNode | null, targetId: string) => {
    const childNodes = parentNode?.childNodes;
    if (childNodes && childNodes.length !== 1) {
      let stringLength = 0;
      for (let i = 0; i < childNodes.length; i++) {
        const childElement = childNodes[i] as HTMLElement;
        if (childElement.id === targetId) {
          setHighlightIndex(stringLength);
          return stringLength;
        }
        if (childNodes[i].textContent !== '/') {
          stringLength += childNodes[i]?.textContent?.replaceAll('/', ' ').length ?? 0;
        }
      }
    }
  };

  const createMarkStyles = (script: string, scriptOrder: number) => {
    let styles = ``;
    const highlightIndexList: number[] = [];
    const searchValue = '<mark>';
    script = script.replaceAll(/<span>\/<\/span>|<\/mark>/g, '');

    let index = script.indexOf(searchValue, 0);
    while (index !== -1) {
      highlightIndexList.push(index);
      script = script.replace('<mark>', '');
      index = script.indexOf(searchValue, index + 1);
    }

    highlightIndexList.forEach((index, i) => {
      if (memoList.find(({ startIndex, order, content }) => startIndex === index && order === scriptOrder && content)) {
        styles += `
          mark:nth-of-type(${i + 1}) {
            text-decoration: underline 3px ${COLOR.MAIN_BLUE};
            text-underline-position: under;
            text-underline-offset: 3px;
          }
        `;
      }
    });
    return styles;
  };

  useEffect(() => {
    (async () => {
      if (order !== -1 && text !== '' && order && text && videoData?.names) {
        const id = videoData?.names[clickedScriptTitleIndex].id;
        await api.learnDetailService.postSentenceData(
          {
            order,
            text,
          },
          id,
          clickedScriptTitleIndex,
        );
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

  //이부분 혜준언니가 이어서 진행해줄 것 같습니다...
  const isHighlightInMemo = (contextHTML: HTMLElement) => {
    const highlightId = contextHTML.id;
    if (highlightId in MemoList) {
      //delete
    }
  };

  const deleteElement = (contextHTML: HTMLElement) => {
    const parentElement = contextHTML?.parentElement;
    const removeElement = document.getElementById(contextElementId);
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    const blank = document.createTextNode(' ');

    switch (deletedType) {
      case 'MARK':
        if (removeElement?.innerHTML) {
          div.innerHTML = removeElement?.innerHTML;
        }
        while (div.firstChild) {
          fragment.appendChild(div.firstChild);
        }
        removeElement?.replaceWith(fragment);
        nodeToText(parentElement);
        isHighlightInMemo(contextHTML);
        break;
      case 'SPAN':
        if (removeElement) {
          removeElement.replaceWith(blank);
        }
        nodeToText(parentElement);
        break;
    }
  };

  useEffect(() => {
    setIsDeleteBtnClicked(false);
    if (isDeleteBtnClicked && contextHTML) {
      deleteElement(contextHTML);
      setIsContextMenuOpen(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextElementId, contextHTML?.parentElement, isDeleteBtnClicked]);

  const handleRightClick = (e: React.MouseEvent, scriptId: number, order: number) => {
    const contextTarget = e.target as HTMLElement;
    if (contextTarget.closest('mark') || contextTarget.closest('span')) {
      setContextElementId(contextTarget.id);
      setContextHTML(contextTarget);
      setContextElementType(contextTarget.nodeName);
    }

    const startIndex = getHighlightIndex(contextTarget?.parentNode, contextTarget.id);
    const markTag = contextTarget.closest('mark');

    if (startIndex !== undefined && markTag) {
      setMemoInfo({
        scriptId,
        order,
        startIndex,
        keyword: markTag.innerText.replaceAll('/', ' '),
      });
      setClickedMemo(memoList.find((memo) => memo.startIndex === startIndex && memo.order === order));
    }
    setContextMenuPoint(handleContextMenuPoint(contextTarget));
  };

  const handleScriptAdd = async () => {
    const response = await api.learnDetailService.postNewScriptData(Number(detailId));
    if (response.isSuccess) {
      const newIndex = scriptTitleList.length;
      setClickedScriptTitleIndex(newIndex);
      setTitleInputIndex(newIndex);
    }
  };

  const handleScriptDelete = async () => {
    const scriptId = videoData?.scriptsId ?? INITIAL_NUMBER;
    const response = await api.learnDetailService.deleteScriptData(scriptId);
    if (response.isSuccess && clickedScriptTitleIndex) {
      setClickedScriptTitleIndex(0);
      return;
    }
    if (response.isSuccess && clickedScriptTitleIndex === 0) {
      const data = await api.learnDetailService.getPrivateVideoData(Number(detailId), clickedScriptTitleIndex);
      setVideoData(data);
      const { memos, names } = data;
      if (memos && names) {
        setMemoList(memos);
        setScriptTitleList(names);
      }
      return;
    }
  };

  const handleScriptDeleteModal = () => {
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
        newNameList[clickedScriptTitleIndex] = data;
        setVideoData({
          ...videoData,
          names: newNameList,
        });
      }
    },
  });

  const handleScriptTitleInputChange = (index: number) => {
    setClickedScriptTitleIndex(index);
    setTitleInputIndex(index);
    setIsScriptTitleInputVisible(true);
  };

  const handleClickLike = async (id: number) => {
    const { id: likeId, isFavorite } = await api.likeService.postLikeData(id);
    setVideoData((prev) => prev && (prev.id === likeId ? { ...prev, isFavorite } : prev));
    setSimilarNewsList((prev) => prev.map((news) => (news.id === likeId ? { ...news, isFavorite } : news)));
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
      setIsDeleteBtnClicked(false);
    }
  }, [isEditing, isHighlight, isSpacing]);

  useEffect(() => {
    (async () => {
      const id = Number(detailId);
      let data;
      if (isGuide) {
        data = isLoggedIn
          ? await api.learnDetailService.getPrivateSpeechGuideData(id)
          : await api.learnDetailService.getPublicSpeechGuideData(id);
      } else {
        data = isLoggedIn
          ? await api.learnDetailService.getPrivateVideoData(id, clickedScriptTitleIndex)
          : await api.learnDetailService.getPublicVideoData(id);
      }
      setVideoData(data);
      const { memos, names } = data;
      if (isGuide && memos) {
        setMemoList(memos);
        return;
      }
      if (isLoggedIn && memos && names) {
        setMemoList(memos);
        setScriptTitleList(names);
      }
    })();
  }, [isLoggedIn, detailId, isEditing, isGuide, clickedScriptTitleIndex]);

  useEffect(() => {
    (async () => {
      if (isLoggedIn && !isGuide) {
        const data = await api.learnDetailService.getPrivateVideoData(Number(detailId), clickedScriptTitleIndex);
        setVideoData(data);
        const { memos, names } = data;
        if (memos && names) {
          setMemoList(memos);
          setScriptTitleList(names);
        }
      }
    })();
  }, [clickedScriptTitleIndex, detailId, isLoggedIn, isGuide]);

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

  useEffect(() => {
    (async () => {
      const { videoList } = await api.learnDetailService.getSimilarVideoData(Number(detailId));
      setSimilarNewsList(videoList);
    })();
  }, [detailId]);

  return (
    <StPageWrapper>
      <SEO title="학습하기 | Deliverble" />
      <NavigationBar />
      <StLearnDetail>
        <ImageDiv onClick={() => router.push(prevLink)} src={icXButton} className="close" layout="fill" alt="x" />
        <StScriptTitleContainer>
          {videoData?.haveGuide && (
            <StGuideTitle isGuide={isGuide} onClick={() => !isGuide && setIsGuide((prev) => !prev)}>
              <p>스피치 가이드</p>
              <ImageDiv
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
                isOne={scriptTitleList.length === 1}
                isScriptTitleInputVisible={isScriptTitleInputVisible}
                currentScriptTitleIndex={i}
                clickedScriptTitleIndex={clickedScriptTitleIndex}
                scriptTitleInputIndex={scriptTitleInputIndex}
                setIsScriptTitleInputVisible={setIsScriptTitleInputVisible}
                setClickedScriptTitleIndex={setClickedScriptTitleIndex}
                scriptId={videoData.scriptsId}
                setCurrentScriptId={setCurrentScriptId}
                onScriptDelete={handleScriptDeleteModal}
                onScriptTitleInputChange={(index: number) => handleScriptTitleInputChange(index)}
                onScriptRename={mutateRenameScript}
              />
            ))}
          {videoData?.names && scriptTitleList.length > 0 && scriptTitleList.length !== SCRIPT_MAX_COUNT && (
            <StScriptAddButton onClick={handleScriptAdd} />
          )}
        </StScriptTitleContainer>
        {videoData && (
          <StLearnBox isGuide={isGuide}>
            <VideoDetail {...videoData} setIsModalOpen={setIsModalOpen} />
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
                          markStyles={createMarkStyles(text, order)}
                          isActive={startTime <= currentTime && currentTime < endTime ? true : false}>
                          <div id={id.toString()} dangerouslySetInnerHTML={{ __html: text }}></div>
                        </StScriptText>
                      ))}
                    {!isEditing && isContextMenuOpen && (
                      <ContextMenu
                        contextMenuPoint={contextMenuPoint}
                        clickedMemoId={clickedMemo?.id}
                        contextElementType={contextElementType}
                        isEditing={isEditing}
                        setMemoState={setMemoState}
                        setIsContextMenuOpen={setIsContextMenuOpen}
                        setDeletedType={setDeletedType}
                        setIsDeleteBtnClicked={setIsDeleteBtnClicked}
                      />
                    )}
                    {isEditing && (
                      <ScriptEdit
                        isEditing={isEditing}
                        isHighlight={isHighlight}
                        isSpacing={isSpacing}
                        clickedScriptTitleIndex={clickedScriptTitleIndex}
                      />
                    )}
                  </div>
                  <div>
                    {!isGuide && (
                      <StButtonContainer>
                        <RecordStatusBar
                          scriptId={videoData.scriptsId}
                          isRecordSaved={isRecordSaved}
                          setIsRecordSaved={setIsRecordSaved}
                        />
                        <StButton
                          onClick={(e) => {
                            e.stopPropagation();
                            if (getLoginStatus() === '') {
                              setIsLoginModalOpen(true);
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
                          onClick={(e) => {
                            e.stopPropagation();
                            if (getLoginStatus() === '') {
                              setIsLoginModalOpen(true);
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
                          <p>
                            드래그해서 하이라이트를
                            <br />
                            표시해보세요.
                          </p>
                          <p>
                            클릭해서 끊어읽기를
                            <br />
                            표시해보세요.
                          </p>
                        </StTooltipContainer>
                      </StButtonContainer>
                    )}
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
                <StStudyLogContainer>
                  <StStudyLogTabContainer>
                    <StStudyLogTab
                      isActive={studyLogTab === 'memo'}
                      onClick={() => {
                        setStudyLogTab('memo');
                      }}>
                      메모
                    </StStudyLogTab>
                    <div className="divider" />
                    <StStudyLogTab
                      isActive={studyLogTab === 'record'}
                      onClick={() => {
                        setStudyLogTab('record');
                      }}>
                      녹음
                    </StStudyLogTab>
                  </StStudyLogTabContainer>
                  {studyLogTab === 'memo' ? (
                    <StMemoWrapper>
                      {memoList.length || memoState.newMemoId !== INITIAL_NUMBER ? (
                        <>
                          <MemoList
                            memoList={memoList}
                            memoState={memoState}
                            memoInfo={memoInfo}
                            setMemoList={setMemoList}
                            setMemoState={setMemoState}
                            setIsConfirmOpen={setIsConfirmOpen}
                            setConfirmModalText={setConfirmModalText}
                          />
                        </>
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
              <StGuideTooltip>
                <p>{SPEECH_GUIDE_TOOLTIP_TEXT.title}</p>
                <p>{SPEECH_GUIDE_TOOLTIP_TEXT.description}</p>
              </StGuideTooltip>
            )}
            {isGuide && <StLearnButton onClick={() => setIsGuide((prev) => !prev)}>학습하러 가기</StLearnButton>}
          </StLearnBox>
        )}
        {!isGuide && (
          <StNews>
            <h3>비슷한 주제의 영상으로 계속 연습해보세요.</h3>
            <NewsList onClickLike={handleClickLike} newsList={similarNewsList} type="normal" />
          </StNews>
        )}
        {isModalOpen && <GuideModal closeModal={() => setIsModalOpen(false)} />}
        {isConfirmOpen && (
          <ConfirmModal
            confirmModalText={confirmModalText}
            setMemoState={setMemoState}
            setIsConfirmOpen={setIsConfirmOpen}
            setClickedDeleteMemo={setClickedDeleteMemo}
            onScriptDelete={handleScriptDelete}
          />
        )}
        {isLoginModalOpen && <LoginModal closeModal={() => setIsLoginModalOpen(false)} />}
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

  & > h3 {
    min-width: 53rem;
    margin-bottom: 2.8rem;

    ${FONT_STYLES.SB_32_HEADLINE}
    color: ${COLOR.BLACK};
  }
`;

const StLearnDetail = styled.div`
  flex: 1;
  padding: 10.2rem 10rem 16rem 10rem;
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
  top: 98.2rem;
  left: 75.6rem;

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

const StButtonContainer = styled.div`
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

const StStudyLogTabContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin-bottom: 2.4rem;

  .divider {
    width: 0.2rem;
    height: 1.6rem;
    background-color: ${COLOR.GRAY_10};
  }
`;

const StStudyLogTab = styled.h2<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? COLOR.BLACK : COLOR.GRAY_30)};
  ${FONT_STYLES.SB_24_HEADLINE};
  cursor: pointer;
`;

const StMemoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;
