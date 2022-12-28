import ImageDiv from '@src/components/common/ImageDiv';
import styled from 'styled-components';
import { COLOR } from '@src/styles/color';
import { icRecordMicDefault, icRecordMicActive, icRecordStart, icRecordStop } from 'public/assets/icons';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { Dispatch, SetStateAction, useState } from 'react';
import { api } from '@src/services/api';
import { loginState } from '@src/stores/loginState';
import { useRecoilValue } from 'recoil';
import LoginModal from '@src/components/login/LoginModal';

interface RecordStatusBarProps {
  scriptId: number;
  isRecordSaved: boolean;
  setIsRecordSaved: Dispatch<SetStateAction<boolean>>;
}

function RecordStatusBar(props: RecordStatusBarProps) {
  const { scriptId, isRecordSaved, setIsRecordSaved } = props;
  const [stream, setStream] = useState<MediaStream>();
  const [media, setMedia] = useState<MediaRecorder>();
  const [isRecording, setIsRecording] = useState(false);
  const [source, setSource] = useState<MediaStreamAudioSourceNode>();
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const isLoggedIn = useRecoilValue(loginState);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const uploadRecordData = async (formData: FormData) => {
    await api.learnDetailService.uploadRecordData(formData);
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

    setIntervalId(
      setInterval(() => {
        setSeconds((prev) => prev + 1);
        return;
      }, 1000),
    );
  };

  const stopRecord = () => {
    media &&
      (media.ondataavailable = function (e: BlobEvent) {
        const audioUrl = e.data;
        setIsRecording(false);
        submitAudioFile(audioUrl);
      });
    stream &&
      stream.getAudioTracks().forEach(function (track: MediaStreamTrack) {
        track.stop();
      });
    media?.stop();
    source?.disconnect();
    intervalId && clearInterval(intervalId);

    setMinutes(0);
    setSeconds(0);
    setIsRecordSaved(true);
    setTimeout(() => {
      setIsRecordSaved(false);
    }, 1000);
  };

  const submitAudioFile = (audioUrl: BlobPart) => {
    const formData = new FormData();
    const soundFile = audioUrl && new Blob([audioUrl], { type: 'mp3' });
    const duration = minutes * 60 + seconds;
    soundFile && formData.append('file', soundFile);
    formData.append('scriptId', scriptId.toString());
    formData.append('endtime', duration.toString());
    formData.append('date', getDate());
    uploadRecordData(formData);
  };

  const getDate = () => {
    const TIME_ZONE = 3240 * 10000;
    const date = new Date();
    const dateInForm = new Date(+date + TIME_ZONE).toISOString().split('T')[0];
    const time = date.toTimeString().split(' ')[0];
    return dateInForm + ' ' + time;
  };

  const handleTimerSecond = (second: number) => {
    if (second === 60) {
      setSeconds(0);
      setMinutes((prev) => prev + 1);
    }
    return second;
  };

  const twoDigitsNumber = (num: number) => {
    return String(num).padStart(2, '0');
  };

  return (
    <>
      <StRecordStatusBar
        onClick={(e) => {
          e.stopPropagation();
          !isLoggedIn && setIsLoginModalOpen(true);
        }}>
        <StRecordStatus isRecording={isRecording}>
          <ImageDiv
            src={isRecording ? icRecordMicActive : icRecordMicDefault}
            className="icRecordMic"
            layout="fill"
            alt=""
          />
          <RecordTime isRecording={isRecording}>
            {twoDigitsNumber(minutes)}:{twoDigitsNumber(handleTimerSecond(seconds))}
          </RecordTime>
          {isRecording ? (
            <ImageDiv src={icRecordStop} className="icRecordStop" layout="fill" alt="녹음 중지" onClick={stopRecord} />
          ) : (
            <ImageDiv
              src={icRecordStart}
              className="icRecordStart"
              layout="fill"
              alt="녹음 시작"
              onClick={() => {
                isLoggedIn && startRecord();
              }}
            />
          )}
        </StRecordStatus>
        {isRecordSaved && (
          <StGuideTooltip>
            <p>저장되었습니다.</p>
          </StGuideTooltip>
        )}
      </StRecordStatusBar>
      {isLoginModalOpen && <LoginModal closeModal={() => setIsLoginModalOpen(false)} />}
    </>
  );
}

export default RecordStatusBar;

const StRecordStatusBar = styled.div`
  width: 14.1rem;
  height: 4.8rem;
  margin-right: 54.9rem;
`;

const StRecordStatus = styled.div<{ isRecording: boolean }>`
  display: flex;
  align-items: center;
  width: 14.1rem;
  height: 4.8rem;
  margin-right: 54.9rem;
  border-radius: 5rem;
  border: 0.2rem solid ${({ isRecording }) => (isRecording ? COLOR.MAIN_BLUE : COLOR.GRAY_5)};

  .icRecordMic {
    position: relative;
    width: 3.2rem;
    height: 3.2rem;
    margin-left: 0.9rem;
  }

  .icRecordStart,
  .icRecordStop {
    position: absolute;
    left: 10.1rem;
    width: 3.2rem;
    height: 3.2rem;
    cursor: pointer;
  }
`;

const RecordTime = styled.span<{ isRecording: boolean }>`
  margin-left: 0.8rem;
  ${FONT_STYLES.M_16_CAPTION};
  color: 0.2rem solid ${({ isRecording }) => (isRecording ? COLOR.BLACK : COLOR.GRAY_30)};
`;

const StGuideTooltip = styled.div`
  position: absolute;
  bottom: 6rem;
  left: 6rem;
  width: 11.4rem;
  height: 4.1rem;
  border-radius: 0.6rem;
  background-color: rgba(22, 15, 53, 0.7);

  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 4.9rem;

    border: solid transparent;
    border-width: 0.8rem;
    border-top-color: rgba(22, 15, 53, 0.7);
    pointer-events: none;
  }

  p {
    position: relative;
    top: 1rem;
    left: 1rem;
    color: ${COLOR.WHITE};
    ${FONT_STYLES.SB_15_CAPTION};
  }
`;
