import React from "react";
import { Switch, Route } from "react-router-dom";
import ReactModal from "react-modal";

import Header from "./components/header/header.component";
import Homepage from "./pages/homepage/homepage.component";
import LoginPage from "./pages/loginpage/loginpage.component";
import ContactPage from "./pages/contactpage/contactpage.component";
import AboutPage from "./pages/aboutpage/aboutpage.component";
import TeamPage from "./pages/teampage/teampage.component";
import ProfilePage from "./pages/profilePage/profilepage.component";

import { Router } from "react-router-dom";
import history from "./utils/history";

import "./App.css";
import AnswerPage from "./pages/answersPage/answerPage";

ReactModal.setAppElement("#root");

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <div>
            <Header/>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/login" component={LoginPage} />

              <Route exact path="/contact" component={ContactPage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/about/team" component={TeamPage} />
              <Route exact path="/question/:id" component={AnswerPage}/>
              <Route exact path="/profile" component={ProfilePage} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
