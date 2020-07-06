import Reflux from "reflux";
import { APIService } from "../../services/APIService";
import { showNotification } from "../../notifications/Notification";

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
                    setTimeout(()=>{
                        window.location.reload();
                    }, 1000);
                    showNotification("Successfully posted your question.", "success")
                }
                else {
                    throw new Error();
                }
            })
            .catch(error => {
                showNotification("Unable to post your question!", "error")
            })
    }
}
export default QuestionStore;