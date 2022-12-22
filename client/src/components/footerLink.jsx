import React from "react";
import PropTypes from "prop-types";

const FooterLink = ({ name, styles }) => {
    return (
        <div className={styles} role={"button"}>
            {name}
        </div>
    );
};

FooterLink.propTypes = {
    name: PropTypes.string.isRequired,
    styles: PropTypes.string
};

export default FooterLink;
