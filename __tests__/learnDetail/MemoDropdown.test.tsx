import { MemoDropdown } from '@src/components/learnDetail/memo';
import { INITIAL } from '@src/constants/learnDetail/memo';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const memoData = {
  id: 3,
  order: 4,
  startIndex: 0,
  keyword: '시가총액',
  content: '숨을 크게 들이마시고',
  highlightId: '571.232.31',
};
const setMemoState = jest.fn();
const onMemoModal = jest.fn();

const setup = () => {
  const { getByRole } = render(
    <MemoDropdown memoData={memoData} setMemoState={setMemoState} onMemoModal={onMemoModal} />,
  );

  const editMemoButton = getByRole('button', { name: '메모 수정' });
  const deleteMemoButton = getByRole('button', { name: '메모 삭제' });

  return { editMemoButton, deleteMemoButton };
};

it('메모 수정 버튼 클릭', async () => {
  const { editMemoButton } = setup();

  await userEvent.click(editMemoButton);
  expect(setMemoState).toHaveBeenCalled();
});

it('메모 삭제 버튼 클릭', async () => {
  const { deleteMemoButton } = setup();

  await userEvent.click(deleteMemoButton);
  expect(setMemoState).toHaveBeenCalled();
  expect(onMemoModal).toHaveBeenCalledWith('delete');
});
