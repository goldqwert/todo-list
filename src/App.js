import React from 'react';
import './App.css';
import TodoList from './TodoList';
import AddNewItemForm from './AddNewItemForm'
import { connect } from 'react-redux'
import { setTodolists, addTodolist } from './redux/reducer';
import axios from 'axios';
import { api } from './DAL/api';

class App extends React.Component {

    componentDidMount() {
        api.getTodolists().then(res => {
            this.props.setTodolists(res.data)
        })
    }

    nextTodoListId = 0;

    state = {
        todolists: []
    }

    onAddTodoListClick = (title) => {
        api.addTodolist(title).then(res => {
            let newTodolist = res.data.data.item
            this.props.addTodolist(newTodolist);
        })
    }

    render = () => {
        const todolists = this.props.todolists.map((el) => <TodoList id={el.id} title={el.title} tasks={el.tasks} />)
        debugger
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

const ConnectedApp = connect(mapStateToProps, { setTodolists, addTodolist })(App);
export default ConnectedApp;
