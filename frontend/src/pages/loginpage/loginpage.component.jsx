import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';

import './loginpage.styles.css'

const LoginPage = () => (
    <div className='loginpage'>
        <div className='col-xs-6'>
            <SignIn/>
        </div>
        <div className='col-xs-6'>

        </div>
        
    </div>
)

export default LoginPage;