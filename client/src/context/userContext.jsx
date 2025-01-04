import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const useUser = () => {
    const user = useContext(UserContext)
    return user
}

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    return (<UserContext.Provider value={user} setUser={setUser}>
        {children}
    </UserContext.Provider>)
}

export default UserProvider
export { useUser }