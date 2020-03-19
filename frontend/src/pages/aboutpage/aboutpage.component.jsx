import React from 'react';
import './aboutpage.styles.css'
import { Link } from 'react-router-dom';


class About extends React.Component{
    
    render(){
        return(
    
            <div className='header1'>
                
                <nav class="nav nav-pills">
                    <li role="presentation"><a href="#">What is Ask USS?</a></li>
                    <li role="presentation"><a href="#">Writing Standards</a></li>
                    <li role="presentation" class="active"><Link to='/about/team'>Team</Link></li>

                </nav>
                    
            </div>

          
        )
    }
}

export default About;