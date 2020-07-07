import React from "react";
import Reflux from "reflux";
import { Drawer, Typography, withStyles, Hidden, Divider, Card, CardContent, ListItemAvatar, Avatar, List, ListItem, ListItemText, Paper, Button, CardHeader, CardMedia, CardActions, TextField, CircularProgress, ButtonGroup, Tooltip, Fab } from "@material-ui/core";
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import AnswerFormDialog from "../../components/AnswerDialog/answerFormDialog";
import AnswerStore, { Actions } from "./answerPageStore";
import { LoginMessageDialog } from "../../components/LoginMessageDialog/LoginMessageDialog";

const CustomDrawer = withStyles(theme => ({
    paperAnchorDockedLeft: {
        marginLeft: "10%",
        width: "20%",
        marginTop: "6%"
    }
}))(Drawer)

class AnswerPage extends Reflux.Component {
    constructor() {
        super();
        this.store = AnswerStore;
        this.state = {
            commentBoxOpen: false,
            answerDialogOpen: false,
            showLoginMessageDialog: false,
            questionBookmarked: false,
            answerBookmarked: false
        }
    }

    componentDidMount() {
        Actions.initStore();
    }

    handleUpVoteButtonClick = () => {
        if (localStorage.getItem("isAuthenticated")) {
            Actions.upvote();
        }
        else {
            this.handleLoginMessageDialogOpen();
        }
    }

    handleCommentButtonClick = () => {
        if (localStorage.getItem("isAuthenticated")) {
            this.setState({
                commentBoxOpen: !this.state.commentBoxOpen
            })
            Actions.showComments();
        }
        else {
            this.handleLoginMessageDialogOpen();
        }
    }

    handleAnswerDialogClose = () => {
        this.setState({
            answerDialogOpen: false
        })
    }

