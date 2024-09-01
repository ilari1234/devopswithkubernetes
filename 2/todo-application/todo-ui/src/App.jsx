/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import todoService from './services/todos'

const TodoList = ({ todos }) => {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.title} {todo.completed}</li>
      ))}
    </ul>
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

  const addTodo = (event) => {
    event.preventDefault()
    const todo = { id: todos.length + 1, title: event.target[0].value, completed: false }
    todoService.addTodo(todo).then(todo => {
      setTodos([...todos, todo])
    })
    setTodo('')
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
      <TodoList todos={todos} />
    </div>
  )
}

export default App
