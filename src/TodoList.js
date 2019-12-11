import React from 'react';
import './App.css';
import TodoListTitle from './TodoListTitle';
import AddNewItemForm from './AddNewItemForm'
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';
import { connect } from 'react-redux';
import { setTasks, addTask, changeTask, deleteTodolist, deleteTask } from './redux/reducer';
import axios from 'axios';

class TodoList extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/todo-lists/${this.props.id}/tasks`,
            {
                withCredentials: true,
                headers: { 'API-KEY': 'f332bdcd-3ece-401c-ac40-75a75b80124b' }
            }).then(res => {
                let tasks = res.data.items
                this.props.setTasks(tasks, this.props.id)
            })
    }

    state = {
        filterValue: 'All'
    };

    addItem = (title) => {
        axios.post(`https://social-network.samuraijs.com/api/1.0/todo-lists/${this.props.id}/tasks`,
            { title }, {
            withCredentials: true,
            headers: { 'API-KEY': 'f332bdcd-3ece-401c-ac40-75a75b80124b' }
        }).then(res => {
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
        axios.put('https://social-network.samuraijs.com/api/1.0/todo-lists/tasks/',
            newTask, {
            withCredentials: true,
            headers: { 'API-KEY': 'f332bdcd-3ece-401c-ac40-75a75b80124b' }
        }).then(res => {
            this.props.changeTask(taskId, obj, this.props.id)
        })
    }

    changeStatus = (taskId, status) => {
        this.changeTask(taskId, { status });
    }

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, { title });
    }

    deleteTodolist = () => {
        axios.delete(`https://social-network.samuraijs.com/api/1.0/todo-lists/${this.props.id}`, {
            withCredentials: true,
            headers: { 'API-KEY': 'f332bdcd-3ece-401c-ac40-75a75b80124b' }
        }).then(res => {
            this.props.deleteTodolist(this.props.id)
        })

    }

    deleteTask = (taskId) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.0/todo-lists/tasks/${taskId}`, {
            withCredentials: true,
            headers: { 'API-KEY': 'f332bdcd-3ece-401c-ac40-75a75b80124b' }
        }).then(res => {
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
                            deleteTodolist={this.deleteTodolist} />
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

const connectedTodolist = connect(null, { setTasks, addTask, changeTask, deleteTodolist, deleteTask })(TodoList);
export default connectedTodolist;