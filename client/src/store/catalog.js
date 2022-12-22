import { createSlice, createAction } from "@reduxjs/toolkit";
import productService from "../components/services/product.service";
import { isOutdated } from "../utils/outDated";

const catalogSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null,
        filtered: false,
        filters: {
            currentPrice: { min: 20, max: 47000 },
            quantity: { min: 2, max: 6 },
            age: { min: 6, max: 18 },
            time: [
                { name: "30+", value: "30+", checked: false, time: 30 },
                { name: "60+", value: "60+", checked: false, time: 60 }
            ]
        }
    },
    reducers: {
        productsRequested: (state) => {
            state.filtered = false;
            state.isLoading = true;
        },
        productsRecived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        productsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        productsFiltersEdited: (state, action) => {
            state.filters = action.payload;
            state.filtered = true;
        },
        productCreateRecived: (state, action) => {
            state.entities.push(action.payload);
        },
        productChangeRecived: (state, action) => {
            const result = state.entities.map((prod) => {
                if (prod._id === action.payload.id) {
                    return { _id: action.payload.id, ...action.payload.data };
                }
                return prod;
            });
            state.entities = result;
        },
        productRemoveRecived: (state, action) => {
            const result = state.entities.filter(
                (prod) => prod._id !== action.payload
            );
            state.entities = result;
        }
    }
});

const productCreateRequested = createAction("users/productCreateRequested");

const productCreateFailed = createAction("users/productCreateFailed");

const productChangeRequested = createAction("users/productChangeRequested");

const productChangeFailed = createAction("users/productChangeFailed");

const productRemoveRequested = createAction("users/productChangeRequested");

const productRemoveFailed = createAction("users/productChangeFailed");

const { reducer: productsReducer, actions } = catalogSlice;
const {
    productsRequested,
    productsRecived,
    productsRequestFailed,
    productsFiltersEdited,
    productCreateRecived,
    productChangeRecived,
    productRemoveRecived
} = actions;

export const loadProductsList = () => async(dispatch, getState) => {
    const { lastFetch } = getState().products;
    if (isOutdated(lastFetch)) {
        dispatch(productsRequested());
        try {
            const { content } = await productService.get();
            dispatch(productsRecived(content));
        } catch (error) {
            dispatch(productsRequestFailed(error));
        }
    }
};

export const handleCreateProduct = (_id, data) => async(dispatch) => {
    dispatch(productCreateRequested);
    try {
        const { content } = await productService.create({ ...data });
        dispatch(productCreateRecived(content));
    } catch (error) {
        dispatch(productCreateFailed);
    }
};

export const handleChangeProduct = (id, data) => async(dispatch) => {
    dispatch(productChangeRequested);
    try {
        await productService.patch(id, data);
        dispatch(productChangeRecived({ id, data }));
    } catch (error) {
        dispatch(productChangeFailed);
    }
};

export const handleRemoveProduct = (prodId) => async(dispatch) => {
    dispatch(productRemoveRequested);
    try {
        const { content } = await productService.delete(prodId);
        if (!content) {
            dispatch(productRemoveRecived(prodId));
        }
    } catch (error) {
        dispatch(productRemoveFailed);
    }
};

export const editFilters = (data) => (dispatch) => {
    dispatch(productsFiltersEdited(data));
};

export const getCatalogLoadingStatus = () => (state) => {
    return state.products.isLoading;
};

export const getProductsRedux = () => (state) => {
    return state.products.entities;
};

export const getFilters = () => (state) => {
    return state.products.filters;
};

export const getFilteredStatus = () => (state) => {
    return state.products.filtered;
};

export const getProductByCode = (code) => (state) => {
    return state.products.entities.find((prod) => prod.code === code);
};

export const getProductById = (productId) => (state) => {
    return state.products.entities.find((prod) => prod._id === productId);
};

export const getProductsByName = (name) => (state) => {
    const currentName = name.toLowerCase().trim();
    return state.products.entities.filter((prod) => {
        return prod.name.toLowerCase().includes(currentName);
    });
};

export default productsReducer;
