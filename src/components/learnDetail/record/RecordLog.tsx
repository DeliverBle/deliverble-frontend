import { api } from '@src/services/api';
import { useState } from 'react';
import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { icRecordPlayDefault, icRecordPauseDefault, icMemoXButton, icCheckButton } from 'public/assets/icons';
import ImageDiv from '@src/components/common/ImageDiv';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { useRef } from 'react';
import EmptyRecord from './EmptyRecord';
import RecordDotButton from './RecordDotButton';
import { useRecoilValue } from 'recoil';
import { isGuideAtom } from '@src/stores/newsState';
import { useMutation, useQuery } from 'react-query';

interface RecordStatusBarProps {
  scriptId: number;
  isRecordSaved: boolean;
}

function RecordLog(props: RecordStatusBarProps) {
  const { scriptId, isRecordSaved } = props;
  const isGuide = useRecoilValue(isGuideAtom);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPausing, setIsPausing] = useState(false);
  const [linkClicked, setLinkClicked] = useState('');
  const progressRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef(new Audio());
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isNameChanging, setIsNameChanging] = useState(false);
  const [recordLinkChanging, setRecordLinkChanging] = useState('');
  const [isTextLengthExceeded, setIsTextLengthExceeded] = useState(false);

  const { data } = useQuery(
    ['recordData', isRecordSaved, isDataChanged],
    () => api.learnDetailService.getRecordData(scriptId),
    {
      onSuccess: (data) => {
        !data && setIsDataEmpty(true);
        setIsDataChanged(false);
      },
      onError: () => {
        console.error('녹음 데이터 요청 에러');
      },
      enabled: !!scriptId,
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

  const handlePlayRecord = (link: string, endTime: number) => {
    const updateProgress = (e: Event) => {
      const { currentTime } = e.target as HTMLAudioElement;
      setCurrentTime(currentTime);
      const progressPercentage = (currentTime / (endTime - 0.75)) * 100;
      progressRef.current && (progressRef.current.style.width = (47.4 * (progressPercentage / 100)).toString() + 'rem');
      if (progressPercentage > 99) {
        setIsPlaying(false);
        setIsPausing(false);
        audioRef.current.src = '';
        audioRef.current.removeEventListener('timeupdate', updateProgress);
      }
    };

    // 재생 버튼을 눌렀을 경우.
    if (!isPlaying) {
      // 이전에 재생했던 녹음이 아닐 경우
      if (linkClicked !== link) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.src = link;
        audioRef.current.addEventListener('timeupdate', updateProgress);
        //한번 재생했던 녹음을 다시 재생할 경우.
      } else if (!isPausing) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.src = link;
        audioRef.current.addEventListener('timeupdate', updateProgress);
      }

      audioRef.current.play();
      setIsPlaying(true);
      setIsPausing(false);
      // 중지 버튼을 눌렀을 경우.
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsPausing(true);
    }
  };

  const { mutate } = useMutation(
    ['recordData'],
    () =>
      api.learnDetailService.changeRecordNameData({
        link: recordLinkChanging,
        scriptId: scriptId,
        newName: nameInputRef.current ? nameInputRef.current.value : '',
      }),
    {
      onSuccess: () => {
        setIsNameChanging(false);
        setIsDataChanged(true);
      },
      onError: () => {
        alert('녹음 이름 변경에 실패했습니다.');
      },
    },
  );

  const onChange = () => {
    if (nameInputRef.current && nameInputRef.current.value.length > 99) {
      setIsTextLengthExceeded(true);
    } else {
      setIsTextLengthExceeded(false);
    }
  };

  return (
    <StRecordLogContainer>
      {isDataEmpty ? (
        <EmptyRecord />
      ) : (
        <>
          {data?.map(({ name, link, endTime, date }) => (
            <StRecord key={link}>
              <ImageDiv
                src={link === audioRef.current?.src && isPlaying ? icRecordPauseDefault : icRecordPlayDefault}
                className="icRecordPlay"
                alt={link === audioRef.current?.src && isPlaying ? '녹음 중지' : '녹음 재생'}
                layout="fill"
                onClick={() => {
                  if (link !== audioRef.current?.src && (isPlaying || isPausing)) {
                    return;
                  } else {
                    setLinkClicked(link);
                    handlePlayRecord(link, endTime);
                  }
                }}
              />
              <StRecordInfo>
                {isNameChanging && link === recordLinkChanging ? (
                  <>
                    <StNameChanging
                      ref={nameInputRef}
                      defaultValue={name}
                      onChange={onChange}
                      maxLength={100}
                      isTextLengthExceeded={isTextLengthExceeded}></StNameChanging>
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
                      <button type="button">
                        <ImageDiv
                          className="icNameChange"
                          src={icCheckButton}
                          alt="완료"
                          onClick={() => {
                            mutate();
                          }}
                        />
                      </button>
                    </StButtonContainer>
                  </>
                ) : (
                  <>
                    <h1>{name}</h1>
                    {link === audioRef.current?.src && (isPlaying || isPausing) && (
                      <StRecordPlayBar>
                        <StRecordPlayStatus ref={progressRef} />
                      </StRecordPlayBar>
                    )}
                    <div>
                      {link === audioRef.current?.src && (isPlaying || isPausing) ? (
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
              {!isGuide && !isNameChanging && (
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

  margin-right: 0.8rem;
  padding: 3.8rem 0 3.8rem 4rem;
  width: 67rem;

  background-color: ${COLOR.SUB_BLUE_8};
  border-radius: 2.5rem;

  .icRecordPlay {
    position: relative;
    width: 6rem;
    height: 6rem;
    cursor: pointer;
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
  margin-left: 4rem;

  & > h1 {
    ${FONT_STYLES.SB_25_MEMO};
    margin-bottom: 0.8rem;
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
  background-color: ${COLOR.SUB_BLUE_30};
  margin-bottom: 0.8rem;
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
  padding: 0.8rem 0.8rem 1rem 1.2rem;
  width: 49.8rem;
  height: 5.5rem;

  border: 0.2rem solid ${({ isTextLengthExceeded }) => (isTextLengthExceeded ? COLOR.RED : COLOR.SUB_BLUE_50)};
  border-radius: 1.2rem;
  background-color: transparent;

  font-family: 'Pretendard';
  ${FONT_STYLES.M_25_BODY};
  color: ${COLOR.BLACK};

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
  gap: 0.8rem;

  width: 6.8rem;
  height: 3rem;
  margin-top: 1rem;
  margin-left: 42.2rem;

  .icNameChange {
    position: relative;
    width: 3rem;
    height: 3rem;
  }
`;
