import React from 'react';
import s from './App.module.css';
import TodoListTitle from './TodoListTitle';
import AddNewItemForm from './AddNewItemForm'
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';
import { connect } from 'react-redux';
import { getTasksTC, addTaskTC, changeTaskTC, deleteTodolistTC, deleteTaskTC, changeHeaderTC } from './redux/reducer';

interface IProps {
    id: string
    title: string
    tasks: Task[]
    getTasksTC: (id: string) => void
    addTaskTC: (id: string, title: string) => void
    changeTaskTC: (taskId: string, obj: IChangeTask, id: string) => void
    changeHeaderTC: (id: string, title: string) => void
    deleteTodolistTC: (id: string) => void
    deleteTaskTC: (taskId: string, id: string) => void
}


class TodoList extends React.Component<IProps> {

    componentDidMount() {
        this.props.getTasksTC(this.props.id)
    }

    state = {
        filterValue: 'All'
    };

    addItem = (title: string) => {
        this.props.addTaskTC(this.props.id, title)
    }

    changeFilter = (newFilterValue: string) => {
        this.setState({
            filterValue: newFilterValue
        })
    }

    changeTaskTC = (taskId: string, obj: IChangeTask) => {
        this.props.changeTaskTC(taskId, obj, this.props.id)
    }

    changeStatus = (taskId: string, status: number) => {
        this.changeTaskTC(taskId, { status });
    }

    changeTitle = (taskId: string, title: string) => {
        this.changeTaskTC(taskId, { title });
    }

    changeHeaderTitleTC = (title: string) => {
        this.props.changeHeaderTC(this.props.id, title)
    }

    deleteTodolist = () => {
        if (window.confirm('Are you sure you want to delete this to-do list?')) {
            this.props.deleteTodolistTC(this.props.id)
        }
    }

    deleteTaskTC = (taskId: string) => {
        this.props.deleteTaskTC(taskId, this.props.id)
    }

    render = () => {
        let { tasks = [] } = this.props
        return (
            <div className="App">
                <div className="todoList">
                    <div className='todoList-header'>
                        <TodoListTitle title={this.props.title}
                            deleteTodolist={this.deleteTodolist} changeHeaderTitleTC={this.changeHeaderTitleTC}
                            id={this.props.id} />
                        <AddNewItemForm addItem={this.addItem} style='addNewTask' placeholder='New task name' />
                    </div>
                    <div className='tasksFooter'>
                        <TodoListTasks changeStatus={this.changeStatus}
                            changeTitle={this.changeTitle}
                            deleteTask={this.deleteTaskTC}
                            tasks={tasks.filter(t => {
                                if (this.state.filterValue === "All") {
                                    return true;
                                }
                                if (this.state.filterValue === "Active") {
                                    return t.status === 0;
                                }
                                if (this.state.filterValue === "Completed") {
                                    return t.status === 2;
                                }
                            })} />
                        <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue} />
                    </div>
                </div>
            </div>
        );
    }
}

const connectedTodolist = connect(null, { getTasksTC, addTaskTC, changeTaskTC, deleteTodolistTC, deleteTaskTC, changeHeaderTC })(TodoList);
export default connectedTodolist;