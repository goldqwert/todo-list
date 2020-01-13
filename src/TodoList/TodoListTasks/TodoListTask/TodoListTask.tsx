import React from 'react';
import s from './TodoListTask.module.css';
import TodoListTaskFormEdit from './TodoListTaskFormEdit';
import TodoListTaskFormInfo from './TodoListTaskFormInfo';
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
class TodoListTask extends React.Component<IProps> {

    state = {
        editMode: false,
        title: this.props.task.title,
        description: this.props.task.description,
        error: false,
        selectedOption: null,
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
        return (
            <div className={s.tasks}>
                <div className={classForTasks}>
                    {this.state.editMode
                        ? <TodoListTaskFormEdit onTitleChanged={this.onTitleChanged} onDescriptionChanged={this.onDescriptionChanged}
                            title={this.state.title} description={this.state.description} handleChange={this.handleChange}
                            selectedOption={this.state.selectedOption} deactivateEditMode={this.deactivateEditMode}
                            changeStartDate={this.changeStartDate} changeDeadline={this.changeDeadline} />
                        : <TodoListTaskFormInfo deleteTask={this.deleteTask} activateEditMode={this.activateEditMode} task={this.props.task}
                            onChangeStatus={this.onChangeStatus}
                        />}
                </div>
            </div >
        );
    }
}

export default TodoListTask;
