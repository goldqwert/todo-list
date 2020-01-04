import React from 'react';
import './App.css';

interface IProps {
    title: string
    id: string
    deleteTodolist: () => void
    changeHeaderTitleTC: (title: string) => void
}
class TodoListTitle extends React.Component<IProps> {

    state = {
        editMode: false,
        title: this.props.title
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.changeHeaderTitleTC(this.state.title)
    }

    changeHeader = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            title: e.currentTarget.value
        })
    }
    render = () => {
        return (
            <div>
                <div onClick={this.props.deleteTodolist}>Delete</div>
                <div className='border2'>{this.state.editMode
                    ? <input onChange={this.changeHeader} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.title}
                        className='css-input' />
                    : <h3 onClick={this.activateEditMode} className="todoList-header__title size">{this.props.title}</h3>
                }</div>
            </div>);
    }
}

export default TodoListTitle;