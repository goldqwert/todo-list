import { api } from '../DAL/api'

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


const initialState = {
    todolists: [],
    error: false
}

const reducer = (state = initialState, action) => {
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
                    debugger
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

export const setTodolists = (todolists) => ({ type: SET_TODOLISTS, todolists })
export const addTodolist = (newTodolist) => ({ type: ADD_TODOLIST, newTodolist })
export const setTasks = (tasks, todolistId) => ({ type: SET_TASKS, tasks, todolistId })
export const addTask = (newTask, todolistId) => ({ type: ADD_TASK, newTask, todolistId })
export const changeTask = (taskId, obj, todolistId) => ({ type: CHANGE_TASK, taskId, obj, todolistId })
export const changeHeader = (todolistId, title) => ({ type: CHANGE_HEADER, todolistId, title })
export const deleteTodolist = (todolistId) => ({ type: DETELE_TODOLIST, todolistId })
export const deleteTask = (taskId, todolistId) => ({ type: DELETE_TASK, taskId, todolistId })
export const showError = () => ({ type: SHOW_ERROR })
export const showTodolists = () => ({ type: SHOW_TODOLISTS })

export const getTodolistsTC = () => {
    return async (dispatch) => {
        const res = await api.getTodolists()
        dispatch(setTodolists(res.data))
    }
}

export const addTodolistTC = (title) => {
    return async (dispatch) => {
        const res = await api.addTodolist(title)
        console.log(res)
        let newTodolist = res.data.data.item
        if (res.data.resultCode === 1) {
            dispatch(showError())
        } else {
            dispatch(addTodolist(newTodolist));
        }
    }
}

export const getTasksTC = (todolistId) => {
    debugger
    return async (dispatch) => {
        const res = await api.getTasks(todolistId)
        let tasks = res.data.items
        dispatch(setTasks(tasks, todolistId));
    }
}

export const addTaskTC = (todolistId, title) => {
    return async (dispatch) => {
        const res = await api.addTask(todolistId, title)
        let newTask = res.data.data.item
        dispatch(addTask(newTask, todolistId))
    }
}

export const changeTaskTC = (taskId, obj, todolistId) => {
    return (dispatch, getState) => {
        const selectedTodo = getState().todolists.find(el => el.id === todolistId);
        selectedTodo.tasks.forEach(async el => {
            debugger
            if (el.id === taskId) {
                const newTask = { ...el, ...obj }
                const res = await api.changeTask(newTask)
                dispatch(changeTask(taskId, obj, todolistId))
            }
        })
    }
}

export const changeHeaderTC = (todolistId, title) => {
    return async (dispatch) => {
        const res = await api.changeHeader(todolistId, title)
        dispatch(changeHeader(todolistId, { title }))
    }
}

export const deleteTodolistTC = (todolistId) => {
    return async (dispatch) => {
        const res = await api.deleteTodolist(todolistId)
        dispatch(deleteTodolist(todolistId))
    }
}

export const deleteTaskTC = (taskId, todolistId) => {
    return async (dispatch) => {
        const res = await api.deleteTask(taskId)
        dispatch(deleteTask(taskId, todolistId))
    }
}


