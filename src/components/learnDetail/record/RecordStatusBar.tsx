import ImageDiv from '@src/components/common/ImageDiv';
import styled, { css } from 'styled-components';
import { COLOR } from '@src/styles/color';
import { icRecordMicDefault, icRecordMicActive, icRecordStart, icRecordStop } from 'public/assets/icons';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { useEffect, useState } from 'react';
import { api } from '@src/services/api';
import { useRouter } from 'next/router';

interface RecordStatusBarProps {
  scriptId: number;
}

function RecordStatusBar(props: RecordStatusBarProps) {
  const { scriptId } = props;
  const [stream, setStream] = useState<MediaStream>();
  const [media, setMedia] = useState<MediaRecorder>();
  const [isRecording, setIsRecording] = useState(false);
  const [source, setSource] = useState<MediaStreamAudioSourceNode>();
  const [audioUrl, setAudioUrl] = useState<Blob>();
  const [recordFormData, setRecordFormData] = useState<FormData>();
  const [recordStartTime, setRecordStartTime] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();
  //get test.
  //   useEffect(() => {
  //     getRecordDataArr().then((dataArr) => {
  //       console.log(dataArr);
  //     });
  //   }, []);

  //   const getRecordDataArr = async () => {
  //     const dataArr = await api.learnDetailService.getRecordData(63);
  //     return dataArr;
  //   };

  useEffect(() => {
    setRecordStartTime(new Date().getTime());
  }, [isRecording, recordStartTime]);

  const padNumber = (num: number) => {
    return String(num).padStart(2, '0');
  };

  const startRecord = () => {
    const audioCtx = new window.AudioContext();

    const makeSound = (stream: MediaStream) => {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
    };

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setIsRecording(true);
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);
    });

    // setStartClickTime(new Date().getTime());
    setIntervalId(
      setInterval(() => {
        setSecond((prev) => prev + 1);
        return;
      }, 1000),
    );
  };

  const handleTimerSecond = (second: number) => {
    if (second === 60) {
      setSecond(0);
      setMinute((prev) => prev + 1);
    }
    return second;
  };

  const stopRecord = () => {
    media &&
      (media.ondataavailable = function (e: BlobEvent) {
        setAudioUrl(e.data);
        setIsRecording(false);
      });

    stream &&
      stream.getAudioTracks().forEach(function (track: MediaStreamTrack) {
        track.stop();
      });

    media?.stop();
    source?.disconnect();
    // setStopClickTime(new Date().getTime());
    intervalId && clearInterval(intervalId);
    setMinute(0);
    setSecond(0);
    submitAudioFile();
  };

  const getDate = () => {
    const TIME_ZONE = 3240 * 10000;
    const date = new Date();

    const dateInForm = new Date(+date + TIME_ZONE).toISOString().split('T')[0];
    const time = date.toTimeString().split(' ')[0];

    return dateInForm + ' ' + time;
  };

  const submitAudioFile = () => {
    const formData = new FormData();
    const soundFile = audioUrl && new Blob([audioUrl], { type: 'mp3' });
    const recordStopTime = new Date().getTime();
    const duration = Math.floor((recordStopTime - recordStartTime) / 1000);
    console.log(soundFile);
    soundFile && formData.append('file', soundFile);
    formData.append('scriptId', scriptId.toString());
    formData.append('endtime', duration.toString());
    formData.append('date', getDate());
    setRecordFormData(formData);
  };

  //   useEffect(() => {
  //     recordFormData && api.learnDetailService.uploadRecordData(recordFormData);
  //   }, [recordFormData]);

  return (
    <>
      <StRecordStatusBar isRecording={isRecording}>
        {isRecording ? (
          <ImageDiv src={icRecordMicActive} className="icRecordMic" layout="fill" alt="" />
        ) : (
          <ImageDiv src={icRecordMicDefault} className="icRecordMic" layout="fill" alt="" />
        )}

        <RecordTime>
          {padNumber(minute)}:{padNumber(handleTimerSecond(second))}
        </RecordTime>
        {isRecording ? (
          <ImageDiv src={icRecordStop} className="icRecordStop" layout="fill" alt="녹음 중지" onClick={stopRecord} />
        ) : (
          <ImageDiv src={icRecordStart} className="icRecordStart" layout="fill" alt="녹음 시작" onClick={startRecord} />
        )}
      </StRecordStatusBar>
    </>
  );
}

export default RecordStatusBar;

const StRecordStatusBar = styled.div<{ isRecording: boolean }>`
  display: flex;
  align-items: center;
  width: 14.1rem;
  height: 4.8rem;
  margin-right: 54.9rem;
  border-radius: 5rem;
  ${({ isRecording }) =>
    isRecording
      ? css`
          border: 0.2rem solid ${COLOR.MAIN_BLUE};
        `
      : css`
          border: 0.2rem solid ${COLOR.GRAY_5};
        `}

  .icRecordMic {
    position: relative;
    width: 3.2rem;
    height: 3.2rem;
    margin-left: 0.9rem;
  }

  .icRecordStart,
  .icRecordStop {
    position: relative;
    width: 3.2rem;
    height: 3.2rem;
    margin-left: 0.8rem;
  }
`;

const RecordTime = styled.span`
  ${FONT_STYLES.M_16_CAPTION};
  color: ${COLOR.GRAY_30};
  margin-left: 0.8rem;
`;
