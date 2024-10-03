// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem('token');

    // Se o token não existir, redirecionar para a página de login
    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};