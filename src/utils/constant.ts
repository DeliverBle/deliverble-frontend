export const NEW_MEMO_CONFIRM_MODAL_TEXT = {
  mainText: '메모 작성을 취소하시겠습니까?',
  subText: '작성 취소 선택시, 작성된 메모는 저장되지 않습니다.',
  leftButtonText: '작성하기',
  rightButtonText: '작성 취소',
};

export const EDIT_MEMO_CONFIRM_MODAL_TEXT = {
  mainText: '메모 수정을 취소하시겠습니까?',
  subText: '수정 취소 선택시, 수정된 메모는 저장되지 않습니다.',
  leftButtonText: '수정하기',
  rightButtonText: '수정 취소',
};

export const DELETE_MEMO_CONFIRM_MODAL_TEXT = {
  mainText: '메모를 삭제하시겠습니까?',
  leftButtonText: '취소',
  rightButtonText: '삭제하기',
};

export const DELETE_SCRIPT_CONFIRM_MODAL_TEXT = {
  mainText: '스크립트를 삭제하시겠습니까?',
  subText: '스크립트 삭제 시, 스크립트 시트와 작성한 내용\n(하이라이트, 끊어 읽기, 메모, 녹음)이 모두 삭제됩니다.',
  leftButtonText: '취소',
  rightButtonText: '삭제하기',
};

export const MEMO_CONTENT_MAX = 30;
export const SCRIPT_MAX_COUNT = 3;
export const SCRIPT_TITLE_MAX_LENGTH = 27;
export const MEMO_CONTENT_MAX_LENGTH = 70;
export const BLOCK_SIZE = 10;
export const LIST_SIZE = 12;
export const ALL = '전체';
export const INITIAL_NUMBER = -1;
export const channelList = ['전체', 'SBS', 'KBS', 'MBC', '기타'];
export const categoryList = ['전체', '정치', '경제', '사회', '세계', '연예', '기타'];
export const speakerList = ['전체', '여성', '남성'];

export const INITIAL_MEMO_STATE = {
  newMemoId: INITIAL_NUMBER,
  editMemoId: INITIAL_NUMBER,
  deleteMemoId: INITIAL_NUMBER,
};

export const INITIAL_MEMO = {
  scriptId: INITIAL_NUMBER,
  order: INITIAL_NUMBER,
  startIndex: INITIAL_NUMBER,
  keyword: '',
};
