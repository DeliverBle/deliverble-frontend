import {
  ChangeRecordNameData,
  CreateMemoRequest,
  CreateScriptRequest,
  DeleteMemoRequest,
  DeleteRecordData,
  DeleteScriptRequest,
  GetRecordData,
  Name,
  UpdateMemoRequest,
  UpdateScriptNameRequest,
  UpdateSentenceRequest,
  UploadRecordData,
} from '@src/types/learnDetail/remote';
import { LearnDetailService } from '../api/learn-detail';
import { API } from './base';

export function learnDetailDataRemote(): LearnDetailService {
  const getPrivateVideoData = async (videoId: number, index: number) => {
    const response = await API.get({ url: `/news/detail/${videoId}` });
    const scriptIndex = response.data2[index] ? index : 0;
    return {
      ...response.data,
      scriptsId: response.data2[scriptIndex].id,
      tags: response.data.tagsForView,
      scripts: response.data2[scriptIndex].sentences,
      memos: response.data2[scriptIndex].memos,
      names: response.data2.map(({ id, name }: Name) => ({ id, name })),
    };
  };

  const getPublicVideoData = async (videoId: number) => {
    const response = await API.get({ url: `/news/detail/not-authentication/${videoId}` });
    return {
      ...response.data,
      scriptsId: response.data2[0].id,
      tags: response.data.tagsForView,
      scripts: response.data2[0].sentences,
    };
  };

  const getSpeechGuideData = async (videoId: number) => {
    const response = await API.get({ url: `/news/guide/detail/${videoId}` });
    return {
      ...response.data,
      scriptsId: response.data2[0].id,
      tags: response.data.tagsForView,
      scripts: response.data2[0].sentences,
      memos: response.data2[0].memoGuides,
    };
  };

  const postSentenceData = async ({ sentenceData, scriptId }: UpdateSentenceRequest) => {
    const response = await API.post({ url: `/script/sentence/update/${scriptId}`, data: sentenceData });
    return response.data;
  };

  const postMemoData = async ({ memo, scriptId }: CreateMemoRequest) => {
    const response = await API.post({ url: `/script/memo/create/${scriptId}`, data: memo });
    return {
      ...response.data2,
      ...response.data,
      tags: response.data.tagsForView,
      scriptsId: response.data2.id,
      scripts: response.data2.sentences,
    };
  };

  const updateMemoData = async ({ memoId, content }: UpdateMemoRequest) => {
    const response = await API.patch({ url: `/script/memo/update/${memoId}`, data: { content } });
    return {
      ...response.data2,
      ...response.data,
      tags: response.data.tagsForView,
      scriptsId: response.data2.id,
      scripts: response.data2.sentences,
    };
  };

  const deleteMemoData = async ({ memoId }: DeleteMemoRequest) => {
    const response = await API.delete({ url: `/script/memo/delete/${memoId}` });
    return {
      ...response.data2,
      ...response.data,
      tags: response.data.tagsForView,
      scriptsId: response.data2.id,
      scripts: response.data2.sentences,
    };
  };

  const postNewScriptData = async ({ videoId, clickedTitleIndex }: CreateScriptRequest) => {
    const response = await API.post({ url: `/script/create/${videoId}` });
    return {
      ...response.data2.returnScriptDtoCollection,
      ...response.data,
      tags: response.data.tagsForView,
      scriptsId: response.data2.returnScriptDtoCollection[clickedTitleIndex].id,
      scripts: response.data2.returnScriptDtoCollection[clickedTitleIndex].sentences,
      memos: response.data2.returnScriptDtoCollection[clickedTitleIndex].memos,
      names: response.data2.returnScriptDtoCollection.map(({ id, name }: Name) => ({ id, name })),
    };
  };

  const deleteScriptData = async ({ scriptId }: DeleteScriptRequest) => {
    const response = await API.delete({ url: `/script/delete/${scriptId}` });
    return {
      ...response.data2.returnScriptDtoCollection,
      ...response.data,
      tags: response.data.tagsForView,
      scriptsId: response.data2.returnScriptDtoCollection[0].id,
      scripts: response.data2.returnScriptDtoCollection[0].sentences,
      memos: response.data2.returnScriptDtoCollection[0].memos,
      names: response.data2.returnScriptDtoCollection.map(({ id, name }: Name) => ({ id, name })),
    };
  };

  const updateScriptNameData = async ({ id, name }: UpdateScriptNameRequest) => {
    const response = await API.patch({ url: `/script/name/${id}`, data: { name } });
    return {
      ...response.data2,
      ...response.data,
      tags: response.data.tagsForView,
      scriptsId: response.data2.id,
      scripts: response.data2.sentences,
    };
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
    const response = await API.get({ url: `/news/similar/${videoId}` });
    return response.data.exploreNewsDtoCollection;
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
