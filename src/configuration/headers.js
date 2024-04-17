import { SESSION_KEYS } from "../constants/constant"

//Headers to access API data 
export const HEADERS = {

    SIGNUP: (besicData) => {
        return {
            'Accept': 'application/json,text/plain',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${besicData}`,
            'Cache-Control': 'no-cache'
        }
    },
    LOGIN: (besicData) => {
        return {
            'Accept': 'application/json,text/plain',
            'Content-Type': 'application/json',
            'Authorization': `Basic ${besicData}`,
            'Cache-Control': 'no-cache'
        }
    },
    AUTHENTIC: () => {
        return {
            'Accept': 'application/json,text/plain',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token()}`,
            'Cache-Control': 'no-cache',
            'AppContext' : `${getFacility()}`
        }
    },
    FILE: () => {
        return {
            'Accept': 'application/json,text/plain',
            'Content-Type': '',
            'Authorization': `Bearer ${token()}`,
            'Cache-Control': 'no-cache',
        }
    }

}

const token = () => {
    return localStorage.getItem(SESSION_KEYS.TOKEN);
}

const getFacility = () => {
    return localStorage.getItem(SESSION_KEYS.FACILITY);
}