import React from "react";
import Icon from "@material-ui/core/Icon";
import Textarea from "react-textarea-autosize";
import Card from "@material-ui/core/Card";
import c from "./Trello.module.css"

const TrelloForm = React.memo(
    ({list, text = "", onChange, closeForm, children}) => {
        const placeholder = list
            ? "Enter list title..."
            : "Enter a title for this card...";

        return (
            <div className={c.Container}>
                <Card className={c.StyledCard}>
                    <Textarea className={c.StyledTextArea}
                              placeholder={placeholder}
                              autoFocus
                              value={text}
                              onChange={e => onChange(e)}
                              onBlur={closeForm}
                    />
                </Card>
                <div className={c.ButtonContainer}>
                    {children}
                    <Icon className={c.StyledIcon} onMouseDown={closeForm}>close</Icon>
                </div>
            </div>
        );
    }
);

export default TrelloForm;