    handleAnswerDialogOpen = () => {
        this.setState({
            answerDialogOpen: true
        })
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

    handleAnswerButtonClick = () => {
        if (localStorage.getItem("isAuthenticated")) {
            this.handleAnswerDialogOpen();
        }
        else {
            this.handleLoginMessageDialogOpen();
        }
    }

    handleAuthorListItemClick = (event, index) => {
        this.setState({
            commentBoxOpen: false,
            newComment: ""
        })
        Actions.authorListItemClick(index);
    }

    handleCommentInputChange = event => {
        const { value, name } = event.target
        Actions.inputChange(name, value)
    }

    handlePostComment = () => {
        Actions.postComment();
    }

    getDrawerContent = () => {
        const { answers, selectedListIndex } = this.state;
        return (
            <CustomDrawer elevation={15} variant="permanent">
                <Typography variant="h4" style={{ textAlign: "center", padding: "1.3rem" }}>
                    Answers by various authors
                </Typography>
                <Divider />
                <List>
                    {answers.map((answer, index) => {
                        return (
                            <div key={index}>
                                <ListItem button selected={selectedListIndex === index} onClick={(event) => this.handleAuthorListItemClick(event, index)}>
                                    <ListItemAvatar>
                                        <Avatar src={answer.author.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="h5">
                                                {answer.author.name}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                                <Divider />
                            </div>
                        )
                    })}

                </List>
            </CustomDrawer>
        )
    }

    getQuestionCard = () => {
        const { question, questionAuthor } = this.state;
        return (
            <Paper elevation={5} style={{ margin: "0% 5%", padding: "2%" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <Avatar src={questionAuthor.avatar} style={{ width: "20px", height: "20px" }} />
                        <Typography variant="h5" style={{ padding: "0 1%", width: "40%" }}>
                            {questionAuthor.name}
                        </Typography>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <div style={{ width: "70%", paddingTop: "1.3rem" }}>
                            <Typography variant="h3">
                                {question}
                            </Typography>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", padding: "2% 0" }}>
                            <Tooltip 
                                title={
                                    <Typography variant='h6'>
                                        {this.state.questionBookmarked? "Remove Bookmark" : "Click to bookmark this question"}
                                    </Typography>
                                } 
                                arrow
                            >
                                <Fab 
                                    color={this.state.questionBookmarked? "primary": "default"} 
                                    size="large" 
                                    style={{ marginRight: "5%"}} 
                                    onClick={()=>{ this.setState({questionBookmarked: !this.state.questionBookmarked})}}
                                >
                                    <BookmarkBorderIcon fontSize="large" />
                                </Fab>
                            </Tooltip>
                            <Tooltip 
                                title={
                                    <Typography variant='h6'>
                                        Click to answer this question
                                    </Typography>
                                    } 
                                arrow
                            >
                                <Fab color="primary" size="large" onClick={this.handleAnswerButtonClick}>
                                    <QuestionAnswerOutlinedIcon fontSize="large" />
                                </Fab>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </Paper>
        )
    }

    getAnswerCard = () => {
        const { answer } = this.state;
        return answer === undefined || answer === {} ?
            <Typography variant="h4" style={{ textAlign: "center", margin: "20%", color: "gray"}}>No answer found. Be the first one to answer</Typography>
            :
            (
                <Card elevation={5} style={{ margin: "2% 6%", padding: "2%" }}>
                    <CardHeader
                        avatar={
                            <Avatar src={answer.author.avatar} />
                        }
                        title={
                            <Typography variant="h5">
                                {answer.author ? answer.author.name : null}
                            </Typography>
                        }
                    />
                    <Divider style={{ marginBottom: "2%" }} />
                    {
                        answer.images ?
                            <CardMedia
                                image={answer.images[0]}
                                style={{ paddingTop: "50%", paddingBottom: "2%" }}
                            /> :
                            null
                    }

                    <CardContent>
                        {answer.answer}
                    </CardContent>
                    <Divider />
                    <CardActions disableSpacing>
                        <ButtonGroup variant="text">
                            <Button 
                                onClick={this.handleUpVoteButtonClick} 
                                color={this.state.upvoted? "primary" : "default"}
                                disabled={this.state.upvoteLoading}
                                style={{ fontSize: "1.2rem" }}
                            >
                                {<ThumbUpOutlinedIcon style={{marginRight: "5px"}}/>} 
                                Upvote 
                                {this.state.upvoteLoading && <CircularProgress size={20}/>}
                            </Button>
                            <Button style={{ fontSize: "1.2rem" }} onClick={this.handleCommentButtonClick}>
                                {<CommentOutlinedIcon style={{marginRight: "5px"}}/>} Comment
                            </Button>
                            <Tooltip 
                                title={
                                    <Typography variant="h6">
                                        {this.state.answerBookmarked? "Remove Bookmark":"Bookmark this answer"}
                                    </Typography>
                                } 
                                arrow 
                                placement="right"
                            >
                                <Button 
                                    color={this.state.answerBookmarked? "primary": "default"} 
                                    style={{ fontSize: "1.2rem" }} 
                                    onClick={() => this.setState({ answerBookmarked: !this.state.answerBookmarked})}
                                >
                                    <BookmarkBorderIcon style={{marginRight: "5px"}}/> Bookmark
                                </Button>
                            </Tooltip>
                        </ButtonGroup>
                    </CardActions>
                </Card>
            )
    }

    getCommentCard = () => {
        const { comments, loadingComments, newComment } = this.state;
        const getComments = (comments) => {
            return comments.length === 0 ? (
                <Typography variant="h4" style={{ textAlign: "center", margin: "10%", color: "gray" }}>No comments found. Be the first one to comment.</Typography>
            ) : (
                    comments.map((comment, index) => {
                        return (
                            <div key={index}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar src={comment.author.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="h6">
                                                {comment.author.name}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="subtitle1">
                                                {comment.content}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                                <Divider />
                            </div>
                        )
                    })
                )
        }
        return (
            <Card elevation={5} style={{ margin: "2% 6%" }}>
                <CardContent>
                    <List subheader={
                        <Typography variant="h5" style={{ padding: "8px 16px" }}>
                            Comments
                        </Typography>
                    }>
                        <Divider />
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <ListItem style={{ width: "50%" }}>
                                <TextField
                                    variant="outlined"
                                    label="Your Comment"
                                    placeholder="Write Your comment here..."
                                    value={newComment}
                                    name="newComment"
                                    onChange={this.handleCommentInputChange}
                                    style={{ width: "100%" }}
                                    size="medium"
                                />
                            </ListItem>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ width: "10%", margin: "1.5%" }}
                                onClick={this.handlePostComment}
                                disabled={newComment === ""}
                            >
                                Post
                            </Button>
                        </div>
                        <Divider />
                        {
                            loadingComments ? <CircularProgress style={{ margin: "10% 45%" }} /> : getComments(comments)
                        }

                    </List>
                </CardContent>
            </Card>
        )
    }

    render() {
        const answerDialog = <AnswerFormDialog handleOpen={this.state.answerDialogOpen} handleClose={this.handleAnswerDialogClose} questionId={this.state.questionId} />
        const loginMessageDialog = <LoginMessageDialog handleOpen={this.state.showLoginMessageDialog} handleClose={this.handleLoginMessageDialogClose} />
        return this.state.loading ? <div><CircularProgress style={{ margin: "25% 50%" }} size={100} thickness={2.5} /></div> : (
            <div style={{ margin: "0 10%" }} >
                {this.state.answerDialogOpen && answerDialog}
                {this.state.showLoginMessageDialog && loginMessageDialog}
                <Divider orientation="vertical" />
                <Hidden smUp>
                    {this.getDrawerContent()}
                </Hidden>
                <Hidden smDown>
                    {this.getDrawerContent()}
                </Hidden>
                <div style={{ display: "flex", height: "100%", flexDirection: "column", marginLeft: "25%" }}>
                    <div style={{ width: "100%", marginTop: "10%" }}>
                        {this.getQuestionCard()}
                    </div>
                    <div>
                        {this.getAnswerCard()}
                    </div>
                    <div>
                        {this.state.commentBoxOpen ? this.getCommentCard() : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default AnswerPage;