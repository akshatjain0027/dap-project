import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Tabs, Tab, withStyles, Box, Button, Avatar, Menu, MenuItem } from "@material-ui/core";
import LoginDialog from "../LoginDialog/LoginDialog";
import QuestionDialog from "../QuestionDialog/questionDialog";
import { LoginMessageDialog } from "../LoginMessageDialog/LoginMessageDialog";

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
    alignItems: "center",
    width: "100%"
  },
  title: {
    color: "white",
    "&:hover": {
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
    cursor: "pointer"
  }
});

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      question: "",
      showModal: false,
      showLoginDialog: false,
      showLoginMessageDialog: false,
      anchorEl: null,
      showAvatarMenu: false
    };
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  handleLoginDialogOpen = () => {
    this.setState({
      showLoginDialog: true
    });
  }

  handleLoginDialogClose = () => {
    this.setState({
      showLoginDialog: false
    });
  }

  handleLoginMessageDialogOpen = () => {
    this.setState({
      showLoginMessageDialog: true
    });
  }

  handleLoginMessageDialogClose = () => {
    this.setState({
      showLoginMessageDialog: false
    });
  }

  handleAvatarMenuOpen = event => {
    console.log(event.currentTarget)
    this.setState({
      anchorEl: event.currentTarget,
      showAvatarMenu: true
    })
  }

  handleAvatarMenuClose = (event) => {
    this.setState({
      showAvatarMenu: false,
      anchorEl: null
    })
  }

  handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  }

  handleAskQuestionClick = () => {
    if(localStorage.getItem("isAuthenticated")){
      this.handleOpenModal();
    }
    else{
      this.handleLoginMessageDialogOpen();
    }
  }

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { classes } = this.props;
    const avatarMenu = () => (
      <div>
        <div onClick={this.handleAvatarMenuOpen}>
          <Avatar src={localStorage.getItem("userAvatar")} style={{ cursor: "pointer" }}/>
        </div>
        <Menu
          id="menu-appbar"
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={this.state.showAvatarMenu}
          onClose={this.handleAvatarMenuClose}
          style={{ top: "40px" }}
        >
          <MenuItem
            onClick={() => {
              window.location.href = window.location.href + `profile/${localStorage.getItem("userId")}`
              this.handleAvatarMenuClose();
            }}>
            My Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleLogOut();
              this.handleAvatarMenuClose();
            }}
          >
            LogOut
            </MenuItem>
        </Menu>
      </div>
    )
    const questionModal = <QuestionDialog handleOpen={this.state.showModal} handleClose={this.handleCloseModal}/>;
    const loginDialog = <LoginDialog handleOpen={this.state.showLoginDialog} handleClose={this.handleLoginDialogClose} />;
    const loginMessageDialog = <LoginMessageDialog handleOpen={this.state.showLoginMessageDialog} handleClose={this.handleLoginMessageDialogClose}/>;
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
              <Typography variant="h5" onClick={this.handleAskQuestionClick} className={classes.askQuestion}>
                Ask Question
              </Typography>
              {
                localStorage.getItem("isAuthenticated") ?
                  avatarMenu()
                  :
                  <Typography variant="button" onClick={this.handleLoginDialogOpen} className={classes.signIn}>
                    Log In
                </Typography>
              }
            </Box>
          </Box>
        </Toolbar>
        {this.state.showModal && questionModal}
        {this.state.showLoginDialog && loginDialog}
        {this.state.showLoginMessageDialog && loginMessageDialog}
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
