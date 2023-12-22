import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import {App} from "./App";
import {GlobalStyles} from "./components/styles/Global.styles";
import {store} from "./redux/redux-store";
import {Provider} from "react-redux";




    ReactDOM.render(
        <Provider store={store}>
            <App />
            <GlobalStyles/>
        </Provider>
        , document.getElementById("root")
    );


store.subscribe(()=>
    ReactDOM.render(
        <Provider store={store}>
            <App />
            <GlobalStyles/>
        </Provider>
        , document.getElementById("root")
    )
)

