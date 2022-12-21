import React, {ReactNode} from "react";
import {touchToMouse} from "./Draggable";

type ClickableProps = {
    children: ReactNode,
    onClick: (e: React.MouseEvent | React.Touch) => void,
}

export default function Clickable(props: ClickableProps) {
    return <div
        onMouseDown={props.onClick}
        onTouchStart={(e) => touchToMouse(e, props.onClick)}
    >
        {props.children}
    </div>
}