import React from 'react';

import FormInput from "../../components/form-input/form-input.component";

import './contactpage.styles.css'

class ContactPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
        }
    }


    handleSubmit = async event => (
        event.preventDefault()
    )

    handleChange = event =>{
        const {value, name} = event.target;

        this.setState({[name]: value})
    }

    render(){
        return(
            <div className='Contact-Us'>

                <div className='Contact Information'>
                    <div className='col-xs-6'>
                        <h1>Contact Information</h1>
                        <h2>Phone Numbers</h2>
                        <p>India: +91-1236547896</p>
                        <p>India: +91-7896541230</p>
                        
                        <h2>Email Address</h2>
                        <p>General Query: info@ipu.ac.in</p>
                        <p>Student Support: help@ipu.ac.in</p>
                    </div>
                </div>

                <div className='Query'>
                    <div className='col-xs-6'>
                        <h1>Get in Touch</h1>
                        <form action="" onSubmit={this.handleSubmit}>
                        
                            <FormInput label="Full Name" type="text" name='name' value={this.state.name} required handleChange={this.handleChange}/>
                            <FormInput label="Email" type="email" name='email' value={this.state.email} required handleChange={this.handleChange}/>
                            <FormInput label="Message" type='text' name='message' value={this.state.message} required handleChange={this.handleChange}/>

                            <button className='submitbutton btn btn-primary' type='submit'>SUBMIT</button>
                        </form>
                    </div>
                </div>

            </div>
        )
    }

    

}

export default ContactPage;