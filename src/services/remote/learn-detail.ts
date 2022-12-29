import { LearnDetailService } from '../api/learn-detail';
import { Script, SentenceData, Tag, MemoData, Name, UploadRecordData, GetRecordData } from '../api/types/learn-detail';
import { VideoData } from '../api/types/home';
import { privateAPI, publicAPI } from './base';

export function learnDetailDataRemote(): LearnDetailService {
  const getPrivateVideoData = async (videoId: number, index?: number) => {
    const response = await privateAPI.get({ url: `/news/detail/${videoId}` });
    if (response.status === 200) {
      return {
        id: response.data.id,
        title: response.data.title,
        category: response.data.category,
        channel: response.data.channel,
        link: response.data.link,
        reportDate: response.data.reportDate,
        isFavorite: response.data.isFavorite,
        haveGuide: response.data.haveGuide,
        startTime: response.data.startTime,
        endTime: response.data.endTime,
        scriptsId: response.data2[index ?? 0].id,
        tags: response.data.tagsForView.map((tag: Tag) => ({
          id: tag.id,
          name: tag.name,
        })),
        scripts: response.data2[index ?? 0].sentences.map((sentence: Script) => ({
          id: sentence.id,
          order: sentence.order,
          text: sentence.text,
          startTime: sentence.startTime,
          endTime: sentence.endTime,
        })),
        memos: response.data2[index ?? 0].memos.map((memo: MemoData) => ({
          id: memo.id,
          keyword: memo.keyword,
          order: memo.order,
          startIndex: memo.startIndex,
          content: memo.content,
        })),
        names: response.data2.map((name: Name) => ({
          id: name.id,
          name: name.name,
        })),
      };
    } else throw '서버 통신 실패';
  };

  const getPublicVideoData = async (videoId: number) => {
    const response = await publicAPI.get({ url: `/news/detail/not-authentication/${videoId}` });
    if (response.status === 200) {
      return {
        id: response.data.id,
        title: response.data.title,
        category: response.data.category,
        channel: response.data.channel,
        link: response.data.link,
        reportDate: response.data.reportDate,
        isFavorite: response.data.isFavorite,
        haveGuide: response.data.haveGuide,
        startTime: response.data.startTime,
        endTime: response.data.endTime,
        scriptsId: response.data2[0].id,
        tags: response.data.tagsForView.map((tag: Tag) => ({
          id: tag.id,
          name: tag.name,
        })),
        scripts: response.data2[0].sentences.map((sentence: Script) => ({
          id: sentence.id,
          text: sentence.text,
          order: sentence.order,
          startTime: sentence.startTime,
          endTime: sentence.endTime,
        })),
      };
    } else throw '서버 통신 실패';
  };

  const getPublicSpeechGuideData = async (videoId: number) => {
    const response = await publicAPI.get({ url: `/news/guide/detail/${videoId}` });
    if (response.status === 200) {
      return {
        id: response.data.id,
        title: response.data.title,
        category: response.data.category,
        channel: response.data.channel,
        link: response.data.link,
        reportDate: response.data.reportDate,
        isFavorite: response.data.isFavorite,
        haveGuide: response.data.haveGuide,
        startTime: response.data.startTime,
        endTime: response.data.endTime,
        scriptsId: response.data2[0].id,
        tags: response.data.tagsForView.map((tag: Tag) => ({
          id: tag.id,
          name: tag.name,
        })),
        scripts: response.data2[0].sentences.map((sentence: Script) => ({
          id: sentence.id,
          text: sentence.text,
          order: sentence.order,
          startTime: sentence.startTime,
          endTime: sentence.endTime,
        })),
        memos: response.data2[0].memoGuides.map((memo: MemoData) => ({
          id: memo.id,
          keyword: memo.keyword,
          order: memo.order,
          startIndex: memo.startIndex,
          content: memo.content,
        })),
      };
    } else throw '서버 통신 실패';
  };

  const getPrivateSpeechGuideData = async (videoId: number) => {
    const response = await privateAPI.get({ url: `/news/guide/detail/${videoId}` });
    if (response.status === 200) {
      return {
        id: response.data.id,
        title: response.data.title,
        category: response.data.category,
        channel: response.data.channel,
        link: response.data.link,
        reportDate: response.data.reportDate,
        isFavorite: response.data.isFavorite,
        haveGuide: response.data.haveGuide,
        startTime: response.data.startTime,
        endTime: response.data.endTime,
        scriptsId: response.data2[0].id,
        tags: response.data.tagsForView.map((tag: Tag) => ({
          id: tag.id,
          name: tag.name,
        })),
        scripts: response.data2[0].sentences.map((sentence: Script) => ({
          id: sentence.id,
          text: sentence.text,
          order: sentence.order,
          startTime: sentence.startTime,
          endTime: sentence.endTime,
        })),
        memos: response.data2[0].memoGuides.map((memo: MemoData) => ({
          id: memo.id,
          keyword: memo.keyword,
          order: memo.order,
          startIndex: memo.startIndex,
          content: memo.content,
        })),
      };
    } else throw '서버 통신 실패';
  };

  const postSentenceData = async (SentenceData: SentenceData, scriptsId: number, scriptIndex: number) => {
    const response = await privateAPI.post({
      url: `/script/sentence/update/${scriptsId}`,
      data: SentenceData,
    });
    if (response.status === 200) {
      return response.data2[scriptIndex]?.sentences.map((sentence: Script) => ({
        id: sentence.id,
        text: sentence.text,
        startTime: sentence.startTime,
        endTime: sentence.endTime,
      }));
    } else throw '서버 통신 실패';
  };

  const postMemoData = async (memo: MemoData, scriptId: number) => {
    const response = await privateAPI.post({
      url: `/script/memo/create/${scriptId}`,
      data: memo,
    });
    if (response.status === 200) {
      return response.data2?.memos.map((memo: MemoData) => ({
        id: memo.id,
        keyword: memo.keyword,
        order: memo.order,
        startIndex: memo.startIndex,
        content: memo.content,
      }));
    } else throw '서버 통신 실패';
  };

  const updateMemoData = async (memoId: number, content: string) => {
    const response = await privateAPI.patch({
      url: `/script/memo/update/${memoId}`,
      data: { content },
    });
    if (response.status === 200) {
      return response.data2?.memos.map((memo: MemoData) => ({
        id: memo.id,
        keyword: memo.keyword,
        order: memo.order,
        startIndex: memo.startIndex,
        content: memo.content,
      }));
    } else throw '서버 통신 실패';
  };

  const deleteMemoData = async (memoId: number) => {
    const response = await privateAPI.delete({
      url: `/script/memo/delete/${memoId}`,
    });
    if (response.status === 200) {
      return response.data2?.memos.map((memo: MemoData) => ({
        id: memo.id,
        keyword: memo.keyword,
        order: memo.order,
        startIndex: memo.startIndex,
        content: memo.content,
      }));
    } else throw '서버 통신 실패';
  };

  const postNewScriptData = async (videoId: number) => {
    const response = await privateAPI.post({ url: `/script/create/${videoId}` });
    return { isSuccess: response.status === 200 };
  };

  const deleteScriptData = async (scriptId: number) => {
    const response = await privateAPI.delete({ url: `/script/delete/${scriptId}` });
    return { isSuccess: response.status === 200 };
  };

  const updateScriptNameData = async (scriptId: number, name: string) => {
    const response = await privateAPI.patch({ url: `/script/name/${scriptId}`, data: { name } });
    if (response.status === 200) {
      return {
        id: response.data2.id,
        name: response.data2.name,
      };
    } else throw '서버 통신 실패';
  };

  const uploadRecordData = async (body: UploadRecordData) => {
    const response = await privateAPI.post({
      url: '/script/recording/upload',
      data: body,
      type: 'multipart',
    });
    console.log(response);
    //성공 처리
    if (response.status === 200) {
      return {
        link: response.data.link,
        name: response.data.name,
        scriptId: response.data.scriptId,
        date: response.data.date,
      };
    } else throw '서버 통신 실패';
  };

  const getRecordData = async (scriptId: number) => {
    const response = await privateAPI.get({
      url: `/script/recording/find?scriptId=${scriptId}`,
    });
    if (response.axiosStatus === 200) {
      return response.data[0].map((record: GetRecordData) => ({
        name: record.name,
        link: record.link,
        endTime: record.endTime,
        isDeleted: record.isDeleted,
        date: record.date,
        scriptId: record.scriptId,
      }));
    } else throw '서버 통신 실패';
  };

  const getSimilarVideoData = async (videoId: number) => {
    const response = await privateAPI.get({
      url: `/news/similar/${videoId}`,
    });
    if (response.axiosStatus === 200) {
      return {
        videoList: response.data
          ? response.data.exploreNewsDtoCollection.map((video: VideoData) => ({
              id: video.id,
              title: video.title,
              category: video.category,
              channel: video.channel,
              thumbnail: video.thumbnail,
              reportDate: video.reportDate,
              isFavorite: video.isFavorite,
              haveGuide: video.haveGuide,
            }))
          : [],
      };
    } else throw '서버 통신 실패';
  };

  return {
    getPrivateVideoData,
    getPublicVideoData,
    postSentenceData,
    postMemoData,
    deleteMemoData,
    updateMemoData,
    postNewScriptData,
    deleteScriptData,
    updateScriptNameData,
    getPublicSpeechGuideData,
    getPrivateSpeechGuideData,
    uploadRecordData,
    getRecordData,
    getSimilarVideoData,
  };
}
