import React from 'react'
import './sign-in.styles.css'
import FormInput from '../form-input/form-input.component';

class SignIn extends React.Component{
    constructor(){
        super();
        this.state = {
            email:'',
            password:''
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
            <div className='sign-in'>
                <h1>I already have an account</h1>
                <span>Sign in with your email</span>

                <form action="" onSubmit={this.handleSubmit}>
                    <FormInput label="Email" type="email" name='email' value={this.state.email} required handleChange={this.handleChange}/>
                    <FormInput label="Password" type='password' name='password' value={this.state.password} required handleChange={this.handleChange}/>
                    <button className='signinbutton btn btn-primary' type='submit'>SignIn</button>
                </form>

            </div>
        )
    }
}

export default SignIn;