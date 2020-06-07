import React from "react";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
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
      color: "white",
      textDecoration: "none"
    },
    "&:focus": {
      color: "white",
      textDecoration: "none",
      outline: "none",
      borderBottom: "4px solid white"
    },
    zIndex: "10000"
  },
  wrapper: {
    fontWeight: "500",
    fontSize: "1.5em"
  }
}))(Tab)

const styles = theme => ({
  mainBox: {
    display: "flex",
    flexDirection: "row",
    alignItems:"center",
    width: "100%"
  },
  title: {
    color: "white",
    "&:hover" : {
      textDecoration: "none",
      color: "white"
    },
    "&:focus": {
      outline: "none",
      color: "white",
      textDecoration: "none"
    }
  },
  sideBox: {
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "flex-end", 
    width: "60%", 
    alignItems: "center"
  },
  askQuestion: {
    padding: "20px", 
    fontSize: "1.3rem",
    cursor: "pointer"    
  },
  signIn: {
    padding: "20px", 
    fontSize: "1.3rem", 
    color: "white",
    "&:hover": {
      color: "white",
      textDecoration: "none",
    },
    "&:focus": {
      outline: "none",
      color: "white",
      textDecoration: "none"
    }
  },
  Modal: {
    position: "absolute",
    top: "100px",
    left: "30%",
    right: "30%",
    bottom: "150px",
    border: "2px solid rgb(137, 137, 233)",
    backgroundColor: "#fff",
    overflow: "auto",
    outline: "none",
    padding: "50px",
    borderRadius: "4px"
  },
  modalButton: {
    margin: "1%",
    fontSize: "1.2rem"
  }
});

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
    const { classes } = this.props;
    const questionModal =
      <ReactModal
        isOpen={this.state.showModal}
        contentLabel="ask question modal"
        className={classes.Modal}
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
          <Button
            className={classes.modalButton}
            variant="contained"
            color="primary"
            type="submit"
            onClick={this.handleCloseModal}
          >
            Ask
          </Button>
          <Button
            className={classes.modalButton}
            variant="contained"
            color="secondary"
            onClick={this.handleCloseModal}
          >
            Cancel
          </Button>
        </form>
      </ReactModal>

    return (
      <AppBar>
        <Toolbar>
          <Box className={classes.mainBox}>
            <Box width="10%">
              <Typography variant="h4" component={Link} to="/" className={classes.title}>
                AskUSICT
              </Typography>
            </Box>
            <Box width="30%">
              <CustTabs>
                <CustTab label="Home" component={Link} to="/" tabIndex={0} />
                <CustTab label="Contact" component={Link} to="/contact" tabIndex={1} />
                <CustTab label="About Us" component={Link} to="/about" tabIndex={2} />
              </CustTabs>
            </Box>
            <Box className={classes.sideBox}>
              <Typography variant="h5" onClick={this.handleOpenModal} className={classes.askQuestion}>
                Ask Question
              </Typography>
              <Typography variant="h5" component={Link} to="/login" className={classes.signIn}>
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

export default withStyles(styles)(Header);
