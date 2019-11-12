import React from 'react';
import './App.css';

class TodoListHeader extends React.Component {

    state = {
        error: false,
        title: ''
    }

    onAddItemButtonClick = () => {
        let newText = this.state.title;
        if (newText === "") {
            this.setState({
                error: true,
            })
        } else {
            this.setState({
                error: false,
                title: ''
            })
        }
        this.props.addItem(newText);
    }

    onChangeErrorClick = () => {
        this.setState({
            error: false
        })
    }

    changeOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onAddItemButtonClick()
        }
    }

    changeValueTitle = (event) => {
        let status = event.currentTarget.value;
        this.setState({
            title: status
        })
    }

    render = () => {

        let classForError = this.state.error === true ? 'error' : '';

        return (
            <div className="todoList-header">
                <div className="todoList-newTaskForm">
                    <input type="text" placeholder="New task name" onKeyPress={this.changeOnKeyPress} onChange={this.onChangeErrorClick}
                        className={classForError}
                        value={this.state.title}
                        onChange={this.changeValueTitle} />
                    <button onClick={this.onAddItemButtonClick}>Add</button>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;