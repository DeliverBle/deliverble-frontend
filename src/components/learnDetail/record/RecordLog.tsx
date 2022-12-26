import { api } from '@src/services/api';
import { useEffect } from 'react';

interface RecordStatusBarProps {
  scriptId: number;
}

function RecordLog(props: RecordStatusBarProps) {
  const { scriptId } = props;
  useEffect(() => {
    getMemo(scriptId);
  }, [scriptId]);
  const getMemo = async (scriptId: number) => {
    const response = await api.learnDetailService.getRecordData(scriptId);
    console.log(response);
  };
  return <div>녹음 기록</div>;
}

export default RecordLog;
