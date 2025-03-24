import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "/src/styles/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter basename="/workout">
        <App />
    </BrowserRouter>
);
