import { api } from '@src/services/api';
import { useEffect, useState } from 'react';
import { GetRecordData } from '@src/services/api/types/learn-detail';

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

  return (
    <div>
      {recordList.map(({ name, link, endTime, date }) => (
        <div key={link}>
          {name}
          {endTime}
          {date}
        </div>
      ))}
    </div>
  );
}

export default RecordLog;
