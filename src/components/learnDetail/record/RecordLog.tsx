interface RecordStatusBarProps {
  scriptId: number;
}

function RecordLog(props: RecordStatusBarProps) {
  const { scriptId } = props;
  console.log(scriptId);
  return <div>녹음 기록</div>;
}

export default RecordLog;
