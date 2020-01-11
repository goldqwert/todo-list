import React from 'react';
import s from './TodoListFooter.module.css';

interface IProps {
    changeFilter: (arg: string) => void
    filterValue: string
    deleteTodolist: () => void
}
class TodoListFooter extends React.Component<IProps> {

    onAllFilterClick = () => {
        this.props.changeFilter('All')
    }
    onCompletedFilterClick = () => {
        this.props.changeFilter('Completed')
    }
    onActiveFilterClick = () => {
        this.props.changeFilter('Active')
    }

    render = () => {
        const classForAll = this.props.filterValue === 'All' ? `${s.filterActive}` : `${s.footerBtns}`;
        const classForCompleted = this.props.filterValue === 'Completed' ? `${s.filterActive}` : `${s.footerBtns}`;
        const classForActive = this.props.filterValue === 'Active' ? `${s.filterActive}` : `${s.footerBtns}`;
        return (
            <div className={s.footerWrapper}>
                <div onClick={this.onAllFilterClick} className={classForAll}>All</div>
                <div onClick={this.onCompletedFilterClick} className={classForCompleted}>Completed</div>
                <div onClick={this.onActiveFilterClick} className={classForActive}>Active</div>
                <div onClick={this.props.deleteTodolist} className={s.footerBtns}>Delete</div>
            </div>);
    }
}

export default TodoListFooter;

