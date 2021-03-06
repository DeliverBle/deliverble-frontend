import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ImageDiv from '../../components/common/ImageDiv';
import GuideModal from '@src/components/learnDetail/GuideModal';
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
} from 'public/assets/icons';
import ConfirmModal from '@src/components/learnDetail/ConfirmModal';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { GetServerSidePropsContext } from 'next';
import { api } from '@src/services/api';
import { HighlightData, VideoData } from '@src/services/api/types/learn-detail';
import YouTube from 'react-youtube';
import EmptyMemo from '@src/components/learnDetail/memo/EmptyMemo';
import SEO from '@src/components/common/SEO';
import MemoList from '@src/components/learnDetail/memo/MemoList';
import Like from '@src/components/common/Like';
import ContextMenu from '@src/components/learnDetail/ContextMenu';
import LoginModal from '@src/components/login/LoginModal';

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
  const { title, category, channel, reportDate, tags, link, startTime, endTime, scripts } = videoData;
  const learnRef = useRef<HTMLDivElement>(null);
  const getLoginStatus = () => localStorage.getItem('token') ?? '';

  const HighlightData = [
    {
      scriptId: 6,
      highlightId: 8,
      startingIndex: 0,
      endingIndex: 3,
    },
    {
      scriptId: 7,
      highlightId: 1,
      startingIndex: 11,
      endingIndex: 58,
    },
    {
      scriptId: 8,
      highlightId: 3,
      startingIndex: 0,
      endingIndex: 3,
    },
  ];

  // ???????????? ?????? ?????? ?????? ????????? ????????? ???
  function groupBy(objectArray: any[], property: string) {
    return objectArray.reduce(function (acc, obj) {
      const key = obj[property]; //???????????? ???????????? ?????? ?????? ??????
      //?????? ?????? ?????? ?????????
      if (!acc[key]) {
        //?????? ?????? ????????? ?????????
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  const scriptsIdNum = scripts.map((item) => {
    return item.id;
  });

  const hlGroupedById = groupBy(HighlightData, 'scriptId');

  // ??????????????? get
  useEffect(() => {
    const hlKeys = Object.keys(hlGroupedById);

    for (let i = 0; i < hlKeys.length; i++) {
      const hlKey = hlKeys[i];
      const value = hlGroupedById[hlKey];
      const hlStartIndexArr = [];
      const hlEndIndexArr = [];
      const hlIdArr = [];

      for (let j = 0; j < value.length; j++) {
        hlStartIndexArr.push(value[j].startingIndex);
        hlEndIndexArr.push(value[j].endingIndex);
        hlIdArr.push(value[j].highlightId);
      }

      // ?????? ?????? ??????????????? ????????? ????????? childNode?????? ????????????.
      // How? ?????? ????????? scriptsIdNum ????????? +keys[i]??? ?????? ????????? ????????? ????????? ??? ??????
      let nodeNum = 0;
      scriptsIdNum.map((item, index) => {
        if (item === +hlKeys[i]) {
          nodeNum = index;
        }
      });

      // ????????? ???????????????????????? ???????????? ????????? ???????????? ??????????????? ???????????? ???
      const currentNode = learnRef.current?.childNodes[nodeNum];
      if (learnRef.current?.childNodes) {
        let count = 0;
        let tempText = '';
        if (currentNode?.textContent) {
          for (let j = 0; j < currentNode.textContent?.length; j++) {
            if (hlStartIndexArr[count] === j) {
              tempText += '<mark id=' + hlIdArr[count] + '>' + currentNode.textContent[j];
            } else if (hlEndIndexArr[count] === j) {
              tempText += currentNode.textContent[j] + '</mark>';
              count++;
            } else {
              tempText += currentNode.textContent[j];
            }
          }
        }

        // HTML??? ??????
        const frag = document.createDocumentFragment();
        const div = document.createElement('div');
        div.innerHTML = tempText;
        while (div.firstChild) {
          frag.appendChild(div.firstChild);
        }
        if (currentNode?.textContent) {
          currentNode.textContent = '';
        }
        currentNode?.appendChild(frag);
      }
    }
  }, [scripts]);

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
      }, 1000);

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
    setMainText('?????? ????????? ?????????????????????????');
    setSubText('?????? ?????? ?????????, ????????? ????????? ???????????? ????????????.');
    setCancelButtonText('????????????');
    setConfirmButtonText('?????? ??????');
  }, []);

  return (
    <>
      <SEO title="???????????? | Deliverble" />
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
              <Like isFromList={false} />
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
            <StMemoContainer>
              <StMemoTitle>
                <ImageDiv src={icMemo} className="memo" layout="fill" />
                <h2>??????</h2>
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
              <h2>??????????????? ???????????? ??????, ??????????????? ?????? ?????? ???????????????.</h2>
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
                      isActive={startTime <= currentTime && currentTime <= endTime ? true : false}>
                      <p id={id.toString()}>{text}</p>
                      {clickedScriptId === id && !isNewMemo && (
                        <ContextMenu points={points} setIsNewMemo={setIsNewMemo} />
                      )}
                    </StScriptText>
                  ))}
                {isFirstClicked && <ScriptEdit scripts={scripts} isHighlight={isHighlight} isSpacing={isSpacing} />}
              </div>
              <div>
                <ImageDiv onClick={() => setIsModalOpen(true)} src={icGuide} className="guide" layout="fill" alt="?" />
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
                      <ImageDiv className="function-button" src={icHighlighterClicked} alt="???????????????" />
                    ) : (
                      <>
                        <ImageDiv className="function-button" src={icHighlighterHover} alt="???????????????" />
                        <ImageDiv className="default function-button" src={icHighlighterDefault} alt="???????????????" />
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
                      <ImageDiv className="spacing function-button" src={icSpacingClicked} alt="?????? ??????" />
                    ) : (
                      <>
                        <ImageDiv className="spacing function-button" src={icSpacingHover} alt="?????? ??????" />
                        <ImageDiv className="spacing default function-button" src={icSpacingDefault} alt="?????? ??????" />
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

const StScriptText = styled.div<{ isActive: boolean }>`
  position: relative;
  font-size: 2.6rem;
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  color: ${({ isActive }) => (isActive ? COLOR.MAIN_BLUE : COLOR.BLACK)};
  cursor: pointer;
  &:hover {
    color: ${COLOR.MAIN_BLUE};
    font-weight: 600;
  }
  & > span {
    font-size: 3.2rem;
    font-weight: 600;
    color: #4e8aff;
    margin: 0 0.02rem 0 0.02rem;
  }
  & > mark {
    background: linear-gradient(259.3deg, #d8d9ff 0%, #a7c5ff 100%);
    font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
    color: ${({ isActive }) => (isActive ? COLOR.MAIN_BLUE : COLOR.BLACK)};
    & > span {
      font-size: 3.2rem;
      font-weight: 600;
      color: #4e8aff;
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
