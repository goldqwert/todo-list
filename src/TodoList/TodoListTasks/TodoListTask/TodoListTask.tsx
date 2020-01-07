import React from 'react';
import s from './TodoListTask.module.css';

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

    onTitleChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            title: e.currentTarget.value
        })
    }

    deleteTask = () => {
        this.props.deleteTask(this.props.task.id)
    }

    render = () => {
        let classForTasks = this.props.task.status ? `${s.task} ${s.done}` : `${s.task}`;
        let priority = ''
        switch (this.props.task.priority) {
            case 0: priority = 'Low'; break;
            case 1: priority = 'Middle'; break;
            case 2: priority = 'Hight'; break;
            case 3: priority = 'Urgently'; break;
            case 4: priority = 'Later'; break;
        }
        return (
            <div className={`${s.todoListtasks} ${s.done}`}>
                <div className={classForTasks}>
                    {this.state.editMode
                        ? <textarea onChange={this.onTitleChanged} onBlur={this.deactivateEditMode} autoFocus={true}
                            value={this.state.title} className={s.element} />
                        : <div className={s.borderForWord}><button onClick={this.deleteTask} className={s.deleteBtn}>X</button>
                            <input onChange={this.onChangeStatus} type="checkbox" checked={this.props.task.status} />
                            <span onClick={this.activateEditMode} className={s.border}>{this.props.task.title}</span>
                        </div>}
                    priority: {priority}
                    <hr />
                </div>
            </div>
        );
    }
}

export default TodoListTask;
