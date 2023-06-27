import ContextMenu from '@src/components/learnDetail/ContextMenu';
import { INITIAL } from '@src/constants/learnDetail/memo';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const setup = (memoId: number, element: HTMLElement, isEditing: boolean) => {
  const setIsContextMenuOpen = jest.fn();
  const setClickedDeleteType = jest.fn();
  const handleMemoState = jest.fn();

  const { getByRole } = render(
    <ContextMenu
      clickedMemoId={memoId}
      rightClickedElement={element}
      isEditing={isEditing}
      setIsContextMenuOpen={setIsContextMenuOpen}
      setClickedDeleteType={setClickedDeleteType}
      handleMemoState={handleMemoState}
    />,
  );

  return { setIsContextMenuOpen, setClickedDeleteType, handleMemoState, getByRole };
};

describe('수정 모드가 아닌 경우', () => {
  describe('하이라이트 우클릭', () => {
    const element = document.createElement('MARK');

    it('하이라이트에 메모가 없을 경우 메모 추가 버튼 클릭', async () => {
      const { handleMemoState, getByRole } = setup(INITIAL, element, false);

      const addMemoButton = getByRole('button', { name: '메모 추가' });
      const deleteHighlightButton = getByRole('button', { name: '하이라이트 삭제' });
      expect(addMemoButton).toBeInTheDocument();
      expect(deleteHighlightButton).toBeInTheDocument();

      await userEvent.click(addMemoButton);
      expect(handleMemoState).toHaveBeenCalled();
    });

    it('하이라이트에 메모가 있을 경우 메모 수정 버튼 클릭', async () => {
      const { handleMemoState, getByRole } = setup(1, element, false);

      const editMemoButton = getByRole('button', { name: '메모 수정' });
      const deleteHighlightButton = getByRole('button', { name: '하이라이트 삭제' });
      expect(editMemoButton).toBeInTheDocument();
      expect(deleteHighlightButton).toBeInTheDocument();

      await userEvent.click(editMemoButton);
      expect(handleMemoState).toHaveBeenCalled();
    });

    it('하이라이트 삭제 버튼 클릭', async () => {
      const { setIsContextMenuOpen, setClickedDeleteType, getByRole } = setup(INITIAL, element, false);

      const deleteHighlightButton = getByRole('button', { name: '하이라이트 삭제' });
      expect(deleteHighlightButton).toBeInTheDocument();

      await userEvent.click(deleteHighlightButton);
      expect(setClickedDeleteType).toHaveBeenCalledWith('MARK');
      expect(setIsContextMenuOpen).toHaveBeenCalledWith(false);
    });
  });

  describe('끊어읽기 우클릭', () => {
    it('끊어읽기 삭제 버튼 클릭', async () => {
      const element = document.createElement('SPAN');
      const { setIsContextMenuOpen, setClickedDeleteType, getByRole } = setup(INITIAL, element, false);

      const deleteSpacingButton = getByRole('button', { name: '끊어읽기 삭제' });
      expect(deleteSpacingButton).toBeInTheDocument();

      await userEvent.click(deleteSpacingButton);
      expect(setClickedDeleteType).toHaveBeenCalledWith('SPAN');
      expect(setIsContextMenuOpen).toHaveBeenCalledWith(false);
    });
  });
});

describe('수정 모드인 경우', () => {
  it('하이라이트 삭제 버튼 클릭', async () => {
    const element = document.createElement('MARK');
    const { setIsContextMenuOpen, setClickedDeleteType, getByRole } = setup(INITIAL, element, true);

    const deleteHighlightButton = getByRole('button', { name: '하이라이트 삭제' });
    expect(deleteHighlightButton).toBeInTheDocument();

    await userEvent.click(deleteHighlightButton);
    expect(setClickedDeleteType).toHaveBeenCalledWith('MARK');
    expect(setIsContextMenuOpen).toHaveBeenCalledWith(false);
  });

  it('끊어읽기 삭제 버튼 클릭', async () => {
    const element = document.createElement('SPAN');
    const { setIsContextMenuOpen, setClickedDeleteType, getByRole } = setup(INITIAL, element, true);

    const deleteSpacingButton = getByRole('button', { name: '끊어읽기 삭제' });
    expect(deleteSpacingButton).toBeInTheDocument();

    await userEvent.click(deleteSpacingButton);
    expect(setClickedDeleteType).toHaveBeenCalledWith('SPAN');
    expect(setIsContextMenuOpen).toHaveBeenCalledWith(false);
  });
});
