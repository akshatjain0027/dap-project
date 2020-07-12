import React from "react";
import Reflux from "reflux";
import { Dialog, TextField, withStyles, Typography, Button } from "@material-ui/core";
import QuestionStore, { Actions } from "./questionDialogStore";

const styles = theme => ({
    dialogContainer: {
        display: "flex",
        flexDirection: "column",
        padding: "10px 24px"
    },
    dialogHeading: {
        padding: "20px 0px"
    },
    dialogButton: {
        padding: "10px 0",
        margin: "15px 0",
        width: "30%"
    }
})

const CustDialog = withStyles(theme => ({
    paper: {
        width: "450px",
        height: "220px"
    }
}))(Dialog);

class QuestionDialog extends Reflux.Component{
    constructor(props){
        super(props);
        this.store = QuestionStore;
    }
    
    handleChange = event => {
        Actions.questionInputChange(event.target.value)
    }

    handleAskButtonClick = () => {
        Actions.askQuestion();
        this.props.handleClose();
    }

    render(){
        const{ handleClose, handleOpen, classes } = this.props;
        return(
            <CustDialog open={handleOpen} onClose={handleClose}>
                <div className={classes.dialogContainer}>
                    <Typography variant="h4" className={classes.dialogHeading}>
                        Ask Your Question
                    </Typography>
                    <TextField
                        label="Question"
                        placeholder="Write your question here..."
                        variant="outlined"
                        value={this.state.question}
                        onChange={this.handleChange}
                        inputProps={ { style: {
                            fontSize: "1.2rem"
                        }}}
                        autoFocus
                        autoComplete="off"
                    />
                    <Button variant="contained" color="primary" disabled={this.state.question === ""} onClick={this.handleAskButtonClick} className={classes.dialogButton}>
                        Ask
                    </Button>
                </div>  
            </CustDialog>
        )
    }
}

export default withStyles(styles)(QuestionDialog);