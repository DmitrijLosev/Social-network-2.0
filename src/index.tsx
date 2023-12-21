import React from "react";
import "./index.css";
import {store} from "./redux/state"
import ReactDOM from "react-dom";
import {App} from "./App";
import {GlobalStyles} from "./components/styles/Global.styles";


const rerenderEntireTree = ()=> {

    ReactDOM.render(
        <>
            <App state={store.getState()} dispatch={store.dispatch.bind(store)}
                />
            <GlobalStyles/>
        </>
        , document.getElementById("root")
    );
}

rerenderEntireTree();

store.subscribe(rerenderEntireTree)