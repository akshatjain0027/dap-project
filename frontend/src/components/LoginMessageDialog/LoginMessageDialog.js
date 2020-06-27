import React from 'react';
import { Dialog, Typography, withStyles } from '@material-ui/core';

const CustDialog = withStyles(theme => ({
    paper: {
        width: "350px",
        height: "100px"
    }
}))(Dialog);

export const LoginMessageDialog = ({ handleOpen, handleClose }) => {
    return(
        <CustDialog open={handleOpen} onClose={handleClose}>
            <Typography variant="h3" style={{padding: "10px 24px"}}>
                Message!
            </Typography>
            <Typography variant="h5" style={{padding: "0px 24px"}}>
                You have to login first to use this feature.
            </Typography>
        </CustDialog>
    )
}