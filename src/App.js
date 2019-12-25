import React from 'react';
import './App.css';
import TodoList from './TodoList';
import AddNewItemForm from './AddNewItemForm'
import { connect } from 'react-redux'
import { getTodolistsTC, addTodolistTC, showTodolists } from './redux/reducer';
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

    showTodolists = () => {
        this.props.showTodolists()
    }

    render = () => {
        // const todolists = this.props.todolists.map((el) => <TodoList id={el.id} title={el.title} tasks={el.tasks} />)

        return (
            <>
                {!this.props.error
                    ? <div><div>
                        <AddNewItemForm addItem={this.onAddTodoListClick} /></div>
                        <div className="App">
                            {this.props.todolists.map((el) => <TodoList id={el.id} title={el.title} tasks={el.tasks} />)}
                        </div >
                    </div>
                    : <div>
                        Maximum count of Todo lists count is 10
                        <button onClick={this.showTodolists}>Come back</button>
                    </div>}
            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        todolists: state.todolists,
        error: state.error
    }
}

const ConnectedApp = connect(mapStateToProps, { getTodolistsTC, addTodolistTC, showTodolists })(App);
export default ConnectedApp;
