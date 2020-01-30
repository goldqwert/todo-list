import { authAPI } from '../DAL/api';

const SET_AUTH_USER_DATA = 'Todolist/AuthReducer/SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'Todolist/AuthReducer/GET_CAPTCHA_URL_SUCCESS';
const SET_FORM_ERROR = 'Todolist/AuthReducer/SET_FORM_ERROR';
const INITIALIZE_SUCCESS = 'Todolist/AuthReducer/INITIALIZE_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
    formError: '',
    initialize: false
}

const authReducer = (state = initialState, action: any) => {
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

export const setAuthUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({ type: SET_AUTH_USER_DATA, data: { userId, email, login, isAuth } })
export const getCaptchaUrlSuccessAC = (captchaUrl: any) => ({ type: GET_CAPTCHA_URL_SUCCESS, data: { captchaUrl } })
export const formErrorAC = (error: string) => ({ type: SET_FORM_ERROR, error })
export const initializeSuccess = () => ({ type: INITIALIZE_SUCCESS })

export const initializeAppTC = () => {
    return async (dispatch: any) => {
        let promise = await dispatch(authTC())
        Promise.all([promise])
        dispatch(initializeSuccess())
    }
}

export const authTC = () => {
    return async (dispatch: any) => {
        const response = await authAPI.me()
        if (response.data.resultCode === 0) {
            const { id, email, login } = response.data.data
            dispatch(setAuthUserDataAC(id, email, login, true));
        }
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: any) => {
    return async (dispatch: any) => {
        const response = await authAPI.login(email, password, rememberMe, captcha)
        console.log(response)
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
    return async (dispatch: any) => {
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserDataAC(null, null, null, false));
        }
    }
}

export const getCaptchaTC = () => {
    return async (dispatch: any) => {
        const response = await authAPI.getCaptchaUrl()
        dispatch(getCaptchaUrlSuccessAC(response.data.url))
    }
}
