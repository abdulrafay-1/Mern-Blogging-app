import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

let authToken = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { 'authorization': `${authToken?.accessToken}` }
});
instance.interceptors.request.use(async (req) => {
    authToken = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
    if (authToken) {
        const decoded = jwtDecode(authToken.accessToken);
        const isExpired = decoded.exp < Date.now() / 1000;
        console.log(isExpired)
        if (isExpired) {
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}generatetoken`, {
                    refreshToken: authToken.refreshToken
                })
                localStorage.setItem("authTokens", JSON.stringify({
                    accessToken: data.accessToken,
                    refreshToken: authToken.refreshToken
                }))
                req.headers.authorization = data.accessToken
            } catch (error) {
                localStorage.clear()
                useNavigate("./")
            }

        } else {
            req.headers.authorization = authToken.accessToken
        }
    }
    return req
})

export { instance }