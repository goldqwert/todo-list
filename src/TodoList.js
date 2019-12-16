import React from 'react';
import './App.css';
import TodoListTitle from './TodoListTitle';
import AddNewItemForm from './AddNewItemForm'
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';
import { connect } from 'react-redux';
import { setTasks, addTask, changeTask, deleteTodolist, deleteTask, changeHeader } from './redux/reducer';
import axios from 'axios';
import { api } from './DAL/api';

class TodoList extends React.Component {

    componentDidMount() {
        api.getTasks(this.props.id).then(res => {
            let tasks = res.data.items
            this.props.setTasks(tasks, this.props.id)
        })
    }

    state = {
        filterValue: 'All'
    };

    addItem = (title) => {
        api.addTask(this.props.id, title).then(res => {
            let newTask = res.data.data.item
            this.props.addTask(newTask, this.props.id)
        })
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    }

    changeTask = (taskId, obj) => {
        let task = this.props.tasks.find(el => el.id === taskId);
        const newTask = { ...task, ...obj }
        api.changeTask(newTask).then(res => {
            this.props.changeTask(taskId, obj, this.props.id)
        })
    }

    changeStatus = (taskId, status) => {
        this.changeTask(taskId, { status });
    }

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, { title });
    }

    changeHeaderTitle = (title) => {
        api.changeHeader(this.props.id, title).then(res => {
            this.props.changeHeader(this.props.id, { title: title })
        })
    }

    deleteTodolist = () => {
        api.deleteTodolist(this.props.id).then(res => {
            this.props.deleteTodolist(this.props.id)
        })

    }

    deleteTask = (taskId) => {
        api.deleteTask(taskId).then(res => {
            this.props.deleteTask(taskId, this.props.id)
        })
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

const connectedTodolist = connect(null, { setTasks, addTask, changeTask, deleteTodolist, deleteTask, changeHeader })(TodoList);
export default connectedTodolist;