import React from 'react';
import Reflux from 'reflux';
import { Grid, Avatar, Typography, withStyles, Box, Button, Tabs, Tab } from '@material-ui/core';
import ProfilePageStore, { ProfilePageActions } from './ProfilePageStore';

const styles = theme => ({
    name: {
        color: theme.palette.text.primary
    },
    tabName: {
        color: theme.palette.text.primary,
        fontSize: "1rem"
    }
})

class ProfilePage extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ProfilePageStore;
    }

    componentDidMount() {
        ProfilePageActions.initStore();
    }

    handleChange = (event, newValue) => {
        ProfilePageActions.indexChange(newValue)
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container>
                <Grid direction="row" container style={{ margin: "10% 5%" }}>
                    <Grid container direction="column" md={3} alignItems="center">
                        <Box alignItems="center" width="100%">
                            <Avatar src="https://koolinus.files.wordpress.com/2019/03/avataaars-e28093-koolinus-1-12mar2019.png" style={{ width: "200px", height: "200px", margin: "auto" }} />
                        </Box>
                        <Box width="100%" textAlign="center" pt={3} pb={3}>
                            <Typography variant="h4" className={classes.name}>
                                Akshat Jain
                            </Typography>
                        </Box>
                        <Box width="100%" textAlign="center">
                            <Button color="secondary" variant="contained" style={{ width: "70%", fontSize: "1.2rem" }}>
                                EDIT PROFILE
                            </Button>
                        </Box>
                    </Grid>
                    <Grid width="100%" md={9}>
                        <Tabs centered value={this.state.selectedIndex} onChange={this.handleChange}>
                            <Tab label="Your Questions" className={classes.tabName}/>
                            <Tab label="Your Answers" className={classes.tabName}/>
                            <Tab label="Bookmarked Questions" className={classes.tabName}/>
                            <Tab label="Bookmarked Answers" className={classes.tabName}/>
                        </Tabs>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles, { withTheme: true })(ProfilePage);