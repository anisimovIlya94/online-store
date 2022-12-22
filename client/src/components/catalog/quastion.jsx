import React, { useEffect, useRef, useState } from "react";
import { Collapse as BsCollapse } from "bootstrap";
import CatalogQuastion from "./catalogQuastion";
import ProductQuastion from "../product/productQuastion";
import PropTypes from "prop-types";

const Quastion = ({ type, ...rest }) => {
    const [display, setDisaplay] = useState(false);
    const collapseRef = useRef();
    const toggleDisplay = () => {
        setDisaplay((prevState) => !prevState);
    };
    useEffect(() => {
        const newCollapse = new BsCollapse(collapseRef.current, {
            toggle: false
        });
        display ? newCollapse.show() : newCollapse.hide();
    }, [display]);
    return type === "catalog" ? (
        <CatalogQuastion
            collapseRef={collapseRef}
            toggleDisplay={toggleDisplay}
            display={display}
            {...rest}
        />
    ) : (
        <ProductQuastion
            collapseRef={collapseRef}
            toggleDisplay={toggleDisplay}
            display={display}
            {...rest}
        />
    );
};

Quastion.propTypes = {
    type: PropTypes.string.isRequired
};

export default Quastion;
