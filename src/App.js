import React from 'react';
import './App.css';
import TodoList from './TodoList';
import AddNewItemForm from './AddNewItemForm'
import { connect } from 'react-redux'
import { ADD_TODOLIST } from './redux/reducer';

class App extends React.Component {

    state = {
        todolists: []
    }

    nextTodoListId = 0;


    onAddTodoListClick = (title) => {

        let newTodoList = {
            id: this.nextTodoListId,
            title: title,
            tasks: []
        };
        this.nextTodoListId++
        this.props.addTodolist(newTodoList);
    }

    render = () => {

        const todolists = this.props.todolists.map((el) => <TodoList id={el.id} title={el.title} tasks={el.tasks} />)

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

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodolist: (newTodolist) => {
            const action = {
                type: ADD_TODOLIST,
                newTodolist
            }
            dispatch(action);
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;
