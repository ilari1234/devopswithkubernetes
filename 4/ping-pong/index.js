const express = require('express')
const app = express()

const pg = require('pg')
const { Pool } = pg
const pool = new Pool({
  host : process.env.POSTGRES_HOST,
  user : process.env.POSTGRES_USER,
  password : process.env.POSTGRES_PASSWORD,
  database : process.env.POSTGRES_DB, }
)

app.get('/pingpong', async (req, res) => {
  await incrementPing()
  const counter = await loadPing()
  res.send(`Counter: ${counter}`)
})

app.get('/pongs', async (req, res) => {
  const counter = await loadPing()
  res.send(`Ping / Pongs: ${counter}`)
})

app.get('/', async (req, res) => {
  res.send('Ping Pong Service')
})

const incrementPing = async () => {
  try {
    await pool.query('UPDATE pingpong SET count = count + 1 WHERE id = 1')
  } catch (error) {
    console.error(`Error incrementing ping: ${error.stack}`)
  }
}

const loadPing = async () => {
  try {
    const result = await pool.query('SELECT count FROM pingpong WHERE id = 1')
    return result.rows[0].count
  } catch (error) {
    console.error(`Error loading ping: ${error.stack}`)
  }
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
