import React from 'react';
import './App.css';

class TodoListHeader extends React.Component {

    newTaskTitleRef = React.createRef();

    onAddTaskButtonClick = () => {
        let newText = this.newTaskTitleRef.current.value;
        this.newTaskTitleRef.current.value = '';
        this.props.addTask(newText);
    }

    render = () => {
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input ref={this.newTaskTitleRef} type="text" placeholder="New task name" />
                    <button onClick={this.onAddTaskButtonClick}>Add</button>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;