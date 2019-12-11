import React from 'react';
import './App.css';
import TodoList from './TodoList';
import AddNewItemForm from './AddNewItemForm'
import { connect } from 'react-redux'
import { setTodolists, addTodolist } from './redux/reducer';
import axios from 'axios';

class App extends React.Component {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/todo-lists',
            { withCredentials: true })
            .then(res => {
                this.props.setTodolists(res.data)
            })
    }

    nextTodoListId = 0;

    state = {
        todolists: []
    }

    onAddTodoListClick = (title) => {
        axios.post('https://social-network.samuraijs.com/api/1.0/todo-lists',
            { title },
            {
                withCredentials: true,
                headers: { 'API-KEY': 'f332bdcd-3ece-401c-ac40-75a75b80124b' }
            }).then(res => {
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
