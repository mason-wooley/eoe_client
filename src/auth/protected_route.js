import React, { useContext } from "react";
import { Route } from "react-router-dom";
import AuthUser from '../contexts/auth_user.js';
import Error from '../components/error.js';

const ProtectedRoute = ({component: Component, ...rest}) => {
    const [state] = useContext(AuthUser);
    
    return(
        <Route
        {...rest}
        render={props => {
            if (state.permissions != null && state.permissions.includes("view:applications")) {
                return <Component {...props} />;
            } else {
                return <Error />;
            }
        }}/>
    );
}

export default ProtectedRoute;