import React from "react";
import Reflux from "reflux";
import { Drawer, Typography, withStyles, Hidden, Divider, Card, CardContent, ListItemAvatar, Avatar, List, ListItem, ListItemText, Paper, Button, CardHeader, CardMedia, CardActions, TextField } from "@material-ui/core";
import AnswerFormDialog from "../../components/AnswerDialog/answerFormDialog";
import AnswerStore, { Actions } from "./answerPageStore";

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
        }
    }

    componentDidMount() {
        Actions.initStore();
    }

    handleCommentButtonClick = () => {
        this.setState({
            commentBoxOpen: !this.state.commentBoxOpen
        })
        Actions.showComments();
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

    handleAuthorListItemClick = (event, index) => {
        this.setState({
            commentBoxOpen: false
        })
        Actions.authorListItemClick(index);
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
                                        <Avatar src="https://krourke.org/img/md_avatar.svg" />
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
                        <Avatar src="https://krourke.org/img/md_avatar.svg" style={{ width: "20px", height: "20px" }} />
                        <Typography variant="h5" style={{ padding: "0 1%" }}>
                            {questionAuthor.name}
                        </Typography>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <div style={{ width: "70%", paddingTop: "1.3rem" }}>
                            <Typography variant="h3">
                                {question}
                            </Typography>
                        </div>

                        <Button variant="contained" color="primary" style={{ fontSize: "1rem" }} onClick={this.handleAnswerDialogOpen}>
                            Answer
                        </Button>
                    </div>
                </div>
            </Paper>
        )
    }

    getAnswerCard = () => {
        const { answer } = this.state;
        const { author, images } = answer;
        return answer === undefined || answer === {} ? null : (
            <Card elevation={5} style={{ margin: "2% 6%", padding: "2%" }}>
                <CardHeader
                    avatar={
                        <Avatar src="https://krourke.org/img/md_avatar.svg" />
                    }
                    title={
                        <Typography variant="h5">
                            {author ? author.name : null}
                        </Typography>
                    }
                />
                <Divider style={{ marginBottom: "2%" }} />
                <CardMedia
                    image={images ? images[0] : null}
                    style={{ paddingTop: "50%", paddingBottom: "2%" }}
                />
                <CardContent>
                    {answer.answer}
                </CardContent>
                <Divider />
                <CardActions disableSpacing>
                    <Button style={{ fontSize: "1.2rem" }}>
                        UpVote
                    </Button>
                    <Button style={{ fontSize: "1.2rem" }} onClick={this.handleCommentButtonClick}>
                        Comment
                    </Button>
                </CardActions>
            </Card>
        )
    }

    getCommentCard = () => {
        const { comments } = this.state;
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
                                    style={{ width: "100%" }}
                                    size="medium"
                                />
                            </ListItem>
                            <Button variant="contained" color="primary" style={{ width: "10%", margin: "1.5%" }}>
                                Post
                        </Button>
                        </div>
                        <Divider />
                        {
                            comments.map((comment, index) => {
                                return (
                                    <div key={index}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar src={comment.avatar} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h6">
                                                        {comment.name}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography variant="subtitle1">
                                                        {comment.text}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                        <Divider />
                                    </div>
                                )
                            })
                        }

                    </List>
                </CardContent>
            </Card>
        )
    }

    render() {
        return (
            <div>
                {this.state.answerDialogOpen && <AnswerFormDialog handleOpen={this.state.answerDialogOpen} handleClose={this.handleAnswerDialogClose} questionId={this.state.questionId}/>}
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