import React from 'react';
import s from './AddNewItemForm.module.css';
interface IProps {
    addItem: (newText: string) => void
    style: string
    placeholder: string
}
class AddNewItemForm extends React.Component<IProps> {
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
        const classForInput = (this.props.style === 'addNewTask') ? `${s.addNewTask}` :
            (this.props.style === 'addNewTodo') ? `${s.addNewTodo}` : ''
        const classForError = this.state.error === true ? `${s.error} ${classForInput}` : `${classForInput}`;
        return (<div className={classForError}>
            <div className={classForInput}>
                <input type='text' placeholder={this.props.placeholder} onKeyPress={this.changeOnKeyPress}
                    className={classForInput}
                    value={this.state.title}
                    onChange={this.changeValueTitle} />
                <button onClick={this.onAddItemButtonClick}>ADD</button>
            </div>
        </div>);
    }
}

export default AddNewItemForm;