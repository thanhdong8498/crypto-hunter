import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import CryptoContext from "./CryptoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <CryptoContext>
        <Router>
            <App />
        </Router>
    </CryptoContext>
);
