import React from "react";
import { Drawer, Typography, withStyles, Hidden, AppBar, Toolbar, Divider, Card, CardContent, ListItemAvatar, Avatar, List, ListItem, ListItemText, Paper, Button, CardHeader, CardMedia, CardActions, ListSubheader, TextField, Dialog, DialogTitle, DialogActions, DialogContent } from "@material-ui/core";
import candidates from "../candidates.png";
import AnswerFormDialog from "../../components/answerFormDialog";

const CustomDrawer = withStyles(theme => ({
    paperAnchorDockedLeft: {
        marginLeft: "10%",
        width: "20%",
        marginTop: "6%"
    }
}))(Drawer)

class AnswerPage extends React.Component {
    constructor() {
        super();
        this.state = {
            commentBoxOpen: false,
            answerDialogOpen: false,
            comments: [
                {
                    author: "Akshat Jain",
                    commentText: "Thanks a lot. This answer was very helpful",
                    image: "https://krourke.org/img/md_avatar.svg"
                },
                {
                    author: "Akshat Jain",
                    commentText: "Thanks a lot. This answer was very helpful",
                    image: "https://krourke.org/img/md_avatar.svg"
                },
                {
                    author: "Akshat Jain",
                    commentText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                    image: "https://krourke.org/img/md_avatar.svg"
                },
                {
                    author: "Akshat Jain",
                    commentText: "Thanks a lot. This answer was very helpful",
                    image: "https://krourke.org/img/md_avatar.svg"
                },
                {
                    author: "Akshat Jain",
                    commentText: "Thanks a lot. This answer was very helpful",
                    image: "https://krourke.org/img/md_avatar.svg"
                },
                {
                    author: "Akshat Jain",
                    commentText: "Thanks a lot. This answer was very helpful",
                    image: "https://krourke.org/img/md_avatar.svg"
                },
                {
                    author: "Akshat Jain",
                    commentText: "Thanks a lot. This answer was very helpful",
                    image: "https://krourke.org/img/md_avatar.svg"
                }
            ]
        }
    }

    handleCommentButtonClick = () => {
        this.setState({
            commentBoxOpen: !this.state.commentBoxOpen
        })
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

    getDrawerContent = () => {
        return(
            <CustomDrawer elevation={15} variant="permanent">
                <Typography variant="h4" style={{ textAlign: "center", padding: "1.3rem" }}>
                    Answers by various authors
                </Typography>
                <Divider />
                <List>
                    <ListItem button>
                        <ListItemAvatar>
                            <Avatar src="https://krourke.org/img/md_avatar.svg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography variant="h5">
                                    Deepanshu Singh Chauhan
                                </Typography>
                            }
                        />
                    </ListItem>
                    <Divider />
                </List>
            </CustomDrawer>
        )
    }

    getQuestionCard = () => {
        return (
            <Paper elevation={5} style={{ margin: "0% 5%", padding: "2%" }}>
                <div style={{ display: "flex", flexDirection: "column"}}>
                    <div style={{ display: "flex", flexDirection: "row"}}>
                        <Avatar src="https://krourke.org/img/md_avatar.svg" style={{ width: "20px", height: "20px" }}/>
                        <Typography variant="h5" style={{ padding: "0 1%"}}>
                            Piyush Khurana
                        </Typography>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <Typography variant="h3" style={{ paddingTop: "1.3rem" }}>
                            What are you doing?
                        </Typography>
                        <Button variant="contained" color="primary" style={{ fontSize: "1rem" }} onClick={this.handleAnswerDialogOpen}>
                            Answer
                        </Button>
                    </div>
                </div>    
            </Paper>
        )
    }

    getAnswerCard = () => {
        return (
            <Card elevation={5} style={{ margin: "2% 6%", padding: "2%" }}>
                <CardHeader 
                    avatar={
                        <Avatar src="https://krourke.org/img/md_avatar.svg"/>
                    }
                    title={
                        <Typography variant="h5">
                            Deepanshu Singh Chauhan
                        </Typography>
                    }
                />
                <Divider/>
                <CardMedia
                    image={candidates}
                    style={{ paddingTop: "50%"}}
                />
                <CardContent>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </CardContent>
                <Divider/>
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
        return(
            <Card elevation={5} style={{ margin: "2% 6%" }}>
                <CardContent>
                    <List subheader={
                        <Typography variant="h5" style={{ padding: "8px 16px"}}>
                            Comments
                        </Typography>
                    }>  
                    <Divider/>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <ListItem style={{ width: "50%" }}>
                            <TextField
                                variant="outlined"
                                label="Your Comment"
                                placeholder="Write Your comment here..."
                                style={{ width: "100%"}}
                                size="medium"
                            />
                        </ListItem>
                        <Button variant="contained" color="primary" style={{ width: "10%", margin: "1.5%"}}>
                            Post
                        </Button>
                    </div>
                    <Divider/>
                        {
                            comments.map((comment,index) => {
                                return(
                                    <div key={index}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar src={comment.image} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h6">
                                                        {comment.author}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography variant="subtitle1">
                                                        {comment.commentText}
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
                {this.state.answerDialogOpen && <AnswerFormDialog handleOpen={this.state.answerDialogOpen} handleAnswerDialogClose={this.handleAnswerDialogClose} /> }
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
                        {this.state.commentBoxOpen? this.getCommentCard() :null}
                    </div>
                </div>
            </div>
        )
    }
}

export default AnswerPage;