import axios from 'axios';

export class APIService {
    API_SERVER_BASE_URL = "https://backend-json-dap.herokuapp.com";

    getQuestionAnswers () {
        return axios.get(`${this.API_SERVER_BASE_URL}/questions`).then(response => response.data)            
    }

    getAnswers (id) {
        console.log(id)
        return axios.get(`${this.API_SERVER_BASE_URL}/api/q/${id}`).then(response => response.data)
    }
}