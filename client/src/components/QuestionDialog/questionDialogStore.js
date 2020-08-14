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
    onAskQuestion(type = 'ask',question, id) {
        const data = {
            question: question
        }
        if(type === 'edit'){
            this.APIService.updateQuestion(id,data)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        question: ""
                    })
                    setTimeout(()=>{
                        window.location.reload();
                    }, 1000);
                    showNotification("Successfully edited your question.", "success")
                }
                else {
                    throw new Error();
                }
            })
            .catch(error => {
                showNotification("Unable to edit your question!", "error")
            })
        }
        else{
            this.APIService.askQuestion(data)
            .then(response => {
                if (response.status === 201) {
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
}
export default QuestionStore;