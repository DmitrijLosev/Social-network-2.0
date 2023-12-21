import React, {Dispatch} from "react";
import "./App.css";
import styled from "styled-components";
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Footer} from "./components/Footer/Footer";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom";
import {Users} from "./components/Users/Users";
import {Music} from "./components/Music/Music";
import {News} from "./components/News/News";
import {Settings} from "./components/Settings/Settings";
import {ActionsType, DialogsPageStateType, ProfilePageStateType} from "./redux/state";
import {ProfileActionsType} from "./redux/profile-reducer";
import {DialogActionsType} from "./redux/dialog-reducer";

export type DialogUsersType = { dialogUsers: DialogUserType[] }
export type DialogUserType = {
    id: number
    name: string
}
export type MessagesType = { messages: MessageType[] }
export type MessageType = {
    id: number
    message: string
}


export type PostType = {
    id: number
    post: string
    likesCount: number
    dislikesCount: number
}

type AppPropsType = {
    state: { profilePage: ProfilePageStateType, dialogsPage: DialogsPageStateType }
    dispatch:Dispatch<ActionsType>
}

export const App: React.FC<AppPropsType> = ({state, dispatch}) => {



    return (
        <BrowserRouter>
            <MainWrapper>
                <Header/>
                <Navbar/>
                <StyledMain>
                    <Route path="/profile"
                           render={() => < Profile profilePage={state.profilePage} dispatch={dispatch}/>}/>
                    <Route path="/dialogs"
                           render={() => <Dialogs dialogsPage={state.dialogsPage} dispatch={dispatch}/>}/>
                    <Route path="/users" render={() => <Users/>}/>
                    <Route path="/music" render={() => <Music/>}/>
                    <Route path="/settings" render={() => <Settings/>}/>
                    <Route path="/news" render={() => <News/>}/>
                </StyledMain>
                <Footer/>
            </MainWrapper>
        </BrowserRouter>
    );
}


const MainWrapper = styled.div`
  display: grid;
  grid-template-areas: "h h" "a m" "a f";
  grid-template-rows: 100px 1fr 50px;
  grid-template-columns: 2fr 8fr;
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
`
const StyledMain = styled.main`
  grid-area: m;
  background-color: cadetblue;
  padding: 10px 10px;
`
