import axios from 'axios';
import { HEADERS } from '../../configuration/headers';

const BASE_ENDPOINT = process.env.REACT_APP_API_END_POINT;

export const createObject = async (payload) => {
  return axios
    .post(BASE_ENDPOINT+'/post/addProperty', payload, {
      headers: HEADERS.AUTHENTIC(),
    })
    .then(function (response) {
      if (response.status === 200) {
        return { ...response.data };
      }
    })
    .catch(function (error) {
      return error;
    });
};


export const getProperty=  async (payload) => {
  return axios
    .post(BASE_ENDPOINT+'/post/getProperty', payload, {
      headers: HEADERS.AUTHENTIC(),
    })
    .then(function (response) {
      if (response.status === 200) {
        return { ...response.data };
      }
    })
    .catch(function (error) {
      return error;
    });
};

export const like = async (payload) => {
  return axios
    .post(BASE_ENDPOINT+'/post/likes', payload, {
      headers: HEADERS.AUTHENTIC(),
    })
    .then(function (response) {
      if (response.status === 200) {
        return { ...response.data };
      }
    })
    .catch(function (error) {
      return error;
    });
};

export const deleteSpecificProperty = async (payload) => {
  return axios
    .post(BASE_ENDPOINT+'/post/deleteProperty', payload, {
      headers: HEADERS.AUTHENTIC(),
    })
    .then(function (response) {
      if (response.status === 200) {
        return { ...response.data };
      }
    })
    .catch(function (error) {
      return error;
    });
};



export const getAll = async (payload) => {
  return axios
    .get(BASE_ENDPOINT+'/post/allPropertys',{ headers: HEADERS.AUTHENTIC()}, {})
    .then(function (response) {
      if (response.status === 200) {
        return { ...response.data };
      }
    })
    .catch(function (error) {
      return error;
    });
};
