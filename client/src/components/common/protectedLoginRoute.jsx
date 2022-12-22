import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getLoadingStatus, getLoggedInStatus } from "../../store/user";
import PropTypes from "prop-types";

function ProtectedLoginRoute({ component: Component, children, ...rest }) {
    const currentUser = useSelector(getLoggedInStatus());
    const isLoading = useSelector(getLoadingStatus());
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!currentUser && !isLoading) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login"
                            }}
                        />
                    );
                }
                return Component ? <Component {...props} /> : children;
            }}
        />
    );
}

ProtectedLoginRoute.propTypes = {
    component: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedLoginRoute;
