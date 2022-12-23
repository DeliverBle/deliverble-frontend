import ImageDiv from '@src/components/common/ImageDiv';
import styled, { css } from 'styled-components';
import { COLOR } from '@src/styles/color';
import { icRecordMicDefault, icRecordMicActive, icRecordStart, icRecordStop } from 'public/assets/icons';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { useCallback, useState } from 'react';
import { api } from '@src/services/api';

function RecordStatusBar() {
  const [stream, setStream] = useState<MediaStream>();
  const [media, setMedia] = useState<MediaRecorder>();
  const [onRecord, setOnRecord] = useState(false);
  const [source, setSource] = useState<MediaStreamAudioSourceNode>();
  const [audioUrl, setAudioUrl] = useState<Blob>();
  const [recordFormData, setRecordFormData] = useState<FormData>();

  const startRecord = () => {
    const audioCtx = new window.AudioContext();

    const makeSound = (stream: MediaStream) => {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
    };

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setOnRecord(true);
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);
    });
  };

  const stopRecord = () => {
    media &&
      (media.ondataavailable = function (e: BlobEvent) {
        setAudioUrl(e.data);
        setOnRecord(false);
      });

    stream &&
      stream.getAudioTracks().forEach(function (track: MediaStreamTrack) {
        track.stop();
      });

    media?.stop();
    source?.disconnect();
    onSubmitAudioFile();
  };

  const onSubmitAudioFile = useCallback(() => {
    const formData = new FormData();
    setRecordFormData(formData);
    const soundFile =
      audioUrl && new File([audioUrl], 'soundBlob', { lastModified: new Date().getTime(), type: 'mp3' });
    console.log(soundFile);
    if (audioUrl) {
      const bloburl = URL.createObjectURL(audioUrl);
      console.log(bloburl);
      const audio = new Audio(bloburl);
      //녹음본 재생
      audio.play();
      formData.append('file', 'soundFile');
      formData.append('scriptId', '63');
      formData.append('endtime', '60');
      formData.append('date', '2021-08-01 17:42:30');
    }
    recordFormData && api.learnDetailService.uploadRecordData(recordFormData);
  }, [audioUrl, recordFormData]);

  return (
    <>
      <StRecordStatusBar onRecord={onRecord}>
        {onRecord ? (
          <ImageDiv src={icRecordMicActive} className="icRecordMic" layout="fill" alt="" />
        ) : (
          <ImageDiv src={icRecordMicDefault} className="icRecordMic" layout="fill" alt="" />
        )}

        <RecordTime>00:00</RecordTime>
        {onRecord ? (
          <ImageDiv src={icRecordStop} className="icRecordStop" layout="fill" alt="녹음 중지" onClick={stopRecord} />
        ) : (
          <ImageDiv src={icRecordStart} className="icRecordStart" layout="fill" alt="녹음 시작" onClick={startRecord} />
        )}
      </StRecordStatusBar>
    </>
  );
}

export default RecordStatusBar;

const StRecordStatusBar = styled.div<{ onRecord: boolean }>`
  display: flex;
  align-items: center;
  width: 14.1rem;
  height: 4.8rem;
  margin-right: 54.9rem;
  border-radius: 5rem;
  ${({ onRecord }) =>
    onRecord
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
