import { LearnDetailService } from '../api/learn-detail';
import { Script, SentenceData, Tag, MemoData, Name } from '../api/types/learn-detail';
import { privateAPI, publicAPI } from './base';

export function learnDetailDataRemote(): LearnDetailService {
  const getPrivateVideoData = async (id: number, index?: number) => {
    const response = await privateAPI.get({ url: `/news/detail/${id}` });
    if (response.status === 200) {
      return {
        id: response.data.id,
        title: response.data.title,
        category: response.data.category,
        channel: response.data.channel,
        link: response.data.link,
        reportDate: response.data.reportDate,
        isFavorite: response.data.isFavorite,
        startTime: response.data.startTime,
        endTime: response.data.endTime,
        scriptsId: index ? response.data2[index].id : response.data2[0].id,
        tags: response.data.tagsForView.map((tag: Tag) => ({
          id: tag.id,
          name: tag.name,
        })),
        scripts: index
          ? response.data2[index].sentences.map((sentence: Script) => ({
              id: sentence.id,
              order: sentence.order,
              text: sentence.text,
              startTime: sentence.startTime,
              endTime: sentence.endTime,
            }))
          : response.data2[0].sentences.map((sentence: Script) => ({
              id: sentence.id,
              order: sentence.order,
              text: sentence.text,
              startTime: sentence.startTime,
              endTime: sentence.endTime,
            })),
        memos: index
          ? response.data2[index].memos.map((memo: MemoData) => ({
              id: memo.id,
              keyword: memo.keyword,
              order: memo.order,
              startIndex: memo.startIndex,
              content: memo.content,
            }))
          : response.data2[0].memos.map((memo: MemoData) => ({
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

  const getPublicVideoData = async (id: number) => {
    const response = await publicAPI.get({ url: `/news/detail/not-authentication/${id}` });
    if (response.status === 200) {
      return {
        id: response.data.id,
        title: response.data.title,
        category: response.data.category,
        channel: response.data.channel,
        link: response.data.link,
        reportDate: response.data.reportDate,
        isFavorite: response.data.isFavorite,
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
          startTime: sentence.startTime,
          endTime: sentence.endTime,
        })),
      };
    } else throw '서버 통신 실패';
  };

  const postSentenceData = async (SentenceData: SentenceData, scriptsId: number) => {
    const response = await privateAPI.post({
      url: `/script/sentence/update/${scriptsId}`,
      data: SentenceData,
    });
    if (response.status === 200) {
      return {
        id: response.data.id,
        title: response.data.title,
        category: response.data.category,
        channel: response.data.channel,
        link: response.data.link,
        reportDate: response.data.reportDate,
        isFavorite: response.data.isFavorite,
        startTime: response.data.startTime,
        endTime: response.data.endTime,
        scriptsId: response.data2[0]?.id,
        tags: response.data.tagsForView.map((tag: Tag) => ({
          id: tag.id,
          name: tag.name,
        })),
        scripts: response.data2[0]?.sentences.map((sentence: Script) => ({
          id: sentence.id,
          text: sentence.text,
          startTime: sentence.startTime,
          endTime: sentence.endTime,
        })),
      };
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

  const postNewScriptData = async (id: number) => {
    const response = await privateAPI.post({ url: `/script/create/${id}` });
    return { isSuccess: response.status === 200 };
  };

  return {
    getPrivateVideoData,
    getPublicVideoData,
    postSentenceData,
    postMemoData,
    deleteMemoData,
    updateMemoData,
    postNewScriptData,
  };
}
