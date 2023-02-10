export const MEMO_CONFIRM_MODAL_TYPE = {
  NEW: 'new',
  EDIT: 'edit',
  DELETE: 'delete',
};

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

export const SPEECH_GUIDE_TOOLTIP_TEXT = {
  title: '현재 화면은 스피치 가이드입니다!',
  description: `스피치 연습이 처음인 유저를 위해 가이드라인을 준비했어요. 
    어디를 강조해야 하는지, 무엇을 유의하며 읽어야 하는지 파악해보세요.`,
};

export const BANNER_TEXT_LIST = [
  {
    mainText: `우리는 말하는 법은 배웠지만,
    잘 말하는 법은 배우지 못했다!`,
    subText: `딜리버블과 함께 잘 말하는 방법을 학습해요!`,
  },
  {
    mainText: `아나운서 쉐도잉으로 
    따라 하며 쑥쑥 느는 스피치 자신감!`,
    subText: `잘 말하는 법, 어디서 배워야 할까? 
    비싸고 귀찮은 학원 등록 없이, 아나운서를 따라하며 잘 말하는 법을 체화해 보세요!`,
  },
  {
    mainText: `스피치 자신감을 채워줄
    160개의 뉴스 영상`,
    subText: `딜리버블이 제공하는 160개의 뉴스 영상과 스크립트로 연습에만 집중하세요!`,
  },
];

export const HJID = 3283852;
export const HJSV = 6;
export const VIDEO_STATE_PAUSED = 2;
export const VIDEO_STATE_CUED = 5;
export const MEMO_CONTENT_MAX = 30;
export const SCRIPT_MAX_COUNT = 3;
export const SCRIPT_TITLE_MAX_LENGTH = 100;
export const MEMO_CONTENT_MAX_LENGTH = 70;
export const CONTEXT_MENU_WIDTH = 144;
export const ABSOLUTE_RIGHT_LIMIT = 830;
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
  highlightId: '',
};
