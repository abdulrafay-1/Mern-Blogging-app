import axios from "axios";
import { jwtDecode } from "jwt-decode";

let authToken = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { 'authorization': `${authToken?.accessToken}` }
});

instance.interceptors.request.use(async (req) => {
    authToken = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
    if (authToken) {
        const decoded = jwtDecode(authToken.accessToken);
        const isExpired = decoded.exp * 1000 < Date.now();
        console.log(isExpired)
        if (isExpired) {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}generatetoken`, {
                refreshToken: authToken.refreshToken
            })
            console.log(data)
            localStorage.setItem("authTokens", JSON.stringify({
                accessToken: data.accessToken,
                refreshToken: authToken.refreshToken
            }))
            req.headers.authorization = data.accessToken
        } else {
            req.headers.authorization = authToken.accessToken
        }
    }
    return req
})

export { instance }