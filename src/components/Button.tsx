import { JSX } from "react";

  
export default function Button(props : 
                                {
                                    onClick: () => void;
                                    className?: string;
                                    icon?: string;
                                    text?: string;
                                    children?: JSX.Element;
                                }) {


    return (
        <button className={props.className} onClick={props.onClick}>
        {(props.icon !== undefined) &&
            <img src={props.icon}></img>}
        {(props.text !== undefined) &&
            <span>{props.text}</span>
        }
        {props.children !== undefined &&
        props.children}
        </button>
    )
}