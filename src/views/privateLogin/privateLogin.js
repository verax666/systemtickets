import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthLogin } from '../privateRoute/auth/auth';

function PrivateLogin({ component: Component, ...rest }) {
    const isLogin = useAuthLogin();
    return (
        <Route {...rest} render={(props) => (
            !isLogin.isLogin ? (
                <>
                    <Component {...props} />

                </>) :
                (<Redirect to="/admin" > </Redirect>
                )
        )}
        />
    );
}


export default PrivateLogin;