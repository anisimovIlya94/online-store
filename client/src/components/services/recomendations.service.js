import httpServices from "./http.service";

const timeToBuyEndpoint = "timeToBuy/";
const specialOffersEndpoint = "specialOffers/";

const recomendationsService = {
    getTimeToBying: async() => {
        const { data } = await httpServices.get(timeToBuyEndpoint);
        return data;
    },
    getSpecialOffers: async() => {
        const { data } = await httpServices.get(specialOffersEndpoint);
        return data;
    },
    changeTimeToBying: async(content) => {
        const { data } = await httpServices.put(timeToBuyEndpoint, content);
        return data;
    },
    changeSpecialOffers: async(content) => {
        const { data } = await httpServices.put(specialOffersEndpoint, content);
        return data;
    }
};
export default recomendationsService;
