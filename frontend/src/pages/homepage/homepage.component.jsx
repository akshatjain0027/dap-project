import React from "react";
import "./homepage.styles.css";
import Year from "../../components/year/year.component";
import Posts from "../../components/posts/posts.component";
import Loader from 'react-loader-spinner';
import { questions } from "../questionsData";
import { Card, CardContent, Typography } from "@material-ui/core";
import user from "../user.png";
import candidates from "../candidates.png";
class Homepage extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: questions,
      isloaded: true
    };
  }
//   async componentDidMount(){
//     let res = await fetch('https://backend-json-dap.herokuapp.com/questions');
//     let jsonData=await res.json();
//     let arrayOfQuestion=jsonData.data;
//     this.setState({posts:arrayOfQuestion,isloaded:true})
    
// }
  getPost = () => {
    const{ posts } = this.state;
    return (
      posts.map(post => {
        return (
          <Card elevation={8} style={{ marginBottom: "15px" }}>
            <CardContent>
              <Typography variant="h6" style={{ padding: "5px 20px" }}>
                <img src={user} style={{ width: "20px", paddingRight: "2px"}} alt=""/>
                Akshat Jain
              </Typography>
              <Typography variant="h3" style={{ padding: "10px 20px" }}>
                {post.questions}
              </Typography>
              <Typography variant="body1" style={{ padding: "10px 20px" }}>
                {post.answer}
              </Typography>
              <img src={candidates} style={{ width: "100%", height: "250px"}}/>
            </CardContent>
          </Card>
        )
      })
    )
    
  }

  render() {
    if (!this.state.isloaded)
      return (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={500}
          width={1000}
          timeout={3000} //3 secs
        />
      );
    else
      return (
        <div className="container">
          <div className="row homepage">
            <div className="col-xs-3">
              <Year />
            </div>

            <div className="col-xs-6">
              <div className="posts">
                {/* {this.state.posts.map(({ id, ...otherPostProps }) => (
                  <Posts key={id} {...otherPostProps} />
                ))} */}
                {
                  this.getPost()
                }
              </div>
            </div>

            <div className="col-xs-3">Popular Topics</div>
          </div>
        </div>
      );
  }
}

export default Homepage;
