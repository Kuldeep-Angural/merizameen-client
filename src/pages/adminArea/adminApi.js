import axios from 'axios';
import { HEADERS } from "../../configuration/headers";

const BASE_ENDPOINT = process.env.REACT_APP_API_END_POINT;

export const getAll = async (payload) => {
    return axios
        .post(BASE_ENDPOINT + '/admin/allUsers', payload, {
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


export const getProperty = async (payload) => {
    return axios
        .post(BASE_ENDPOINT + '/admin/allProperties', payload, {
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
}

export const getUsersProperties = async (payload) => {
    return axios
        .post(BASE_ENDPOINT + '/admin/user/properties', payload, {
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
}



export const deleteUserApi = async (payload) => {
    return axios
        .post(BASE_ENDPOINT + '/admin/deleteuser', payload, {
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
}


export const updateUserDetals = async (payload) => {
    return axios
        .post(BASE_ENDPOINT + '/admin/updateuser', payload, {
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
}



export const getUserApi = async (payload) => {
    return axios.post(BASE_ENDPOINT + '/admin/getuser', payload, {
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
}


export const deletUserProperty = async (payload) => {
    return axios.post(BASE_ENDPOINT + '/admin/deleteproperty', payload, {
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
}

export const userJourney = async (payload) => {
    return axios.post(BASE_ENDPOINT + '/admin/userJourney', payload, {
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
}



export const getAllFeedbacks = async (payload) => {
    return axios
        .post(BASE_ENDPOINT + '/admin/allFeedbacks', payload, {
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
}


