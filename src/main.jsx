import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { StoreProvider } from "easy-peasy";

import { store } from "./redux/store";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <StoreProvider store={store}>
            <Router>
                <App />
            </Router>
        </StoreProvider>
    </React.StrictMode>
);
