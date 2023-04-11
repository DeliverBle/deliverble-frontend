import { LearnDetailService } from '../api/learn-detail';
import {
  Script,
  SentenceData,
  MemoData,
  Name,
  UploadRecordData,
  GetRecordData,
  DeleteRecordData,
  ChangeRecordNameData,
} from '@src/types/learnDetail/remote';
import { API } from './base';
import { InternalServerError } from '@src/types/error';
import { STATUS_CODE } from '@src/utils/constant';
import { AxiosError } from 'axios';

export function learnDetailDataRemote(): LearnDetailService {
  const getPrivateVideoData = async (videoId: number, index: number) => {
    const response = await API.get({ url: `/news/detail/${videoId}` });
    if (response.statusCode === 200) {
      const scriptIndex = response.data2[index] ? index : 0;
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
        scriptsId: response.data2[scriptIndex].id,
        tags: response.data.tagsForView,
        scripts: response.data2[scriptIndex].sentences,
        memos: response.data2[scriptIndex].memos,
        names: response.data2.map((name: Name) => ({
          id: name.id,
          name: name.name,
        })),
      };
    } else throw '서버 통신 실패';
  };

  const getPublicVideoData = async (videoId: number) => {
    const response = await API.get({ url: `/news/detail/not-authentication/${videoId}` });
    if (response.statusCode === 200) {
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
        tags: response.data.tagsForView,
        scripts: response.data2[0].sentences,
      };
    } else throw '서버 통신 실패';
  };

  const getSpeechGuideData = async (videoId: number) => {
    const response = await API.get({ url: `/news/guide/detail/${videoId}` });
    if (response.statusCode === 200) {
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
        tags: response.data.tagsForView,
        scripts: response.data2[0].sentences,
        memos: response.data2[0].memoGuides,
      };
    } else throw '서버 통신 실패';
  };

  const postSentenceData = async (SentenceData: SentenceData, scriptsId: number, scriptIndex: number) => {
    const response = await API.post({
      url: `/script/sentence/update/${scriptsId}`,
      data: SentenceData,
    });
    if (response.statusCode === 200) {
      return response.data2[scriptIndex]?.sentences.map((sentence: Script) => ({
        id: sentence.id,
        text: sentence.text,
        startTime: sentence.startTime,
        endTime: sentence.endTime,
      }));
    } else throw '서버 통신 실패';
  };

  const postMemoData = async (memo: MemoData, scriptId: number) => {
    const response = await API.post({
      url: `/script/memo/create/${scriptId}`,
      data: memo,
    });
    if (response.statusCode === 200) {
      return response.data2?.memos;
    } else throw '서버 통신 실패';
  };

  const updateMemoData = async (memoId: number, content: string) => {
    const response = await API.patch({
      url: `/script/memo/update/${memoId}`,
      data: { content },
    });
    if (response.statusCode === 200) {
      return response.data2?.memos;
    } else throw '서버 통신 실패';
  };

  const deleteMemoData = async (memoId: number) => {
    const response = await API.delete({
      url: `/script/memo/delete/${memoId}`,
    });
    if (response.statusCode === 200) {
      return response.data2?.memos;
    } else throw '서버 통신 실패';
  };

  const postNewScriptData = async (videoId: number) => {
    const response = await API.post({ url: `/script/create/${videoId}` });
    return { isSuccess: response.statusCode === 200 };
  };

  const deleteScriptData = async (scriptId: number) => {
    const response = await API.delete({ url: `/script/delete/${scriptId}` });
    return { isSuccess: response.statusCode === 200 };
  };

  const updateScriptNameData = async (scriptId: number, name: string) => {
    const response = await API.patch({ url: `/script/name/${scriptId}`, data: { name } });
    if (response.statusCode === 200) {
      return {
        id: response.data2.id,
        name: response.data2.name,
      };
    } else throw '서버 통신 실패';
  };

  const uploadRecordData = async (body: UploadRecordData) => {
    const response = await API.post({
      url: '/script/recording/upload',
      data: body,
      type: 'multipart',
    });
    if (response.statusCode === 200) {
      return {
        link: response.data.link,
        name: response.data.name,
        scriptId: response.data.scriptId,
        date: response.data.date,
      };
    } else throw '서버 통신 실패';
  };

  const getRecordData = async (scriptId: number) => {
    try {
      const response = await API.get({
        url: `/script/recording/find?scriptId=${scriptId}`,
      });
      return response.data[0].map((record: GetRecordData) => ({
        name: record.name,
        link: record.link,
        endTime: record.endTime,
        isDeleted: record.isDeleted,
        date: record.date,
        scriptId: record.scriptId,
      }));
    } catch {
      return undefined;
    }
  };

  const deleteRecordData = async (body: DeleteRecordData) => {
    const response = await API.post({
      url: '/script/recording/delete',
      data: body,
    });
    if (response.statusCode === 200) {
      return {
        link: response.data.link,
        deleted: response.data.deleted,
        scriptId: response.data.scriptId,
      };
    } else throw '서버 통신 실패';
  };

  const changeRecordNameData = async (body: ChangeRecordNameData) => {
    const response = await API.post({
      url: '/script/recording/change-name',
      data: body,
    });
    if (response.statusCode === 200) {
      return {
        link: response.data.link,
        newName: response.data.newName,
        scriptId: response.data.scriptId,
      };
    } else throw '서버 통신 실패';
  };

  const getSimilarVideoData = async (videoId: number) => {
    const response = await API.get({
      url: `/news/similar/${videoId}`,
    }).catch((error: AxiosError<Error>) => {
      if (error.response?.status === STATUS_CODE.INTERNAL_SERVER_ERROR) {
        throw new InternalServerError(error.response?.data.message);
      }
    });
    return {
      videoList: response.data ? response.data.exploreNewsDtoCollection : [],
    };
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
    getSpeechGuideData,
    uploadRecordData,
    getRecordData,
    deleteRecordData,
    changeRecordNameData,
    getSimilarVideoData,
  };
}
