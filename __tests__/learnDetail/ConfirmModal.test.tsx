import { ConfirmModal } from '@src/components/learnDetail/modal';
import { INITIAL_MEMO_STATE } from '@src/constants/learnDetail/memo';
import { DELETE_MEMO_MODAL_TEXT, EDIT_MEMO_MODAL_TEXT, NEW_MEMO_MODAL_TEXT } from '@src/constants/learnDetail/modal';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const setMemoState = jest.fn();
const setIsConfirmOpen = jest.fn();
const onTitleDelete = jest.fn();
const updateMemoList = jest.fn();
const cancelCreateMemo = jest.fn();

describe('메모 추가 확인 모달 오픈', () => {
  const setup = () => {
    const { getByText } = render(
      <ConfirmModal
        confirmModalText={NEW_MEMO_MODAL_TEXT}
        setMemoState={setMemoState}
        setIsConfirmOpen={setIsConfirmOpen}
        onTitleDelete={onTitleDelete}
        updateMemoList={updateMemoList}
        cancelCreateMemo={cancelCreateMemo}
      />,
    );

    const leftButton = getByText(NEW_MEMO_MODAL_TEXT.leftButtonText);
    const rightButton = getByText(NEW_MEMO_MODAL_TEXT.rightButtonText);

    return { leftButton, rightButton };
  };

  it('작성하기 버튼 클릭시 모달 클로즈', async () => {
    const { leftButton } = setup();

    await userEvent.click(leftButton);
    expect(setIsConfirmOpen).toHaveBeenCalledWith(false);
  });

  it('취소 버튼 클릭시 메모 작성 취소', async () => {
    const { rightButton } = setup();

    await userEvent.click(rightButton);
    expect(cancelCreateMemo).toHaveBeenCalled();
  });
});

describe('메모 수정 확인 모달 오픈', () => {
  const setup = () => {
    const { getByText } = render(
      <ConfirmModal
        confirmModalText={EDIT_MEMO_MODAL_TEXT}
        setMemoState={setMemoState}
        setIsConfirmOpen={setIsConfirmOpen}
        onTitleDelete={onTitleDelete}
        updateMemoList={updateMemoList}
        cancelCreateMemo={cancelCreateMemo}
      />,
    );

    const leftButton = getByText(EDIT_MEMO_MODAL_TEXT.leftButtonText);
    const rightButton = getByText(EDIT_MEMO_MODAL_TEXT.rightButtonText);

    return { leftButton, rightButton };
  };

  it('수정하기 버튼 클릭시 모달 클로즈', async () => {
    const { leftButton } = setup();

    await userEvent.click(leftButton);
    expect(setIsConfirmOpen).toHaveBeenCalledWith(false);
  });

  it('수정 취소 버튼 클릭시 메모 수정 취소', async () => {
    const { rightButton } = setup();

    await userEvent.click(rightButton);
    expect(setMemoState).toHaveBeenCalledWith(INITIAL_MEMO_STATE);
  });
});

describe('메모 삭제 확인 모달 오픈', () => {
  const setup = () => {
    const { getByText } = render(
      <ConfirmModal
        confirmModalText={DELETE_MEMO_MODAL_TEXT}
        setMemoState={setMemoState}
        setIsConfirmOpen={setIsConfirmOpen}
        onTitleDelete={onTitleDelete}
        updateMemoList={updateMemoList}
        cancelCreateMemo={cancelCreateMemo}
      />,
    );

    const leftButton = getByText(DELETE_MEMO_MODAL_TEXT.leftButtonText);
    const rightButton = getByText(DELETE_MEMO_MODAL_TEXT.rightButtonText);

    return { leftButton, rightButton };
  };

  it('취소 버튼 클릭시 모달 클로즈', async () => {
    const { leftButton } = setup();

    await userEvent.click(leftButton);
    expect(setIsConfirmOpen).toHaveBeenCalledWith(false);
  });

  it('삭제하기 버튼 클릭시 메모 삭제', async () => {
    const { rightButton } = setup();

    await userEvent.click(rightButton);
    expect(updateMemoList).toHaveBeenCalledWith('delete');
  });
});
