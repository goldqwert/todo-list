import { createStore } from "redux";

const initialState = {
    todolists: [
        // { id: 1, title: "fwaw2fa", tasks: [{ id: 0, title: "awfw", isDone: false, priority: "low" }] },
        // { id: 2, title: "fw4awfa", tasks: [{ id: 1, title: "awfw", isDone: false, priority: "low" }] },
        // { id: 3, title: "fwa5wfa", tasks: [{ id: 2, title: "awfw", isDone: false, priority: "low" }] },
        // { id: 4, title: "fwawf6a", tasks: [{ id: 3, title: "awfw", isDone: false, priority: "low" }] }
    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            }
        case 'ADD_TASK':
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
        case 'CHANGE_TASK':
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
        case 'DETELE_TODOLIST':
            return {
                ...state,
                todolists: state.todolists.filter(el => el.id !== action.todolistId)
            }
        case 'DELETE_TASK':
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

const store = createStore(reducer);
export default store;