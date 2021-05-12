import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userToken = localStorage.getItem("userToken");
        const user = localStorage.getItem("user");

        if (userToken && user) {
            const u = JSON.parse(user);
            setUser(u);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;
