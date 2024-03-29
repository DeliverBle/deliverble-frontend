export const videoData = {
  statusCode: 200,
  message: '뉴스 학습 상세 정보 조회 성공',
  data: {
    id: 2,
    title: '북, 최근 임진강 상류 황강댐 수문 개방',
    category: '사회',
    announcerGender: '남성',
    channel: 'KBS',
    link: 'ee-0DeY21rU',
    thumbnail: 'https://img.youtube.com/vi/ee-0DeY21rU/hqdefault.jpg',
    startTime: 0,
    endTime: 35.74,
    suitability: '상',
    isEmbeddable: 'True',
    reportDate: '2022-06-30',
    isFavorite: false,
    tagsForView: [
      {
        name: '북한',
        category: '정치',
        id: 13,
      },
      {
        name: '방류',
        category: '기타',
        id: 233,
      },
      {
        name: '임진강',
        category: '기타',
        id: 355,
      },
      {
        name: '딜리버블 추천',
        category: '기타',
        id: 438,
      },
    ],
    haveGuide: true,
  },
  data2: [
    {
      id: 197,
      userId: 7,
      newsId: 2,
      name: '스크립트 2',
      sentences: [
        {
          id: 934,
          order: 1,
          startTime: 0,
          endTime: 8.18,
          text: '북한이 <mark id="236.139.4">호우로</mark> 임진강 상류 황강댐 수문을 개방한 것으로 판단하고 있다고 군 소식통이 오늘 밝혔습니다.',
        },
        {
          id: 935,
          order: 2,
          startTime: 8.18,
          endTime: 16.71,
          text: '정부는 지난 28일 북한에 댐을 방류하면 사전 통지해 달라고 요청했지만, 북한은 이에 대한 응답 없이 방류에 나선 것으로 보입니다.',
        },
        {
          id: 936,
          order: 3,
          startTime: 16.71,
          endTime: 27.1,
          text: '<mark id=189.272.0>군남댐</mark> 수위와 연계되는 임진강 최북단 필승교의 수위는 지난 28일 6m까지 오르기도 했지만 이후 현재까지 안정적으로 관리되고 있는 것으로 알려졌습니다.',
        },
        {
          id: 937,
          order: 4,
          startTime: 27.1,
          endTime: 35.74,
          text: '통일부는 이와 관련해 북한이 사전 통지 없이 황강댐 물을 방류한 데 대해 유감이라고 밝혔습니다.',
        },
      ],
      memos: [
        {
          content: '숨을 크게 들이마시고',
          highlightId: '236.139.4',
          id: 3,
          keyword: '호우로',
          order: 1,
          startIndex: 4,
        },
      ],
    },
  ],
  axiosStatus: 200,
};

export const similarVideoData = {
  data: {
    exploreNewsDtoCollection: [
      {
        id: 12,
        title: '손님들이 건넨 술 마시고 사망…함께 있던 남성은 사고사',
        category: '사회',
        channel: 'SBS',
        thumbnail: 'https://img.youtube.com/vi/mDW6crrUVpA/hqdefault.jpg',
        reportDate: '2022-07-06',
        isFavorite: true,
        haveGuide: false,
      },
      {
        id: 8,
        title: "우크라이나 재건회의 '루가노 선언' 채택",
        category: '세계',
        channel: 'MBC',
        thumbnail: 'https://img.youtube.com/vi/1SRz_AE8R9E/hqdefault.jpg',
        reportDate: '2022-07-06',
        isFavorite: true,
        haveGuide: false,
      },
      {
        id: 3,
        title: '제주, 초중고교 무상급식 예산 46억 원 증액 ',
        category: '사회',
        channel: 'SBS',
        thumbnail: 'https://img.youtube.com/vi/45IAfzlB_tQ/hqdefault.jpg',
        reportDate: '2022-07-06',
        isFavorite: false,
        haveGuide: false,
      },
      {
        id: 4,
        title: '안동시 공무원, 동료 직원 흉기에 찔려 사망',
        category: '사회',
        channel: 'SBS',
        thumbnail: 'https://img.youtube.com/vi/sId-zbgWuZU/hqdefault.jpg',
        reportDate: '2022-07-05',
        isFavorite: false,
        haveGuide: false,
      },
    ],
  },
};

export const createMemo = {
  ...videoData,
  data2: {
    ...videoData.data2[0],
    memos: [
      ...videoData.data2[0].memos,
      {
        content: '발음 주의',
        highlightId: '189.272.0',
        id: 384,
        keyword: '군남댐',
        order: 3,
        startIndex: 0,
      },
    ],
  },
};

export const updateMemo = {
  ...videoData,
  data2: {
    ...videoData.data2[0],
    memos: [
      {
        content: '숨을 작게 들이마시고',
        highlightId: '236.139.4',
        id: 3,
        keyword: '호우로',
        order: 1,
        startIndex: 4,
      },
    ],
  },
};
