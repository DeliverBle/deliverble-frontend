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
import { MemoData, Script, VideoData } from '@src/services/api/types/learn-detail';
import YouTube from 'react-youtube';
import EmptyMemo from '@src/components/learnDetail/memo/EmptyMemo';
import SEO from '@src/components/common/SEO';
import MemoList from '@src/components/learnDetail/memo/MemoList';
import Like from '@src/components/common/Like';
import ContextMenu from '@src/components/learnDetail/ContextMenu';

function LearnDetail({ videoData, memoData }: { videoData: VideoData; memoData: MemoData[] }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [mainText, setMainText] = useState('');
  const [subText, setSubText] = useState('');
  const [cancelButtonText, setCancelButtonText] = useState('');
  const [confirmButtonText, setConfirmButtonText] = useState('');

  useEffect(() => {
    setMainText('메모 작성을 취소하시겠습니까?');
    setSubText("작성 취소 선택시, 작성된 메모는 저장되지 않습니다.'");
    setCancelButtonText('작성하기');
    setConfirmButtonText('작성 취소');
  }, []);

  const [player, setPlayer] = useState<YT.Player | null>();
  const [videoState, setVideoState] = useState(-1);
  const [currentTime, setCurrentTime] = useState(0);
  const { title, category, channel, reportDate, tags, link, startTime, endTime, scripts } = videoData;

  const learnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //spacing 데이터들을 get해온걸 정리 해야함. 다 받아와서 한번에 뿌려줌
    //get 해온 아이디에 해당하는 문장의 해당 단어를 string.replace(searchfor,replacewith);
    //여기서는 하나하나 매칭시킬 예정
    const SpacingData = {
      spacingReturnCollection: [
        {
          spacingId: 12,
          scriptId: 33,
          index: 5,
        },
        {
          spacingId: 13,
          scriptId: 33,
          index: 8,
        },
        {
          spacingId: 11,
          scriptId: 33,
          index: 18,
        },
        {
          spacingId: 7,
          scriptId: 36,
          index: 9,
        },
        {
          spacingId: 8,
          scriptId: 36,
          index: 14,
        },
        {
          spacingId: 10,
          scriptId: 36,
          index: 20,
        },
      ],
    };

    const highlightData = [
      {
        scriptId: 32,
        highlightId: 8,
        startingIndex: 0,
        endingIndex: 3,
        memo: {
          id: 1,
          keyword: '이 시각',
        },
      },
      {
        scriptId: 33,
        highlightId: 1,
        startingIndex: 3,
        endingIndex: 4,
      },
      {
        scriptId: 1,
        highlightId: 3,
        startingIndex: 5,
        endingIndex: 6,
      },
      {
        scriptId: 2,
        highlightId: 6,
        startingIndex: 0,
        endingIndex: 2,
      },
      {
        scriptId: 3,
        highlightId: 4,
        startingIndex: 0,
        endingIndex: 2,
      },
      {
        scriptId: 4,
        highlightId: 7,
        startingIndex: 0,
        endingIndex: 2,
      },
      {
        scriptId: 4,
        highlightId: 9,
        startingIndex: 3,
        endingIndex: 7,
      },
    ];

    //객체들을 내가 뽑기 좋은 형태로 바꾸는 것
    function groupBy(objectArray: any[], property: string) {
      return objectArray.reduce(function (acc, obj) {
        const key = obj[property]; //스크립트 아이디의 값을 키로 선언
        //만약 지금 키가 없으면
        if (!acc[key]) {
          //키에 대한 배열을 생성함
          acc[key] = [];
        }
        acc[key].push(obj); //
        return acc;
      }, {});
    }

    const spacingGroupedById = groupBy(SpacingData.spacingReturnCollection, 'scriptId');

    //스페이싱 ID로 분류된 애들안에서 인덱스배열이랑 아이디배열 만들기
    const keys = Object.keys(spacingGroupedById);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]; // 각각의 키 지금은 스크립트 아이디
      const value = spacingGroupedById[key]; // 각각의 키에 해당하는 각각의 값
      const spacingIndexArr = [];
      const spacingIdArr = [];

      for (let j = 0; j < value.length; j++) {
        spacingIndexArr.push(value[j].index);
        spacingIdArr.push(value[j].spacingId);
      }
      console.log('현재 스크립트 아이디:', keys[i], '인덱스배열', spacingIndexArr, '아이디배열', spacingIdArr);

      let searchedLine = ''; //스크립트 아이디에 해당하는 문장
      const scriptsId: Script[] = []; //스크립트를 모두 담아둔 배열
      const scriptsIdNum: number[] = []; //스크립트의 아이디배열
      scripts.map((item) => {
        scriptsId.push(item);
        scriptsIdNum.push(item.id);
        if (+keys[i] === item.id) {
          //받아온 스페이스 인덱스의 스크립트의 아이디와 현재 스크립트 아이디가 같으면
          searchedLine = item.text; //해당 줄을 넣고
        }
      });
      console.log('뭐였드라', searchedLine);
      console.log('아이디배열', scriptsIdNum);

      //현재 내가 바꿔야하는 문장이 몇번째 childNode인지 알아야함.
      //How? 지금 받아온 scriptsIdNum 돌면서 +keys[i]와 같은 친구가 몇번째 넘버인 지 확인
      let nodeNum = 0;
      scriptsIdNum.map((item, index) => {
        if (item === +keys[i]) {
          nodeNum = index;
        }
      });

      //받아온 스크립트아이디에 해당하는 노드에 접근해서 / 넣어주는 것
      const currentNode = learnRef.current?.childNodes[nodeNum];
      if (learnRef.current?.childNodes) {
        //index에 있는 애들 string으로 다 넣고
        let count = 0;
        let tempText = '';
        if (currentNode?.textContent) {
          for (let k = 0; k < currentNode.textContent?.length; k++) {
            if (spacingIndexArr[count] === k) {
              tempText += '<span id=' + spacingIdArr[count] + '>/</span>' + currentNode.textContent[k];
              console.log(currentNode.textContent[k]);
              count++;
            } else {
              tempText += currentNode.textContent[k];
            }
          }
        }
        //HTML로 파싱
        const frag = document.createDocumentFragment();
        const div = document.createElement('div');
        div.innerHTML = tempText;
        while (div.firstChild) {
          frag.appendChild(div.firstChild);
        }
        //기존의 plain text를 지우고
        currentNode?.firstChild && currentNode?.removeChild(currentNode.firstChild);
        //HTML있는 문장을 삽입해둠
        currentNode?.appendChild(frag);

        // //인덱스 리스트를 순회하면서 spacing 자리에 <span>넣어두기
        // let temp = '';
        // for (let i = 0; i < indexRes.length + 1; i++) {
        //   if (i === 0) {
        //     temp += searchedLine.slice(0, indexRes[0]) + '<span id=' + spacingIdRes[i] + '>/</span>';
        //   } else if (i === indexRes.length) {
        //     temp += searchedLine.slice(indexRes[i - 1]);
        //   } else {
        //     temp += searchedLine.slice(indexRes[i - 1], indexRes[i]) + '<span>/</span>';
        //   }
        // }

        // //그리고 HTML로 수정
        // const frag = document.createDocumentFragment();
        // const div = document.createElement('div');
        // div.innerHTML = temp;
        // while (div.firstChild) {
        //   frag.appendChild(div.firstChild);
        // }
        // console.log(frag);

        // scriptsId.map((item, index) => {
        //   if (item.id === +keys[i]) {
        //     const currentNode = learnRef.current?.childNodes[index];
        //     currentNode?.firstChild && currentNode?.removeChild(currentNode?.firstChild);
        //     currentNode?.appendChild(frag);
        //   }
        // });
      }
    }

    console.log('하이라이트 접근', highlightData);
    highlightData.map((item) => {
      console.log('각각의 아이템들', item);
    });
  }, [scripts]);

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

  const [clickedScriptId, setClickedScriptId] = useState<number>();
  const [points, setPoints] = useState({ x: 0, y: 0 });

  const controlPointX = (e: React.MouseEvent) => {
    const x = e.nativeEvent.offsetX / 10;
    const y = e.nativeEvent.offsetY / 10;

    if (x > 40) {
      return { x: x + x * 0.2, y: y + y * 0.5 };
    }
    return { x: x + x * 0.5, y: y + y * 0.5 };
  };

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
                <h2>메모</h2>
              </StMemoTitle>
              <StMemoWrapper>{memoData ? <MemoList memoList={memoData} /> : <EmptyMemo />}</StMemoWrapper>
            </StMemoContainer>
          </aside>
          <StLearnSection>
            <div>
              <ImageDiv src={icAnnounce} className="announce" layout="fill" />
              <h2>아나운서의 목소리를 듣고, 스크립트를 보며 따라 말해보세요.</h2>
            </div>
            <article>
              <div ref={learnRef}>
                {!isHighlight &&
                  !isSpacing &&
                  scripts.map(({ id, text, startTime, endTime }) => (
                    <StScriptText
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setClickedScriptId(id);
                        setPoints(controlPointX(e));
                      }}
                      key={id}
                      onClick={() => player?.seekTo(startTime, true)}
                      isActive={startTime <= currentTime && currentTime <= endTime ? true : false}>
                      {text}
                      {clickedScriptId == id && <ContextMenu points={points} />}
                    </StScriptText>
                  ))}
                {(isHighlight || isSpacing) && (
                  <ScriptEdit scripts={scripts} isHighlight={isHighlight} isSpacing={isSpacing} />
                )}
              </div>
              <div>
                <ImageDiv onClick={() => setIsModalOpen(true)} src={icGuide} className="guide" layout="fill" alt="?" />
                <StButtonContainer>
                  <StButton
                    onClick={(e) => {
                      e.stopPropagation();
                      isHighlight ? setIsHighlight(false) : setIsHighlight(true);
                      setIsSpacing(false);
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
                      isSpacing ? setIsSpacing(false) : setIsSpacing(true);
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
        {isConfirmOpen && (
          <ConfirmModal
            closeModal={() => setIsConfirmOpen(false)}
            mainText={mainText}
            subText={subText}
            cancelButtonText={cancelButtonText}
            confirmButtonText={confirmButtonText}
          />
        )}
      </StLearnDetail>
    </>
  );
}

export default LearnDetail;

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  const id = +(params?.id ?? -1);
  const videoData = await api.learnDetailService.getVideoData(id);
  const memoData = await api.learnDetailService.getMemoData(id);

  if (videoData.id !== id) {
    return {
      notFound: true,
    };
  }
  return { props: { videoData: videoData, memoData: memoData } };
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

const StScriptText = styled.p<{ isActive: boolean }>`
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
