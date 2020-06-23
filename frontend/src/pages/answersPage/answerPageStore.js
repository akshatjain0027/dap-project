import Reflux from 'reflux';
import React from 'react';
import { APIService } from '../../services/APIService';

export const Actions = Reflux.createActions([
    "initStore",
    "authorListItemClick",
    "showComments"
])

class AnswerStore extends Reflux.Store{
    constructor(props){
        super(props);
        this.state = {
            answers: [],
            questionId: "5edf3cd391d1101c37f4edf9",
            question: "",
            questionAuthor: {},
            selectedListIndex: 0,
            answer: {},
            comments: []
        }
        this.listenables = Actions;
        this.APIService = new APIService();
    }

    onInitStore (){
        this.fetchAnswers();
    }

    fetchAnswers() {
        this.APIService.getAnswers(this.state.questionId)
            .then(data =>{
                this.setState({
                    answers: data.answerId,
                    question: data.question,
                    questionAuthor: data.author,
                    answer: data.answerId[this.state.selectedListIndex]
                })
            })
    }

    onAuthorListItemClick (index) {
        this.setState({
            selectedListIndex: index,
            answer: this.state.answers[index]
        })
    }

    onShowComments () {
        this.setState({
            comments: this.state.answer.comments
        })
    }
}

export default AnswerStore;