import React, { DataHTMLAttributes } from 'react';
import s from './TodoListTask.module.css';
import Select from 'react-select';
import dateFormat from 'dateformat';

interface IProps {
    onTitleChanged: (e: React.ChangeEvent<HTMLInputElement>) => void
    onDescriptionChanged: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    handleChange: (selectedOption: any) => void
    deactivateEditMode: () => void
    changeStartDate: (e: React.ChangeEvent<HTMLInputElement>) => void
    changeDeadline: (e: React.ChangeEvent<HTMLInputElement>) => void
    title: string
    description: string
    selectedOption: any
}
interface ISelectedOption {
    value: number
    label: string
}
class TodoListTaskFormEdit extends React.Component<IProps> {
    render = () => {
        const options: ISelectedOption[] = [
            { value: 0, label: 'Low' },
            { value: 1, label: 'Middle' },
            { value: 2, label: 'Hight' },
            { value: 3, label: 'Urgently' },
            { value: 4, label: 'Later' }
        ];
        return (<><div><span>Task name:</span><input className={s.taskChangeElement} onChange={this.props.onTitleChanged} autoFocus={true}
            value={this.props.title} /></div>
            <div><span>Description:</span><textarea className={s.taskChangeElement} onChange={this.props.onDescriptionChanged}
                value={this.props.description} /></div>
            <div><span>Priority:</span><Select options={options} onChange={this.props.handleChange} className={s.taskSelectPriority}
                value={this.props.selectedOption}
                onBlur={this.props.deactivateEditMode}
            /></div>
            <div><span>Created by: </span><input className={s.taskChangeElement} type='date' onChange={this.props.changeStartDate} /></div>
            <div><span>Deadline: </span><input className={s.taskChangeElement} type='date' onChange={this.props.changeDeadline} /></div>
            <button className={s.taskInfoBtnSave} onClick={this.props.deactivateEditMode}>Save</button></>
        );
    }
}

export default TodoListTaskFormEdit;
