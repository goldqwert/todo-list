export const SET_TODOLISTS = 'Todolist/reducer/SET_TODOLISTS'
export const ADD_TODOLIST = 'Todolist/reducer/ADD_TODOLIST'
export const SET_TASKS = 'Todolist/reducer/SET_TASKS'
export const ADD_TASK = 'Todolist/reducer/ADD_TASK'
export const CHANGE_TASK = 'Todolist/reducer/CHANGE_TASK'
export const CHANGE_HEADER = 'Todolist/reducer/CHANGE_HEADER'
export const DETELE_TODOLIST = 'Todolist/reducer/DETELE_TODOLIST'
export const DELETE_TASK = 'Todolist/reducer/DELETE_TASK'


const initialState = { todolists: [] }

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
                        return { ...el, tasks: [...el.tasks, action.newTask] }
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
            debugger
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
