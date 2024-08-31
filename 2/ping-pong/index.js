const fs = require('node:fs')
const path = require('node:path')
const express = require('express')
const app = express()

const dirPath = path.join(__dirname, 'logs')
const pingfilePath = path.join(dirPath, 'pingpong.log')
let counter = 0

app.get('/pingpong', (req, res) => {
  counter++
  res.send(`counter: ${counter}`)
})

app.get('/pongs', (req, res) => {
  res.send(`Ping / Pongs: ${counter}`)
})

const createLogDir = () => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }
}

const logPing = (count) => {
  fs.writeFile(pingfilePath, `Ping / Pongs: ${count}`, (err) => {
    if (err) {
      console.error(`Error writing file: ${err}`)
    }
  })
}

const updateCounterFromFile = () => {
  if (fs.existsSync(pingfilePath)) {
    fs.readFile(pingfilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err}`)
      }
      counter = parseInt(data.split(':')[1].trim())
    })
  }
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
