import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const useUser = () => {
    const user = useContext(UserContext)
    return user
}

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState(null);

    useEffect(() => {
        const localUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if (localUser) {
            setUser(localUser)
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, blogs, setBlogs, setUser }} >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
export { useUser }