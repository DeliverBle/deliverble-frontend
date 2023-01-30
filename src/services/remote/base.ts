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
  method: 'get' | 'post' | 'patch' | 'delete';
}

interface RequestWithParams extends Request {
  params?: object;
}

interface RequestWithData extends Request {
  data?: object;
  type?: 'json' | 'multipart';
}

const sendRequest = ({ url, params, method, headers }: RequestWithParams) => {
  const baseHeaders = getBasePrivateHeaders();
  return axios[method](BASEURL + url, {
    headers: { ...baseHeaders, ...headers },
    params,
  }).then((response) => {
    return { ...response.data, axiosStatus: response.status };
  });
};

const sendRequestForData = ({ url, data, method, headers, type }: RequestWithData) => {
  const baseHeaders = type === 'json' ? getBasePrivateHeaders() : getBasePrivateMultipartHeaders();
  return axios[method](BASEURL + url, data, {
    headers: { ...baseHeaders, ...headers },
  }).then((response) => {
    return response.data;
  });
};

const sendRequestForDelete = ({ url, data, headers }: Omit<RequestWithData, 'method'>) => {
  const baseHeaders = getBasePrivateHeaders();
  return axios
    .delete(BASEURL + url, {
      headers: { ...baseHeaders, ...headers },
      data: data,
    })
    .then((response) => {
      return response.data;
    });
};

export const API = {
  get: ({ url, params, headers }: Omit<RequestWithParams, 'method'>) =>
    sendRequest({ url, params, method: 'get', headers }),
  post: ({ url, data, headers, type }: Omit<RequestWithData, 'method'>) =>
    sendRequestForData({
      url,
      data,
      method: 'post',
      headers,
      type: type ?? 'json',
    }),
  patch: ({ url, data, headers, type }: Omit<RequestWithData, 'method'>) =>
    sendRequestForData({
      url,
      data,
      method: 'patch',
      headers,
      type: type ?? 'json',
    }),
  delete: ({ url, data, headers }: Omit<RequestWithData, 'method'>) =>
    sendRequestForDelete({
      url,
      data,
      headers,
    }),
};
