import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContexts";
import { Link } from "react-router-dom";

const Navigation = () => {
    const authUser = useContext(AuthContext);
    return (
        <nav>
            {authUser.user ? (
                <ul className="flex space-x-10">
                    <li>
                        <Link to={"/login"}>{authUser.user.name}</Link>
                    </li>
                    <li>
                        <a href="#">Logout</a>
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
