import React from 'react';
import './App.css';
import TodoList from './TodoList';
import AddNewItemForm from './AddNewItemForm'
import { connect } from 'react-redux'
import { getTodolistsTC, addTodolistTC } from './redux/reducer';
import { api } from './DAL/api';

class App extends React.Component {

    componentDidMount() {
        this.props.getTodolistsTC()
    }

    nextTodoListId = 0;

    state = {
        todolists: []
    }

    onAddTodoListClick = (title) => {
        this.props.addTodolistTC(title)
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

const ConnectedApp = connect(mapStateToProps, { getTodolistsTC, addTodolistTC })(App);
export default ConnectedApp;
