const fs = require('node:fs')
const path = require('node:path')

const dirPath = path.join(__dirname, 'logs')
const logfilePath = path.join(dirPath, 'timestamps.log')


const createLogDir = () => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath)
    }
}

const logTimestamp =() => {
    const timestamp = new Date().toISOString()
    fs.appendFile(logfilePath, `${timestamp}\n`, (err) => {
        if (err) {
            console.error(`Error writing file: ${err}`)
        }
    })

}

createLogDir()
logTimestamp()
setInterval(logTimestamp, 5000)