/* eslint-disable @typescript-eslint/no-unused-vars */

import { MemoConfirmModalKey } from '@src/components/learnDetail/ConfirmModal';
import { MemoInfo, MemoState } from '@src/pages/learn/[id]';
import { api } from '@src/services/api';
import { MemoData } from '@src/services/api/types/learn-detail';
import { INITIAL_MEMO_STATE } from '@src/utils/constant';

interface useRightClickHandlerProps {
  memoState: MemoState;
  memoInfo: MemoInfo;
  setMemoList: React.Dispatch<React.SetStateAction<MemoData[]>>;
  setMemoState: React.Dispatch<React.SetStateAction<MemoState>>;
}

function useUpdateMemoList(props: useRightClickHandlerProps) {
  const { memoState, memoInfo, setMemoList, setMemoState } = props;

  const createMemo = async (content: string) => {
    const { id, scriptId, ...memo } = memoInfo;
    const memoList = await api.learnDetailService.postMemoData({ ...memo, content }, scriptId);
    memoList && setMemoList(memoList);
  };

  const editMemo = async (content: string) => {
    const { editMemoId } = memoState;
    const memoList = await api.learnDetailService.updateMemoData(editMemoId, content);
    memoList && setMemoList(memoList);
  };

  const deleteMemo = async () => {
    const id = memoState.deleteMemoId !== -1 ? memoState.deleteMemoId : memoInfo.id;
    const memoList = await api.learnDetailService.deleteMemoData(id);
    memoList && setMemoList(memoList);
  };

  const updateMemoList = (type: MemoConfirmModalKey, content?: string) => {
    if (type === 'new' && content) {
      createMemo(content);
    } else if (type === 'edit' && content) {
      editMemo(content);
    } else if (type === 'delete') {
      deleteMemo();
    }
    setMemoState(INITIAL_MEMO_STATE);
  };

  return updateMemoList;
}

export default useUpdateMemoList;
