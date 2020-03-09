import React from 'react'
import './posts.styles.css'

const Posts = ({question, answer, image}) => (
    <div className='post'>
        <h1>{question}</h1>
        <p>{answer}</p>
        <img src={image} alt=""/>

    </div>
) 
export default Posts;