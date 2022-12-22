import React from "react";
import PropTypes from "prop-types";

const MainWrapper = ({ children, title, marginTop }) => {
    return (
        <div style={{ marginTop: marginTop }}>
            <h1 className="title">{title}</h1>
            {children}
        </div>
    );
};

MainWrapper.propTypes = {
    title: PropTypes.string,
    marginTop: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default MainWrapper;
