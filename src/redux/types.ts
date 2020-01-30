import {
    SET_TODOLISTS, ADD_TODOLIST, SET_TASKS, ADD_TASK, CHANGE_TASK, CHANGE_HEADER, DETELE_TODOLIST, DELETE_TASK,
    SHOW_ERROR, SHOW_TODOLISTS
} from './TodoListsReducer'

import {
    SET_AUTH_USER_DATA, GET_CAPTCHA_URL_SUCCESS, SET_FORM_ERROR, INITIALIZE_SUCCESS
} from './AuthReducer'
export interface setTodolists {
    type: typeof SET_TODOLISTS
    todolists: Todolist[]
}
export interface addTodolist {
    type: typeof ADD_TODOLIST
    newTodolist: Todolist
}
export interface setTasks {
    type: typeof SET_TASKS
    tasks: Task[]
    todolistId: string
}
export interface addTask {
    type: typeof ADD_TASK
    newTask: string
    todolistId: string
}
export interface changeTask {
    type: typeof CHANGE_TASK
    taskId: string
    obj: IChangeTask
    todolistId: string
}
export interface changeHeader {
    type: typeof CHANGE_HEADER
    title: any
    todolistId: string
}
export interface deleteTodolist {
    type: typeof DETELE_TODOLIST
    todolistId: string
}
export interface deleteTask {
    type: typeof DELETE_TASK
    todolistId: string
    taskId: string
}
export interface showError {
    type: typeof SHOW_ERROR
}
export interface showTodolists {
    type: typeof SHOW_TODOLISTS
}
export interface setAuthUserData {
    type: typeof SET_AUTH_USER_DATA
    data: Data
}
interface Data {
    userId?: number | null
    email?: string | null,
    login?: string | null,
    isAuth?: boolean
    captchaUrl?: any
}
export interface getCaptchaUrlSuccess {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    data: Data
}
export interface formError {
    type: typeof SET_FORM_ERROR
    error: string
}
export interface initializeSuccess {
    type: typeof INITIALIZE_SUCCESS
}

export type AuthACTypes = setAuthUserData | getCaptchaUrlSuccess |
    formError | initializeSuccess

export type TodolistsACTypes = setTodolists |
    addTodolist | setTasks | addTask | changeTask |
    changeHeader | deleteTodolist | deleteTask |
    showError | showTodolists;
