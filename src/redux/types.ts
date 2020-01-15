import {
    SET_TODOLISTS, ADD_TODOLIST, SET_TASKS, ADD_TASK, CHANGE_TASK, CHANGE_HEADER, DETELE_TODOLIST, DELETE_TASK,
    SHOW_ERROR, SHOW_TODOLISTS
} from './reducer'
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

export type ActionCreatorTypes = setTodolists |
    addTodolist | setTasks | addTask | changeTask |
    changeHeader | deleteTodolist | deleteTask |
    showError | showTodolists;
