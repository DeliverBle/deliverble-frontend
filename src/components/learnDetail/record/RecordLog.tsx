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
  const [linkPlaying, setIsLinkPlaying] = useState('');
  const audioRef = useRef(new Audio());

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

  const handlePlayRecord = (link: string, endTime: number) => {
    console.log(link);
    console.log(linkPlaying);
    if (link === linkPlaying) {
      audioRef.current.pause();
      setIsLinkPlaying('');
    } else if (linkPlaying === '') {
      audioRef.current.play();
      setIsLinkPlaying(link);
      setTimeout(() => {
        audioRef.current.pause();
        setIsLinkPlaying('');
      }, endTime * 1000);
    }
  };

  return (
    <StRecordLogContainer>
      {recordList.map(({ name, link, endTime, date }) => (
        <StRecord key={link}>
          {/* {link === linkPlaying ? (
            <ImageDiv
              src={icRecordPauseDefault}
              className="icRecordPlay"
              alt="녹음 중지"
              layout="fill"
              //   onClick={() => {
              //     handlePauseRecord(link, endTime);
              //   }}
            />
          ) : (
            <ImageDiv
              src={icRecordPlayDefault}
              className="icRecordPlay"
              alt="녹음 재생"
              layout="fill"
              onClick={() => {
                link !== linkPlaying && handlePlayRecord(link, endTime);
              }}
            />
          )} */}
          <ImageDiv
            src={link === linkPlaying ? icRecordPauseDefault : icRecordPlayDefault}
            className="icRecordPlay"
            alt="녹음 재생"
            layout="fill"
            onClick={() => {
              handlePlayRecord(link, endTime);
            }}
          />
          <audio src={link} ref={audioRef} />
          <StRecordInfo>
            <h1>{name}</h1>
            {link === linkPlaying && <StRecordPlayBar />}
            <div>
              <p>{handleDate(date)}</p>
              <p>{handleEndTime(endTime)}</p>
            </div>
          </StRecordInfo>
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
  width: 47.4rem;
  height: 0.8rem;
  background-color: ${COLOR.SUB_BLUE_30};
  margin-bottom: 0.8rem;
  border-radius: 1rem;
`;
