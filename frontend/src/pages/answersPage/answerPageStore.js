import Reflux from 'reflux';
import { APIService } from '../../services/APIService';

export const Actions = Reflux.createActions([
    "initStore",
    "authorListItemClick",
    "showComments",
    "postComment",
    "inputChange"
])

class AnswerStore extends Reflux.Store {
    constructor(props) {
        super(props);
        this.state = {
            answers: [],
            questionId: "",
            question: "",
            questionAuthor: {},
            selectedListIndex: 0,
            answer: {},
            comments: [],
            loading: true,
            loadingComments: true,
            newComment: ""
        }
        this.listenables = Actions;
        this.APIService = new APIService();
    }

    onInitStore() {
        this.setState({
            questionId: window.location.pathname.split("/")[2]
        })
        this.fetchAnswers(this.state.questionId);
    }

    fetchAnswers(id) {
        this.APIService.getAnswers(id)
            .then(data => {
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

    onAuthorListItemClick(index) {
        this.setState({
            selectedListIndex: index,
            answer: this.state.answers[index]
        })
    }

    onShowComments() {
        this.setState({
            loadingComments: true
        })
        this.APIService.getComments(this.state.answer._id)
            .then(response => {
                if (response.status === 201) {
                    this.setState({
                        comments: response.data
                    })
                    this.setState({
                        loadingComments: false
                    })
                }
                else {
                    throw new Error();
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    onInputChange(name, value) {
        this.setState({
            [name]: value
        })
    }

    onPostComment() {
        const data = {
            content: this.state.newComment
        }
        this.APIService.postComment(this.state.answer._id, data)
            .then(response => {
                if (response.status === 201) {
                    this.onShowComments()
                    this.setState({
                        newComment: ""
                    })
                }
                else {
                    throw new Error();
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export default AnswerStore;