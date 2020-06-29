import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import {Draggable} from "react-beautiful-dnd";
import Icon from "@material-ui/core/Icon";
import TrelloForm from "./TrelloForm";
import {editCard, deleteCard} from "../actions";
import {connect} from "react-redux";
import TrelloButton from "./TrelloButton";
import c from "./Trello.module.css"


const TrelloCard = React.memo(({text, id, listID, index, dispatch}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [cardText, setText] = useState(text);


    const closeForm = () => {
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const saveCard = e => {
        e.preventDefault();

        dispatch(editCard(id, listID, cardText));
        setIsEditing(false);
    };

    const handleDeleteCard = () => {
        dispatch(deleteCard(id, listID));
    };

    const renderEditForm = () => {
        return (
            <TrelloForm text={cardText} onChange={handleChange} closeForm={closeForm}>
                <TrelloButton onClick={saveCard}>Save</TrelloButton>
            </TrelloForm>
        );
    };

    const renderCard = () => {
        return (
            <Draggable draggableId={String(id)} index={index}>
                {provided => (
                    <div className={c.CardContainer}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         ref={provided.innerRef}
                         onDoubleClick={() => setIsEditing(true)}
                    >
                        <Card>
                            <Icon className={c.EditButton}
                                  onMouseDown={() => setIsEditing(true)}
                                  fontSize="small"
                            >
                                edit
                            </Icon>
                            <Icon className={c.DeleteButton} fontSize="small" onMouseDown={handleDeleteCard}>
                                delete
                            </Icon>
                            <CardContent>
                                <Typography>{text}</Typography>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </Draggable>
        );
    };

    return isEditing ? renderEditForm() : renderCard();
});

export default connect()(TrelloCard);
