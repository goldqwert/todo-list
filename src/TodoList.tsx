import React from 'react';
import './App.css';
import TodoListTitle from './TodoListTitle';
import AddNewItemForm from './AddNewItemForm'
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';
import { connect } from 'react-redux';
import { getTasksTC, addTaskTC, changeTaskTC, deleteTodolistTC, deleteTaskTC, changeHeaderTC } from './redux/reducer';

interface IProps {
    getTasks: () => void
    addTaskTC: () => void
    changeTaskTC: () => void
    changeHeaderTC: () => void
    deleteTodolistTC: () => void
    deleteTaskTC: () => void
}
class TodoList extends React.Component {

    componentDidMount() {
        this.props.getTasksTC(this.props.id)
    }

    state = {
        filterValue: 'All'
    };

    addItem = (title) => {
        this.props.addTaskTC(this.props.id, title)
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    }

    changeTask = (taskId, obj) => {
        this.props.changeTaskTC(taskId, obj, this.props.id)
    }

    changeStatus = (taskId, status) => {
        this.changeTask(taskId, { status });
    }

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, { title });
    }

    changeHeaderTitle = (title) => {
        debugger
        this.props.changeHeaderTC(this.props.id, title)
    }

    deleteTodolist = () => {
        this.props.deleteTodolistTC(this.props.id)
    }

    deleteTask = (taskId) => {
        this.props.deleteTaskTC(taskId, this.props.id)
    }

    render = () => {
        let { tasks = [] } = this.props
        return (
            <div className="App">
                <div className="todoList">
                    <div className='todoList-header'>
                        <TodoListTitle title={this.props.title}
                            deleteTodolist={this.deleteTodolist} changeHeaderTitle={this.changeHeaderTitle}
                            id={this.props.id} />
                        <AddNewItemForm addItem={this.addItem} />
                    </div>
                    <TodoListTasks changeStatus={this.changeStatus}
                        changeTitle={this.changeTitle}
                        deleteTask={this.deleteTask}
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
        );
    }
}

const connectedTodolist = connect(null, { getTasksTC, addTaskTC, changeTaskTC, deleteTodolistTC, deleteTaskTC, changeHeaderTC })(TodoList);
export default connectedTodolist;