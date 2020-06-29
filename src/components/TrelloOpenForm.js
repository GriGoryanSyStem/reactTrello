import React from "react";
import Icon from "@material-ui/core/Icon";
import c from "./Trello.module.css"

const TrelloOpenForm = ({list, children, onClick}) => {
    return (
        <div className={c.OpenFormButton} onClick={onClick}>
            <Icon>add</Icon>
            <p style={{flexShrink: 0}}>{children}</p>
        </div>
    );
};

export default TrelloOpenForm;
