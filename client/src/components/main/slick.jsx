import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import MainCard from "./mainCard";
import classes from "../../modules/mainSlick.module.css";
import arrowRight from "../../images/catalog/arrow-right.svg";
import arrowLeft from "../../images/catalog/arrow-left.svg";
import PropTypes from "prop-types";

const currentItems = 4;
const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1070: { items: 3 },
    1400: { items: 3 },
    1500: { items: 4 },
    1800: { items: 5 }
};

const Slick = ({ cards }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = cards.map((card) => {
        if (card) {
            return (
                <MainCard
                    key={card._id}
                    cardInformation={card}
                    role="presentation"
                />
            );
        }
    });
    const difference = items.length - currentItems;
    const slidePrev = () => setActiveIndex(activeIndex - 1);
    const slideNext = () => setActiveIndex(activeIndex + 1);
    const syncActiveIndex = ({ item }) => setActiveIndex(item);
    return (
        <div className={classes.slickMargin} key={cards[0]._id}>
            <div className={classes.slickWrapper}>
                <div className={classes.alice} key={items[0]}>
                    <button
                        className={classes.leftButton}
                        style={{
                            backgroundColor: "#fcf3ed",
                            margin: "0px 20px 0px 0px"
                        }}
                        disabled={activeIndex === 0}
                        onClick={slidePrev}
                    >
                        <img src={arrowLeft} alt="" />
                    </button>
                    <AliceCarousel
                        mouseTracking
                        disableDotsControls
                        disableButtonsControls
                        items={items}
                        activeIndex={activeIndex}
                        responsive={responsive}
                        onSlideChanged={syncActiveIndex}
                    />
                    <button
                        className={classes.rightButton}
                        style={{ backgroundColor: "#fcf3ed" }}
                        disabled={activeIndex === difference ? true : false}
                        onClick={slideNext}
                    >
                        <img src={arrowRight} alt="" />
                    </button>
                </div>
            </div>
        </div>
    );
};

Slick.propTypes = {
    cards: PropTypes.array.isRequired
};

export default Slick;
