import React from 'react';
import './App.css';
import TodoListTitle from './TodoListTitle';
import AddNewItemForm from './AddNewItemForm'
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';
import { connect } from 'react-redux';
import { addTask, changeTask, deleteTodolist, deleteTask } from './redux/reducer';

class TodoList extends React.Component {

    nextTaskId = 0;

    state = {
        tasks: [],
        filterValue: 'All'
    };

    addItem = (title) => {

        let newTask = {
            id: this.nextTaskId,
            title: title,
            isDone: false,
            priority: "low"
        };
        this.nextTaskId++
        this.props.addTask(newTask, this.props.id)
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    }

    changeTask = (taskId, obj) => {
        this.props.changeTask(taskId, obj, this.props.id)
    }

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, { isDone: isDone });
    }

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, { title: title });
    }

    deleteTodolist = () => {
        this.props.deleteTodolist(this.props.id)
    }

    deleteTask = (taskId) => {
        debugger
        this.props.deleteTask(taskId, this.props.id)
    }

    render = () => {
        debugger
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
                        tasks={this.props.tasks.filter(t => {
                            switch (this.state.filterValue) {
                                case 'All': return true;
                                case 'Completed': return t.isDone;
                                case 'Active': return !t.isDone;
                                default: return true;
                            }
                        })} />
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue} />
                </div>
            </div>
        );
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addTask(newTask, todolistId) {
//             const action = {
//                 type: ADD_TASK,
//                 newTask,
//                 todolistId
//             }
//             dispatch(action)
//         },
//         changeTask(taskId, obj, todolistId) {
//             const action = {
//                 type: CHANGE_TASK,
//                 taskId,
//                 obj,
//                 todolistId
//             }
//             dispatch(action)
//         },
//         deleteTodolist(todolistId) {
//             const action = {
//                 type: DETELE_TODOLIST,
//                 todolistId
//             }
//             dispatch(action)
//         },
//         deleteTask(taskId, todolistId) {

//             const action = {
//                 type: DELETE_TASK,
//                 taskId,
//                 todolistId
//             }
//             dispatch(action)
//         }
//     }
// }

const connectedTodolist = connect(null, { addTask, changeTask, deleteTodolist, deleteTask })(TodoList);
export default connectedTodolist;