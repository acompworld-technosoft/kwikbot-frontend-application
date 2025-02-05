import { apiRequest } from "../../Services/Admin/apiRequest";




//================= get all user api call ================= 
export const getAllUser = async () => {
    const api = await apiRequest({
        url: `/users/all`,
        method: "get",
        header: true,
    });
    return api.data;
}



export const getUserById = async ({ userid }) => {
    const api = await apiRequest({
        url: `/users/${userid}`,
        method: "get",
        header: true,
    });
    console.log(api.data);
    return api.data;
}

//----------------- admin panel add new client api call----------------- 
export const userRegister = async ({newData}) => {
    const api = await apiRequest({
        url: `/clients`,
        method: "post",
        body: newData,
        header: true,
    });
    return api.data;
}

///=========== get all transaction of the client through the client id   ================
export const getAllTransaction = async ({clientId}) => {
    const api = await apiRequest({
        url: `/payment/admin/client/${clientId}`,
        method: "get",
        header: true,
    });
    return api.data;
}

///=========== get all transaction of the client    ================
export const getAllTransactionData = async () => {
    const api = await apiRequest({
        url: `/payment/all`,
        method: "get",
        header: true,
    });
    return api.data;
}

///=========== get client data by id   ================
export const getSingleClientData = async ({clientId}) => {
    const api = await apiRequest({
        url: `/clients/${clientId}`,
        method: "get",
        header: true,
    });
    return api.data;
}

///==========  update client detail by id   ================
export const updateClientData = async ({clientId, newData}) => {
    const api = await apiRequest({
        url: `/clients/${clientId}`,
        method: "put",
        body: newData,
        header: true,
    });
    return api.data;
}
