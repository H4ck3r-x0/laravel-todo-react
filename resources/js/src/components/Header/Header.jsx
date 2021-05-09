import { Link } from "react-router-dom";

import Navigation from "./Navigation";
const Header = () => {
    return (
        <header className="flex justify-between">
            <h1>
                <Link to={"/"}>Logo</Link>
            </h1>
            <Navigation />
        </header>
    );
};

export default Header;
