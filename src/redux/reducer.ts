import { api } from '../DAL/api';
import {
    ActionCreatorTypes,
    setTodolists, addTodolist, setTasks, addTask, changeTask, changeHeader, deleteTodolist, deleteTask, showError,
    showTodolists
} from './types';
import { Dispatch } from 'redux';

export const SET_TODOLISTS = 'Todolist/reducer/SET_TODOLISTS'
export const ADD_TODOLIST = 'Todolist/reducer/ADD_TODOLIST'
export const SET_TASKS = 'Todolist/reducer/SET_TASKS'
export const ADD_TASK = 'Todolist/reducer/ADD_TASK'
export const CHANGE_TASK = 'Todolist/reducer/CHANGE_TASK'
export const CHANGE_HEADER = 'Todolist/reducer/CHANGE_HEADER'
export const DETELE_TODOLIST = 'Todolist/reducer/DETELE_TODOLIST'
export const DELETE_TASK = 'Todolist/reducer/DELETE_TASK'
export const SHOW_ERROR = 'Todolist/reducer/SHOW_ERROR'
export const SHOW_TODOLISTS = 'Todolist/reducer/SHOW_TODOLISTS'

const initialState: State = {
    todolists: [],
    error: false
}

const reducer = (state: State = initialState, action: ActionCreatorTypes) => {
    switch (action.type) {
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map(el => ({ ...el, tasks: [] }))
            }
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [action.newTodolist, ...state.todolists]
            }
        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(el => {
                    if (el.id === action.todolistId) {
                        return {
                            ...el, tasks: action.tasks
                        }
                    } else {
                        return el
                    }
                }
                )
            }
        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(el => {
                    if (el.id === action.todolistId) {
                        return { ...el, tasks: [action.newTask, ...el.tasks] }
                    } else {
                        return el;
                    }
                })
            }
        case CHANGE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(el => {
                    if (el.id === action.todolistId) {
                        return {
                            ...el,
                            tasks: el.tasks.map(el => {
                                if (el.id === action.taskId) {
                                    return { ...el, ...action.obj }
                                } else {
                                    return el
                                }
                            })
                        }
                    } else {
                        return el
                    }
                })
            }
        case CHANGE_HEADER:
            return {
                ...state,
                todolists: state.todolists.map(el => {
                    if (el.id === action.todolistId) {
                        return { ...el, ...action.title }
                    } else {
                        return el
                    }
                })
            }
        case DETELE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(el => el.id !== action.todolistId)
            }
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(el => {
                    if (el.id === action.todolistId) {
                        return {
                            ...el,
                            tasks: el.tasks.filter(el => el.id !== action.taskId)
                        }
                    } else {
                        return el
                    }
                })
            }
        case SHOW_ERROR:
            return {
                ...state,
                error: true
            }
        case SHOW_TODOLISTS:
            return {
                ...state,
                error: false
            }
    }
    return state
}
export default reducer;

const setTodolistsAC = (todolists: Todolist[]): setTodolists => ({ type: SET_TODOLISTS, todolists })
const addTodolistAC = (newTodolist: Todolist): addTodolist => ({ type: ADD_TODOLIST, newTodolist })
const setTasksAC = (tasks: Task[], todolistId: string): setTasks => ({ type: SET_TASKS, tasks, todolistId })
const addTaskAC = (newTask: string, todolistId: string): addTask => ({ type: ADD_TASK, newTask, todolistId })
const changeTaskAC = (taskId: string, obj: IChangeTask, todolistId: string): changeTask => ({ type: CHANGE_TASK, taskId, obj, todolistId })
const changeHeaderAC = (todolistId: string, title: any): changeHeader => ({ type: CHANGE_HEADER, todolistId, title })
const deleteTodolistAC = (todolistId: string): deleteTodolist => ({ type: DETELE_TODOLIST, todolistId })
const deleteTaskAC = (taskId: string, todolistId: string): deleteTask => ({ type: DELETE_TASK, taskId, todolistId })
const showErrorAC = (): showError => ({ type: SHOW_ERROR })
export const showTodolistsAC = (): showTodolists => ({ type: SHOW_TODOLISTS })

export const getTodolistsTC = () => {
    return async (dispatch: Dispatch<ActionCreatorTypes>) => {
        const res: any = await api.getTodolists()
        dispatch(setTodolistsAC(res.data))
    }
}
export const addTodolistTC = (title: string) => {
    return async (dispatch: Dispatch<ActionCreatorTypes>) => {
        const res = await api.addTodolist(title)
        let newTodolist = res.data.data.item
        if (res.data.resultCode === 1) {
            dispatch(showErrorAC())
        } else {
            dispatch(addTodolistAC(newTodolist));
        }
    }
}

export const getTasksTC = (todolistId: string) => {
    return async (dispatch: Dispatch<ActionCreatorTypes>) => {
        const res = await api.getTasks(todolistId)
        let tasks = res.data.items
        dispatch(setTasksAC(tasks, todolistId));
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return async (dispatch: Dispatch<ActionCreatorTypes>) => {
        const res = await api.addTask(todolistId, title)
        let newTask = res.data.data.item
        if (res.data.resultCode === 1) {
            dispatch(showErrorAC())
        } else {
            dispatch(addTaskAC(newTask, todolistId))
        }
    }
}

export const changeTaskTC = (taskId: string, obj: any, todolistId: string) => {
    return (dispatch: Dispatch<ActionCreatorTypes>, getState: Function) => {
        const selectedTodo = getState().todolists.find((el: Todolist) => el.id === todolistId);
        selectedTodo.tasks.forEach(async (el: Task) => {
            if (el.id === taskId) {
                const newTask = { ...el, ...obj }
                const res = await api.changeTask(todolistId, taskId, newTask)
                dispatch(changeTaskAC(taskId, obj, todolistId))
            }
        })
    }
}

export const changeHeaderTC = (todolistId: string, title: any) => {
    return async (dispatch: Dispatch<ActionCreatorTypes>) => {
        const res = await api.changeHeader(todolistId, title)
        dispatch(changeHeaderAC(todolistId, { title }))
    }
}

export const deleteTodolistTC = (todolistId: string) => {
    return async (dispatch: Dispatch<ActionCreatorTypes>) => {
        const res = await api.deleteTodolist(todolistId)
        dispatch(deleteTodolistAC(todolistId))
    }
}

export const deleteTaskTC = (taskId: string, todolistId: string) => {
    return async (dispatch: Dispatch<ActionCreatorTypes>) => {
        const res = await api.deleteTask(todolistId, taskId)
        dispatch(deleteTaskAC(taskId, todolistId))
    }
}



