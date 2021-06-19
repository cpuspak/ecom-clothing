import React from 'react';
import SignIn from '../../components/signIn/signIn.component';
import SignUp from '../../components/sign-up/sign-up.component';



import './sign-in-and-sign-up.scss';

const SignInAndSignUpPage = () => {
    return(
        <div className="sign-in-and-sign-up">
            <SignIn />
            <SignUp />
        </div>
    )
}

export default SignInAndSignUpPage;