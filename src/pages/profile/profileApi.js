import axios from 'axios';
const BASE_ENDPOINT = process.env.REACT_APP_API_END_POINT;

export const getUser = async (credentials) => {
  return await axios
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
  return await axios
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
