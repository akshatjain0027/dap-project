import Reflux from 'reflux';
import { APIService } from '../../services/APIService';

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
                    window.location.reload();
                }
                else{
                    throw new Error;
                }
            })
    }
}

export default AnswerDialogStore;