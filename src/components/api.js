import axios from 'axios';
import { paths } from '../constants';

const setToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjI1ODYwMDE3fQ.Ho1aM4IvKY5W7Dd6zu2llZcK_aEKRo1KOjmp4bkHqRM'

const instance = axios.create({
    baseURL: 'https://workplace-api-1.herokuapp.com',
    headers: {
        Authorization: `Bearer ${setToken}`
    }
});

export const authApi = {
    login(email, password, route) {
        if (route.includes(paths.loginAdmin())) {
            return instance.post('/admin/login', { email, password })
        } else {
            return instance.post('/login', { email, password })
        }
    },
    addUser(email, password , firstname, lastname) {
        return instance.post('/add_user', { email, password, firstname, lastname })
    },
}