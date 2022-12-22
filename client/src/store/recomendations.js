import { createSlice, createAction } from "@reduxjs/toolkit";
import { isOutdated } from "../utils/outDated";
import recomendationsService from "../components/services/recomendations.service";

const recomendationsSlice = createSlice({
    name: "recomendations",
    initialState: {
        timeToBuy: null,
        specialOffers: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        recomendationsRequested: (state) => {
            state.isLoading = true;
        },
        recomendationsRecived: (state, action) => {
            state.timeToBuy = action.payload.timeToBuyContent;
            state.specialOffers = action.payload.offersContent;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        recomendationsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        recomendationsTimeToBuyChangeRecived: (state, action) => {
            state.timeToBuy = action.payload;
        },
        recomendationsSpecialOffersChangeRecived: (state, action) => {
            state.specialOffers = action.payload;
        }
    }
});

const recomendationsChangeRequested = createAction(
    "users/recomendationsChangeRequested"
);
const recomendationsChangeFailed = createAction(
    "users/recomendationsChangeFailed"
);

const { reducer: recomendationsReducer, actions } = recomendationsSlice;
const {
    recomendationsRequested,
    recomendationsRecived,
    recomendationsRequestFailed,
    recomendationsTimeToBuyChangeRecived,
    recomendationsSpecialOffersChangeRecived
} = actions;

export const loadRecomendationsList = () => async(dispatch, getState) => {
    const { lastFetch } = getState().recomendations;
    if (isOutdated(lastFetch)) {
        dispatch(recomendationsRequested());
        try {
            const { content: timeToBuyContent } =
                await recomendationsService.getTimeToBying();
            const { content: offersContent } =
                await recomendationsService.getSpecialOffers();
            dispatch(
                recomendationsRecived({ timeToBuyContent, offersContent })
            );
        } catch (error) {
            dispatch(recomendationsRequestFailed(error.message));
        }
    }
};

export const getTimeToBuy = () => (state) => {
    return state.recomendations.timeToBuy;
};

export const getSpecialOffers = () => (state) => {
    return state.recomendations.specialOffers;
};

export const getRecomendationsStatus = () => (state) => {
    return state.recomendations.isLoading;
};

export const changeTimeToBuy = (data) => async(dispatch) => {
    dispatch(recomendationsChangeRequested());
    try {
        await recomendationsService.changeTimeToBying(data);
        dispatch(recomendationsTimeToBuyChangeRecived(data));
    } catch (error) {
        dispatch(recomendationsChangeFailed());
    }
};

export const changeSpecialOffers = (data) => async(dispatch) => {
    dispatch(recomendationsChangeRequested());
    try {
        await recomendationsService.changeSpecialOffers(data);
        dispatch(recomendationsSpecialOffersChangeRecived(data));
    } catch (error) {
        dispatch(recomendationsChangeFailed());
    }
};

export default recomendationsReducer;
