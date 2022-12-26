import { api } from '@src/services/api';
import { useEffect, useState } from 'react';
import { GetRecordData } from '@src/services/api/types/learn-detail';
import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { icRecordPlayDefault, icRecordPauseDefault } from 'public/assets/icons';
import ImageDiv from '@src/components/common/ImageDiv';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { useRef } from 'react';

interface RecordStatusBarProps {
  scriptId: number;
}

function RecordLog(props: RecordStatusBarProps) {
  const { scriptId } = props;
  const [recordList, setRecordList] = useState<GetRecordData[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [linkClicked, setLinkClicked] = useState('');

  useEffect(() => {
    getRecordData(scriptId);
  }, [scriptId]);

  const getRecordData = async (scriptId: number) => {
    const response = await api.learnDetailService.getRecordData(scriptId);
    setRecordList(response);
  };

  const handleDate = (date: string) => {
    return date.substring(0, 10).replace(/-/g, '.').concat('.');
  };

  const handleEndTime = (endTime: number) => {
    const twoDigitsNumber = (num: number) => {
      return String(num).padStart(2, '0');
    };
    return `${Math.floor(endTime / 60)}:${twoDigitsNumber(endTime % 60)}`;
  };

  const audioRef = useRef(new Audio());
  const handlePlayRecord = (link: string) => {
    console.log(link);
    console.log(linkClicked);
    if (!isPlaying) {
      if (linkClicked !== link) {
        audioRef.current.src = link;
      }
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    setTimeout(() => {
      //   audioRef.current.pause();
    }, audioRef.current.duration * 1000);
  };

  return (
    <StRecordLogContainer>
      {recordList.map(({ name, link, endTime, date }) => (
        <StRecord key={link}>
          <ImageDiv
            src={link === audioRef.current.src && isPlaying ? icRecordPauseDefault : icRecordPlayDefault}
            className="icRecordPlay"
            alt={link === audioRef.current.src ? '녹음 중지' : '녹음 재생'}
            layout="fill"
            onClick={() => {
              setLinkClicked(link);
              handlePlayRecord(link);
            }}
          />
          {/* {link === audioRef.current.src && isPlaying ? (
            <ImageDiv
              src={icRecordPauseDefault}
              className="icRecordPlay"
              alt={link === audioRef.current.src ? '녹음 중지' : '녹음 재생'}
              layout="fill"
              onClick={() => {
                handlePlayRecord(link);
              }}
            />
          ) : (
            <ImageDiv
              src={icRecordPlayDefault}
              className="icRecordPlay"
              alt={link === audioRef.current.src ? '녹음 중지' : '녹음 재생'}
              layout="fill"
              onClick={() => {
                handlePlayRecord(link);
              }}
            />
          )} */}
          <StRecordInfo>
            <h1>{name}</h1>
            {link === audioRef.current.src && (
              <StRecordPlayBar>
                <StRecordPlayStatus />
              </StRecordPlayBar>
            )}
            <div>
              <p>{handleDate(date)}</p>
              <p>{handleEndTime(endTime)}</p>
            </div>
          </StRecordInfo>
          <audio src={link} ref={audioRef} />
        </StRecord>
      ))}
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
`;

const StRecordPlayStatus = styled.div`
  position: absolute;
  width: 47.4rem;
  height: 0.8rem;
  background-color: black;

  border-radius: 1rem;
`;
