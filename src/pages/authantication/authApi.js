
import axios from 'axios';
import { HEADERS } from '../../configuration/headers';
const BASE_ENDPOINT = process.env.REACT_APP_API_END_POINT;


export const signUpUser = async (credentials) =>{
  const basicAuthData = btoa(credentials.name + ':' +credentials.email + ':' +credentials.mobile + ':' + credentials.password);  
  return await axios.post(BASE_ENDPOINT + '/api/signup', {}, {
    headers: HEADERS.SIGNUP(basicAuthData)}).then(function (response) {
    if (response.status === 200) {
      return {...response.data}
    }
  }).catch(function (error) {
    return  error ;
  });
  }

  export const loginUser = async (credentials) =>{
    const basicAuthData = btoa(credentials.email + ':' + credentials.password);  
    return await axios.post(BASE_ENDPOINT + '/api/login', {}, {
      headers: HEADERS.LOGIN(basicAuthData)
    }).then(function (response) {
      if (response.status === 200) {
        return {...response.data}
      }
    }).catch(function (error) {
      return { error };
    });
  }


