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