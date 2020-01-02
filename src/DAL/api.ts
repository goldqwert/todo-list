import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/todo-lists',
    withCredentials: true,
    headers: { 'API-KEY': '27f3f13e-7083-49b0-bc0d-c205b1d902b8' }
});

export const api = {
    addTodolist(title: string) {
        return instance.post('', { title })
    },
    getTodolists() {
        return instance.get('')
    },
    getTasks(todolistId: string) {
        return instance.get(`/${todolistId}/tasks`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post(`/${todolistId}/tasks`,
            { title })
    },
    changeTask(newTask: string) {
        return instance.put('/tasks/', newTask)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`/${todolistId}`)
    },
    deleteTask(taskId: string) {
        return instance.delete(`/tasks/${taskId}`)
    },
    changeHeader(todolistId: string, title: string) {
        return instance.put(`/${todolistId}`, { title })
    }
}