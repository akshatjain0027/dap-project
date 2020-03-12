import React from "react";
import "./homepage.styles.css";
import Year from "../../components/year/year.component";
import Posts from "../../components/posts/posts.component";
import Loader from 'react-loader-spinner';

class Homepage extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      isloaded: true
    };
  }
//   async componentDidMount(){
//     let res = await fetch('https://backend-json-dap.herokuapp.com/questions');
//     let jsonData=await res.json();
//     let arrayOfQuestion=jsonData.data;
//     this.setState({posts:arrayOfQuestion,isloaded:true})
    
// }

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
                {this.state.posts.map(({ id, ...otherPostProps }) => (
                  <Posts key={id} {...otherPostProps} />
                ))}
              </div>
            </div>

            <div className="col-xs-3">Popular Topics</div>
          </div>
        </div>
      );
  }
}

export default Homepage;
