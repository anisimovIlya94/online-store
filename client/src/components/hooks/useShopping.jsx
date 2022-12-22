import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCatalogLoadingStatus, getProductsRedux } from "../../store/catalog";
import { getCurrentUser, updateUser } from "../../store/user";
import PropTypes from "prop-types";

const ShoppingContext = React.createContext();

export const useShopping = () => {
    return useContext(ShoppingContext);
};

const ShoppingProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [prodsWithPrice, setProds] = useState([]);
    const currentUser = useSelector(getCurrentUser());
    const dispatch = useDispatch();
    const catalogLoading = useSelector(getCatalogLoadingStatus());
    const products = useSelector(getProductsRedux());
    const handleGetItems = () => {
        if (currentUser) {
            const cart = currentUser.shoppingCart
                .reduce((acc, product) => {
                    acc.push(products.find((prod) => prod._id === product));
                    return acc;
                }, [])
                .filter((c) => c !== undefined);
            setCartItems(cart);
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    const handleLoadProdsWithPrice = () => {
        setProds(
            cartItems.map((prod) => {
                return { name: prod.name, price: prod.currentPrice };
            })
        );
    };
    const getItemById = (id) => {
        if (currentUser) {
            return currentUser.shoppingCart.includes(id);
        }
        return false;
    };
    const handleChangePrice = (name, price) => {
        setProds((prevState) =>
            prevState.map((order) => {
                if (order.name === name) {
                    return { ...order, price: price };
                }
                return order;
            })
        );
    };
    useEffect(() => {
        handleLoadProdsWithPrice();
    }, [cartItems]);
    const resultPrice = prodsWithPrice.reduce((acc, order) => {
        return (acc += order.price);
    }, 0);
    const removeItem = (id) => {
        const filteredItems = currentUser.shoppingCart.filter(
            (prod) => prod !== id
        );
        setCartItems(cartItems.filter((item) => item._id !== id));
        dispatch(updateUser({ ...currentUser, shoppingCart: filteredItems }));
    };
    useEffect(() => {
        if (!catalogLoading) {
            handleGetItems();
        }
    }, [catalogLoading, currentUser]);
    return (
        <ShoppingContext.Provider
            value={{
                cartItems,
                isLoading,
                removeItem,
                resultPrice,
                handleChangePrice,
                getItemById
            }}
        >
            {children}
        </ShoppingContext.Provider>
    );
};

ShoppingProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ShoppingProvider;
