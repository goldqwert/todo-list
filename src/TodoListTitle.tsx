import React, { useState } from 'react';
import './App.css';

interface IProps {
    changeHeaderTitle: () => void;
    deleteTodolist: () => void;
    title: string;
}

const TodoListTitle: React.FC<IProps> = ({ title, changeHeaderTitle, deleteTodolist }) => {

    // state = {
    //     editMode: false,
    //     title: this.props.title
    // }

    const [localTitle, setTitle] = useState(title);
    const [editMode, setEditMode] = useState(false);

    const deactivateEditMode = () => {
        changeHeaderTitle(localTitle);
        setEditMode(false);
    }

    return (
        <div>
            <button onClick={deleteTodolist}>X</button>
            {editMode
                ? <input onChange={e => setTitle(e.target.value)} autoFocus={true} onBlur={changeHeaderTitle} value={title} />
                : <h3 onClick={e => setEditMode(true)} className="todoList-header__title">{title}</h3>
            }
        </div>);

}

export default TodoListTitle;