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
    todolists: Todolist[]
    error: boolean
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
