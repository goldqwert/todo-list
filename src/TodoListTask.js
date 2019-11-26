import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

    // constructor(props) {
    //     super(props)
    // }


    state = {
        editMode: false
    }

    onChangeStatus = (event) => {
        let status = event.currentTarget.checked
        this.props.changeStatus(this.props.task.id, status)
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
    }

    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value)
    }



    render = () => {

        let classForTasks = this.props.task.isDone === true ? 'todoList-task done' : 'todoList-task';

        return (
            <div className="todoList-tasks done">
                <div className={classForTasks}>
                    <input onChange={this.onChangeStatus} type="checkbox" checked={this.props.task.isDone} />
                    {this.state.editMode
                        ? <input onChange={this.onTitleChanged} onBlur={this.deactivateEditMode} autoFocus={true} value={this.props.task.title} />
                        : <span onClick={this.activateEditMode}>{this.props.task.id} - {this.props.task.title}</span>},
                        priority: {this.props.task.priority} <button onClick={this.props.deleteTask}>X</button>
                </div>
            </div>
        );
    }
}

export default TodoListTask;
