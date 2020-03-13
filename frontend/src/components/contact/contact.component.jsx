import React from 'react';
import './contact.styles.css'
import FormInput from '../form-input/form-input.component';


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
                <h1>Get in Touch</h1>
                <h3>Drop a mail at abc@blabla.com</h3>

                <form action="" onSubmit={this.handleSubmit}>
                
                    <FormInput label="Full Name" type="text" name='name' value={this.state.name} required handleChange={this.handleChange}/>
                    <FormInput label="Email" type="email" name='email' value={this.state.email} required handleChange={this.handleChange}/>
                    <FormInput label="Message" type='text' name='message' value={this.state.message} required handleChange={this.handleChange}/>

                    <button className='submitbutton btn btn-primary' type='submit'>SUBMIT</button>
                </form>

            </div>
        )
    }

    

}

export default ContactPage;
