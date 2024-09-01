const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

const todos = [
  { id: 1, title: 'Buy milk', completed: false },
  { id: 2, title: 'Buy bread', completed: false },
  { id: 3, title: 'Buy butter', completed: false }
]

app.get('/todos', (req, res) => {
  res.json(todos)
})

app.post('/todos', (req, res) => {
  console.log(req.body)
  const todo = req.body
  todos.push(todo)
  res.status(201).json(todo)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
