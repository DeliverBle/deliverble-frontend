import styled from 'styled-components';
import ImageDiv from '@src/components/common/ImageDiv';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { COLOR } from '@src/styles/color';
import { useState, useRef } from 'react';
import {
  icRecordPlayDefault,
  icRecordPlayUnactivated,
  icRecordPlayActive,
  icRecordPauseDefault,
  icRecordPauseActive,
  icMemoXButton,
  icCheckButton,
} from 'public/assets/icons';
import EmptyRecord from './EmptyRecord';
import RecordDotButton from './RecordDotButton';
import { api } from '@src/services/api';
import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { isGuideAtom } from '@src/stores/newsState';

interface RecordStatusBarProps {
  scriptId: number;
  isRecordSaved: boolean;
}

function RecordLog(props: RecordStatusBarProps) {
  const { scriptId, isRecordSaved } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPausing, setIsPausing] = useState(false);
  const [linkClicked, setLinkClicked] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isNameChanging, setIsNameChanging] = useState(false);
  const [nameChanged, setNameChanged] = useState('');
  const [recordLinkChanging, setRecordLinkChanging] = useState('');
  const [isTextLengthExceeded, setIsTextLengthExceeded] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef(new Audio());
  const nameInputRef = useRef<HTMLInputElement>(null);
  const isGuide = useRecoilValue(isGuideAtom);

  const { data } = useQuery(
    ['recordData', isRecordSaved, isDataChanged],
    () => api.learnDetailService.getRecordData(scriptId),
    {
      onSuccess: () => {
        setIsDataChanged(false);
        setIsPlaying(false);
        setIsPausing(false);
        setLinkClicked('');
      },
      onError: () => {
        console.error('녹음 데이터 요청 에러');
      },
      enabled: !!scriptId,
    },
  );

  const { mutate } = useMutation(
    ['recordData'],
    () =>
      api.learnDetailService.changeRecordNameData({
        link: recordLinkChanging,
        scriptId: scriptId,
        newName: nameChanged,
      }),
    {
      onSuccess: () => {
        setIsNameChanging(false);
        setIsDataChanged(false);
      },
      onError: () => {
        console.error('녹음 이름 변경에 실패했습니다.');
      },
    },
  );

  const handleDate = (date: string) => {
    return date.substring(0, 10).replace(/-/g, '.').concat('.');
  };

  const handleTime = (time: number) => {
    const naturalNumber = Math.floor(time);
    const twoDigitsNumber = (num: number) => {
      return String(num).padStart(2, '0');
    };
    return `${Math.floor(naturalNumber / 60)}:${twoDigitsNumber(naturalNumber % 60)}`;
  };

  const handleTextOverflow = (text: string) => {
    if (text.length <= 20) {
      return text;
    }
    return text.slice(0, 19) + '...';
  };

  const checkRecordClicked = (link: string) => {
    return link === audioRef.current?.src ? true : false;
  };

  const handlePlayRecord = (link: string, endTime: number) => {
    const updateProgress = (e: Event) => {
      const { currentTime } = e.target as HTMLAudioElement;
      setCurrentTime(currentTime);
      const progressPercentage = (currentTime / (endTime - 0.75)) * 100;
      progressRef.current && (progressRef.current.style.width = (47.4 * (progressPercentage / 100)).toString() + 'rem');
      if (progressPercentage > 99 && audioRef.current) {
        setIsPlaying(false);
        setIsPausing(false);
        audioRef.current.src = '';
        audioRef.current.removeEventListener('timeupdate', updateProgress);
      }
    };

    const getAudioLink = () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.src = link;
        audioRef.current.addEventListener('timeupdate', updateProgress);
      }
    };

    // 재생 버튼을 눌렀을 경우.
    if (!isPlaying) {
      // 이전에 재생했던 녹음이 아닐 경우,  //audioRef에 정보가 없을 경우;
      if (linkClicked !== link || !audioRef.current) {
        audioRef.current = new Audio();
        getAudioLink();
        //한번 재생했던 녹음을 다시 재생할 경우.
      } else if (!isPausing) {
        getAudioLink();
      }
      audioRef.current?.play();
      setIsPlaying(true);
      setIsPausing(false);
      // 중지 버튼을 눌렀을 경우.
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
      setIsPausing(true);
    }

    //재생 중인데 다른 녹음을 클릭했을 경우
    if (!checkRecordClicked(link) && isPlaying && !isNameChanging) {
      setIsPlaying(false);
      setIsPausing(false);
    }
  };

  const onChange = () => {
    if (nameInputRef.current) {
      setNameChanged(nameInputRef.current.value);
      nameInputRef.current?.value.length > 99 ? setIsTextLengthExceeded(true) : setIsTextLengthExceeded(false);
    }
  };

  return (
    <StRecordLogContainer>
      {!data ? (
        <EmptyRecord />
      ) : (
        <>
          {data?.map(({ name, link, endTime, date }) => (
            <StRecord key={link}>
              <button
                disabled={isNameChanging && link === recordLinkChanging}
                onClick={() => {
                  setLinkClicked(link);
                  handlePlayRecord(link, endTime);
                  isNameChanging && setIsNameChanging(false);
                }}>
                <ImageDiv
                  src={
                    checkRecordClicked(link) && isPlaying
                      ? icRecordPauseDefault
                      : isNameChanging && link === recordLinkChanging
                      ? icRecordPlayUnactivated
                      : isNameChanging && link === recordLinkChanging
                      ? icRecordPlayUnactivated
                      : icRecordPlayDefault
                  }
                  className="icRecordPlay"
                  alt={checkRecordClicked(link) && isPlaying ? '녹음 중지' : '녹음 재생'}
                  layout="fill"
                />
                <ImageDiv
                  src={
                    checkRecordClicked(link) && isPlaying
                      ? icRecordPauseActive
                      : isNameChanging && link === recordLinkChanging
                      ? icRecordPlayActive
                      : isNameChanging && link === recordLinkChanging
                      ? icRecordPlayActive
                      : icRecordPlayActive
                  }
                  className="icRecordPlay hover"
                  alt={checkRecordClicked(link) && isPlaying ? '녹음 중지' : '녹음 재생'}
                  layout="fill"
                />
              </button>
              <StRecordInfo>
                {isNameChanging && link === recordLinkChanging ? (
                  <>
                    <StNameChanging
                      ref={nameInputRef}
                      defaultValue={isNameChanging && link === recordLinkChanging ? name : ''}
                      onChange={onChange}
                      maxLength={100}
                      isTextLengthExceeded={isTextLengthExceeded}></StNameChanging>
                    {isTextLengthExceeded && (
                      <StWarningTooltip>
                        <span>최대 글자수를 초과했어요!</span>
                      </StWarningTooltip>
                    )}
                    <StButtonContainer>
                      <button type="button">
                        <ImageDiv
                          className="icNameChange"
                          src={icMemoXButton}
                          alt="취소"
                          onClick={() => {
                            setIsNameChanging(false);
                          }}
                        />
                      </button>
                      <button type="button" disabled={isTextLengthExceeded}>
                        <ImageDiv
                          className="icNameChange"
                          src={icCheckButton}
                          alt="완료"
                          onClick={() => {
                            if (isTextLengthExceeded) return;
                            setIsDataChanged(true);
                            mutate();
                          }}
                        />
                      </button>
                    </StButtonContainer>
                  </>
                ) : (
                  <>
                    <h1>{handleTextOverflow(name)}</h1>
                    {checkRecordClicked(link) && (isPlaying || isPausing) && (
                      <StRecordPlayBar>
                        <StRecordPlayStatus ref={progressRef} />
                      </StRecordPlayBar>
                    )}
                    <div>
                      {checkRecordClicked(link) && (isPlaying || isPausing) ? (
                        <p style={{ color: `${COLOR.MAIN_BLUE}` }}>{handleTime(currentTime)}</p>
                      ) : (
                        <p>{handleDate(date)}</p>
                      )}
                      <p>{handleTime(endTime)}</p>
                    </div>
                  </>
                )}
              </StRecordInfo>
              <audio src={link} ref={audioRef} />
              {!isGuide && !isNameChanging && !isPlaying && (
                <RecordDotButton
                  link={link}
                  scriptId={scriptId}
                  setIsDataChanged={setIsDataChanged}
                  setIsNameChanging={setIsNameChanging}
                  setRecordLinkChanging={setRecordLinkChanging}
                />
              )}
            </StRecord>
          ))}
        </>
      )}
    </StRecordLogContainer>
  );
}

