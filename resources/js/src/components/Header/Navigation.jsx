import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContexts";
import { Link } from "react-router-dom";
import axios from "axios";
const Navigation = () => {
    const authUser = useContext(AuthContext);

    const handleLogout = async () => {
        const userToken = JSON.parse(localStorage.getItem("userToken"));
        let config = {
            headers: {
                Authorization: "Bearer " + userToken,
            },
        };
        axios
            .post("http://127.0.0.1:8000/api/logout", {}, config)
            .then((response) => {
                localStorage.clear("userToken");
                authUser.setUser(null);
            })
            .catch((error) => console.log(error));
    };

    return (
        <nav>
            {authUser.user ? (
                <ul className="flex space-x-10">
                    <li>
                        <Link to={"/profile"}>{authUser.user.name}</Link>
                    </li>
                    <li>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-3 py-1 text-white text-xs font-semibold rounded-md"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            ) : (
                <ul className="flex space-x-10">
                    <li>
                        <Link to={"/login"}>Login</Link>
                    </li>
                    <li>
                        <a href="#">Register</a>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navigation;
