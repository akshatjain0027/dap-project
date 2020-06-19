import React from "react";
import { Box, Drawer, Typography, withStyles, Hidden, AppBar, Toolbar, Divider, Card, CardContent, ListItemAvatar, Avatar, List, ListItem, ListItemText, Paper, Button, CardHeader, CardMedia, CardActions } from "@material-ui/core";
import user from "../user.png";
import candidates from "../candidates.png";

const CustomDrawer = withStyles(theme => ({
    paperAnchorDockedLeft: {
        marginLeft: "10%",
        width: "20%",
        marginTop: "6%"
    }
}))(Drawer)

class AnswerPage extends React.Component {
    constructor() {
        super()
    }

    getDrawerContent = () => {
        return(
            <CustomDrawer elevation={15} variant="permanent">
                <Typography variant="h4" style={{ textAlign: "center", padding: "1.3rem" }}>
                    Answers by various authors
                </Typography>
                <Divider />
                <List>
                    <ListItem alignItems="center" button>
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
                        <Button variant="contained" color="primary" style={{ fontSize: "1rem" }}>
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
                <CardMedia
                    image={candidates}
                    style={{ paddingTop: "50%"}}
                />
                <CardContent>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </CardContent>
                <CardActions disableSpacing>
                    <Button style={{ fontSize: "1.2rem" }}>
                        UpVote
                    </Button>
                    <Button style={{ fontSize: "1.2rem" }}>
                        Comment
                    </Button>
                </CardActions>
            </Card>
        )
    }

    render() {
        return (
            <div>
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
                </div>
            </div>
        )
    }
}

export default AnswerPage;