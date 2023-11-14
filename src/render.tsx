import ReactDOM from "react-dom";
import {App} from "./App";
import {addNewPost, StateType} from "./redux/state";
import {GlobalStyles} from "./components/styles/Global.styles";
import React from "react";

export const rerenderEntireTree = (state:StateType)=> {

    ReactDOM.render(
        <>
            <App state={state} addNewPost={addNewPost}/>
    <GlobalStyles/>
    </>
        , document.getElementById("root")
);
}