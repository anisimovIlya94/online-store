import React from "react";
import vkLogo from "../images/footer/vk-footer-logo.svg";
import classes from "../modules/footer.module.css";

const VkLogo = () => {
    return (
        <div className={classes.linkVk}>
            <a href="#">
                <img className={classes.vkStyle} src={vkLogo} />
            </a>
        </div>
    );
};

export default VkLogo;
