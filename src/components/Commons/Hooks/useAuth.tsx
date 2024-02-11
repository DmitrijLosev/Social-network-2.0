import { useAppSelector } from "../../../redux/hooks";
import {Redirect} from "react-router-dom";
import React from "react";


export const useAuth = ():JSX.Element | null => {
    const isAuth = useAppSelector(state => state.authPage.isAuth);

    if (!isAuth) {
        return <Redirect to={"/login"}/>
    } else return null

};