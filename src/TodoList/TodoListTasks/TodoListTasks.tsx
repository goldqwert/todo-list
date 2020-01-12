import React from 'react';
import s from './TodoListTask/TodoListTask.module.css';
import TodoListTask from './TodoListTask/TodoListTask';

interface IProps {
    changeStatus: (id: string, status: number) => void
    changeTitle: (id: string, title: string) => void
    changePriority: (id: string, priority: number) => void
    changeDescription: (id: string, description: string) => void
    changeStartDate: (id: string, startDate: string) => void
    changeDeadline: (id: string, deadline: string) => void
    deleteTask: (id: string) => void
    tasks: any;
}
class TodoListTasks extends React.Component<IProps> {
    render = () => {
        let tasksElement = this.props.tasks.map((t: Task) => {
            return <TodoListTask task={t} changeStatus={this.props.changeStatus} changeTitle={this.props.changeTitle}
                deleteTask={this.props.deleteTask} changePriority={this.props.changePriority}
                changeDescription={this.props.changeDescription}
                changeStartDate={this.props.changeStartDate}
                changeDeadline={this.props.changeDeadline} />
        })

        return (
            <div className={s.tasksBlock}>
                {tasksElement}
            </div>
        );
    }
}

export default TodoListTasks;

