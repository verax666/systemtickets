import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthClient } from '../contexts/contextRoutes';

function PrivateRoute({ component: Component, ...rest }) {
    const isAuthenticated = useAuthClient();
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