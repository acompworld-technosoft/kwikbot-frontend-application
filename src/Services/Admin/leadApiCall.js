import { apiRequest } from "./apiRequest";

export const sendLeadMail = async (leadData) => {
    const api = await apiRequest({
        url: `/lead-captures/lead-mail`,
        method: "post",
        body: leadData,
        header: true,
    });
    return api;
}

export const getLeadData = async ({botCode}) => {
    const api = await apiRequest({
        url: `/bot-leads/botCode/${botCode}`,
        method: "get",
        header: true,
    });
    return api;
}
