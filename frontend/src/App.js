import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/header.component'
import Homepage from './pages/homepage/homepage.component';
import LoginPage from './pages/loginpage/loginpage.component';


import './App.css';

class App extends React.Component{
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }
  render(){
    return (
      <div className = 'App'>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route exact path='/login' component={LoginPage}/>

        </Switch>
      </div>
    )
    
  }
  
}

export default App;
