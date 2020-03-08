import React from 'react';
import Header from './components/header/header.component'
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

      </div>
    )
    
  }
  
}

export default App;
