/* eslint-disable @typescript-eslint/no-unused-vars */
import { INITIAL, INITIAL_MEMO_STATE } from '@src/constants/learnDetail/memo';
import { useDeleteMemoData, usePostMemoData, useUpdateMemoData } from '@src/services/queries/learn-detail';
import { MemoConfirmModalKey, MemoInfo, MemoState } from '@src/types/learnDetail';

interface useUpdateMemoListProps {
  memoState: MemoState;
  memoInfo: MemoInfo;
  clickedTitleIndex: number;
  setMemoState: React.Dispatch<React.SetStateAction<MemoState>>;
}

function useUpdateMemoList(props: useUpdateMemoListProps) {
  const { memoState, memoInfo, clickedTitleIndex, setMemoState } = props;

  const postMemoData = usePostMemoData();
  const createMemo = async (content: string) => {
    const { id, scriptId, ...memo } = memoInfo;
    const data = { memo: { ...memo, content }, scriptId, clickedTitleIndex };
    postMemoData.mutate(data);
  };

  const updateMemoData = useUpdateMemoData();
  const editMemo = async (content: string) => {
    const { editMemoId } = memoState;
    const data = { memoId: editMemoId, content, clickedTitleIndex };
    updateMemoData.mutate(data);
  };

  const deleteMemoData = useDeleteMemoData();
  const deleteMemo = async () => {
    const id = memoState.deleteMemoId !== INITIAL ? memoState.deleteMemoId : memoInfo.id;
    if (id !== INITIAL) {
      const data = { memoId: id, clickedTitleIndex };
      deleteMemoData.mutate(data);
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
