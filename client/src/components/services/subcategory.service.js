import httpServices from "./http.service";

const subcategorytEndpoint = "subcategory/";

const subcategoryService = {
    get: async() => {
        const { data } = await httpServices.get(subcategorytEndpoint);
        return data;
    }
};
export default subcategoryService;
