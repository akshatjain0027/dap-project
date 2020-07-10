import Reflux from 'reflux';

export const ProfilePageActions = Reflux.createActions([
    "initStore",
    "indexChange"
]);

class ProfilePageStore extends Reflux.Store{
    constructor(props){
        super(props);
        this.state = {
            userId : "",
            selectedIndex: 0
        }
        this.listenables = ProfilePageActions;
    }

    onInitStore(){
        this.setState({
            userId: window.location.pathname.split("/")[2]
        })
        console.log(this.state)
    }

    onIndexChange(index) {
        this.setState({
            selectedIndex: index
        })
    }
}

export default ProfilePageStore;