import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

    // constructor(props) {
    //     super(props)
    // }

    onChangeStatus = (event) => {
        let status = event.currentTarget.checked
        this.props.changeStatus(this.props.task, status)
    }

    render = () => {
        return (
            <div className="todoList-tasks">
                <div className="todoList-task">
                    <input onChange={this.onChangeStatus} type="checkbox" checked={this.props.task.isDone} />
                    <span>{this.props.task.title}, priority: {this.props.task.priority}</span>
                </div>
            </div>
        );
    }
}

export default TodoListTask;
