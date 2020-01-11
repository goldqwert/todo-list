import React, { DataHTMLAttributes } from 'react';
import s from './TodoListTask.module.css';
import Select from 'react-select';
import dateFormat from 'dateformat';

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
    changeDescription: (id: string, description: string) => void
    changeStartDate: (id: string, startData: string) => void
    changeDeadline: (id: string, deadline: string) => void
    deleteTask: (id: string) => void
}

interface ISelectedOption {
    value: number
    label: string
}
class TodoListTask extends React.Component<IProps> {

    state = {
        editMode: false,
        title: this.props.task.title,
        description: this.props.task.description,
        // startDate: this.props.task.startDate,
        // deadline: this.props.task.deadline,
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

    deactivateEditMode = () => {
        this.props.changeTitle(this.props.task.id, this.state.title)
        this.props.changeDescription(this.props.task.id, this.state.description)
        // this.props.changeStartDate(this.props.task.id, this.state.startDate)
        // this.props.changeDeadline(this.props.task.id, this.state.deadline)
        this.setState({
            editMode: false
        })
    }

    onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            title: e.currentTarget.value
        })
    }

    onDescriptionChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            description: e.currentTarget.value
        })
    }

    // onStartDateChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     this.setState({
    //         startDate: e.currentTarget.value
    //     }, () => {
    //         console.log(e.currentTarget.value)
    //     })
    // }

    // onDeadlineChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     this.setState({
    //         deadline: e.currentTarget.value
    //     }, () => {
    //         console.log(e.currentTarget)
    //     })
    // }

    changeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.changeStartDate(this.props.task.id, e.currentTarget.value)
    }

    changeDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.changeDeadline(this.props.task.id, e.currentTarget.value)
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
        const classForTasks = this.props.task.status ? `${s.task} ${s.done}` : `${s.task}`;
        let startDate = dateFormat(this.props.task.startDate, 'longDate');
        let deadline = dateFormat(this.props.task.deadline, 'longDate');
        let addedDate = dateFormat(this.props.task.addedDate, 'longDate');
        let priority = ''
        switch (this.props.task.priority) {
            case 0: priority = 'Low'; break;
            case 1: priority = 'Middle'; break;
            case 2: priority = 'Hight'; break;
            case 3: priority = 'Urgently'; break;
            case 4: priority = 'Later'; break;
        }
        return (
            <div className={s.tasks}>
                <div className={classForTasks}>
                    {this.state.editMode
                        ? <>Task name:<input onChange={this.onTitleChanged} autoFocus={true}
                            value={this.state.title} />
                            <div>Description: <textarea onChange={this.onDescriptionChanged} value={this.state.description} /></div>
                            <div>Priority:<Select
                                options={options}
                                onChange={this.handleChange}
                                value={this.state.selectedOption}
                                onBlur={this.deactivateEditMode}
                            /></div>
                            <label>Created by: <input type='date' onChange={this.changeStartDate} /></label>
                            <div>Deadline: <input type='date' onChange={this.changeDeadline} /></div>
                            <button onClick={this.deactivateEditMode}>Save</button></>
                        : <div className={s.borderForWord}>
                            <div><button onClick={this.deleteTask} className={s.deleteBtn}>X</button>
                                <input onChange={this.onChangeStatus} type='checkbox' checked={this.props.task.status} />
                                <span className={s.border}>{this.props.task.title}</span>
                                <button onClick={this.activateEditMode}></button></div>
                            <p>Description: <span>{this.props.task.description}</span></p>
                            <p>Start date: <span>{startDate}</span></p>
                            <p>Deadline: <span>{deadline}</span></p>
                            <p>Added date: <span>{addedDate}</span></p>
                            <p>Priority: <span>{priority}</span></p>
                        </div>}
                    <hr />
                </div>
            </div >
        );
    }
}

export default TodoListTask;
