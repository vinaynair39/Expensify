import React from 'react';
import {connect} from 'react-redux';
import {startLogin} from '../actions/auth';

export const LoginPage = (props) => {
    return(
        <div>
            <h1>
                <button onClick = {props.Login}>Login</button>
                <button>Sign Up!</button>
            </h1>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        Login : () => dispatch(startLogin()),
    };
};

export default connect(undefined, mapDispatchToProps)(LoginPage);