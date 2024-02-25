import React, {useEffect} from "react";
import "./App.css";
import styled from "styled-components";
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Footer} from "./components/Footer/Footer";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Users} from "./components/Users/Users";
import {Music} from "./components/Music/Music";
import {News} from "./components/News/News";
import {Settings} from "./components/Settings/Settings";
import {DialogsPage} from "./components/Messages/DialogsPage";
import {MessagesWithUser} from "./components/Messages/MessagesWithUser";
import {Login} from "./components/Login/Login";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {Spin} from "antd";
import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";
import {authMe} from "./redux/auth-reducer";




export const App: React.FC = () => {

    const dispatch = useAppDispatch()
    const isInitialize = useAppSelector(state => state.appPage.isInitialize)
    const isAuth = useAppSelector(state => state.authPage.isAuth)

const routes = [
    { path: "/", render: <Profile />, exact: true, private: true },
    { path: "/profile/:id", render: <Profile />, exact: true, private: true },
    { path: "/profile", render: <Profile />, exact: true, private: true },
    {path:"/messages", render:<DialogsPage/>, exact:true, private:true},
    {path:"/messages/:id", render:<MessagesWithUser/>, exact:false, private:true},
    {path:"/users", render:<Users/>, exact:false, private:false},
    {path:"/music", render:<Music/>, exact:false, private:true},
    {path:"/settings", render:<Settings/>, exact:false, private:true},
    {path:"/news", render: <News/>, exact:false, private:true},
    {path:"/login", render:<Login/>, exact:false, private:true},
]

    useEffect(() => {
        dispatch(authMe())
    }, [])

    return (
        <BrowserRouter>
            <MainWrapper>
                <Header/>
                <Navbar/>
                    <StyledMain>
                        {isInitialize ?
                            <Loader>
                                <Spin indicator={<LoadingOutlined style={{fontSize: 60}} spin rev={undefined} />} />
                            </Loader>

                        :
                        isAuth ? <>
                            {routes.map(r=>
                                <Route key={r.path} path={r.path} render={() => r.render} exact={r.exact}/>)}
                        </>
                        :
                        <Switch>
                            {routes.filter(r=>!r.private).map( r=>
                                <Route key={r.path} path={r.path} render={() => r.render} exact={r.exact}/>)}
                            <Route path="*" render={() => < Login/>}/>
                        </Switch>
                        }
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
const Loader = styled.div`
  text-align: center;
  top:50%;
  transform: translate(0,-100%);
  position: relative;
`