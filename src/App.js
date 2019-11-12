import React from 'react';
import './App.css';
import TodoList from './TodoList';
import AddNewItemForm from './AddNewItemForm'

class App extends React.Component {

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {

        let stateAsString = JSON.stringify(this.state);

        localStorage.setItem('todolists', stateAsString);
    }

    restoreState = () => {
        let state = {
            todolists: []
        };

        let stateAsString = localStorage.getItem('todolists');

        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }

        this.setState(state, () => {
            this.state.todolists.forEach(el => {
                if (el.id <= this.nextTodoListId) {
                    this.nextTodoListId = el.id + 1;
                }
            });
        })
    }

    state = {
        todolists: []
    }

    nextTodoListId = 0;


    onAddTodoListClick = (title) => {
        let newTodoList = {
            id: this.nextTodoListId,
            title: title
        }

        this.nextTodoListId++;
        let newTodoListObj = [...this.state.todolists, newTodoList];

        this.setState({
            todolists: newTodoListObj
        }, () => {
            this.saveState()
        });
    }

    render = () => {

        const todolists = this.state.todolists.map((el) => <TodoList id={el.id} title={el.title} />)

        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.onAddTodoListClick} />
                </div>
                <div className="App">
                    {todolists}
                </div >
            </>
        );
    }
}

export default App;

