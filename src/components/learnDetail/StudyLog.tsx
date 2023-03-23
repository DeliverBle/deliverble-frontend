import { MemoConfirmModalKey } from '@src/components/learnDetail/ConfirmModal';
import MemoLog from '@src/components/learnDetail/memo/MemoLog';
import RecordLog from '@src/components/learnDetail/record/RecordLog';
import { MemoInfo, MemoState } from '@src/pages/learn/[id]';
import { MemoData } from '@src/services/api/types/learn-detail';
import { COLOR } from '@src/styles/color';
import { FONT_STYLES } from '@src/styles/fontStyle';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface StudyLogProps {
  memoInfo: MemoInfo;
  memoList: MemoData[];
  memoState: MemoState;
  setMemoList: Dispatch<SetStateAction<MemoData[]>>;
  setMemoState: Dispatch<SetStateAction<MemoState>>;
  onMemoModal: (type: MemoConfirmModalKey) => void;
  currentScriptId: number;
  isRecordSaved: boolean;
}

function StudyLog(props: StudyLogProps) {
  const { memoInfo, memoList, memoState, setMemoList, setMemoState, onMemoModal, currentScriptId, isRecordSaved } =
    props;
  const [studyLogTab, setStudyLogTab] = useState<string>('memo');

  useEffect(() => {
    isRecordSaved &&
      setTimeout(() => {
        setStudyLogTab('record');
      }, 1000);
  }, [isRecordSaved]);

  return (
    <StStudyLogContainer>
      <StStudyLogTabList role="tablist">
        <StStudyLogTab
          role="tab"
          aria-selected={studyLogTab === 'memo'}
          isActive={studyLogTab === 'memo'}
          onClick={() => setStudyLogTab('memo')}>
          메모
        </StStudyLogTab>
        <StStudyLogTab
          role="tab"
          aria-selected={studyLogTab === 'record'}
          isActive={studyLogTab === 'record'}
          onClick={() => setStudyLogTab('record')}>
          녹음
        </StStudyLogTab>
      </StStudyLogTabList>
      {studyLogTab === 'memo' ? (
        <MemoLog
          memoInfo={memoInfo}
          memoList={memoList}
          memoState={memoState}
          setMemoList={setMemoList}
          setMemoState={setMemoState}
          onMemoModal={onMemoModal}
        />
      ) : (
        <RecordLog scriptId={currentScriptId} isRecordSaved={isRecordSaved} />
      )}
    </StStudyLogContainer>
  );
}

export default StudyLog;

const StStudyLogContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StStudyLogTabList = styled.ul`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const StStudyLogTab = styled.li<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? COLOR.BLACK : COLOR.GRAY_30)};
  ${FONT_STYLES.SB_24_HEADLINE};
  cursor: pointer;

  &:not(:last-child):after {
    content: '|';
    margin: 0 1.6rem;
    color: ${COLOR.GRAY_30};
    font-weight: 400;
  }
`;
