const express = require('express')
const app = express()
const axios = require('axios')
const fs = require('node:fs')
const path = require('node:path')
const crypto = require('crypto')

const dirPath = path.join(__dirname, 'logs')
const timestampfilePath = path.join(dirPath, 'timestamps.log')
const pingfilePath = path.join(dirPath, 'pingpong.log')
const pingPongSCV = process.env.PINGPONGSVC || 'ping-pong-svc'
const pingPongPORT = process.env.PINGPONGPORT || 2345
const configFilePath = '/etc/config/information.txt'

app.get('/status', (req, res) => {
  res.send(`{ "status": "OK", "timestamp": "${new Date().toISOString()}" }`)
})

app.get('/timestamps', async (req, res) => {
  try {
    const data = await fs.promises.readFile(timestampfilePath, 'utf8')
    const hash = crypto.createHash('sha256').update(data).digest('hex')
    res.send(`<p>Hash: ${hash}</p><pre>${data}</pre>`)
  } catch (err) {
    console.error(`Error reading file: ${err}`)
    return res.status(500).send('Error reading file')
  }
})

app.get('/log', async (req, res) => {
  try {
    const timestamp = new Date().toISOString()
    const data = await getPongs()
    const hash = crypto.createHash('sha256').update(data).digest('hex')
    const configData = await getConfigFromFile()
    res.send(
      `<pre>file content: ${configData}</pre>
      <pre>env variable: MESSAGE=${process.env.MESSAGE}</pre>
      <pre>${timestamp}: ${hash}</pre>
      <pre>${data}</pre>`
    )
  } catch (err) {
    console.error(`Error reading file: ${err}`)
    return res.status(500).send('Error reading file')
  }
})

const getConfigFromFile = () => fs.promises.readFile(configFilePath, 'utf8')

const getPongsFromFile  = () =>  fs.promises.readFile(pingfilePath, 'utf8')

const getPongs = async () => {
  try {
    const response = await axios.get(`http://${pingPongSCV}:${pingPongPORT}/pongs`)
    return response.data
  } catch (err) {
    console.error(`Error getting pongs: ${err.message}`)
    return 'Error getting pongs'
  }
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`)
})
