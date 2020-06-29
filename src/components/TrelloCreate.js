import React from "react";
import TrelloButton from "./TrelloButton";
import {connect} from "react-redux";
import {addList, addCard} from "../actions";
import TrelloForm from "./TrelloForm";
import TrelloOpenForm from "./TrelloOpenForm";

class TrelloCreate extends React.PureComponent {
    state = {
        formOpen: false,
        text: ""
    };

    openForm = () => {
        this.setState({
            formOpen: true
        });
    };

    closeForm = () => {
        this.setState({
            formOpen: false
        });
    };

    handleInputChange = (e) => {
        this.setState({
            text: e.target.value
        });
    };

    handleAddList = () => {
        const {dispatch} = this.props;
        const {text} = this.state;

        if (text) {
            this.setState({
                text: ""
            });
            dispatch(addList(text));
        }
        return null
    };

    handleAddCard = () => {
        const {dispatch, listID} = this.props;
        const {text} = this.state;

        if (text) {
            this.setState({
                text: ""
            });
            dispatch(addCard(listID, text));
        }
    };

    render() {
        const {text} = this.state;
        const {list} = this.props;
        return this.state.formOpen ? (
            <TrelloForm
                text={text}
                onChange={this.handleInputChange}
                closeForm={this.closeForm}
            >
                <TrelloButton onClick={list ? this.handleAddList : this.handleAddCard}>
                    {list ? "Add List" : "Add Card"}
                </TrelloButton>
            </TrelloForm>
        ) : (
            <TrelloOpenForm list={list} onClick={this.openForm}>
                {list ? "Add List" : "Add Card"}
            </TrelloOpenForm>
        );
    }
}

export default connect()(TrelloCreate);
