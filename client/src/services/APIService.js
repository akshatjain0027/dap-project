import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export class APIService {
    API_SERVER_BASE_URL = "https://whispering-tundra-79405.herokuapp.com";

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
        return axios.get(`${this.API_SERVER_BASE_URL}/api/q/${id}`).then(response => response.data)
    }

    getComments(id) {
        setAuthToken(localStorage.getItem("jwtToken"));
        return axios.get(`${this.API_SERVER_BASE_URL}/api/c/${id}`).then(response => response)
    }

    askQuestion(data) {
        setAuthToken(localStorage.getItem("jwtToken"))
        return axios.post(`${this.API_SERVER_BASE_URL}/api/q`, data).then(response => response)
    }

    postAnswer(id, data) {
        setAuthToken(localStorage.getItem("jwtToken"));
        return axios.post(`${this.API_SERVER_BASE_URL}/api/a/${id}`, data).then(response => response)
    }

    updateAnswer(id, data) {
        setAuthToken(localStorage.getItem("jwtToken"));
        return axios.put(`${this.API_SERVER_BASE_URL}/api/a/${id}`, data).then(response => response)
    }

    postComment(id, data) {
        setAuthToken(localStorage.getItem("jwtToken"));
        return axios.post(`${this.API_SERVER_BASE_URL}/api/c/${id}`, data).then(response => response)
    }

    upvoteAnswer(id) {
        setAuthToken(localStorage.getItem("jwtToken"));
        return axios.post(`${this.API_SERVER_BASE_URL}/api/a/upvote/${id}`).then(response => response)
    }

    unUpvoteAnswer(id) {
        setAuthToken(localStorage.getItem("jwtToken"));
        return axios.post(`${this.API_SERVER_BASE_URL}/api/a/unupvote/${id}`).then(response => response)
    }

    getUserProfile(id) {
        setAuthToken(localStorage.getItem("jwtToken"));
        return axios.get(`${this.API_SERVER_BASE_URL}/api/user/${id}`).then(response => response)
    }

    bookmark(type, id) {
        const data = {
            type: type
        }
        return axios.post(`${this.API_SERVER_BASE_URL}/api/user/bookmark/${id}`, data).then(response => response)
    }

    unBookmark(type, id) {
        const data = {
            type: type
        }
        return axios.post(`${this.API_SERVER_BASE_URL}/api/user/unbookmark/${id}`, data).then(response => response)
    }
}