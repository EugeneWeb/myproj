import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/user',
    headers:{Authorization: localStorage.getItem('token')}
})


export const api = {
    getUsers(perPage, currentPage) {
        // возвращаем промис, который вернёт resp.data в UI
        return instance
            .get(
                `/all/?perPage=${perPage}&page=${currentPage}`
            )
            .then(resp => resp.data)
    },
    setProfile(userId) {
        return instance
            .get('/' + userId)
            .then(resp => resp.data)
    },
    login(login, password) {
        return instance
             .post('/login', {login, password})
             .then(resp => resp.data)
    },
    registration(username, email, password) {
        return instance
            .post('/registration', {username, email, password})
            .then(resp => resp.data)
    }
}