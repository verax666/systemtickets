import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './auth/auth';

function PrivateRoute({ component: Component, ...rest }) {
    const isAuthenticated = useAuth();
    return (
        <Route {...rest} render={(props) => (
            isAuthenticated.authTokensClients ? (
                <>
                    <Component {...props} />
                </>) :
                (<Redirect to="/" ></Redirect>)
        )}
        />
    );
}


export default PrivateRoute;