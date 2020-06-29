import React from "react";
import c from "./Trello.module.css"

const TrelloButton = ({children, onClick}) => {
    return (
        <button className={c.StyledButton} onMouseDown={onClick}>
            {children}
        </button>
    );
};

export default TrelloButton;
