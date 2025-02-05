import { apiRequest } from "./apiRequest";

export const invoicesdata = async (clientId) => {
    const api = await apiRequest({
        url: `/invoices?clientId=${clientId}`,
        method: "get",
        header: true,
    });
    return api.data;
}

export const cancelrenewalapi = async ({clientId,newdata}) => {
    const api = await apiRequest({
        url: `/renewal?clientId=${clientId}`,
        method: "put",
        body: newdata,
        header: true,
    });
    return api.data;
}

export const mysubscribption = async (clientId) => {
    const api = await apiRequest({
        url: `/subscription-plans/client?clientId=${clientId}`,
        method: "get",
        header: true,
    });
    return api.data;
}