export default RecordLog;

const StRecordLogContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  height: 40.3rem;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${COLOR.GRAY_10};
    border-radius: 1.3rem;
  }
`;

const StRecord = styled.div`
  display: flex;
  position: relative;

  width: 67rem;
  margin-right: 0.8rem;

  background-color: ${COLOR.SUB_BLUE_8};
  border-radius: 2.5rem;

  .icRecordPlay {
    position: relative;
    width: 6rem;
    height: 6rem;
    margin: 3.8rem 0 3.8rem 4rem;
    cursor: pointer;
  }

  & > button .hover {
    display: none;
    position: absolute;
    top: 0.1rem;
    width: 6rem;
    height: 6rem;
  }

  & > button:hover .hover {
    display: block;
  }

  &:hover .dot {
    opacity: 1;
  }

  &:hover .fold-button {
    opacity: 1;
  }
`;

const StRecordInfo = styled.div`
  width: 47.4rem;
  height: 7.3rem;
  margin: 3.2rem 0 0 4rem;

  & > h1 {
    margin-bottom: 0.8rem;
    ${FONT_STYLES.SB_25_MEMO};
  }

  & > div {
    display: flex;
    justify-content: space-between;
    ${FONT_STYLES.M_20_BODY};
  }

  & > div > p:first-of-type {
    color: ${COLOR.GRAY_45};
  }
