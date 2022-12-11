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
import { api } from '@src/services/api';
import { MemoData, VideoData } from '@src/services/api/types/learn-detail';
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
} from '@src/utils/constant';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {
  icHighlighterClicked,
  icHighlighterDefault,
  icHighlighterHover,
  icMemo,
  icSpacingClicked,
  icSpacingDefault,
  icSpacingHover,
  icXButton,
} from 'public/assets/icons';
import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';

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
  const [isHighlightOver, setIsHighlightOver] = useState<boolean>(false);
  const [isSpacingOver, setIsSpacingOver] = useState<boolean>(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(INITIAL_NUMBER);
  const [scriptTitleList, setScriptTitleList] = useState(['스크립트 1']);
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

  const handleContextMenuPoint = (target: HTMLDivElement) => {
    let x = 0;
    let y = 0;

    const article = target.parentElement?.closest('article');
    if (article) {
      const articleAbsoluteTop = article.getBoundingClientRect().top;
      const articleAbsoluteLeft = article.getBoundingClientRect().left;
      const absoulteTop = target.getBoundingClientRect().top;
      const absoulteRight = target.getBoundingClientRect().right;

      y = absoulteTop - articleAbsoluteTop - 10;
      if (absoulteRight <= 830) {
        x = absoulteRight - articleAbsoluteLeft - 15;
      } else {
        const absoulteLeft = target.getBoundingClientRect().left;
        x = absoulteLeft - articleAbsoluteLeft - 175;
      }
    }

    return { x, y };
  };

  const getHighlightIndex = (parentNode: ParentNode | null, givenString: string) => {
    const childNodes = parentNode?.childNodes;
    if (childNodes && childNodes.length !== 1) {
      let stringLength = 0;
      for (let i = 0; i < childNodes.length; i++) {
        if (childNodes[i].textContent === givenString) {
          setHighlightIndex(stringLength);
          return stringLength;
        }
        if (childNodes[i].textContent !== '/') {
          stringLength += childNodes[i]?.textContent?.length ?? 0;
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

  const handleRightClick = (e: React.MouseEvent, scriptId: number, order: number) => {
    const contextTarget = e.target as HTMLDivElement;
    const startIndex = getHighlightIndex(contextTarget?.parentNode, contextTarget.innerText);
    const markTag = contextTarget.closest('mark');

    if (startIndex !== undefined && markTag) {
      setMemoInfo({
        scriptId,
        order,
        startIndex,
        keyword: markTag.innerText.replaceAll('/', ''),
      });
      setClickedMemo(memoList.find((memo) => memo.startIndex === startIndex && memo.order === order));
    }
    setContextMenuPoint(handleContextMenuPoint(contextTarget));
  };

  const handleScriptDelete = () => {
    setConfirmModalText(DELETE_SCRIPT_CONFIRM_MODAL_TEXT);
    setIsConfirmOpen(true);
  };

  const handleScriptRename = (index: number) => {
    setClickedScriptTitleIndex(index);
    setTitleInputIndex(index);
    setIsScriptTitleInputVisible(true);
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
    }
  }, [isEditing, isHighlight, isSpacing]);

  useEffect(() => {
    (async () => {
      const id = Number(detailId);
      const data = isLoggedIn
        ? await api.learnDetailService.getPrivateVideoData(id)
        : await api.learnDetailService.getPublicVideoData(id);
      if (data) {
        setVideoData(data);
        data.memos && setMemoList(data.memos);
      }
    })();
  }, [isLoggedIn, detailId, isEditing]);

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
      if (isContextMenuOpen && !contextMenuRef?.current?.contains(eventTarget) && eventTarget.tagName !== 'MARK') {
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

  return (
    <>
      <SEO title="학습하기 | Deliverble" />
      <NavigationBar />
      <StLearnDetail>
        <ImageDiv onClick={() => router.push(prevLink)} src={icXButton} className="close" layout="fill" alt="x" />
        {isLoggedIn && (
          <StScriptTitleContainer>
            {scriptTitleList.map((_, i) => (
              <ScriptTitle
                key={i}
                isOne={scriptTitleList.length === 1}
                isScriptTitleInputVisible={isScriptTitleInputVisible}
                currentScriptTitleIndex={i}
                clickedScriptTitleIndex={clickedScriptTitleIndex}
                scriptTitleInputIndex={scriptTitleInputIndex}
                setIsScriptTitleInputVisible={setIsScriptTitleInputVisible}
                setClickedScriptTitleIndex={setClickedScriptTitleIndex}
                onScriptDelete={handleScriptDelete}
                onScriptRename={(index: number) => handleScriptRename(index)}
              />
            ))}
            {scriptTitleList.length !== SCRIPT_MAX_COUNT && (
              <StScriptAddButton
                onClick={() => {
                  // 서버에 post 요청
                  setScriptTitleList((scriptTitleList) => [...scriptTitleList, '스크립트 ${scriptTitleList.length}']);
                  setClickedScriptTitleIndex(clickedScriptTitleIndex + 1);
                  setTitleInputIndex(clickedScriptTitleIndex + 1);
                }}
              />
            )}
          </StScriptTitleContainer>
        )}
        {videoData && (
          <StLearnBox>
            <VideoDetail {...videoData} setIsModalOpen={setIsModalOpen} />
            <main>
              <StLearnSection>
                <article>
                  <div ref={learnRef}>
                    {!isEditing &&
                      videoData.scripts.map(({ id, order, text, startTime, endTime }) => (
                        <StScriptText
                          ref={contextMenuRef}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            handleRightClick(e, videoData.scriptsId, order);
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
                        setMemoState={setMemoState}
                        setIsContextMenuOpen={setIsContextMenuOpen}
                      />
                    )}
                    {isEditing && (
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
                            setIsHighlightOver(false);
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
                                setIsHighlightOver(true);
                              }}
                              onMouseOut={(e) => {
                                e.stopPropagation();
                                setIsHighlightOver(false);
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
                            setIsSpacingOver(false);
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
                                setIsSpacingOver(true);
                              }}
                              onMouseOut={(e) => {
                                e.stopPropagation();
                                setIsSpacingOver(false);
                              }}
                            />
                          </>
                        )}
                      </StButton>
                    </StButtonContainer>
                  </div>
                </article>
                <StTooltipContanier isHighlightOver={isHighlightOver} isSpacingOver={isSpacingOver}>
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
                </StTooltipContanier>
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
                        <StMemoGradient />
                        <StMemoFooter />
                      </>
                    ) : (
                      <EmptyMemo />
                    )}
                  </StMemoWrapper>
                </StMemoContainer>
              </aside>
            </main>
          </StLearnBox>
        )}
        {isModalOpen && <GuideModal closeModal={() => setIsModalOpen(false)} />}
        {isConfirmOpen && (
          <ConfirmModal
            confirmModalText={confirmModalText}
            scriptTitleList={scriptTitleList}
            clickedScriptTitleIndex={clickedScriptTitleIndex}
            setMemoState={setMemoState}
            setIsConfirmOpen={setIsConfirmOpen}
            setClickedDeleteMemo={setClickedDeleteMemo}
            setScriptTitleList={setScriptTitleList}
            setClickedScriptTitleIndex={setClickedScriptTitleIndex}
          />
        )}
        {isLoginModalOpen && <LoginModal closeModal={() => setIsLoginModalOpen(false)} />}
      </StLearnDetail>
    </>
  );
}

