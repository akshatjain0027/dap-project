import Reflux from 'reflux';
import { APIService } from '../../services/APIService';
import { showNotification } from '../../notifications/Notification';

export const Actions = Reflux.createActions([
    "initStore",
    "authorListItemClick",
    "showComments",
    "postComment",
    "inputChange",
    "upvote",
    "bookmark"
])

class AnswerStore extends Reflux.Store {
    constructor(props) {
        super(props);
        this.state = {
            userData: {},
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
            upvoteLoading: false,
            questionBookmarked: false,
            answerBookmarked: false,
            disableQuestionBookmark: false,
            disableAnswerBookmark: false
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
                if(localStorage.getItem('isAuthenticated')){
                    this.fetchUserDetails();
                }
                this.setState({
                    loading: false
                })
            })
            .catch(error => {
                showNotification("Failed to fetch answers", "error")
            })
    }

    fetchUserDetails() {
        const id = localStorage.getItem('userId');
        this.APIService.getUserProfile(id).then(response => {
            this.setState({
                userData: response.data
            })
            this.questionBookmarkCheck();
            this.answerBookmarkCheck();
        })
    }

    onAuthorListItemClick(index) {
        this.setState({
            selectedListIndex: index,
            answer: this.state.answers[index]
        })
        this.upvoteCheck(this.state.answer.upVote);
        this.answerBookmarkCheck();
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

    questionBookmarkCheck() {
        const{ userData, questionId } = this.state;
        const{ bookmarked } = userData;
        if(bookmarked.question.length !== 0){
            for(var i = 0; i < bookmarked.question.length; i++){
                if(questionId === bookmarked.question[i]._id){
                    this.setState({
                        questionBookmarked: true
                    })
                    return true
                }
            }
            this.setState({
                questionBookmarked: false
            })
            return
        } 
        else{
            this.setState({
                questionBookmarked: false
            })
            return 
        }
    }

    answerBookmarkCheck() {
        const { answers, answer, userData } = this.state;
        const { bookmarked } = userData;
        if(bookmarked.answer.length !== 0 && answers.length !== 0 ){
            for(var i = 0; i < bookmarked.answer.length; i++){
                if(answer._id === bookmarked.answer[i]._id){
                    this.setState({
                        answerBookmarked: true
                    })
                    return true
                }
            }
            this.setState({
                answerBookmarked: false
            })
            return false
        }
        else{
            this.setState({
                answerBookmarked: false
            })
            return false;
        }
    }

    onBookmark(type) {
        const { questionBookmarked, questionId, answerBookmarked, answer } = this.state;
        if(type === 'question'){
            this.setState({
                disableQuestionBookmark: true
            })
            if(!questionBookmarked){
                showNotification('Applying Bookmark on this question. Please Wait..', 'info')
                this.APIService.bookmark(type, questionId)
                    .then(response => {
                        if (response.status === 201) {
                            this.setState({
                                questionBookmarked: true,
                            })
                            this.setState({
                                userData: response.data,
                                disableQuestionBookmark: false
                            })
                            showNotification('Successfully Bookmarked the question.', 'success')
                        }
                        else {
                            throw new Error();
                        }
                    })
                    .catch(error => {
                        showNotification('Failed to bookmark the question! Try again Later.', 'error')
                        console.log(error)   
                        this.setState({
                            disableQuestionBookmark: false
                        })                    
                    })
            }
            else{
                showNotification('Removing bookmark from this question. Please wait..', 'info')
                this.APIService.unBookmark(type, questionId)
                    .then(response => {
                        if(response.status === 201){
                            this.setState({
                                questionBookmarked: false
                            })
                            this.setState({ 
                                userData: response.data,
                                disableQuestionBookmark: false
                            })
                            showNotification('Removed Bookmark', 'warning')
                        }
                        else{
                            throw new Error();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        showNotification('Failed to remove bookmark! Try again later.', 'error')
                        this.setState({
                            disableQuestionBookmark: false
                        })
                    })
            }
        }
        else if(type === 'answer'){
            this.setState({
                disableAnswerBookmark: true
            })
            if(!answerBookmarked){
                showNotification('Applying Bookmark on this answer. Please Wait..', 'info')
                this.APIService.bookmark(type, answer._id)
                    .then(response => {
                        if (response.status === 201) {
                            this.setState({
                                answerBookmarked: true
                            })
                            this.setState({
                                userData: response.data,
                                disableAnswerBookmark: false
                            })
                            showNotification('Successfully Bookmarked the answer.', 'success')
                        }
                        else {
                            throw new Error();
                        }
                    })
                    .catch(error => {
                        showNotification('Failed to bookmark the answer! Try again Later.', 'error')
                        this.setState({
                            disableAnswerBookmark: false
                        })
                        console.log(error)                       
                    })
            }
            else{
                showNotification('Removing bookmark from this answer. Please wait..', 'info')
                this.APIService.unBookmark(type, answer._id)
                    .then(response => {
                        if(response.status === 201){
                            this.setState({
                                answerBookmarked: false
                            })
                            this.setState({
                                userData: response.data,
                                disableAnswerBookmark: false
                            })
                            showNotification('Removed Bookmark', 'warning')
                        }
                        else{
                            throw new Error();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.setState({
                            disableAnswerBookmark: false
                        })
                        showNotification('Failed to remove bookmark! Try again later.', 'error')
                    })
            }
        }
    }
}

export default AnswerStore;