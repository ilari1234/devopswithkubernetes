const express = require('express');
const app = express();
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('crypto');

const dirPath = path.join(__dirname, 'logs')
const logfilePath = path.join(dirPath, 'timestamps.log')

app.get('/status', (req, res) => {
    res.send(`{ "status": "OK", "timestamp": "${new Date().toISOString()}" }`);
})

app.get('/log', async (req, res) => {
    try {
        const data = await fs.promises.readFile(logfilePath, 'utf8');
        const hash = crypto.createHash('sha256').update(data).digest('hex');
        res.send(`<p>Hash: ${hash}</p><pre>${data}</pre>`);
    } catch (err) {
        console.error(`Error reading file: ${err}`);
        return res.status(500).send('Error reading file');
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`);
});
