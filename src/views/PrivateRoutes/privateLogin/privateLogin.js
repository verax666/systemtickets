import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthLogin } from '../contexts/contextRoutes';

function PrivateLogin({ component: Component, ...rest }) {
    const Login = useAuthLogin();
    return (
        <Route {...rest} render={(props) => (
            !Login.isLogin ? (
                <>
                    <Component {...props} />
                </>) :
                (<Redirect to="/admin" ></Redirect>
                )
        )}
        />
    );
}


export default PrivateLogin;