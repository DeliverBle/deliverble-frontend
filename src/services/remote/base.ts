import axios from 'axios';

const BASEURL = 'https://deliverble.online/v2';
const getAccessToken = () => localStorage.getItem('token') ?? '';
const getUserId = () => localStorage.getItem('userId') ?? '';

const getBasePrivateHeaders = () => ({
  Accept: `*/*`,
  'Content-Type': `application/json`,
  accesstoken: getAccessToken(),
  userId: getUserId(),
});

const basePublicHeaders = {
  Accept: `*/*`,
  'Content-Type': `application/json`,
};

interface Request {
  url: string;
  headers?: object;
  isPrivate: boolean;
  method: 'get' | 'post' | 'put' | 'delete';
}

interface RequestWithParams extends Request {
  params?: object;
}

interface RequestWithData extends Request {
  data?: object;
}

const sendRequest = ({ url, params, method, headers, isPrivate }: RequestWithParams) => {
  const baseHeaders = isPrivate ? getBasePrivateHeaders() : basePublicHeaders;
  return axios[method](BASEURL + url, {
    headers: { ...baseHeaders, ...headers },
    params,
  }).then((response) => {
    return { ...response.data, axiosStatus: response.status };
  });
};

const sendRequestForData = ({ url, data, method, headers, isPrivate }: RequestWithData) => {
  const baseHeaders = isPrivate ? getBasePrivateHeaders() : basePublicHeaders;
  return axios[method](BASEURL + url, data, {
    headers: { ...baseHeaders, ...headers },
  }).then((response) => {
    return response.data;
  });
};

const sendRequestForDelete = ({ url, data, headers, isPrivate }: Omit<RequestWithData, 'method'>) => {
  const baseHeaders = isPrivate ? getBasePrivateHeaders() : basePublicHeaders;
  return axios
    .delete(BASEURL + url, {
      headers: { ...baseHeaders, ...headers },
      data: data,
    })
    .then((response) => {
      return response.data;
    });
};

export const privateAPI = {
  get: ({ url, params, headers }: Omit<RequestWithParams, 'isPrivate' | 'method'>) =>
    sendRequest({ url, params, method: 'get', headers, isPrivate: true }),
  post: ({ url, data, headers }: Omit<RequestWithData, 'isPrivate' | 'method'>) =>
    sendRequestForData({
      url,
      data,
      method: 'post',
      headers,
      isPrivate: true,
    }),
  put: ({ url, data, headers }: Omit<RequestWithData, 'isPrivate' | 'method'>) =>
    sendRequestForData({
      url,
      data,
      method: 'put',
      headers,
      isPrivate: true,
    }),
  delete: ({ url, data, headers }: Omit<RequestWithData, 'isPrivate' | 'method'>) =>
    sendRequestForDelete({
      url,
      data,
      headers,
      isPrivate: true,
    }),
};

export const publicAPI = {
  get: ({ url, params, headers }: Omit<RequestWithParams, 'isPrivate' | 'method'>) =>
    sendRequest({ url, params, method: 'get', headers, isPrivate: false }),
  post: ({ url, data, headers }: Omit<RequestWithData, 'isPrivate' | 'method'>) =>
    sendRequestForData({
      url,
      data,
      method: 'post',
      headers,
      isPrivate: false,
    }),
  put: ({ url, data, headers }: Omit<RequestWithData, 'isPrivate' | 'method'>) =>
    sendRequestForData({
      url,
      data,
      method: 'put',
      headers,
      isPrivate: false,
    }),
  delete: ({ url, data, headers }: Omit<RequestWithData, 'isPrivate' | 'method'>) =>
    sendRequestForDelete({
      url,
      data,
      headers,
      isPrivate: false,
    }),
};
