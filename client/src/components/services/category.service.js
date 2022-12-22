import httpServices from "./http.service";

const categoryEndpoint = "category/";

const categoryService = {
    get: async() => {
        const { data } = await httpServices.get(categoryEndpoint);
        return data;
    }
};
export default categoryService;
