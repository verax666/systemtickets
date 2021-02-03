import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthAdmin } from '../privateRoute/auth/auth';

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