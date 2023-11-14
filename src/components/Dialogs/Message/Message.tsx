import React from "react";

export const MessageItem: React.FC<{ message: string }> = ({message}) => {
    return <li><span>{message}</span></li>
}