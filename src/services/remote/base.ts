import axios from 'axios';

const BASEURL = 'https://deliverble.online';
const getAccessToken = () => localStorage.getItem('token') ?? '';

const getBasePrivateHeaders = () => {
  const accessToken = getAccessToken();
  const headers = {
    Accept: `*/*`,
    'Content-Type': `application/json`,
  };

  if (accessToken) {
    return {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return headers;
};

const basePublicHeaders = {
  Accept: `*/*`,
  'Content-Type': `application/json`,
};

const getBasePrivateMultipartHeaders = () => {
  const accessToken = getAccessToken();
  const headers = {
    Accept: `*/*`,
    'Content-Type': `multipart/form-data`,
  };

  if (accessToken) {
    return {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return headers;
};

interface Request {
  url: string;
  headers?: object;
  isPrivate: boolean;
  method: 'get' | 'post' | 'patch' | 'delete';
}

interface RequestWithParams extends Request {
  params?: object;
}

interface RequestWithData extends Request {
  data?: object;
  type?: 'json' | 'multipart';
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

const sendRequestForData = ({ url, data, method, headers, isPrivate, type }: RequestWithData) => {
  const baseHeaders = isPrivate
    ? type === 'json'
      ? getBasePrivateHeaders()
      : getBasePrivateMultipartHeaders()
    : basePublicHeaders;
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
  post: ({ url, data, headers, type }: Omit<RequestWithData, 'isPrivate' | 'method'>) =>
    sendRequestForData({
      url,
      data,
      method: 'post',
      headers,
      isPrivate: true,
      type: type ?? 'json',
    }),
  patch: ({ url, data, headers, type }: Omit<RequestWithData, 'isPrivate' | 'method'>) =>
    sendRequestForData({
      url,
      data,
      method: 'patch',
      headers,
      type: type ?? 'json',
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
  patch: ({ url, data, headers }: Omit<RequestWithData, 'isPrivate' | 'method'>) =>
    sendRequestForData({
      url,
      data,
      method: 'patch',
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
