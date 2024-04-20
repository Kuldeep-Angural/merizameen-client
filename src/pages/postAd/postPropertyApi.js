import axios from 'axios';
import { HEADERS } from '../../configuration/headers';

const BASE_ENDPOINT = process.env.REACT_APP_API_END_POINT;

export const createObject = async (payload) => {
  return axios
    .post(BASE_ENDPOINT+'/user/addProperty', payload, {
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