`;

const StRecordPlayBar = styled.div`
  position: relative;
  width: 47.4rem;
  height: 0.8rem;
  margin-bottom: 0.8rem;
  background-color: ${COLOR.SUB_BLUE_30};
  border-radius: 1rem;
  overflow: hidden;
`;

const StRecordPlayStatus = styled.div`
  position: absolute;
  transition: width 0.1s linear;
  height: 0.8rem;
  background-color: ${COLOR.MAIN_BLUE};
  border-radius: 1rem;
`;

const StNameChanging = styled.input<{ isTextLengthExceeded: boolean }>`
  position: relative;
  top: -1.6rem;
  width: 49.8rem;
  height: 5.5rem;
  padding: 0.8rem 0.8rem 1rem 1.2rem;

  border: 0.2rem solid ${({ isTextLengthExceeded }) => (isTextLengthExceeded ? COLOR.RED : COLOR.SUB_BLUE_50)};
  border-radius: 1.2rem;
  background-color: transparent;

  font-family: 'Pretendard';
  color: ${COLOR.BLACK};
  ${FONT_STYLES.M_25_BODY};

  resize: none;
  &:focus {
    outline: none;
  }
  &::-webkit-scrollbar {
    width: 1rem;
    background-color: transparent;
  }
`;

const StButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 6.8rem;
  height: 3rem;
  margin-left: 42.2rem;

  .icNameChange {
    position: relative;
    width: 3rem;
    height: 3rem;
  }
`;

const StWarningTooltip = styled.div`
  position: absolute;
  top: 8.7rem;
  width: 17.3rem;
  height: 4.1rem;
  padding: 1rem 1rem;
  border-radius: 0.6rem;
  background-color: rgba(255, 79, 79, 0.2);

  &:after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 1.6rem;

    border: solid transparent;
    border-width: 0.8rem;
    border-bottom-color: rgba(255, 79, 79, 0.2);
    pointer-events: none;
  }

  & > span {
    color: ${COLOR.RED};
    ${FONT_STYLES.SB_15_CAPTION};
  }
`;
