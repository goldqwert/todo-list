import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: { 'API-KEY': '628af683-774f-4561-a001-bea25c0b62fc' }
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
        return instance.post(`/${todolistId}/tasks`, { title })
    },
    changeTask(todolistId: string, taskId: string, newTask: newTask) {
        return instance.put(`/${todolistId}/tasks/${taskId}`, newTask)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`/${todolistId}`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`${todolistId}/tasks/${taskId}`)
    },
    changeHeader(todolistId: string, title: string) {
        return instance.put(`/${todolistId}`, { title })
    },
    changePriority(priority: number) {
        return instance.put('/tasks/', priority)
    }
}