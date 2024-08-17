const express = require('express');
const app = express();

let counter = 0;

app.get('/pingpong', (req, res) => {
    res.send(`counter: ${counter}`);
    counter++;
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`);
});
