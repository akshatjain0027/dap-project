import React from 'react'
import './homepage.styles.css'
import Year from '../../components/year/year.component';
import Posts from '../../components/posts/posts.component';

class Homepage extends React.Component{
    constructor(){
        super();

        this.state = {
            posts:[
                {
                    id:'1',
                    question: "Is Usict a good college to take admission in?",
                    answer:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                    image:""
            },
                {
                    id:'2',
                    question: "Why are we putting so many statues in our campus?",
                    answer:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                    image:""
            }
        
        ]
        }
    }

    render(){
        return(
            <div className='container'>
                <div className='row homepage'>
                    <div className='col-xs-3'>
                        <Year/>

                    </div>

                    <div className='col-xs-6'>
                        <div className='posts'>
                            {
                                this.state.posts.map(({id,...otherPostProps}) => (
                                    <Posts key={id} {...otherPostProps}/>
                                ))
                            }
    
                        </div>
                    </div>

                    <div className='col-xs-3'>
                        Popular Topics
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage;