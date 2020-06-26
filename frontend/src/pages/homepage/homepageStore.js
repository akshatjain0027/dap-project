import Reflux from "reflux";
import { APIService } from "../../services/APIService";

export const Actions = Reflux.createActions([
    "initStore"
])

class HomepageStore extends Reflux.Store {
    constructor(){
        super();
        this.state = {
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
                questionAnswers: data,
            })
            this.setState({
                loading: false
            })
        })
    }
}

export default HomepageStore;