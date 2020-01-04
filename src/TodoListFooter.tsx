import React from 'react';
import './App.css';

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

        let classForAll = this.props.filterValue === 'All' ? 'filter-active' : '',
            classForCompleted = this.props.filterValue === 'Completed' ? 'filter-active' : '',
            classForActive = this.props.filterValue === 'Active' ? 'filter-active' : '';

        return (
            <div className="todoList-footer">
                {this.state.isHidden && <>
                    <div onClick={this.onAllFilterClick} className={classForAll}>All</div>
                    <div onClick={this.onCompletedFilterClick} className={classForCompleted}>Completed</div>
                    <div onClick={this.onActiveFilterClick} className={classForActive}>Active</div>
                </>}
                {!this.state.isHidden && <div className='todoList_hide' onClick={() => { this.setState({ isHidden: true }) }}>Show</div>}
                {this.state.isHidden && <div className='todoList_show' onClick={() => { this.setState({ isHidden: false }) }}>Hide</div>}
            </div>
        );
    }
}

export default TodoListFooter;

