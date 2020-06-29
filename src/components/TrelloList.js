import React from "react";
import TrelloCard from "./TrelloCard";
import TrelloCreate from "./TrelloCreate";
import {Droppable, Draggable} from "react-beautiful-dnd";
import c from "./Trello.module.css"


const TrelloList = React.memo(({title, cards, listID, index}) => {
    return (
        <Draggable draggableId={String(listID)} index={index}>
            {provided => (
                <div className={c.ListContainer}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     ref={provided.innerRef}
                >
                    <Droppable droppableId={String(listID)} type="card">
                        {provided => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                <h4>{title}</h4>

                                {cards.map((card, index) => (
                                    <TrelloCard
                                        key={card.id}
                                        text={card.text}
                                        id={card.id}
                                        index={index}
                                        listID={listID}
                                    />
                                ))}
                                {provided.placeholder}
                                <TrelloCreate listID={listID}/>
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
});

export default TrelloList;
