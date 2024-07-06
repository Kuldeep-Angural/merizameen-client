import { SESSION_KEYS } from "../constants/constant"

export const HEADERS = {
    AUTHENTIC: () => {
        return {
            'Accept': 'application/json,text/plain',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token()}`,
            'Cache-Control': 'no-cache',
            'AppContext' : `${getUser()}`
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

const getUser = () => {
    return localStorage.getItem(SESSION_KEYS.USER);
}