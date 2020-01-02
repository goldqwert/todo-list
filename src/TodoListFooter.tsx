import React from 'react';
import './App.css';

class TodoListFooter extends React.Component {

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
                {this.state.isHidden && <div>
                    <button onClick={this.onAllFilterClick} className={classForAll}>All</button>
                    <button onClick={this.onCompletedFilterClick} className={classForCompleted}>Completed</button>
                    <button onClick={this.onActiveFilterClick} className={classForActive}>Active</button>
                </div>}
                {!this.state.isHidden && <span onClick={() => { this.setState({ isHidden: true }) }}>Hide</span>}
                {this.state.isHidden && <span onClick={() => { this.setState({ isHidden: false }) }}>Show</span>}
            </div>
        );
    }
}

export default TodoListFooter;

