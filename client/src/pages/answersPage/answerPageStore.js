import Reflux from 'reflux';
import { APIService } from '../../services/APIService';

export const Actions = Reflux.createActions([
    "initStore",
    "authorListItemClick",
    "showComments",
    "postComment",
    "inputChange",
    "upvote"
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
            newComment: "",
            upvoted: false,
            upvoteLoading: false
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
                this.upvoteCheck(this.state.answer.upVote)
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
        this.upvoteCheck(this.state.answer.upVote)
    }

    upvoteCheck(upvotes) {
        const currentUserId = localStorage.getItem('userId');
        if(!upvotes || upvotes.length === 0 || currentUserId === null){
            this.setState({
                upvoted: false
            })
            return false
        }
        else{
            for(var i = 0; i < upvotes.length; i++){
                if(upvotes[i].user === currentUserId){
                    this.setState({
                        upvoted: true
                    })
                    return true;
                }
            }
            this.setState({
                upvoted: false
            })
            return false;
        }       
    }

    onUpvote() {
        const { upvoted, answer, answers, selectedListIndex } = this.state;
        this.setState({
            upvoteLoading: true
        })
        if(!upvoted){
            try{
                this.APIService.upvoteAnswer(answer._id).then(response => {
                    if (response.status === 201) {
                        this.setState({
                            upvoted: true,
                            upvoteLoading: false
                        })
                        answers[selectedListIndex] = response.data;
                        const updatedAnswers = answers;
                        this.setState({
                            answers: updatedAnswers
                        })
                    }
                    else{
                        this.setState({
                            upvoteLoading: false
                        })
                        throw new Error();
                    }              
                })
            }
            catch(error){
                console.log(error)
            }           
        }
        else{
            try{
                this.APIService.unUpvoteAnswer(answer._id).then(response => {
                    if (response.status === 201) {
                        this.setState({
                            upvoted: false,
                            upvoteLoading: false
                        })
                        answers[selectedListIndex] = response.data;
                        const updatedAnswers = answers;
                        this.setState({
                            answers: updatedAnswers
                        })
                    }
                    else{
                        this.setState({
                            upvoteLoading: false
                        })
                        throw new Error();
                    }              
                })
            }
            catch(error){
                console.log(error)
            } 
        }
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