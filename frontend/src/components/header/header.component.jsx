import React from "react";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";

import "./header.styles.css";
import FormInput from "../form-input/form-input.component";
import { AppBar, Toolbar, Typography, Tabs, Tab, withStyles, Box, Button, makeStyles } from "@material-ui/core";

const CustTabs = withStyles(() => ({
  root: {
    width: "100%",
    display: "flex"
  },
  scroller: {
    display: "flex"
  },
  indicator: {
    height: "100%",
    backgroundColor: "rgb(255, 255, 255, .1)",
    borderBottom: "4px solid white",
  }
}))(Tabs)


const CustTab = withStyles(theme => ({
  root: {
    textTransform: "initial",
    margin: `0`,
    minWidth: 0,
    padding: '5px 20px',
    [theme.breakpoints.up("md")]: {
      minWidth: 0
    },
    "&:hover": {
      backgroundColor: "rgb(255, 255, 255, .3)",
    },
    zIndex: "10000"
  },
  wrapper: {
    fontWeight: "500",
    fontSize: "1.5em"
  }
}))(Tab)

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      question: "",
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { question } = this.state;
  };


  render() {
    const questionModal =
      <ReactModal
        isOpen={this.state.showModal}
        contentLabel="ask question modal"
        className="Modal"
      >
        <h1>Ask Your Question Here!</h1>
        <form action="" onSubmit={this.handleSubmit}>
          <FormInput
            label="Question?"
            type="text"
            name="question"
            value={this.state.question}
            handleChange={this.handleChange}
          />
          <FormInput
            label="Tags(Optional)"
            type="text"
            name="question"
            value={this.state.question}
            handleChange={this.handleChange}
          />
          <button
            className="ask btn btn-primary"
            type="submit"
            onClick={this.handleCloseModal}
          >
            Ask
          </button>
          <button
            className="cancel btn btn-warning"
            onClick={this.handleCloseModal}
          >
            Cancel
          </button>
        </form>
      </ReactModal>

    return (
      <AppBar>
        <Toolbar>
          <Box display="flex" flexDirection="row" alignItems="center" width="100%">
            <Box width="10%">
              <Typography variant="h4" component={Link} to="/" style={{ color: "white" }}>
                AskUSICT
              </Typography>
            </Box>
            <Box width="30%">
              <CustTabs indicatorColor="primary">
                <CustTab label="Home" component={Link} to="/" tabIndex={0} />
                <CustTab label="Contact" component={Link} to="/contact" tabIndex={1} />
                <CustTab label="About Us" component={Link} to="/about" tabIndex={2} />
              </CustTabs>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="flex-end" width="60%" alignItems="center">
              <Typography variant="h5" style={{ padding: "20px", fontSize: "1.2rem" }} onClick={this.handleOpenModal}>
                Ask Question
              </Typography>
              <Typography variant="h5" style={{ padding: "20px", fontSize: "1.2rem", color: "white" }} component={Link} to="/login">
                SignIn
              </Typography>
            </Box>
          </Box>
        </Toolbar>
        {questionModal}
      </AppBar>
    );
  }
}

export default Header;
