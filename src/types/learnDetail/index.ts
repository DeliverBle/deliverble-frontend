export interface MemoState {
  newMemoId: number;
  editMemoId: number;
  deleteMemoId: number;
}

export interface MemoInfo {
  id: number;
  scriptId: number;
  order: number;
  startIndex: number;
  keyword: string;
  highlightId: string;
  content: string;
}

export type MemoConfirmModalKey = 'new' | 'edit' | 'delete';

export interface ConfirmModalText {
  mainText: string;
  subText?: string;
  leftButtonText: string;
  rightButtonText: string;
}
