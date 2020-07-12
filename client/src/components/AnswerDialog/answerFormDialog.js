import React from "react";
import Reflux from "reflux";
import { Dialog,  TextField, Button, Typography, Box, withStyles } from "@material-ui/core";
import AnswerDialogStore, { Actions } from "./answerDialogStore";

const CustDialog = withStyles(theme => ({
    paper: {
        width: "600px",
        height: "420px"
    }
}))(Dialog);

class AnswerFormDialog extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = AnswerDialogStore;
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        Actions.inputChange(name, value);
    }

    handleSubmitAnswer = () => {
        const { questionId } = this.props;
        Actions.submitAnswer(questionId);
        this.props.handleClose();
    }

    render() {
        const { handleOpen, handleClose } = this.props;
        const { title, answer } = this.state;
        return (
            <div>
                <CustDialog open={handleOpen} onClose={handleClose} maxWidth="md" fullWidth="true">
                    <Box style={{ padding: "12px 24px" }}>
                        <Typography variant="h4">
                            Write your Answer
                        </Typography>
                        <Box display="flex" flexDirection="column">
                            <Box display="flex" flexDirection="column" padding="10px 0">
                                <Typography variant="subtitle1">
                                    Title
                                </Typography>
                                <TextField
                                    size="medium"
                                    placeholder="Give a relevant title to your answer.."
                                    variant="outlined"
                                    value={title}
                                    name="title"
                                    onChange={this.handleInputChange}
                                    style={{ width: "40%" }}
                                    inputProps={ { style: {
                                        fontSize: "1.2rem"
                                    }}}
                                />
                            </Box>
                            <Box display="flex" flexDirection="column" padding="10px 0">
                                <Typography variant="subtitle1">
                                    Your Answer
                                </Typography>
                                <TextField
                                    size="medium"
                                    placeholder="Write Your Answer Here..."
                                    variant="outlined"
                                    value={answer}
                                    name="answer"
                                    onChange={this.handleInputChange}
                                    multiline
                                    rows={15}
                                    style={{ width: "100%" }}
                                    inputProps={ { style: {
                                        fontSize: "1.5rem"
                                    }}}
                                />
                            </Box>
                        </Box>
                        <Box style={{ display: "flex", flexDirection: "row" }}>
                            <Button onClick={this.handleSubmitAnswer} variant="contained" color="primary" style={{ margin: "0 2px" }} disabled={answer === ""}>
                                Submit
                            </Button>
                            <Button onClick={handleClose} variant="contained" color="secondary" style={{ margin: "0 2px" }}>
                                Cancel
                            </Button>
                        </Box>
                    </Box>


                </CustDialog>
            </div>
        )
    }
}

export default AnswerFormDialog;