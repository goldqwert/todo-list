import React from 'react';
import './App.css';

class TodoListHeader extends React.Component {

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
        this.props.changeHeaderTitle(this.state.title)
    }

    changeHeader = (e) => {
        this.setState({
            title: e.currentTarget.value
        })
    }
    render = () => {

        return (
            <div>
                <button onClick={this.props.deleteTodolist}>X</button>
                {this.state.editMode
                    ? <input onChange={this.changeHeader} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.title} />
                    : <h3 onClick={this.activateEditMode} className="todoList-header__title">{this.props.title}</h3>
                }</div>);
    }
}

export default TodoListHeader;