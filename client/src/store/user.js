import { createAction, createSlice } from "@reduxjs/toolkit";
import { authService } from "../components/services/auth.service";
import localStorageService from "../components/services/localStorage.service";
import userService from "../components/services/user.service";
import { generateAuthError } from "../utils/generateAuthError";

const initialState = localStorageService.getAccessToken()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        isLoggedIn: true,
        isDataLoaded: false
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        isLoggedIn: false,
        isDataLoaded: false
    };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userRequested: (state) => {
            state.isLoading = true;
        },
        userRecived: (state, action) => {
            state.entities = action.payload;
            state.isDataLoaded = true;
            state.isLoading = false;
        },
        userRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state) => {
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        userCreated: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.isDataLoaded = false;
        },
        userUpdated: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateRequestFailed = createAction("users/userUpdateRequestFailed");

const { reducer: userReducer, actions } = userSlice;
const {
    userRequested,
    userRecived,
    userRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    userLoggedOut,
    userUpdated,
    authRequested
} = actions;

export const updateUser = (data) => async(dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const { content } = await userService.update(data);
        dispatch(userUpdated(content));
    } catch (error) {
        dispatch(userUpdateRequestFailed(error.message));
    }
};

export const logOut = () => () => {
    localStorageService.removeAuthData();
};

export const signUp = (payload) => async(dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register(payload);
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess());
        dispatch(userCreated({ ...payload, _id: data.userId }));
    } catch (error) {
        dispatch(authRequestFailed(error.message));
    }
};

export const logIn = (payload) => async(dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
        const data = await authService.logIn({
            email,
            password,
            returnSecureToken: true
        });
        localStorageService.setTokens(data);
        const { content } = await userService.getCurrentUser();
        dispatch(authRequestSuccess());
        dispatch(userRecived(content));
        return data;
    } catch (error) {
        const { message, code } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            console.log(message);
            console.log(errorMessage);
            dispatch(authRequestFailed(errorMessage));
        } else {
            dispatch(authRequestFailed(error.message));
        }
    }
};

export const loadUser = () => async(dispatch) => {
    dispatch(userRequested());
    try {
        const { content } = await userService.getCurrentUser();
        dispatch(userRecived(content));
    } catch (error) {
        dispatch(userRequestFailed(error.message));
    }
};

export const getLoggedInStatus = () => (state) => state.user.isLoggedIn;
export const getCurrentUser = () => (state) => state.user.entities;
export const getLoadingStatus = () => (state) => state.user.isLoading;
export const getAuthError = () => (state) => state.user.error;

export default userReducer;
