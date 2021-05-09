import React from "react";
import AuthProvider from "./contexts/AuthContexts";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import ReactDOM from "react-dom";
import LoginFrom from "./components/Auth/LoginForm";
import Header from "./components/Header/Header";

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="container mx-auto p-6">
                    <Header />
                    <Switch>
                        <Route path="/login">
                            <LoginFrom />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;

if (document.querySelector("#root")) {
    ReactDOM.render(<App />, document.querySelector("#root"));
}
