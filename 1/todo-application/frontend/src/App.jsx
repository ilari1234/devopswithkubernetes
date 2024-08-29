import { useState } from 'react'

const todoses = [
  { id: 1, text: 'Learn React' },
  { id: 2, text: 'Learn Firebase' },
  { id: 3, text: 'Build a Todo App' },
]

const TodoList = ({ todos }) => {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  )
}

const App = () => {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState(todoses)

  const addTodo = (event) => {
    event.preventDefault()
    setTodos([...todos, { id: todos.length + 1, text: event.target[0].value }])
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
