import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';

class App extends React.Component {

    state = {
        tasks: [
            { title: 'HTML', isDone: true, priority: 'medium' },
            { title: 'CSS', isDone: true, priority: 'medium' },
            { title: 'JS', isDone: true, priority: 'medium' },
            { title: 'React', isDone: false, priority: 'low' }
        ],
        filterValue: 'All'
    };

    newTaskTitleRef = React.createRef();

    addTask = (argument) => {

        let newTask = {
            title: argument,
            isDone: true,
            priority: 'low'
        }

        let newTasksObj = [...this.state.tasks, newTask];

        this.setState({
            tasks: newTasksObj
        });
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        })
    }

    changeStatus = (task, status) => {
        let newTasks = this.state.tasks.map((el) => {
            if (el == task) {
                return { ...el, isDone: status }
            } else {
                return el
            }
        })
        this.setState({
            tasks: newTasks
        })
    }


    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask} />
                    <TodoListTasks changeStatus={this.changeStatus}
                        tasks={this.state.tasks.filter(t => {
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

export default App;