export default LearnDetail;

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

const StScriptTitleContainer = styled.div`
  margin: 0 auto;
  width: 172rem;
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

const StLearnBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 172rem;
  height: 123.6rem;
  padding: 8rem 8rem 0 8rem;
  border-radius: 3rem;
  background-color: ${COLOR.WHITE};
  overflow: hidden;

  & > main {
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
    margin: 0 0.02rem 0 0.02rem;
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
`;

const StTooltipContanier = styled.div<{ isHighlightOver: boolean; isSpacingOver: boolean }>`
  position: fixed;

  ${({ isHighlightOver }) =>
    isHighlightOver
      ? css`
          & > p:first-child {
            margin: 82.3rem 0 0 60.5rem;
            position: absolute;
            top: 4.6rem;
            background: rgba(22, 15, 53, 0.7);
            color: ${COLOR.WHITE};
            width: 16.5rem;
            padding: 1rem;
            cursor: default;
            border-radius: 0.6rem;
            ${FONT_STYLES.SB_15_CAPTION}
          }
          & > p:first-child:after {
            position: absolute;
            bottom: 100%;
            right: 1.6rem;
            border: solid transparent;
            content: '';
            width: 0;
            height: 0;
            pointer-events: none;
            border-width: 0.8rem;
            border-bottom-color: rgba(22, 15, 53, 0.7);
          }
        `
      : css`
          & > p:first-child {
            display: none;
          }
        `}

  ${({ isSpacingOver }) =>
    isSpacingOver
      ? css`
          & > p:nth-child(2) {
            margin: 82.3rem 0 0 77.8rem;
            position: absolute;
            top: 4.6rem;
            background: rgba(22, 15, 53, 0.7);
            color: ${COLOR.WHITE};
            width: 13.9rem;
            padding: 1rem;
            cursor: default;
            border-radius: 0.6rem;
            ${FONT_STYLES.SB_15_CAPTION}
          }
          & > p:nth-child(2):after {
            position: absolute;
            bottom: 100%;
            left: 1.6rem;
            border: solid transparent;
            content: '';
            width: 0;
            height: 0;
            pointer-events: none;
            border-width: 0.8rem;
            border-bottom-color: rgba(22, 15, 53, 0.7);
          }
        `
      : css`
          & > p:nth-child(2) {
            display: none;
          }
        `}
  }
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
