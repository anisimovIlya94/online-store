import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "user/";

const userService = {
    create: async(payload) => {
        const { data } = await httpService.put(
            userEndpoint + payload._id,
            payload
        );
        return data;
    },
    getCurrentUser: async() => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    update: async(payload) => {
        const { data } = await httpService.patch(
            userEndpoint + localStorageService.getUserIdToken(),
            payload
        );
        return data;
    }
};
export default userService;
