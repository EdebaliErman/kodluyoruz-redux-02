import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodosAsync, selectFiltered, getTodosAsync, toggleTodosAsync, selecetIsLoading, selecetErorr } from '../Redux/todos/todosSlice'
import Loading from './Loading'
import Error from './Error'


function TodoList() {


    const dispatch = useDispatch()

    const selectFilteredTodo = useSelector(selectFiltered)
    const isLoading = useSelector(selecetIsLoading)
    const error = useSelector(selecetErorr)

    const handleChange = async (id, completed) => await dispatch(toggleTodosAsync({ id, data: { completed } }))
    const handleClick = async (id) => {
        await window.confirm("Are you sure ?") && dispatch(removeTodosAsync(id))
    }

    useEffect(() => {
        dispatch(getTodosAsync())
    }, [dispatch])

    if (isLoading) {
        return <Loading />
    }
    if (error) { return <Error message={error} /> }
    return (
        <ul className="todo-list">
            {selectFilteredTodo.map((item) =>
                <li key={item.id} className={item.completed ? "completed" : ""}>
                    <div className="view">
                        <input
                            className="toggle"
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => handleChange(item.id, !item.completed)} />
                        <label>{item.title}</label>
                        <button
                            className="destroy"
                            onClick={() => handleClick(item.id)}></button>
                    </div>
                </li>
            )
            }


        </ul>
    )
}

export default TodoList
