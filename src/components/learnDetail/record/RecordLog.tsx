import { api } from '@src/services/api';
import { useEffect, useState } from 'react';
import { GetRecordData } from '@src/services/api/types/learn-detail';
import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { icRecordPlayDefault } from 'public/assets/icons';
import ImageDiv from '@src/components/common/ImageDiv';
import { FONT_STYLES } from '@src/styles/fontStyle';

interface RecordStatusBarProps {
  scriptId: number;
}

function RecordLog(props: RecordStatusBarProps) {
  const { scriptId } = props;
  const [recordList, setRecordList] = useState<GetRecordData[]>([]);

  useEffect(() => {
    getMemo(scriptId);
  }, [scriptId]);

  const getMemo = async (scriptId: number) => {
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

  return (
    <StRecordLogContainer>
      {recordList.map(({ name, link, endTime, date }) => (
        <StRecord key={link}>
          <ImageDiv src={icRecordPlayDefault} className="icRecordPlay" alt="녹음 재생" layout="fill" />
          <StRecordInfo>
            <h1>{name}</h1>
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
  }
`;

const StRecordInfo = styled.div`
  width: 47.4rem;
  height: 7.3rem;
  margin-left: 4rem;

  & > h1 {
    ${FONT_STYLES.SB_25_MEMO};
    margin-bottom: 1rem;
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
