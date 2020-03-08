import React from 'react'
import './header.styles.css'

const Header = (currentUser) => (
    <div className = 'header'>
        <div className='header1'>
            
            <ul class="nav nav-pills">
                <li role="presentation" class="active"><a href="#">Home</a></li>
                <li role="presentation"><a href="#">Contact</a></li>
                <li role="presentation"><a href="#">AboutUs</a></li>
                <li role="presentation"><a href="#">News</a></li>
                
            </ul>
                
        </div>
        <div className='header2'>
            
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">AskUSICT</a>
                        <form class="navbar-form navbar-left" role="search">
                          <div class="form-group">
                            <input type="text" class="form-control" placeholder="Search"/>
                          </div>
                          <button type="submit" class="btn btn-default">Search</button>
                        </form>
                        <ul class="nav navbar-nav">

                            <li><a href="#">Ask Question</a></li>
                            <li><a href="#">SignIn</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
        
    </div>
)

export default Header;