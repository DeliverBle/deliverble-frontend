/* eslint-disable @typescript-eslint/no-unused-vars */
import { INITIAL_MEMO_STATE } from '@src/constants/learnDetail/memo';
import { api } from '@src/services/api';
import { MemoConfirmModalKey, MemoInfo, MemoState } from '@src/types/learnDetail';
import { MemoData } from '@src/types/learnDetail/remote';

interface useUpdateMemoListProps {
  memoState: MemoState;
  memoInfo: MemoInfo;
  setMemoList: React.Dispatch<React.SetStateAction<MemoData[]>>;
  setMemoState: React.Dispatch<React.SetStateAction<MemoState>>;
}

function useUpdateMemoList(props: useUpdateMemoListProps) {
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
    if (id !== -1) {
      const memoList = await api.learnDetailService.deleteMemoData(id);
      memoList && setMemoList(memoList);
    }
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
