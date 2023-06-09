import { ConfirmModal } from '@src/components/learnDetail/modal';
import { NEW_MEMO_MODAL_TEXT } from '@src/constants/learnDetail/modal';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('메모 추가 확인 모달 오픈', () => {
  const setup = async () => {
    const setMemoState = jest.fn();
    const setIsConfirmOpen = jest.fn();
    const onTitleDelete = jest.fn();
    const updateMemoList = jest.fn();
    const cancelCreateMemo = jest.fn();

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

    return { setIsConfirmOpen, cancelCreateMemo, leftButton, rightButton };
  };

  it('작성하기 버튼 클릭시 모달 클로즈', async () => {
    const { setIsConfirmOpen, leftButton } = await setup();

    await userEvent.click(leftButton);
    expect(setIsConfirmOpen).toHaveBeenCalledWith(false);
  });

  it('취소 버튼 클릭시 메모 작성 취소', async () => {
    const { cancelCreateMemo, rightButton } = await setup();

    await userEvent.click(rightButton);
    expect(cancelCreateMemo).toHaveBeenCalled();
  });
});
