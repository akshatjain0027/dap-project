import React from "react";
import Reflux from "reflux";
import "./homepage.styles.css";
import Year from "../../components/year/year.component";
import Loader from 'react-loader-spinner';
import { Card, CardContent, Typography, Avatar, Link } from "@material-ui/core";
import HomepageStore, { Actions } from "./homepageStore";
import Pusher from "pusher-js"

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
      questionAnswers ? 
      questionAnswers.map(post => {
        return (
          <Card elevation={8} style={{ marginBottom: "15px" }} id={post._id} key={post._id}>
            <CardContent>
              <div style={{ display: "flex", flexDirection: "row", padding: "0 20px"}}>
                <Avatar src={post.author.avatar} style={{ padding: "10px 10px 10px 0px"}}/>
                <Typography variant="subtitle1" style={{ paddingTop: "12px", color: "white" }} component={Link} href={`/profile/${post.author._id}`}>
                  {post.author.name}
                </Typography>
              </div>
              <div style={{ padding: "0 20px", cursor: "pointer" }}>
                <Typography variant="h4" style={{ color: "#2196f3"}} component={Link} href={`/question/${post._id}`}>
                  {post.question}
                </Typography>
              </div>             
              {
                post.answerId.length === 0 ?
                <Typography variant="h4" style={{ textAlign: "center", color: "gray", margin: "10%"}}>
                  No answers found. Click the question link and be the first one to answer.
                </Typography>
                :
                <div>
                  <Typography variant="h6" style={{ padding: "10px 20px" }}>
                    {post.answerId[0].answer}
                  </Typography>
                  {/* {
                    post.answerId[0].images?
                    <img src={post.answerId[0].images[0]} style={{ width: "100%", height: "250px", padding: "10px 20px" }} /> 
                    : null
                  } */}
                </div>
              }              
            </CardContent>
          </Card>
        )
      }): null
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
    var pusher = new Pusher('f362433add071a0773b3', {
      cluster: 'ap2'
    });
    pusher.connection.bind('connected', function () {
      // attach the socket ID to all outgoing Axios requests
      //axios.defaults.headers.common['X-Socket-Id'] = pusher.connection.socket_id;
  });

  // request permission to display notifications, if we don't alreay have it
  Notification.requestPermission();
  pusher.subscribe('notifications')
          .bind('questions_updated', function (question) {
              // if we're on the home page, show an "Updated" badge
              // if (window.location.pathname === "/") {
              //     $('a[href="/posts/' + post._id + '"]').append('<span class="badge badge-primary badge-pill">Updated</span>');
              // }
              var notification = new Notification(question.question + " was just updated. Check it out.");
              notification.onclick = function (event) {
                window.location =  '/question/'+ question._id;
                  event.preventDefault();
                  notification.close();
              }
          });
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
