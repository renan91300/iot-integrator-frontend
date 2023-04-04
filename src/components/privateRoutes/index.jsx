import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = () => {
        const token = localStorage.getItem('accesstoken');
        if (!token) {
            return false;
        }

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const now = new Date().getTime() / 1000;
        return decodedToken.exp > now;
    };

    return isAuthenticated() ? <>{children}</> : <Navigate replace to='/' />;
};

export default PrivateRoute;