import React from 'react';
import './App.css';

interface IProps {
    task: any
    changeStatus: (id: string, status: number) => void
    changeTitle: (id: string, title: string) => void
    deleteTask: (id: string) => void
}
class TodoListTask extends React.Component<IProps> {

    state = {
        editMode: false,
        title: this.props.task.title,
        error: false
    }

    onChangeStatus = (e: React.FormEvent<HTMLInputElement>) => {
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

    onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
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

                    {this.state.editMode
                        ? <input onChange={this.onTitleChanged} onBlur={this.deactivateEditMode} autoFocus={true}
                            value={this.state.title} />
                        : <div><input onChange={this.onChangeStatus} type="checkbox" checked={this.props.task.status} />
                            <span onClick={this.activateEditMode} className='border'>{this.props.task.title}</span>
                        </div>}
                    priority: {priority} <button onClick={this.deleteTask}>X</button>
                    <hr />
                </div>
            </div>
        );
    }
}

export default TodoListTask;
