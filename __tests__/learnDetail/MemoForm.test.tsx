import { MemoForm } from '@src/components/learnDetail/memo';
import { INITIAL_MEMO_STATE } from '@src/constants/learnDetail/memo';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const memoData = { order: 4, startIndex: 0, keyword: '시가총액', content: '', highlightId: '571.232.31' };
const memoState = INITIAL_MEMO_STATE;
const onMemoModal = jest.fn();
const setMemoState = jest.fn();
const updateMemoList = jest.fn();

describe('메모 추가', () => {
  const setup = () => {
    const newMemoState = { ...memoState, newMemoId: 0 };

    const { getByRole } = render(
      <MemoForm
        memoData={memoData}
        memoState={newMemoState}
        onMemoModal={onMemoModal}
        setMemoState={setMemoState}
        updateMemoList={updateMemoList}
      />,
    );

    const memoTextarea = getByRole('textbox');
    const submitButton = getByRole('button', { name: '완료' });
    const cancelButton = getByRole('button', { name: '취소' });

    return { memoTextarea, submitButton, cancelButton };
  };

  it('메모 입력 후 작성 완료 버튼 클릭하여 메모 저장', async () => {
    const { memoTextarea, submitButton } = setup();

    expect(submitButton).toBeDisabled();
    await userEvent.type(memoTextarea, '숨을 크게 들이마시고');
    expect(submitButton).toBeEnabled();

    await userEvent.click(submitButton);
    expect(updateMemoList).toHaveBeenCalledWith('new', '숨을 크게 들이마시고');
  });

  it('메모 입력 후 외부 클릭시 메모 저장', async () => {
    const { memoTextarea, submitButton } = setup();

    expect(submitButton).toBeDisabled();
    await userEvent.type(memoTextarea, '숨을 크게 들이마시고');
    expect(submitButton).toBeEnabled();

    await userEvent.click(document.body);
    expect(updateMemoList).toHaveBeenCalledWith('new', '숨을 크게 들이마시고');
  });

  it('메모 작성 취소 버튼 클릭시 모달 오픈', async () => {
    const { cancelButton } = setup();

    await userEvent.click(cancelButton);
    expect(onMemoModal).toHaveBeenCalledWith('new');
  });

  it('메모 입력 없이 외부 클릭시 모달 오픈', async () => {
    await userEvent.click(document.body);
    expect(onMemoModal).toHaveBeenCalledWith('new');
  });
});

describe('메모 수정', () => {
  const setup = () => {
    const newMemoData = { ...memoData, id: 3, content: '숨을 크게 들이마시고' };
    const newMemoState = { ...memoState, editMemoId: 3 };

    const { getByRole } = render(
      <MemoForm
        memoData={newMemoData}
        memoState={newMemoState}
        onMemoModal={onMemoModal}
        setMemoState={setMemoState}
        updateMemoList={updateMemoList}
      />,
    );

    const memoTextarea = getByRole('textbox');
    const submitButton = getByRole('button', { name: '완료' });
    const cancelButton = getByRole('button', { name: '취소' });

    return { memoTextarea, submitButton, cancelButton };
  };

  it('메모 수정 후 작성 완료 버튼 클릭하여 메모 저장', async () => {
    const { memoTextarea, submitButton } = setup();

    expect(memoTextarea.textContent).toBe('숨을 크게 들이마시고');
    await userEvent.clear(memoTextarea);

    await userEvent.type(memoTextarea, '숨을 짧게 들이마시고');
    await userEvent.click(submitButton);
    expect(updateMemoList).toHaveBeenCalledWith('edit', '숨을 짧게 들이마시고');
  });

  it('메모 수정 후 외부 클릭시 메모 저장', async () => {
    const { memoTextarea } = setup();

    expect(memoTextarea.textContent).toBe('숨을 크게 들이마시고');
    await userEvent.clear(memoTextarea);

    await userEvent.type(memoTextarea, '숨을 짧게 들이마시고');
    await userEvent.click(document.body);
    expect(updateMemoList).toHaveBeenCalledWith('edit', '숨을 짧게 들이마시고');
  });

  it('메모 수정 없이 작성 완료 버튼을 클릭하거나 외부 클릭시 메모 저장', async () => {
    const { memoTextarea } = setup();

    expect(memoTextarea.textContent).toBe('숨을 크게 들이마시고');

    await userEvent.click(document.body);
    expect(updateMemoList).toHaveBeenCalledWith('edit', '숨을 크게 들이마시고');
  });

  it('메모 수정 후 취소 버튼 클릭시 모달 오픈', async () => {
    const { memoTextarea, cancelButton } = setup();

    expect(memoTextarea.textContent).toBe('숨을 크게 들이마시고');
    await userEvent.clear(memoTextarea);

    await userEvent.type(memoTextarea, '숨을 짧게 들이마시고');
    await userEvent.click(cancelButton);
    expect(onMemoModal).toHaveBeenCalledWith('edit');
  });

  it('메모 수정 없이 취소 버튼 클릭시 메모 수정 취소', async () => {
    const { memoTextarea, cancelButton } = setup();

    expect(memoTextarea.textContent).toBe('숨을 크게 들이마시고');

    await userEvent.click(cancelButton);
    expect(setMemoState).toHaveBeenCalledWith(INITIAL_MEMO_STATE);
  });

  it('메모 전부 지우고 취소 버튼 클릭시 메모 수정 취소', async () => {
    const { memoTextarea, cancelButton } = setup();

    expect(memoTextarea.textContent).toBe('숨을 크게 들이마시고');
    await userEvent.clear(memoTextarea);

    await userEvent.click(cancelButton);
    expect(setMemoState).toHaveBeenCalledWith(INITIAL_MEMO_STATE);
  });

  it('메모 전부 지우고 외부 클릭시 메모 수정 취소', async () => {
    const { memoTextarea } = setup();

    expect(memoTextarea.textContent).toBe('숨을 크게 들이마시고');
    await userEvent.clear(memoTextarea);

    await userEvent.click(document.body);
    expect(setMemoState).toHaveBeenCalledWith(INITIAL_MEMO_STATE);
  });
});
