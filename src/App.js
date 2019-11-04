import React from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';

class App extends React.Component {

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {

        let stateAsString = JSON.stringify(this.state);

        localStorage.setItem('our-state', stateAsString);
    }

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        };

        let stateAsString = localStorage.getItem('our-state');

        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }

        this.setState(state, () => {
            this.state.tasks.forEach(el => {
                if (el.id <= this.nextTaskId) {
                    this.nextTaskId = el.id + 1;
                }
            });
        })
    }

    nextTaskId = 0;

    state = {
        tasks: [],
        filterValue: 'All'
    };

    addTask = (argument) => {

        let newTask = {
            id: this.nextTaskId,
            title: argument,
            isDone: false,
            priority: 'low'
        }

        this.nextTaskId++;
        let newTasksObj = [...this.state.tasks, newTask];

        this.setState({
            tasks: newTasksObj
        }, () => {
            this.saveState()
        });
    }

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => {
            this.saveState()
        })
    }

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map((el) => {
            if (el.id == taskId) {
                return { ...el, ...obj }
            } else {
                return el
            }
        })
        this.setState({
            tasks: newTasks
        }, () => {
            this.saveState();
        });
    }

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, { isDone: isDone });
    }

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, { title: title });
    }


    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask} />
                    <TodoListTasks changeStatus={this.changeStatus}
                        changeTitle={this.changeTitle}
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

