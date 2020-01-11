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
        return (<div>

            <div>{this.state.editMode
                ? <input onChange={this.changeHeader} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.title}
                    className={s.element} />
                : <h3 onClick={this.activateEditMode} className={s.titleSize}>{this.props.title}</h3>
            }</div>
        </div>);
    }
}

export default TodoListTitle;