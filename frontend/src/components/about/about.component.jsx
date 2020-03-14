import React from 'react';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';

import './about.styles.css'

class About extends React.Component{
    
    render(){
        return(
            <div className='header1'>
                
                <ul class="nav-pills">
                    <li role="presentation"><a href="#">What is Ask USS?</a></li>
                    <li role="presentation"><a href="#">Writing Standards</a></li>
                    <li role="presentation"><a href="#">Team</a></li>

                </ul>
                    
            </div>
    
            
        )
    }
}

export default About;