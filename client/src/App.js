import React from "react";
import { Switch, Route } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { withSnackbar } from "notistack";

import Header from "./components/header/header.component";
import Homepage from "./pages/homepage/homepage.component";
import ContactPage from "./pages/contactpage/contactpage.component";
import AboutPage from "./pages/aboutpage/aboutpage.component";
import TeamPage from "./pages/teampage/teampage.component";
import ProfilePage from "./pages/profilePage/profilepage.component";
import AnswerPage from "./pages/answersPage/answerPage";

import { initializeSnackbar } from "./notifications/Notification";
import { Router } from "react-router-dom";
import history from "./utils/history";

import "./App.css";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  App: {
    backgroundColor: theme.palette.background.default,
    height: "max-content"
  }
})

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
    initializeSnackbar(this.props);
  }

  componentDidMount() {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if(isAuthenticated){
      const token = localStorage.getItem('jwtToken');
      if(token !== null){
        const exp = jwt_decode(token).exp;
        const currentTime = Date.now()/1000;
        if(exp < currentTime){
          localStorage.clear()
        }
      }
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.App}>
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/contact" component={ContactPage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/about/team" component={TeamPage} />
              <Route exact path="/question/:id" component={AnswerPage} />
              <Route exact path="/profile/:id" component={ProfilePage} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(withSnackbar(App));
