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
    const { data: video, data2: scriptList } = response;
    return {
      ...scriptList[index],
      ...video,
      tags: video.tagsForView,
      scriptsId: scriptList[index].id,
      scripts: scriptList[index].sentences,
      names: scriptList.map((name: Name) => name),
    };
  };

  const getPublicVideoData = async (videoId: number) => {
    const response = await API.get({ url: `/news/detail/not-authentication/${videoId}` });
    const { data: video, data2: scriptList } = response;
    return { ...video, tags: video.tagsForView, scriptsId: scriptList[0].id, scripts: scriptList[0].sentences };
  };

  const getSpeechGuideData = async (videoId: number) => {
    const response = await API.get({ url: `/news/guide/detail/${videoId}` });
    const { data: video, data2: scriptList } = response;
    return {
      ...video,
      tags: video.tagsForView,
      scriptsId: scriptList[0].id,
      scripts: scriptList[0].sentences,
      memos: scriptList[0].memoGuides,
    };
  };

  const postSentenceData = async ({ sentenceData, scriptId }: UpdateSentenceRequest) => {
    const response = await API.post({ url: `/script/sentence/update/${scriptId}`, data: sentenceData });
    const { data: video, data2: script } = response;
    return { ...script, ...video, tags: video.tagsForView, scriptsId: script.id, scripts: script.sentences };
  };

  const postMemoData = async ({ memo, scriptId }: CreateMemoRequest) => {
    const response = await API.post({ url: `/script/memo/create/${scriptId}`, data: memo });
    const { data: video, data2: script } = response;
    return { ...script, ...video, tags: video.tagsForView, scriptsId: script.id, scripts: script.sentences };
  };

  const updateMemoData = async ({ memoId, content }: UpdateMemoRequest) => {
    const response = await API.patch({ url: `/script/memo/update/${memoId}`, data: { content } });
    const { data: video, data2: script } = response;
    return { ...script, ...video, tags: video.tagsForView, scriptsId: script.id, scripts: script.sentences };
  };

  const deleteMemoData = async ({ memoId }: DeleteMemoRequest) => {
    const response = await API.delete({ url: `/script/memo/delete/${memoId}` });
    const { data: video, data2: script } = response;
    return { ...script, ...video, tags: video.tagsForView, scriptsId: script.id, scripts: script.sentences };
  };

  const postNewScriptData = async ({ videoId, clickedTitleIndex: index }: CreateScriptRequest) => {
    const response = await API.post({ url: `/script/create/${videoId}` });
    const {
      data: video,
      data2: { returnScriptDtoCollection: scriptList },
    } = response;
    return {
      ...scriptList[index],
      ...video,
      tags: video.tagsForView,
      scriptsId: scriptList[index].id,
      scripts: scriptList[index].sentences,
      names: scriptList.map((name: Name) => name),
    };
  };

  const deleteScriptData = async ({ scriptId }: DeleteScriptRequest) => {
    const response = await API.delete({ url: `/script/delete/${scriptId}` });
    const {
      data: video,
      data2: { returnScriptDtoCollection: scriptList },
    } = response;
    return {
      ...scriptList[0],
      ...video,
      tags: video.tagsForView,
      scriptsId: scriptList[0].id,
      scripts: scriptList[0].sentences,
      names: scriptList.map((name: Name) => name),
    };
  };

  const updateScriptNameData = async ({ id, name }: UpdateScriptNameRequest) => {
    const response = await API.patch({ url: `/script/name/${id}`, data: { name } });
    const { data: video, data2: script } = response;
    return { ...script, ...video, tags: video.tagsForView, scriptsId: script.id, scripts: script.sentences };
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
