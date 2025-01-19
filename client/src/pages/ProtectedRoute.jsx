import { useEffect } from 'react'
import { useNavigate } from 'react-router';
import useLogout from '../hooks/logoutUser';
import axios from 'axios';
import { instance } from '../utils/axiosIstance';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
    const authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
    const logout = useLogout()

    const checkTokens = async () => {
        if (authTokens) {
            try {
                await instance.post(`${import.meta.env.VITE_API_URL}authenticate`, {}, {
                })
            } catch (error) {
                console.log(error)
                navigate("/login")
                logout()
            }
        } else {
            logout()
            navigate("/login")
        }
    }

    useEffect(() => {
        checkTokens()
    }, [])

    if (!authTokens) {
        return null
    }

    return children
}

export default ProtectedRoute