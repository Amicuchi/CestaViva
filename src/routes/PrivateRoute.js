import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // Se o token não existir, redirecionar para a página de login
    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
