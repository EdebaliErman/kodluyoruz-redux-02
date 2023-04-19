import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodosAsync, selecetAddTodoErorr, selecetAddTodoLoading } from "../Redux/todos/todosSlice";
import Error from './Error'

function Form() {
    const addTodoLoading = useSelector(selecetAddTodoLoading)
    const addTodoErorr = useSelector(selecetAddTodoErorr)

    const [title, setTitle] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        if (!title) return
        await dispatch(addTodosAsync({ title }))
        e.preventDefault()
        setTitle('')
    }


    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }} >
            <input
                disabled={addTodoLoading}
                className='new-todo'
                placeholder='what needs todo ?'
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            {
                addTodoLoading &&
                <span className='loading' style={{ fontSize: "12px", color: "pink" }}> Loading...</span>

            }
            {
                addTodoErorr && <Error message={addTodoErorr} />
            }
        </form>
    )
}

export default Form
