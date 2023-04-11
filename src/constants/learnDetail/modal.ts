import { MemoConfirmModalKey, ConfirmModalText } from '@src/types/learnDetail';

export const NEW_MEMO_MODAL_TEXT = {
  mainText: '메모 작성을 취소하시겠습니까?',
  subText: '작성 취소 선택시, 작성된 메모는 저장되지 않습니다.',
  leftButtonText: '작성하기',
  rightButtonText: '작성 취소',
};

export const EDIT_MEMO_MODAL_TEXT = {
  mainText: '메모 수정을 취소하시겠습니까?',
  subText: '수정 취소 선택시, 수정된 메모는 저장되지 않습니다.',
  leftButtonText: '수정하기',
  rightButtonText: '수정 취소',
};

export const DELETE_MEMO_MODAL_TEXT = {
  mainText: '메모를 삭제하시겠습니까?',
  leftButtonText: '취소',
  rightButtonText: '삭제하기',
};

export const MEMO_MODAL_TEXT_TYPE: Record<MemoConfirmModalKey, ConfirmModalText> = {
  new: NEW_MEMO_MODAL_TEXT,
  edit: EDIT_MEMO_MODAL_TEXT,
  delete: DELETE_MEMO_MODAL_TEXT,
};

export const DELETE_SCRIPT_MODAL_TEXT = {
  mainText: '스크립트를 삭제하시겠습니까?',
  subText: '스크립트 삭제 시, 스크립트 시트와 작성한 내용\n(하이라이트, 끊어 읽기, 메모, 녹음)이 모두 삭제됩니다.',
  leftButtonText: '취소',
  rightButtonText: '삭제하기',
};
