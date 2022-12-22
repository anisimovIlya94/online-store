import { useEffect } from "react";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
// import {
//     getLoadingStatus,
//     getLoggedInStatus,
//     loadUsersList
// } from "../../../store/users";
import { loadRecomendationsList } from "../../store/recomendations";
// import { loadProfessionsList } from "../../../store/professions";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    // const usersLoggedInStatus = useSelector(getLoggedInStatus());
    useEffect(() => {
        dispatch(loadRecomendationsList());
        // dispatch(loadProfessionsList());
        // if (usersLoggedInStatus) {
        //     dispatch(loadUsersList());
        // }
    }, []);
    // const usersLoadingStatus = useSelector(getLoadingStatus());
    // if (usersLoadingStatus) return "Loading...";
    return children;
};
// AppLoader.propTypes = {
//     children: PropTypes.oneOfType([
//         PropTypes.arrayOf(PropTypes.node),
//         PropTypes.node
//     ])
// };

export default AppLoader;
