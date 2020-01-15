import React from 'react';
import s from './TodoListTitle.module.css';
interface IProps {
    title: string
    id: string
    changeHeaderTitleTC: (title: string) => void
}
class TodoListTitle extends React.Component<IProps> {

    state = {
        editMode: false,
        title: this.props.title,
        error: false
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        let newText = this.state.title;
        if (newText === '') {
            this.setState({
                error: true
            })
        } else {
            this.setState({
                error: false,
                title: '',
                editMode: false
            })
            this.props.changeHeaderTitleTC(newText)
        }
    }

    changeHeader = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length > 55) {
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
        return (<div>
            <div>{this.state.editMode
                ? <input onChange={this.changeHeader} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.title}
                    className={s.titleElement} />
                : <h3 onDoubleClick={this.activateEditMode} className={s.titleSize}>{this.props.title}</h3>
            }</div>
        </div>);
    }

}
export default TodoListTitle;