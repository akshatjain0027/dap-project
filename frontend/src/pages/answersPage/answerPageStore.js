import Reflux from 'reflux';
import { APIService } from '../../services/APIService';

export const Actions = Reflux.createActions([
    "initStore",
    "authorListItemClick",
    "showComments"
])

class AnswerStore extends Reflux.Store{
    constructor(props){
        super(props);
        this.state = {
            answers: [],
            questionId: "",
            question: "",
            questionAuthor: {},
            selectedListIndex: 0,
            answer: {},
            comments: [],
            loading: true
        }
        this.listenables = Actions;
        this.APIService = new APIService();
    }

    onInitStore (){
        this.setState({
            questionId: window.location.pathname.split("/")[2]
        })
        this.fetchAnswers(this.state.questionId);
    }

    fetchAnswers(id) {
        this.APIService.getAnswers(id)
            .then(data =>{
                this.setState({
                    answers: data.answerId,
                    question: data.question,
                    questionAuthor: data.author,
                    answer: data.answerId[this.state.selectedListIndex]
                })
                this.setState({
                    loading: false
                })
            })
    }

    onAuthorListItemClick (index) {
        this.setState({
            selectedListIndex: index,
            answer: this.state.answers[index]
        })
    }

    onShowComments () {
        this.setState({
            comments: this.state.answer.comments
        })
    }
}

export default AnswerStore;