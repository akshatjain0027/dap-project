import Reflux from 'reflux';
import { APIService } from '../../services/APIService';
import { showNotification } from '../../notifications/Notification';

export const ProfilePageActions = Reflux.createActions([
    "initStore",
    "indexChange",
    "unbookmark"
]);

class ProfilePageStore extends Reflux.Store {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            selectedIndex: 0,
            loading: true
        }
        this.listenables = ProfilePageActions;
        this.APIService = new APIService();
    }

    onInitStore() {
        this.setState({
            userId: window.location.pathname.split("/")[2]
        })
        console.log(this.state)
        this.fetchUserProfile();
    }

    fetchUserProfile() {
        this.APIService.getUserProfile(this.state.userId)
            .then(response => {
                if (response.status === 200) {
                    const { bookmarked, answerGiven, questionAsked } = response.data
                    this.setState({
                        userData: response.data,
                        userQuestions: questionAsked,
                        userAnswers: answerGiven,
                        bookmarkedAnswers: bookmarked.answer,
                        bookmarkedQuestions: bookmarked.question
                    })
                    this.setState({
                        loading: false
                    })
                    if (localStorage.getItem('userId') === this.state.userData._id) {
                        this.setState({
                            loggedInUser: true
                        })
                    }
                }
                else {
                    throw new Error();
                }
            })
            .catch(error => {
                console.log(error)
                showNotification('Failed to fetch user profile!', "error")
            })
    }

    onIndexChange(index) {
        this.setState({
            selectedIndex: index
        })
    }

    onUnbookmark(type, id) {
        if (type === "question") {
            showNotification('Removing bookmark from this question. Please wait..', 'info')
            this.APIService.unBookmark(type, id)
                .then(response => {
                    if (response.status === 201) {
                        const { bookmarked } = response.data
                        this.setState({
                            bookmarkedQuestions: bookmarked.question
                        })
                        showNotification('Removed Bookmark', 'warning')
                    }
                    else {
                        throw new Error();
                    }
                })
                .catch(error => {
                    console.log(error);
                    showNotification('Failed to remove bookmark! Try again later.', 'error')
                })
        }
        else if (type === "answer") {
            showNotification('Removing bookmark from this answer. Please wait..', 'info')
            this.APIService.unBookmark(type, id)
                .then(response => {
                    if (response.status === 201) {
                        const { bookmarked } = response.data
                        this.setState({
                            bookmarkedAnswers: bookmarked.answer
                        })
                        showNotification('Removed Bookmark', 'warning')
                    }
                    else {
                        throw new Error();
                    }
                })
                .catch(error => {
                    console.log(error);
                    showNotification('Failed to remove bookmark! Try again later.', 'error')
                })
        }
    }
}

export default ProfilePageStore;