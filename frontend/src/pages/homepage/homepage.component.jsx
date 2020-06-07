import React from "react";
import Reflux from "reflux";
import "./homepage.styles.css";
import Year from "../../components/year/year.component";
import Loader from 'react-loader-spinner';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@material-ui/core";
import user from "../user.png";
import candidates from "../candidates.png";
import HomepageStore, { Actions } from "./homepageStore";


class Homepage extends Reflux.Component {
  constructor() {
    super();
    this.store = HomepageStore;
  }

  componentDidMount() {
    Actions.initStore();
  }

  getPost = () => {
    const { questionAnswers } = this.state;
    return (
      questionAnswers.map(post => {
        return (
          <Card elevation={8} style={{ marginBottom: "15px" }} id={post.id} key={post.id}>
            <CardContent>
              <Typography variant="h6" style={{ padding: "5px 20px" }}>
                <img src={user} style={{ width: "20px", paddingRight: "2px" }} alt="" />
                Akshat Jain
              </Typography>
              <Typography variant="h3" style={{ padding: "10px 20px" }}>
                {post.question}
              </Typography>
              <Typography variant="body1" style={{ padding: "10px 20px" }}>
                {post.answer}
              </Typography>
              <img src={candidates} style={{ width: "100%", height: "250px" }} />
            </CardContent>
          </Card>
        )
      })
    )
  }

  getLoader = () => {
    return (
      <Loader
        type="Puff"
        color="#00BFFF"
        height={500}
        width={500}
        timeout={3000} //3 secs
      />
    )
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="container">
        <div className="row homepage">
          <div className="col-xs-3">
            <Year />
          </div>
          <div className="col-xs-6">
              {
                loading ? this.getLoader() : this.getPost()
              }
          </div>
          <div className="col-xs-3">Popular Topics</div>
        </div>
      </div>
    );
  }
}

export default Homepage;
