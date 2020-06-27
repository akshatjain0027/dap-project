import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export class APIService {
    API_SERVER_BASE_URL = "https://backend-json-dap.herokuapp.com";

    login(email, password) {
        let user = {
            email: email,
            password: password
        }
        return axios.post(`${this.API_SERVER_BASE_URL}/api/user/login`, user).then(response => response.data)
    }

    register(user) {
        return axios.post(`${this.API_SERVER_BASE_URL}/api/user/register`, user).then(response => response.data)
    }

    getQuestionAnswers() {
        return axios.get(`${this.API_SERVER_BASE_URL}/api/q`).then(response => response.data)
    }

    getAnswers(id) {
        console.log(id)
        return axios.get(`${this.API_SERVER_BASE_URL}/api/q/${id}`).then(response => response.data)
    }

    askQuestion(data) {
        setAuthToken(localStorage.getItem("jwtToken"))
        return axios.post(`${this.API_SERVER_BASE_URL}/api/q`, data).then(response => response)
    }
}