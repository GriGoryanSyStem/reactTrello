import React, {PureComponent} from "react";
import TrelloList from "./TrelloList";
import {connect} from "react-redux";
import TrelloCreate from "./TrelloCreate";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {sort} from "../actions";
import c from './Trello.module.css'


class App extends PureComponent {
    onDragEnd = result => {
        const {destination, source, draggableId, type} = result;
        if (!destination) {
            return;
        }
        this.props.dispatch(
            sort(
                source.droppableId,
                destination.droppableId,
                source.index,
                destination.index,
                draggableId,
                type
            )
        );
    };

    render() {
        const {lists} = this.props;
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="all-lists" direction="horizontal" type="list">
                    {provided => (
                        <div className={c.ListsContainer}
                             {...provided.droppableProps}
                             ref={provided.innerRef}
                        >
                            {lists.map((list, index) => (
                                <TrelloList
                                    listID={list.id}
                                    key={list.id}
                                    title={list.title}
                                    cards={list.cards}
                                    index={index}
                                />
                            ))}
                            {provided.placeholder}
                            <TrelloCreate list/>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

const mapStateToProps = state => ({
    lists: state.lists
});

export default connect(mapStateToProps)(App);
