import React from 'react';
import Reflux from 'reflux';
import SwipeableViews from "react-swipeable-views";
import { Tabs, Tab, Dialog, withStyles, TextField, Button } from '@material-ui/core';
import LoginStore, { Actions } from './LoginDialogStore';

const CustDialog = withStyles(theme => ({
    paper: {
        width: "450px",
        height: "475px"
    }
}))(Dialog);

const styles = theme => ({
    logInContainer: {
        display: "flex",
        flexDirection: "column"
    },
    logInInputs: {
        display: "flex",
        flexDirection: "column",
        margin: "10px 10px"
    },
    logInButtons: {
        width: "100%",
        fontSize: "medium"
    }
})

class LoginDialog extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = LoginStore;
        this.state = {
            selectedIndex: 0
        }
    }

    handleChange = (event, newValue) => {
        this.setState({
            selectedIndex: newValue
        })
        console.log(this.state)
    }

    handleChangeIndex = (index) => {
        this.setState({
            selectedIndex: index
        })
    }

    handleInputChange = event => {
        const { value, name } = event.target;
        Actions.inputChange(name, value);
    }

    handleSignInClick = () => {
        Actions.signInClick();
        this.props.handleClose();
    }

    handleSignUpClick = () => {
        Actions.signUpClick();
        this.props.handleClose();
    }

    getSignInComponent = () => {
        const { classes } = this.props;
        return (
            <div className={classes.logInContainer}>
                <div className={classes.logInInputs}>
                    <TextField
                        label="Email"
                        placeholder="Enter Your Registered EmailId.."
                        variant="outlined"
                        value={this.state.signInEmail}
                        name="signInEmail"
                        onChange={this.handleInputChange}
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                <div className={classes.logInInputs} >
                    <TextField
                        label="Password"
                        placeholder="Enter Your password"
                        type="password"
                        variant="outlined"
                        value={this.state.signInPassword}
                        name="signInPassword"
                        onChange={this.handleInputChange}
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                <div className={classes.logInInputs}>
                    <Button variant="contained" color="primary" className={classes.logInButtons} onClick={this.handleSignInClick}>
                        Sign In
                    </Button>
                </div>

            </div>
        )
    }

    getSignUpComponent = () => {
        const { signUpName, signUpEmail, signUpPassword, confirmPassword } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.logInContainer} >
                <div className={classes.logInInputs}>
                    <TextField
                        label="Name"
                        placeholder="Enter Your Full Name..."
                        variant="outlined"
                        value={signUpName}
                        name="signUpName"
                        onChange={this.handleInputChange}
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                <div className={classes.logInInputs}>
                    <TextField
                        label="Email"
                        placeholder="Enter Your EmailId.."
                        variant="outlined"
                        value={signUpEmail}
                        name="signUpEmail"
                        onChange={this.handleInputChange}
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                <div className={classes.logInInputs} >
                    <TextField
                        label="Password"
                        placeholder="Create a password"
                        type="password"
                        variant="outlined"
                        value={signUpPassword}
                        name="signUpPassword"
                        onChange={this.handleInputChange}
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                <div className={classes.logInInputs} >
                    <TextField
                        label="Confirm Password"
                        placeholder="ReEnter Your password"
                        type="password"
                        variant="outlined"
                        value={confirmPassword}
                        name="confirmPassword"
                        onChange={this.handleInputChange}
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                <div className={classes.logInInputs}>
                    <Button variant="contained" color="primary" className={classes.logInButtons} onClick={this.handleSignUpClick}>
                        Sign Up
                    </Button>
                </div>

            </div>
        )
    }

    render() {
        const { handleOpen, handleClose } = this.props
        return (
            <div>
                <CustDialog open={handleOpen} onClose={handleClose}>
                    <div style={{ padding: "16px 24px" }}>
                        <Tabs value={this.state.selectedIndex} centered onChange={this.handleChange}>
                            <Tab label="Sign In" style={{ fontSize: "15px" }} />
                            <Tab label="Sign Up" style={{ fontSize: "15px" }} />
                        </Tabs>
                    </div>
                    <SwipeableViews
                        axis='x'
                        index={this.state.selectedIndex}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <div hidden={this.state.selectedIndex !== 0} style={{ padding: "20px" }}>
                            {this.getSignInComponent()}
                        </div>
                        <div hidden={this.state.selectedIndex !== 1} style={{ padding: "20px" }}>
                            {this.getSignUpComponent()}
                        </div>
                    </SwipeableViews>
                </CustDialog>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(LoginDialog);