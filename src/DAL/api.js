import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/todo-lists',
    withCredentials: true,
    headers: { 'API-KEY': '2236ef4e-f393-4131-8f67-ed07ec48b650' }
});


export const api = {
    addTodolist(title) {
        return instance.post('', { title })
    },
    getTodolists() {
        return instance.get('')
    },
    getTasks(todolistId) {
        return instance.get(`/${todolistId}/tasks`)
    },
    addTask(todolistId, title) {
        return instance.post(`/${todolistId}/tasks`,
            { title })
    },
    changeTask(newTask) {
        return instance.put('/tasks/', newTask)
    },
    deleteTodolist(todolistId) {
        return instance.delete(`/${todolistId}`)
    },
    deleteTask(taskId) {
        return instance.delete(`/tasks/${taskId}`)
    },
    changeHeader(todolistId, title) {
        return instance.put(`/${todolistId}`, { title })
    }
}