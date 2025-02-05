import { apiRequest } from "./apiRequest";

export const userData = async ( userid) => {
    const api = await apiRequest({
        url: `/users/${userid}`,
        method: "get",
        header: true,
    });
    return api.data;
};

export const updateUserProfile = async ({ userid, data }) => {
    const api = await apiRequest({
        url: `/users/${userid}`,
        method: "put",
        body: data,
        header: true,
    });
    return api.data;
};


export const billingInfo = async ({clientId}) => {
    const api = await apiRequest({
        url: `/billing-info?clientId=${clientId}`,
        method: "get",
        header: true,
    });
    return api.data
    };

export const BillingInfoUpdate = async ({updateBillingInfo}) => {
    const api = await apiRequest({
        url: `/billing-info`,
        method: "put",
        body: updateBillingInfo,
        header: true,
    });
    return api;
}

export const passwordReset = async (newData) => {
    const api = await apiRequest({
        url: `/auth/change-password`,
        method: "post",
        body: newData,
        header: true,
    });
    return api;
}

export const getConversationData = async (userId) => {
    const api = await apiRequest({
        url: `/clients/conversations/${userId}`,
        method: "get",
        header: true,
    });
    return api.data;
}

export const getLeadData = async (botCode) => {
    const api = await apiRequest({
        url: `/bot-leads/botCode/${botCode}`,
        method: "get",
        header: true,
    });
    return api.data;
}