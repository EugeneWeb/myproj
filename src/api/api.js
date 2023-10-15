import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/user',
    headers:{Authorization: localStorage.getItem('token')}
})


export const usersAPI = {
    getUsers(perPage, currentPage) {
        // возвращаем промис, который вернёт resp.data в UI
        return instance
            .get(
                `/all/?perPage=${perPage}&page=${currentPage}`,
                {headers:{Authorization: localStorage.getItem('token')}}
            )
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
    },
    unfollow(userId) {
        return instance
            .delete(`/unfollow/${userId}`,
            {headers:{Authorization: localStorage.getItem('token')}})
            .then(resp=>resp.data)
    },
    follow(userId) {
        return instance
            .post(`/follow/${userId}`, {},
            {headers:{Authorization: localStorage.getItem('token')}})
            .then(resp=>resp.data)
    }
}

export const authAPI = {
    me() {
        return instance
            .post("/auth", {})
            .then(resp => resp.data)
    }
}

export const profileAPI = {
    setProfile(userId) {
        return instance
            .get('/' + userId)
            .then(resp => resp.data)
    },
    updateStatus(status) {
        return instance
                .put('/status', {status}, {headers:{Authorization: localStorage.getItem('token')}})
                .then(resp => resp.data)
    }
}