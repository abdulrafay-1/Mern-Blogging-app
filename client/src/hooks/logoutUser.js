import { toast } from "react-toastify";
import { useUser } from "../context/userContext";
import { instance } from "../utils/axiosIstance";
import { useNavigate } from "react-router";

const useLogout = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();

    const logoutUser = async () => {
        try {
            await instance.get(`logout`);
            localStorage.removeItem("authTokens");
            localStorage.removeItem("user");

            toast.success("Logout Successful!", {
                autoClose: 2500,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
            });
            navigate("/login")

            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Logout failed. Please try again.");
        }
    };

    return logoutUser;
};

export default useLogout;
