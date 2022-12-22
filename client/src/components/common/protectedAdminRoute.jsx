import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser, getLoadingStatus } from "../../store/user";
import PropTypes from "prop-types";

function ProtectedAdminRoute({ component: Component, children, ...rest }) {
    const currentUser = useSelector(getCurrentUser());
    const isLoading = useSelector(getLoadingStatus());
    return (
        <Route
            {...rest}
            render={(props) => {
                if (
                    (!currentUser && !isLoading) ||
                    (!isLoading && !currentUser.isAdmin)
                ) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/"
                            }}
                        />
                    );
                }
                return Component ? <Component {...props} /> : children;
            }}
        />
    );
}

ProtectedAdminRoute.propTypes = {
    component: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedAdminRoute;
