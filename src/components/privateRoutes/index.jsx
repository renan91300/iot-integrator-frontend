import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = () => {
        const token = localStorage.getItem('accesstoken');
        if (!token) {
            return false;
        }

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const now = new Date().getTime() / 1000;
        const is_token_expired = decodedToken.exp < now;
        if (is_token_expired | !token) {
            toast.error("Seu token de acesso expirou, logue novamente");
        }
        return !is_token_expired;
    };

    return (
        <>  
            <ToastContainer autoClose={false}/>
            {isAuthenticated() ? <>{children}</> : <Navigate replace to='/login' />}
        </>
    );
};

export default PrivateRoute;