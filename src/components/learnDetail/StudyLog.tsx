import { MemoLog } from '@src/components/learnDetail/memo';
import { RecordLog } from '@src/components/learnDetail/record';
import { COLOR, FONT_STYLES } from '@src/styles';
import { MemoConfirmModalKey, MemoState } from '@src/types/learnDetail';
import { MemoData } from '@src/types/learnDetail/remote';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';

interface StudyLogProps {
  memoList: MemoData[];
  memoState: MemoState;
  setMemoState: Dispatch<SetStateAction<MemoState>>;
  onMemoModal: (type: MemoConfirmModalKey) => void;
  currentScriptId: number;
  isRecordSaved: boolean;
  updateMemoList: (type: MemoConfirmModalKey, content?: string) => void;
}

function StudyLog(props: StudyLogProps) {
  const { memoList, memoState, setMemoState, onMemoModal, currentScriptId, isRecordSaved, updateMemoList } = props;
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
          memoList={memoList}
          memoState={memoState}
          setMemoState={setMemoState}
          onMemoModal={onMemoModal}
          updateMemoList={updateMemoList}
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
