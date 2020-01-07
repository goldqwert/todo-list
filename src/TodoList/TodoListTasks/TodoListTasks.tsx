import React from 'react';
// import s from './TodoListTasks.module.css';
import TodoListTask from './TodoListTask/TodoListTask';

interface IProps {
    changeStatus: (id: string, status: number) => void
    changeTitle: (id: string, title: string) => void
    deleteTask: (id: string) => void
    tasks: any;
}
class TodoListTasks extends React.Component<IProps> {
    render = () => {
        let tasksElement = this.props.tasks.map((t: Task) => {
            return <TodoListTask task={t} changeStatus={this.props.changeStatus} changeTitle={this.props.changeTitle}
                deleteTask={this.props.deleteTask} />
        })

        return (
            <div>
                {tasksElement}
            </div>
        );
    }
}

export default TodoListTasks;

