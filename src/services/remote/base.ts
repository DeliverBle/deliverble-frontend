import { BASE_URL, STATUS_CODE } from '@src/constants/common';
import { BadRequestError, ForbiddenError, InternalServerError, UnauthorizedError } from '@src/types/error';
import axios, { AxiosError, AxiosResponse } from 'axios';

export const getAccessToken = () => {
  let accessToken = '';
  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('token') ?? '';
  }
  return accessToken;
};

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

const handleError = (error: AxiosError<Error>) => {
  const {
    status,
    data: { message },
  } = error.response as AxiosResponse<Error>;

  switch (status) {
    case STATUS_CODE.INTERNAL_SERVER_ERROR:
      throw new InternalServerError(message);
    case STATUS_CODE.UNAUTHORIZED:
      throw new UnauthorizedError(message);
    case STATUS_CODE.BAD_REQUEST:
      throw new BadRequestError(message);
    case STATUS_CODE.FORBIDDEN:
      throw new ForbiddenError(message);
  }
};

const sendRequest = ({ url, params, headers }: Omit<RequestWithParams, 'method'>) => {
  const baseHeaders = getBaseHeaders();
  return axios
    .get(BASE_URL + url, { headers: { ...baseHeaders, ...headers }, params })
    .then((response) => ({ ...response.data, axiosStatus: response.status }))
    .catch((error: AxiosError<Error>) => handleError(error));
};

const sendRequestForData = ({ url, data, method, headers, type }: RequestWithData) => {
  const baseHeaders = type === 'json' ? getBaseHeaders() : getBasePrivateMultipartHeaders();
  return axios[method](BASE_URL + url, data, { headers: { ...baseHeaders, ...headers } })
    .then((response) => response.data)
    .catch((error: AxiosError<Error>) => handleError(error));
};

const sendRequestForDelete = ({ url, data, headers }: Omit<RequestWithData, 'method'>) => {
  const baseHeaders = getBaseHeaders();
  return axios
    .delete(BASE_URL + url, { headers: { ...baseHeaders, ...headers }, data: data })
    .then((response) => response.data)
    .catch((error: AxiosError<Error>) => handleError(error));
};

export const API = {
  get: ({ url, params, headers }: Omit<RequestWithParams, 'method'>) => sendRequest({ url, params, headers }),
  post: ({ url, data, headers, type }: Omit<RequestWithData, 'method'>) =>
    sendRequestForData({ url, data, method: 'post', headers, type: type ?? 'json' }),
  patch: ({ url, data, headers, type }: Omit<RequestWithData, 'method'>) =>
    sendRequestForData({ url, data, method: 'patch', headers, type: type ?? 'json' }),
  delete: ({ url, data, headers }: Omit<RequestWithData, 'method'>) => sendRequestForDelete({ url, data, headers }),
};
