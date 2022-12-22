import React from "react";
import { Slider } from "@material-ui/core";
import PropTypes from "prop-types";

const DoubleRangeSlider = ({ value, onChange, min, max }) => {
    const updateRange = (data, newValue) => {
        onChange(newValue);
    };
    return (
        <>
            <div>
                <Slider
                    style={{ color: "#2A2A2A" }}
                    value={[value.min, value.max]}
                    onChange={updateRange}
                    min={min}
                    max={max}
                />
            </div>
        </>
    );
};

DoubleRangeSlider.propTypes = {
    value: PropTypes.object.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default DoubleRangeSlider;
