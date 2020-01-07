import React from 'react';
import s from './TodoListFooter.module.css';

interface IProps {
    changeFilter: (arg: string) => void
    filterValue: string
}
class TodoListFooter extends React.Component<IProps> {

    state = {
        isHidden: true
    }

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

        let classForAll = this.props.filterValue === 'All' ? `${s.filteractive}` : `${s.footerBtns}`,
            classForCompleted = this.props.filterValue === 'Completed' ? `${s.filteractive}` : `${s.footerBtns}`,
            classForActive = this.props.filterValue === 'Active' ? `${s.filteractive}` : `${s.footerBtns}`;

        return (
            <div className={s.todoListfooter}>
                {this.state.isHidden && <>
                    <div onClick={this.onAllFilterClick} className={classForAll}>All</div>
                    <div onClick={this.onCompletedFilterClick} className={classForCompleted}>Completed</div>
                    <div onClick={this.onActiveFilterClick} className={classForActive}>Active</div>
                </>}
                {!this.state.isHidden && <div className={s.footerBtns} onClick={() => { this.setState({ isHidden: true }) }}>Show</div>}
                {this.state.isHidden && <div className={s.footerBtns} onClick={() => { this.setState({ isHidden: false }) }}>Hide</div>}
            </div>);
    }
}

export default TodoListFooter;

