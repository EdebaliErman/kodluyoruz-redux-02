import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

// Todo Api rquest
export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
    const res = await axios('http://localhost:7000/todos')
    return res.data

})
export const addTodosAsync = createAsyncThunk('todos/addTodosAsync', async (data) => {
    const res = await axios.post('http://localhost:7000/todos', data)
    return res.data
})
export const toggleTodosAsync = createAsyncThunk('todos/toggleTodosAsync', async ({ id, data }) => {
    const res = await axios.patch(`http://localhost:7000/todos/${id}`, data)
    return res.data
})
export const removeTodosAsync = createAsyncThunk('todos/removeTodosAsync', async (id) => {
    await axios.delete(`http://localhost:7000/todos/${id}`)
    return id
})
// Todo Slices...
export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        activeFilter: 'all',
        addNewTodoLoading: false,
        addNewTodoError: null
    },
    reducers: {

        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload
        },
        clearCompleted: (state) => {
            const filtered = state.items.filter(item => item.completed === false)
            state.items = filtered
        }
    },
    extraReducers: {
        //get todo 
        [getTodosAsync.pending]: (state, action) => {
            state.isLoading = true
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            state.items = action.payload
            state.isLoading = false
        },
        [getTodosAsync.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        },

        //add todo 
        [addTodosAsync.pending]: (state, action) => {
            state.addNewTodoLoading = true
        },
        [addTodosAsync.fulfilled]: (state, action) => {
            state.items.push(action.payload)
            state.addNewTodoLoading = false
        },
        [addTodosAsync.rejected]: (state, action) => {
            state.addNewTodoLoading = false
            state.addNewTodoError = action.error.message
        },
        // toggle todo (edit todo)
        [toggleTodosAsync.fulfilled]: (state, action) => {
            const { id, completed } = action.payload
            const index = state.items.findIndex(item => item.id === id)
            state.items[index].completed = completed
        },
        [removeTodosAsync.fulfilled]: (state, action) => {
            console.log(action.payload)
            const id = action.payload
            const index = state.items.findIndex(item => item.id === id)
            state.items.splice(index,1)

        }
    }
})

export const selecetTodos = state => state.todos.items
export const selectFiltered = (state) => {
    if (state.todos.activeFilter === 'all') {
        return state.todos.items
    }
    return state.todos.items.filter((todo) =>
        state.todos.activeFilter === 'active'
            ? todo.completed === false
            : todo.completed === true)
}
export const selectActiveFilter = state => state.todos.activeFilter
export const selecetIsLoading = state => state.todos.isLoading
export const selecetErorr = state => state.todos.error
export const selecetAddTodoLoading = state => state.todos.addNewTodoLoading
export const selecetAddTodoErorr = state => state.todos.addNewTodoError



export const {
    changeActiveFilter,
    clearCompleted } = todosSlice.actions
export default todosSlice.reducer