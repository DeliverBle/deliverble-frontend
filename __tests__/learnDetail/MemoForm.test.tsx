import { MemoForm } from '@src/components/learnDetail/memo';
import { INITIAL } from '@src/constants/learnDetail/memo';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('메모 추가', () => {
  const setup = () => {
    const memoData = { order: 4, startIndex: 0, keyword: '시가총액', content: '', highlightId: '571.232.31' };
    const memoState = { newMemoId: 0, editMemoId: INITIAL, deleteMemoId: INITIAL };
    const onMemoModal = jest.fn();
    const setMemoState = jest.fn();
    const updateMemoList = jest.fn();

    const { getByRole } = render(
      <MemoForm
        memoData={memoData}
        memoState={memoState}
        onMemoModal={onMemoModal}
        setMemoState={setMemoState}
        updateMemoList={updateMemoList}
      />,
    );

    const memoTextarea = getByRole('textbox');
    const submitButton = getByRole('button', { name: '완료' });
    const cancelButton = getByRole('button', { name: '취소' });

    return { updateMemoList, onMemoModal, memoTextarea, submitButton, cancelButton };
  };

  it('메모 입력 후 작성 완료 버튼 클릭하여 메모 저장', async () => {
    const { updateMemoList, memoTextarea, submitButton } = setup();

    expect(submitButton).toBeDisabled();
    await userEvent.type(memoTextarea, '숨을 크게 들이마시고');
    expect(submitButton).toBeEnabled();

    await userEvent.click(submitButton);
    expect(updateMemoList).toHaveBeenCalledWith('new', '숨을 크게 들이마시고');
  });

  it('메모 입력 후 외부 클릭시 메모 저장', async () => {
    const { updateMemoList, memoTextarea, submitButton } = setup();

    expect(submitButton).toBeDisabled();
    await userEvent.type(memoTextarea, '숨을 크게 들이마시고');
    expect(submitButton).toBeEnabled();

    await userEvent.click(document.body);
    expect(updateMemoList).toHaveBeenCalledWith('new', '숨을 크게 들이마시고');
  });

  it('메모 작성 취소 버튼 클릭시 모달 오픈', async () => {
    const { onMemoModal, cancelButton } = setup();

    await userEvent.click(cancelButton);
    expect(onMemoModal).toHaveBeenCalledWith('new');
  });

  it('메모 입력 없이 외부 클릭시 모달 오픈', async () => {
    const { onMemoModal } = setup();

    await userEvent.click(document.body);
    expect(onMemoModal).toHaveBeenCalledWith('new');
  });
});
