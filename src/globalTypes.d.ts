interface Task {
    addedDate: string
    deadline: null
    description: null
    order: number
    priority: number
    startDate: null
    status: number
    todolistId: string
    id: string
    title: string
    completed: boolean
}
interface Todolist {
    tasks: Task[]
    id: string
    title: string
}
interface State {
    app: App
    auth: Auth
}
interface AppState {
    todolists: any[],
    error: boolean
}
interface AuthState {
    userId: null | number,
    email: null | string,
    login: null | string,
    isAuth: boolean,
    captchaUrl: null | any,
    formError: string,
    initialize: boolean
}
interface IChangeTask {
    status?: number
    title?: string
    priority?: number
    description?: string
    startDate?: string
    deadline?: string
}
interface IChangeTitle {
    title?: string
}
interface newTask {
    status: number;
    title: string;
    priority: number;
    description: string | null;
    startDate: string | null;
    deadline: string | null;
    addedDate: string;
    order: number;
    todolistId: string;
    id: string;
    completed: boolean;
}
