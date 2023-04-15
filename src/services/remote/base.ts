import { STATUS_CODE } from '@src/constants/common';
import { InternalServerError } from '@src/types/error';
import axios, { AxiosError } from 'axios';

const BASEURL = 'https://deliverble.online';
const getAccessToken = () => localStorage.getItem('token') ?? '';

const getBaseHeaders = () => {
  const accessToken = getAccessToken();
  const headers = { Accept: `*/*`, 'Content-Type': `application/json` };
  return accessToken ? { ...headers, Authorization: `Bearer ${accessToken}` } : headers;
};

const getBasePrivateMultipartHeaders = () => {
  const headers = { Accept: `*/*`, 'Content-Type': `multipart/form-data`, Authorization: `Bearer ${getAccessToken()}` };
  return headers;
};

interface Request {
  url: string;
  headers?: object;
  method: 'get' | 'post' | 'patch' | 'delete';
}

interface RequestWithParams extends Request {
  params?: object;
}

interface RequestWithData extends Request {
  data?: object;
  type?: 'json' | 'multipart';
}

const sendRequest = ({ url, params, headers }: Omit<RequestWithParams, 'method'>) => {
  const baseHeaders = getBaseHeaders();
  return axios
    .get(BASEURL + url, { headers: { ...baseHeaders, ...headers }, params })
    .then((response) => ({ ...response.data, axiosStatus: response.status }))
    .catch((error: AxiosError<Error>) => {
      if (error.response?.status === STATUS_CODE.INTERNAL_SERVER_ERROR) {
        throw new InternalServerError(error.response?.data.message);
      }
    });
};

const sendRequestForData = ({ url, data, method, headers, type }: RequestWithData) => {
  const baseHeaders = type === 'json' ? getBaseHeaders() : getBasePrivateMultipartHeaders();
  return axios[method](BASEURL + url, data, { headers: { ...baseHeaders, ...headers } })
    .then((response) => response.data)
    .catch((error: AxiosError<Error>) => {
      if (error.response?.status === STATUS_CODE.INTERNAL_SERVER_ERROR) {
        throw new InternalServerError(error.response?.data.message);
      }
    });
};

const sendRequestForDelete = ({ url, data, headers }: Omit<RequestWithData, 'method'>) => {
  const baseHeaders = getBaseHeaders();
  return axios
    .delete(BASEURL + url, { headers: { ...baseHeaders, ...headers }, data: data })
    .then((response) => response.data)
    .catch((error: AxiosError<Error>) => {
      if (error.response?.status === STATUS_CODE.INTERNAL_SERVER_ERROR) {
        throw new InternalServerError(error.response?.data.message);
      }
    });
};

export const API = {
  get: ({ url, params, headers }: Omit<RequestWithParams, 'method'>) => sendRequest({ url, params, headers }),
  post: ({ url, data, headers, type }: Omit<RequestWithData, 'method'>) =>
    sendRequestForData({ url, data, method: 'post', headers, type: type ?? 'json' }),
  patch: ({ url, data, headers, type }: Omit<RequestWithData, 'method'>) =>
    sendRequestForData({ url, data, method: 'patch', headers, type: type ?? 'json' }),
  delete: ({ url, data, headers }: Omit<RequestWithData, 'method'>) => sendRequestForDelete({ url, data, headers }),
};
