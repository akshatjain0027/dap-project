import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import React from "react";
import { Typography } from "@material-ui/core";

let props = {};
export const initializeSnackbar = (appProp) => {
    Object.freeze(
        Object.assign(
            props, appProp)
    );

    return props;
};

export function showNotification(message, type) {
    if (typeof props !== "undefined" && message && message !== "") {
        props.enqueueSnackbar(
            <Typography variant="h6">
                {message}
            </Typography>,
            {
                variant: type,
                autoHideDuration: 5000,
                action: (key) => <IconButton key="close" aria-label="Close" color="inherit" onClick={() => {
                    props.closeSnackbar(key)
                }} > <CloseIcon /> </IconButton >
            });
    }
}