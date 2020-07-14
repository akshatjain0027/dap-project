import Reflux from 'reflux';
import { APIService } from '../../services/APIService';
import { showNotification } from '../../notifications/Notification';

export const ProfilePageActions = Reflux.createActions([
    "initStore",
    "indexChange"
]);

class ProfilePageStore extends Reflux.Store{
    constructor(props){
        super(props);
        this.state = {
            userId : "",
            selectedIndex: 0,
            loading: true
        }
        this.listenables = ProfilePageActions;
        this.APIService = new APIService();
    }

    onInitStore(){
        this.setState({
            userId: window.location.pathname.split("/")[2]
        })
        console.log(this.state)
        this.fetchUserProfile();
    }

    fetchUserProfile() {
        this.APIService.getUserProfile(this.state.userId)
            .then(response => {
                if(response.status === 200){
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
                    if(localStorage.getItem('userId') === this.state.userData._id){
                        this.setState({
                            loggedInUser: true
                        })
                    }
                }
                else{
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
}

export default ProfilePageStore;