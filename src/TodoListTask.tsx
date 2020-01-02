import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

    state = {
        editMode: false,
        title: this.props.task.title
    }

    onChangeStatus = (e) => {
        let status = e.currentTarget.checked ? 2 : 0
        this.props.changeStatus(this.props.task.id, status)
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.props.changeTitle(this.props.task.id, this.state.title)
        this.setState({
            editMode: false
        })
    }

    onTitleChanged = (e) => {
        this.setState({
            title: e.currentTarget.value
        })
    }

    deleteTask = () => {
        this.props.deleteTask(this.props.task.id)
    }

    render = () => {
        let classForTasks = this.props.task.status ? 'todoList-task done' : 'todoList-task';
        let priority = ''
        switch (this.props.task.priority) {
            case 0: priority = 'Low'; break;
            case 1: priority = 'Middle'; break;
            case 2: priority = 'Hight'; break;
            case 3: priority = 'Urgently'; break;
            case 4: priority = 'Later'; break;
        }
        return (
            <div className="todoList-tasks done">
                <div className={classForTasks}>
                    <input onChange={this.onChangeStatus} type="checkbox" checked={this.props.task.status} />
                    {this.state.editMode
                        ? <input onChange={this.onTitleChanged} onBlur={this.deactivateEditMode} autoFocus={true} value={this.state.title} />
                        : <span onClick={this.activateEditMode}>{this.props.task.title}</span>},
                        priority: {priority} <button onClick={this.deleteTask}>X</button>
                </div>
            </div>
        );
    }
}

export default TodoListTask;
