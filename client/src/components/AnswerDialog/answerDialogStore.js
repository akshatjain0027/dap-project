import Reflux from 'reflux';
import { APIService } from '../../services/APIService';
import { showNotification } from '../../notifications/Notification';

export const Actions = Reflux.createActions([
    "inputChange",
    "submitAnswer"
]);

class AnswerDialogStore extends Reflux.Store{
    constructor(props){
        super(props);
        this.state = {
            title: "",
            answer: ""
        }
        this.listenables = Actions;
        this.APIService = new APIService();
    }

    onInputChange(name, value){
        this.setState({
            [name]: value
        })
    }

    onSubmitAnswer(id){
        const data = {
            title: this.state.title,
            answer: this.state.answer
        }
        this.APIService.postAnswer(id, data)
            .then(response => {
                if(response.status === 201){
                    this.setState({
                        title: "",
                        answer: ""
                    })
                    showNotification('Successfully posted your answer', "success")
                    setTimeout(()=>{
                        window.location.reload();
                    }, 1000);                }
                else{
                    throw new Error();
                }
            })
            .catch(error => {
                showNotification('Unable to post your answer', "error")
            })
    }
}

export default AnswerDialogStore;