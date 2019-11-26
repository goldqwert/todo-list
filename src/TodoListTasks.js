import React from 'react';
import './App.css';
import TodoListTask from './TodoListTask';

class TodoListTasks extends React.Component {
    render = () => {

        let tasksElement = this.props.tasks.map((t) => {
            return <TodoListTask task={t} changeStatus={this.props.changeStatus} changeTitle={this.props.changeTitle}
            deleteTask={this.props.deleteTask}/>
        })

        return (
            <div className="todoList-tasks">
                {tasksElement}
            </div>
        );
    }
}

export default TodoListTasks;

