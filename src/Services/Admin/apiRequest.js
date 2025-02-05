import axios from "axios";
let baseurl = process.env.REACT_APP_BASE_URL;

 export const apiRequest = async ({ url, method, body, header }) => {
    let auth = { baseURL: baseurl };
    if (header) {
        const headers =  { "authorization": localStorage.getItem("token") } 
        auth = { headers, baseURL: baseurl };
    }

    switch (method) {
        case "post":
            return await axios.post(url, body, auth)
        case "get":
            return await axios.get(url, auth);
        case "put":
            return await axios.put(url, body, auth);
        case "patch":
            return await axios.patch(url, body, auth);
        case "delete":
            return await axios.delete(url, auth);
        default:
            return false;
    }
};