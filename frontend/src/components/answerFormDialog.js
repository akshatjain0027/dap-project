import React from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Typography, Box } from "@material-ui/core";


const AnswerFormDialog = ({handleOpen, handleAnswerDialogClose}) => {
    return(
        <div>
            <Dialog open={handleOpen} onClose={handleAnswerDialogClose} maxWidth="md" fullWidth="true">
                <DialogTitle>
                    <Typography variant="h4">
                        Write your Answer
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column">
                        <Box display="flex" flexDirection="column" padding="10px 0">
                            <Typography variant="subtitle1">
                                Title
                            </Typography>
                            <TextField
                                size="medium"
                                placeholder="Give a relevant title to your answer.."
                                variant="outlined"
                                style={{ width: "40%" }}
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
                                multiline
                                rows={15}
                                style={{ width: "70%" }}
                            />
                        </Box>   
                    </Box>  
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAnswerDialogClose} variant="contained" color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAnswerDialogClose} variant="contained" color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AnswerFormDialog;