import axios from 'axios'

const authInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: { 'API-KEY': '38fc507b-a755-4b56-8169-4ab234f48af9' }
});

const todolistsInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: { 'API-KEY': '38fc507b-a755-4b56-8169-4ab234f48af9' }
});

export const todolistsAPI = {
    addTodolist(title: string) {
        return todolistsInstance.post('todo-lists', { title })
    },
    getTodolists() {
        return todolistsInstance.get('todo-lists')
    },
    getTasks(todolistId: string) {
        return todolistsInstance.get(`todo-lists/${todolistId}/tasks`)
    },
    addTask(todolistId: string, title: string) {
        return todolistsInstance.post(`todo-lists/${todolistId}/tasks`, { title })
    },
    changeTask(todolistId: string, taskId: string, newTask: newTask) {
        return todolistsInstance.put(`todo-lists/${todolistId}/tasks/${taskId}`, newTask)
    },
    deleteTodolist(todolistId: string) {
        return todolistsInstance.delete(`todo-lists/${todolistId}`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return todolistsInstance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    changeHeader(todolistId: string, title: string) {
        return todolistsInstance.put(`todo-lists/${todolistId}`, { title })
    },
    changePriority(priority: number) {
        return todolistsInstance.put('todo-lists/tasks/', priority)
    },

}

export const authAPI = {
    login(email: string, password: string, rememberMe: boolean, captcha: any) {
        return authInstance.post(`auth/login`, { email, password, rememberMe, captcha })
    },
    logout() {
        return authInstance.delete(`auth/login`)
    },
    me() {
        return authInstance.get(`auth/me`)
    },
    getCaptchaUrl() {
        return authInstance.get(`security/get-captcha-url`)
    }
}