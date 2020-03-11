import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';

import SignUp from '../../components/sign-up/sign-up.component';


import './loginpage.styles.css'

const LoginPage = () => (
    <div className='loginpage'>
        <div className='col-xs-6'>
            <SignIn/>
        </div>
        
        <div className='col-xs-6'>
            <SignUp/>
        </div>
        
    </div>
)

export default LoginPage;