import { Dispatch } from 'redux';
import { authAPI } from '../DAL/api';
import {
    AuthACTypes,
    setAuthUserData, getCaptchaUrlSuccess,
    formError, initializeSuccess
} from './types';

export const SET_AUTH_USER_DATA = 'Todolist/AuthReducer/SET_AUTH_USER_DATA';
export const GET_CAPTCHA_URL_SUCCESS = 'Todolist/AuthReducer/GET_CAPTCHA_URL_SUCCESS';
export const SET_FORM_ERROR = 'Todolist/AuthReducer/SET_FORM_ERROR';
export const INITIALIZE_SUCCESS = 'Todolist/AuthReducer/INITIALIZE_SUCCESS';

let initialState: AuthState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
    formError: '',
    initialize: false
}

const authReducer = (state: AuthState = initialState, action: AuthACTypes) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.data
            }
        case SET_FORM_ERROR:
            return {
                ...state,
                formError: action.error
            }
        case INITIALIZE_SUCCESS:
            return {
                ...state,
                initialize: true
            }
        default: return state;
    }
}


export default authReducer;

export const setAuthUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserData => ({ type: SET_AUTH_USER_DATA, data: { userId, email, login, isAuth } })
export const getCaptchaUrlSuccessAC = (captchaUrl: any): getCaptchaUrlSuccess => ({ type: GET_CAPTCHA_URL_SUCCESS, data: { captchaUrl } })
export const formErrorAC = (error: string): formError => ({ type: SET_FORM_ERROR, error })
export const initializeSuccessAC = (): initializeSuccess => ({ type: INITIALIZE_SUCCESS })

export const initializeAppTC = () => {
    return async (dispatch: any) => {
        let promise = await dispatch(authTC())
        Promise.all([promise])
        dispatch(initializeSuccessAC())
    }
}

export const authTC = () => {
    return async (dispatch: Dispatch<AuthACTypes>) => {
        const response = await authAPI.me()
        if (response.data.resultCode === 0) {
            const { id, email, login } = response.data.data
            dispatch(setAuthUserDataAC(id, email, login, true));
        }
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: any) => {
    return async (dispatch: Dispatch<any>) => {
        const response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.data.rememberMe) {
            localStorage.setItem('stringToken', response.data.token)
        }
        if (response.data.resultCode === 0) {
            dispatch(authTC());
        } else if (response.data.resultCode === 1) {
            dispatch(formErrorAC(response.data.messages.join()))
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaTC());
            }
        }
    }
}

export const logoutTC = () => {
    return async (dispatch: Dispatch<AuthACTypes>) => {
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserDataAC(null, null, null, false));
        }
    }
}

export const getCaptchaTC = () => {
    return async (dispatch: Dispatch<AuthACTypes>) => {
        const response = await authAPI.getCaptchaUrl()
        dispatch(getCaptchaUrlSuccessAC(response.data.url))
    }
}
