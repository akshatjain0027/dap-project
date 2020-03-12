import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ReactModal from 'react-modal';

import Header from './components/header/header.component'
import Homepage from './pages/homepage/homepage.component';
import LoginPage from './pages/loginpage/loginpage.component';


import './App.css';

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

        </Switch>
      </div>
    )
    
  }
  
}

export default App;
