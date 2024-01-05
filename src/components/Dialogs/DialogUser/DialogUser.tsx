import React from "react";
import {NavLink} from "react-router-dom";

export const DialogUsersItem: React.FC<{ id: number, name: string }> = ({id, name}) => {

        return <li><NavLink to={`/dialogs/id${id}`}>{name}</NavLink></li>
    }
