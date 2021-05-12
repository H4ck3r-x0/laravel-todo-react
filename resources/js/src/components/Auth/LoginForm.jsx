import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import axios from "axios";
import { AuthContext } from "../../contexts/AuthContexts";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useContext(AuthContext);
    const login = async () => {
        const data = {
            email: email,
            password: password,
        };

        axios
            .post("http://127.0.0.1:8000/api/login", data)
            .then(({ data }) => {
                const userToken = JSON.stringify(data.token);
                const user = JSON.stringify(data.user);
                localStorage.setItem("userToken", userToken);
                localStorage.setItem("user", user);
                auth.setUser(data.user);
            })
            .catch((error) => console.log(error));
    };
    const getCSRFCookie = async () => {
        await axios
            .get(`http://127.0.0.1:8000/sanctum/csrf-cookie`)
            .then((response) => {
                login();
            })
            .catch((error) => console.log(error));
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    if (auth.user) {
        return <Redirect to="/" />;
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl py-4">Login</h1>
            <div className="w-2/3 bg-gray-800 text-white p-8 rounded-lg">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        getCSRFCookie();
                    }}
                >
                    <div className="flex flex-col mb-6">
                        <label
                            htmlFor="email"
                            className="text-sm font-semibold py-2 uppercase"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="py-1 px-4 text-gray-900"
                            // value={email}
                            onChange={(e) => handleEmailChange(e)}
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-6">
                        <label
                            htmlFor="password"
                            className="text-sm font-semibold py-2 uppercase"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="py-1 px-4 text-gray-900"
                            value={password}
                            onChange={(e) => handlePasswordChange(e)}
                        />
                    </div>
                    <div>
                        <button
                            className="bg-gray-600 px-4 py-1 uppercase hover:bg-gray-700 rounded-md"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
