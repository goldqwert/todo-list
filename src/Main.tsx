import React from 'react';
import s from './Main.module.css';
import TodoList from './TodoList/TodoList';
import AddNewItemForm from './AddNewItemForm/AddNewItemForm'
import { connect } from 'react-redux';
import { getTodolistsTC, addTodolistTC, showTodolistsAC } from './redux/TodoListsReducer';
import { Redirect } from 'react-router-dom';
import { logoutTC, initializeAppTC } from './redux/AuthReducer';
import loader from './img/Loader.svg'

interface IProps {
    getTodolistsTC: () => void
    addTodolistTC: (title: string) => void
    showTodolistsAC: () => void
    logoutTC: () => void
    initializeAppTC: () => void

}
interface mapStateToProps {
    todolists: any[]
    error: boolean
    isAuth: boolean
    userId: number
    login: string
    initialize: boolean
}

type AppProps = IProps & mapStateToProps

class Main extends React.Component<AppProps> {

    componentDidMount() {
        this.props.initializeAppTC()
        this.props.getTodolistsTC()
    }

    nextTodoListId = 0;

    state = {
        todolists: []
    }

    onAddTodoListClick = (title: string) => {
        this.props.addTodolistTC(title)
    }

    showTodolists = () => {
        this.props.showTodolistsAC()
    }

    render = () => {
        if (!this.props.initialize) {
            return <img className={s.appLoader} src={loader} />
        }
        if (!this.props.isAuth) {
            return <Redirect to='/login' />
        }
        return (<div className={s.appWrapper}>
            {!this.props.error
                ? <div>
                    <div className={s.appHeader}><h1>To-do list app</h1>
                        <AddNewItemForm addItem={this.onAddTodoListClick} style='addNewTodo' placeholder='new to-do list' />
                        <div className={s.appUserInfo}>
                            <div>id: {this.props.userId}</div>
                            <div>login: {this.props.login}</div>
                            <button onClick={this.props.logoutTC} className={s.appUserInfoBtn}>Logout</button>
                        </div>
                    </div>

                    <div className={s.appTodoWrapper}>
                        {this.props.todolists.map((el) => <TodoList key={el.id} id={el.id} title={el.title} tasks={el.tasks} />)}
                    </div>

                </div>
                : <div className={s.appError}>
                    The maximum number of to-do lists is not more than 10,
                         and tasks in the to-do list are not more than 100
                    <button className={s.appBtnComeBack} onClick={this.showTodolists}>Come back</button>
                </div>}
        </div>);
    }
}

const mapStateToProps = (state: any): mapStateToProps => ({
    todolists: state.app.todolists,
    error: state.app.error,
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
    login: state.auth.login,
    initialize: state.auth.initialize
})

const ConnectedMain = connect(mapStateToProps, { getTodolistsTC, addTodolistTC, showTodolistsAC, logoutTC, initializeAppTC })(Main);
export default ConnectedMain;
