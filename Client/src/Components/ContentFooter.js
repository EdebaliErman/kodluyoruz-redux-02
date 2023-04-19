import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeActiveFilter, clearCompleted,selectActiveFilter, selecetTodos } from '../Redux/todos/todosSlice'






function ContentFooter() {
    const items = useSelector(selecetTodos)
    const itemsLeft = items.filter(item => !item.completed).length
    const dispatch = useDispatch()

    const activeFilter = useSelector(selectActiveFilter)

    return (
        <footer className="footer">

            <span className="todo-count">
                <strong>{itemsLeft} </strong>
                {itemsLeft > 1 ? "items left" : "item left"}
            </span>

            <ul className="filters">
                <li>
                    <a href='#/'
                        className={activeFilter === 'all' ? 'selected' : ''}
                        onClick={() => dispatch(changeActiveFilter('all'))}
                    >All</a>
                </li>
                <li>
                    <a href='#/'
                        onClick={() => dispatch(changeActiveFilter('active'))}
                        className={activeFilter === 'active' ? 'selected' : ''}>Active</a>
                </li>
                <li>
                    <a href='#/'
                        onClick={() => dispatch(changeActiveFilter('completed'))}
                        className={activeFilter === 'completed' ? 'selected' : ''}>Completed</a>
                </li>
            </ul>

            <button className="clear-completed"
                onClick={() => dispatch(clearCompleted()) }
            >
                Clear completed
            </button>

        </footer >
    )
}

export default ContentFooter
