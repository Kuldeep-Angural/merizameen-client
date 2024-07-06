import axios from 'axios';
import { HEADERS } from '../../configuration/headers';
const BASE_ENDPOINT = process.env.REACT_APP_API_END_POINT;

export const getUser = async (credentials) => {
  return  axios
    .post(BASE_ENDPOINT + '/user/details', { id: credentials }, {})
    .then(function (response) {
      if (response.status === 200) {
        return { ...response.data };
      }
    })
    .catch(function (error) {
      return error;
    });
};

export const updateUserDetails = async (data) => {
  return  axios
    .post(BASE_ENDPOINT + '/user/updateUser', data, {})
    .then(function (response) {
      if (response.status === 200) {
        return { ...response.data };
      }
    })
    .catch(function (error) {
      return error;
    });
};


export const userLikes = async () => {
  return axios
    .get(BASE_ENDPOINT+'/user/getUserLikes',  {
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


export const sellerLikes = async () => {
  return axios
    .get(BASE_ENDPOINT+'/user/getSellerLikes',  {
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




export const getAllpostedProperties = async () => {
  return axios
    .get(BASE_ENDPOINT+'/user/getPostedProperties',  {
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