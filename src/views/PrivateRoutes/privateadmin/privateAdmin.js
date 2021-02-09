import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthAdmin } from '../contexts/contextRoutes';

function PrivateAdmin({ component: Component, ...rest }) {
    const isAuthenticatedAdmin = useAuthAdmin();
    return (
        <Route {...rest} render={(props) => (
            isAuthenticatedAdmin.authTokensEmployes ? (
                <>
                    <Component {...props} />
                </>) :
                (<Redirect to="/login" ></Redirect>)
        )}
        />
    );
}


export default PrivateAdmin;