import httpServices from "./http.service";

const productEndpoint = "product/";

const productService = {
    get: async() => {
        const { data } = await httpServices.get(productEndpoint);
        return data;
    },
    patch: async(prodId, product) => {
        const { data } = await httpServices.patch(
            productEndpoint + prodId,
            product
        );
        return data;
    },
    create: async(product) => {
        const { data } = await httpServices.put(productEndpoint, product);
        return data;
    },
    delete: async(prodId) => {
        const { data } = await httpServices.delete(productEndpoint + prodId);
        return data;
    }
};
export default productService;
