import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {GlobalStyles} from "./components/styles/Global.styles";


ReactDOM.render(
    <>
        <App/>
        <GlobalStyles/>
    </>
        ,document.getElementById("root")
);