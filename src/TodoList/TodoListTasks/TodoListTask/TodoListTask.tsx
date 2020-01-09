import React from 'react';
import s from './TodoListTask.module.css';
import Select from 'react-select';

const options = [
    { value: 0, label: 'Low' },
    { value: 1, label: 'Middle' },
    { value: 2, label: 'Hight' },
    { value: 3, label: 'Urgently' },
    { value: 4, label: 'Later' }
];
interface IProps {
    task: any
    changeStatus: (id: string, status: number) => void
    changeTitle: (id: string, title: string) => void
    changePriority: (id: string, priority: number) => void
    deleteTask: (id: string) => void
}

interface ISelectedOption {
    value: number
    label: string
}
class TodoListTask extends React.Component<IProps> {

    state = {
        editMode: false,
        editModeForForm: false,
        title: this.props.task.title,
        error: false,
        selectedOption: null
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

    activateFormEditMode = () => {
        this.setState({
            editModeForForm: true
        })
    }

    deactivateEditMode = () => {
        this.props.changeTitle(this.props.task.id, this.state.title)
        this.setState({
            editMode: false
        })
    }

    deactivateFormEditMode = () => {
        this.setState({
            editModeForForm: false
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

    handleChange = (selectedOption: any) => {
        this.setState(
            { selectedOption },
            () => this.props.changePriority(this.props.task.id, selectedOption.value)
        );
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
                            <input onChange={this.onChangeStatus} type='checkbox' checked={this.props.task.status} />
                            <span onClick={this.activateEditMode} className={s.border}>{this.props.task.title}</span>
                        </div>}
                    {this.state.editModeForForm
                        ? <Select
                            options={options}
                            onChange={this.handleChange}
                            value={this.state.selectedOption}
                            onBlur={this.deactivateFormEditMode}
                        />
                        : <div onClick={this.activateFormEditMode}>priority: {priority}</div>}
                    <hr />
                </div>
            </div >
        );
    }
}

export default TodoListTask;
