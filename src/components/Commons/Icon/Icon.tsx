import React from 'react';
import sprite from './../../../assets/images/sprite.svg'


type IconPropsType = {
    iconId:string;
    height?:string;
    width?:string;
    viewBox?:string;
}
export const Icon:React.FC<IconPropsType> = (props) => {
    return (
        <svg role={"graphics-document"} aria-label="icon" height={props.height || "50px"} width={props.width || "50px"} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
             viewBox={props.viewBox ||"0 0 502.664 502.664"}>
            <use xlinkHref={`${sprite}#${props.iconId}`}/>
        </svg>
    );
};

