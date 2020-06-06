import Reflux from "reflux";
import { APIService } from "../../services/APIService";

export const Actions = Reflux.createActions([
    "initStore"
])

class HomepageStore extends Reflux.Store {
    constructor(){
        super();
        this.state = {
            questionAnswers : [],
            loading: true
        }
        this.ApiService = new APIService();
        this.listenables = Actions;
    }

    onInitStore() {
        this.fetchQuestionAnswers();
    }

    fetchQuestionAnswers = () => {
        this.ApiService.getQuestionAnswers().then(data => {
            this.setState({
                questionAnswers: data.data,
                loading: false
            })
        })
    }
}

export default HomepageStore;