import React from 'react';
import './App.css';

interface IProps {
    addItem: (newText: string) => void
    style: string
    placeholder: string
}

class TodoListHeader extends React.Component<IProps> {

    state = {
        error: false,
        title: ''
    }

    onAddItemButtonClick = () => {
        let newText = this.state.title;
        if (newText === '') {
            this.setState({
                error: true
            })
        } else {
            this.setState({
                error: false,
                title: ''
            })
            this.props.addItem(newText);
        }

    }

    changeOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.onAddItemButtonClick()
        }
    }

    changeValueTitle = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length > 100) {
            this.setState({
                error: true
            })
        } else {
            this.setState({
                title: e.currentTarget.value,
                error: false
            })
        }
    }

    render = () => {
        let classForError = this.state.error === true ? `error ${this.props.style}` : `${this.props.style}`;
        return (
            <div className={this.props.style}>
                <input type="text" placeholder={this.props.placeholder} onKeyPress={this.changeOnKeyPress}
                    className={classForError}
                    value={this.state.title}
                    onChange={this.changeValueTitle} />
                <button onClick={this.onAddItemButtonClick}>ADD</button>
            </div>
        );
    }
}

export default TodoListHeader;