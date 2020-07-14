import React from 'react';
import Reflux from 'reflux';
import { Grid, Avatar, Typography, withStyles, Box, Button, Tabs, Tab, CircularProgress, Card, Link, Fab, Chip, Tooltip } from '@material-ui/core';
import ProfilePageStore, { ProfilePageActions } from './ProfilePageStore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { showNotification } from '../../notifications/Notification';

const styles = theme => ({
    name: {
        color: theme.palette.text.primary
    },
    tabName: {
        color: theme.palette.text.primary,
        fontSize: "1rem"
    },
    chip: {
        fontSize: "1rem"
    }
})

const TabPanels = props => {
    const { children, value, index, ...other } = props;
    return (
        <div
            id={`tabPanel-${index}`}
            hidden={value !== index}
        >
            {
                value === index &&
                <Grid item style={{ margin: "5%" }} xs={12}>
                    {children}
                </Grid>
            }
        </div>
    )
}

class ProfilePage extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ProfilePageStore;
    }

    componentDidMount() {
        if(localStorage.getItem('isAuthenticated')){
            ProfilePageActions.initStore();
        }
        else{
            showNotification('You need to login first!', 'error');
            setInterval(() => {
                window.location.pathname = "/";
            }, 1500)
        }
    }

    handleChange = (event, newValue) => {
        ProfilePageActions.indexChange(newValue)
    }

    getUserQuestions = () => {
        const { userQuestions } = this.state;
        return (
            <Grid direction="row" container justify="center" spacing={5}>
                {   
                    userQuestions.length === 0 ?
                    <Typography variant="h2">You have not asked any questions yet</Typography>
                    :
                    userQuestions.map((question, index) => {
                        return (
                            <Card key={index} elevation={8} style={{ width: "25%", margin: "2%", padding: "8px" }}>
                                <Box pl={1}>
                                    <Typography varinat="caption">
                                        {`${question.answerId.length} Answers by various authors`} 
                                    </Typography>
                                </Box>
                                <Box textAlign="center" p={1}>
                                    <Typography variant="h4" component={Link} href={`/question/${question._id}`} style={{ color: "white"}}>
                                        {question.question}
                                    </Typography>
                                </Box>
                            </Card>
                        )
                    })
                }
            </Grid>

        )
    }

    getUserAnswers = () => {
        const { userAnswers, loggedInUser } = this.state;
        const { classes } = this.props;
        return (
            <Grid direction="column" container style={{ paddingLeft: "25%"}}>
                {   
                    userAnswers.length === 0 ? <Typography variant="h2">You have not answered any questions yet</Typography> 
                    :userAnswers.map((answer, index)=>{
                        return(
                            <Card key={index} elevation={8}  style={{ width: "70%", marginBottom: "5%", padding: "8px"}}>
                                <Box p={2} display="flex" flexDirection="row" justifyContent="space-between">
                                    <Box width="80%">
                                        <Typography variant="h4" style={{ paddingTop: "8px"}}>
                                            {answer.title}
                                        </Typography>
                                    </Box>
                                    {
                                        loggedInUser &&
                                        <Box width="20%" display="flex" flexDirection="row" justifyContent="space-around">
                                            <Fab
                                                color="secondary"
                                                size="medium"
                                            >
                                                <EditIcon fontSize="large" />
                                            </Fab>
                                            <Fab
                                                size="medium"
                                                color="primary"
                                            >
                                                <DeleteIcon fontSize="large" />
                                            </Fab>
                                        </Box> 
                                    }
                                      
                                </Box>
                                <Box p={2}>
                                    <Typography variant="h6">
                                        {answer.answer}
                                    </Typography>
                                </Box>
                                <Box p={2} display="flex" flexDirection="row" >
                                    <Chip 
                                        avatar={<Avatar style={{ fontSize: "1rem" }}>{answer.upVote.length}</Avatar>} 
                                        label="UPVOTES"
                                        variant="outlined"
                                        className={classes.chip}
                                    />
                                    <Chip 
                                        avatar={<Avatar style={{ fontSize: "1rem" }}>{answer.commentId.length}</Avatar>} 
                                        label="COMMENTS"
                                        variant="outlined"
                                        className={classes.chip}
                                    />
                                </Box>
                            </Card>
                        )
                    })
                }
            </Grid>
        )
    }

    getBookmarkedQuestions = () => {
        const { bookmarkedQuestions, loggedInUser } = this.state;
        return(
            <Grid direction="column" container style={{ paddingLeft: "20%"}}>
                {   
                    bookmarkedQuestions.length === 0 ?
                    <Typography variant="h2" style={{ color: "white", textAlign: "center", margin: "auto"}}>You have not bookmarked any questions yet</Typography>
                    :
                    bookmarkedQuestions.map((question, index) => {
                        return (
                            <Card key={index} elevation={8} style={{ width: "75%", marginBottom: "5%",padding: "8px" }}>
                                <Box pl={1}>
                                    <Typography varinat="caption">
                                        {`${question.answerId.length} Answers by various authors`} 
                                    </Typography>
                                </Box>
                                <Box p={1} display="flex" flexDirection="row" justifyContent="space-between">
                                    <Typography variant="h4" component={Link} href={`/question/${question._id}`} style={{ color: "white"}}>
                                        {question.question}
                                    </Typography>
                                    {
                                        loggedInUser && 
                                        <Tooltip
                                            title={
                                                <Typography variant='h6'>
                                                    Remove Bookmark
                                            </Typography>
                                            }
                                            arrow
                                        >
                                            <Fab size="small" color="primary">
                                                <BookmarkBorderIcon fontSize="small" />
                                            </Fab>
                                        </Tooltip>
                                    }
                                </Box>
                            </Card>
                        )
                    })
                }
            </Grid>
        )
    }

    getBookmarkedAnswers = () => {
        const { bookmarkedAnswers, loggedInUser } = this.state;
        const { classes } = this.props;
        return (
            <Grid direction="column" container style={{ paddingLeft: "25%"}}>
                {   
                    bookmarkedAnswers.length === 0 ? <Typography variant="h2">You have not bookmarked any answer.</Typography> 
                    :bookmarkedAnswers.map((answer, index)=>{
                        return(
                            <Card key={index} elevation={8}  style={{ width: "70%", marginBottom: "5%", padding: "8px"}}>
                                <Box p={2} display="flex" flexDirection="row" justifyContent="space-between">
                                    <Box width="80%">
                                        <Typography variant="h4" style={{ paddingTop: "8px"}}>
                                            {answer.title}
                                        </Typography>
                                    </Box>
                                    {
                                        loggedInUser &&
                                        <Box>
                                            <Tooltip
                                                title={
                                                    <Typography variant='h6'>
                                                        Remove Bookmark
                                            </Typography>
                                                }
                                                arrow
                                            >
                                                <Fab
                                                    size="medium"
                                                    color="primary"
                                                >
                                                    <BookmarkBorderIcon fontSize="large" />
                                                </Fab>
                                            </Tooltip>
                                        </Box>
                                    }                                     
                                </Box>
                                <Box p={2}>
                                    <Typography variant="h6">
                                        {answer.answer}
                                    </Typography>
                                </Box>
                                <Box p={2} display="flex" flexDirection="row" >
                                    <Chip 
                                        avatar={<Avatar style={{ fontSize: "1rem" }}>{answer.upVote.length}</Avatar>} 
                                        label="UPVOTES"
                                        variant="outlined"
                                        className={classes.chip}
                                    />
                                    <Chip 
                                        avatar={<Avatar style={{ fontSize: "1rem" }}>{answer.commentId.length}</Avatar>} 
                                        label="COMMENTS"
                                        variant="outlined"
                                        className={classes.chip}
                                    />
                                </Box>
                            </Card>
                        )
                    })
                }
            </Grid>
        )
    }

    render() {
        const { loading, userData, loggedInUser } = this.state;
        const { classes } = this.props;
        return loading ? <div><CircularProgress style={{ margin: "25% 50%" }} size={100} thickness={2.5} /></div> : (
            <Grid container>
                <Grid direction="row" container style={{ margin: "8% 5%" }}>
                    <Grid container direction="column" md={3} alignItems="center">
                        <Box alignItems="center" width="100%">
                            <Avatar src="https://koolinus.files.wordpress.com/2019/03/avataaars-e28093-koolinus-1-12mar2019.png" style={{ width: "200px", height: "200px", margin: "auto" }} />
                        </Box>
                        <Box width="100%" textAlign="center" pt={3} pb={3}>
                            <Typography variant="h4" className={classes.name}>
                                {userData.name}
                            </Typography>
                        </Box>
                        <Box width="100%" textAlign="center">
                            {
                                loggedInUser ? 
                                <Button color="secondary" variant="contained" style={{ width: "70%", fontSize: "1.2rem" }}>
                                    EDIT PROFILE
                                </Button> :
                                <Button color="secondary" variant="contained" style={{ width: "70%", fontSize: "1.2rem" }}>
                                    FOLLOW
                                </Button>
                            }
                            
                        </Box>
                    </Grid>
                    <Grid width="100%" md={9}>
                        <Tabs centered value={this.state.selectedIndex} onChange={this.handleChange}>
                            <Tab label="Questions" className={classes.tabName} />
                            <Tab label="Answers" className={classes.tabName} />
                            <Tab label="Bookmarked Questions" className={classes.tabName} />
                            <Tab label="Bookmarked Answers" className={classes.tabName} />
                        </Tabs>
                        <TabPanels value={this.state.selectedIndex} index={0}>
                            {this.getUserQuestions()}
                        </TabPanels>
                        <TabPanels value={this.state.selectedIndex} index={1}>
                            {this.getUserAnswers()}
                        </TabPanels>
                        <TabPanels value={this.state.selectedIndex} index={2}>
                            {this.getBookmarkedQuestions()}
                        </TabPanels>
                        <TabPanels value={this.state.selectedIndex} index={3}>
                            {this.getBookmarkedAnswers()}
                        </TabPanels>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles, { withTheme: true })(ProfilePage);