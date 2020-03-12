import React from 'react';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';

import './header.styles.css'
import FormInput from '../form-input/form-input.component';

class Header extends React.Component{
    constructor(){
        super();
        this.state={
            showModal:false
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
      }
      
    handleOpenModal () {
        this.setState({ showModal: true });
    }
      
    handleCloseModal () {
        this.setState({ showModal: false });
    }

    render(){
        return(
            <div className = 'header'>
            <div className='header1'>
                
                <ul class="nav nav-pills">
                    <li role="presentation" class="active"><Link to='/'>Home</Link></li>
                    <li role="presentation"><a href="#">Contact</a></li>
                    <li role="presentation"><a href="#">AboutUs</a></li>
                    <li role="presentation"><a href="#">News</a></li>
                </ul>
                    
            </div>
    
            <div className='header2'>
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <Link class="navbar-brand" to='/'>AskUSICT</Link>
    
                            <form class="navbar-form navbar-left" role="search">
                              <div class="form-group">
                                <input type="text" class="form-control" placeholder="Search"/>
                              </div>
                              <button type="submit" class="btn btn-default">Search</button>
                            </form>
    
                            <ul class="nav navbar-nav">
    
                                <li><a href="#" onClick={this.handleOpenModal}>Ask Question</a></li>
                                <ReactModal isOpen={this.state.showModal} 
                                    contentLabel="ask question modal"
                                    className='Modal'
                                    >
                                    <h1>Ask Your Question Here!</h1>
                                    <FormInput label="Question?" type="text"/>
                                    <button className='ask btn btn-primary' onClick={this.handleCloseModal}>Ask</button>
                                    <button className='cancel btn btn-warning' onClick={this.handleCloseModal}>Cancel</button>
                                </ReactModal>
                                
                                <li><Link to="/login">SignIn</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
    
            </div>
            
        </div>
        )
    }
}

export default Header;