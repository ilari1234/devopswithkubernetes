const { v4 } = require('uuid');
const express = require('express');
const app = express();

const get_uuid =() => {
    const uuid = v4()

    console.log(`${new Date().toISOString()}:${uuid}`)
    setInterval(() => {
        console.log(`${new Date().toISOString()}:${uuid}`)
    }, 5000)
}

app.get('/status', (req, res) => {
    res.send(`{ "status": "OK", "timestamp": "${new Date().toISOString()}" }`);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`);
});

get_uuid()
