import React from 'react';
import './profilepage.styles.css';
import FormInput from '../../components/form-input/form-input.component';

class ProfilePage extends React.Component{
    constructor(){
        super();

        this.state = {
            updateProfileToggle: false,
            answersToggle: false,
            questionsToggle: false,
            followersToggle: false,
            followingToggle: false
        }
    };

    render(){
        return(
            <div className='profilePage'>
                <div className='col-xs-5 profile'>
                    <div className='userData'>
                        <span className='glyphicon glyphicon-user userImage'></span>
                        <h3>Deepanshu</h3>
                        <h4>Btech IT, USICT</h4>
                        <div className='Userbuttons'>

                            <div className='userButton'>
                                <button onClick={()=>{
                                    this.setState({
                                        updateProfileToggle:true, 
                                        answersToggle:false, 
                                        questionsToggle:false,
                                        followersToggle:false,
                                        followingToggle:false
                                    })
                                }}>Update Profile</button>
                            </div>

                            <div className='userButton'>
                                <button onClick={()=>{
                                    this.setState({
                                        answersToggle:true, 
                                        updateProfileToggle:false, 
                                        questionsToggle:false,
                                        followersToggle: false,
                                        followingToggle:false
                                    })
                                }}>Your Answers</button>
                            </div>

                            <div className='userButton'>
                                <button onClick={()=>{
                                    this.setState({
                                        answersToggle:false, 
                                        updateProfileToggle:false, 
                                        questionsToggle:true,
                                        followersToggle: false,
                                        followingToggle:false
                                    })
                                }}>Your Questions</button>
                            </div>

                            <div className='userButton'>
                                <button onClick={()=>{
                                    this.setState({
                                        answersToggle:false, 
                                        updateProfileToggle:false, 
                                        questionsToggle:false,
                                        followersToggle: true,
                                        followingToggle:false
                                    })
                                }}>Followers</button>
                            </div>
                            <div className='userButton'>
                                <button onClick={()=>{
                                    this.setState({
                                        answersToggle:false, 
                                        updateProfileToggle:false, 
                                        questionsToggle:false,
                                        followersToggle: false,
                                        followingToggle:true
                                    })
                                }}>Following</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-xs-7'>
                    <div className='profileData'>
                        
                        {
                            (this.state.updateProfileToggle)? 
                            <div className='profileForm'>
                                <h2>Update Profile</h2>
                                <form action="">
                                    <FormInput label='Entry 1' type='text'/>
                                </form>
                            </div>
                            : null
                        }

                        {
                            (this.state.answersToggle)?
                            <div className='profileAnswers'>
                                <h2>Your Answers</h2>
                                <h3>What are the total number of coronavirus cases across the world?</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, eaque dolorum. Fugit sed aspernatur, doloribus ratione labore tempore deleniti voluptate! Totam architecto vitae eum porro obcaecati assumenda atque quae consectetur.</p>

                            </div>
                            : null
                        }

                        {
                            (this.state.questionsToggle)?
                            <div className='profileQuestions'>
                                <h2>Your Questions</h2>
                                <h3>What is the meaning of hakuna matata?</h3>
                                <span>See Answers</span>
                                <h3>What are the measures to stop the spread of coronavirus?</h3>
                                <span>See Answers</span>
                            </div>
                            : null
                        }

                        {
                            (this.state.followersToggle)?
                            <div className='profileFollowers'>
                                <h2>Your Followers</h2>
                                <h4>Akshat Jain</h4>
                                <h4>Piyush Khurana</h4>
                            </div>
                            : null
                        }

                        {
                            (this.state.followingToggle)?
                            <div className='profileFollowing'>
                                <h2>People you are following</h2>
                                <h4>Piyush Khurana</h4>
                                <h4>Akshat Jain</h4>

                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfilePage;
