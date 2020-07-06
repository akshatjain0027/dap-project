import Reflux from 'reflux';
import { APIService } from '../../services/APIService';
import { showNotification } from '../../notifications/Notification';

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
                this.upvoteCheck(this.state.answer? this.state.answer.upVote: [])
                this.setState({
                    loading: false
                })
            })
            .catch(error => {
                showNotification("Failed to fetch answers", "error")
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
        if (!upvotes || upvotes.length === 0 || currentUserId === null) {
            this.setState({
                upvoted: false
            })
            return false
        }
        else {
            for (var i = 0; i < upvotes.length; i++) {
                if (upvotes[i].user === currentUserId) {
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
        if (!upvoted) {
            this.APIService.upvoteAnswer(answer._id).then(response => {
                if (response.status === 201) {
                    this.setState({
                        upvoted: true,
                        upvoteLoading: false
                    })
                    showNotification("Successfully Upvoted the answer", 'success')
                    answers[selectedListIndex] = response.data;
                    const updatedAnswers = answers;
                    this.setState({
                        answers: updatedAnswers
                    })
                }
                else {
                    this.setState({
                        upvoteLoading: false
                    })
                    throw new Error();
                }
            })
                .catch(error => {
                    showNotification("Upvote failed!", "error")
                    console.log(error)
                })
        }
        else {
            this.APIService.unUpvoteAnswer(answer._id).then(response => {
                if (response.status === 201) {
                    this.setState({
                        upvoted: false,
                        upvoteLoading: false
                    })
                    showNotification("Removed Upvote", "info")
                    answers[selectedListIndex] = response.data;
                    const updatedAnswers = answers;
                    this.setState({
                        answers: updatedAnswers
                    })
                }
                else {
                    this.setState({
                        upvoteLoading: false
                    })
                    throw new Error();
                }
            })
                .catch(error => {
                    showNotification("Failed to remove upvote!", "error")
                    console.log(error)
                })

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
                showNotification("Failed to fetch comments", "error")
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
                    showNotification("Comment Added Successfully", "success")
                }
                else {
                    throw new Error();
                }
            })
            .catch(error => {
                showNotification("Failed to add your comment!", "error")
                console.log(error)
            })
    }
}

export default AnswerStore;