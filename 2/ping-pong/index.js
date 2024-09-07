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

const initTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pingpong (
        id SERIAL PRIMARY KEY,
        count INT
      )
    `)
  } catch (error) {
    console.error(`Error creating table: ${error.stack}`)
  }
}

const initCounter = async () => {
  try {
    const result = await pool.query('SELECT * FROM pingpong')
    if (result.rows.length === 0) {
      await pool.query('INSERT INTO pingpong (count) VALUES (0)')
    }
  } catch (error) {
    console.error(`Error initializing ping: ${error.stack}`)
  }
}

const initDatabase = async () => {
  await initTable()
  await initCounter()
}

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

initDatabase()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
