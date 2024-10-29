/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import todoService from './services/todos'

const Todo = ({ todo, updateStatus }) => {
  return (
    <tr>
      <td>{todo.title}</td>
      <td>{todo.done ? 'Done' : 'Not done'} </td>
      <td><button onClick={() => updateStatus(todo)}>Change status</button></td>
    </tr>
  )
}

const TodoList = ({ todos, updateStatus }) => {
  if (!todos || todos.length === 0) {
    return;
  }
  return (
    <table>
      <tbody>
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} updateStatus={updateStatus} />
        ))}
      </tbody>
    </table>
  )
}

const App = () => {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])

  useEffect(() => {
    todoService.getAll().then(todos => {
      setTodos(todos)
    })
  }, [])

  const addTodo = async (event) => {
    event.preventDefault()
    const todoObject = { title: event.target[0].value, done: false }
    const todo = await todoService.addTodo(todoObject)
    setTodos(todos.concat(todo))
    setTodo('')
  }

  const updateStatus = async (todoObject) => {
    const updatedTodo = { ...todoObject, done: !todoObject.done }
    const returnedTodo = await todoService.updateTodo(updatedTodo.id, updatedTodo)
    setTodos(todos.map(todo => todo.id !== returnedTodo.id ? todo : returnedTodo))
  }
  
  const handleTodoChange = (event) => {
    if (event.target.value.length > 140) {
      return
    }
    setTodo(event.target.value)
  }

  return (
    <div>
      <h1>Todo Application</h1> 
      <img src="image.jpg" />
      <form onSubmit={addTodo}>
      <input 
        value={todo}
        onChange={handleTodoChange}
        type="text" 
      />
      <button type="submit">Create TODO</button>
    </form>
      <TodoList todos={todos} updateStatus={updateStatus} />
    </div>
  )
}

export default App
