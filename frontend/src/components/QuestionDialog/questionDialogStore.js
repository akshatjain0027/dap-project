import Reflux from "reflux";
import { APIService } from "../../services/APIService";

export const Actions = Reflux.createActions([
    "questionInputChange",
    "askQuestion"
]);

class QuestionStore extends Reflux.Store{
    constructor(props){
        super(props);
        this.state = {
            question: ""
        }
        this.listenables = Actions;
        this.APIService = new APIService();
    }

    onQuestionInputChange(question) {
        this.setState({
            question: question
        })
    }
    onAskQuestion() {
        const data = {
            question: this.state.question
        }
        this.APIService.askQuestion(data)
            .then(response => {
                if (response.status === 201) {
                    console.log("question posted successfully")
                    this.setState({
                        question: ""
                    })
                    window.location.reload();
                }
                else {
                    throw new Error();
                }
            })
    }
}
export default QuestionStore;