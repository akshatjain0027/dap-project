import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ReactModal from 'react-modal';

import Header from './components/header/header.component'
import Homepage from './pages/homepage/homepage.component';
import LoginPage from './pages/loginpage/loginpage.component';
import ContactPage from './pages/contactpage/contactpage.component';
import AboutPage from './pages/aboutpage/aboutpage.component';
import TeamPage from './pages/teampage/teampage.component';
import ProfilePage from './pages/profilePage/profilepage.component';




import './App.css';
import Gmail from './pages/gmail.component';

ReactModal.setAppElement('#root');

class App extends React.Component{
  constructor(){
    super();

    this.state = {
      currentUser: null,
    }
  } 
  
  render(){
    return (
      <div className = 'App'>
        <Header showModal={this.state.showModal} handleOpenModal={this.handleOpenModal} handleCloseModal={this.handleCloseModal}/>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route exact path='/login' component={LoginPage}/>

          <Route exact path='/contact' component={ContactPage}/>
          <Route exact path='/about' component={AboutPage}/>
          <Route exact path='/about/team' component={TeamPage}/>

          <Route exact path='/profile' component={ProfilePage}/>
          <Route exact path='/mailLogin' component={Gmail}/>


        </Switch>
      </div>
    )
    
  }
  
}

export default App;
