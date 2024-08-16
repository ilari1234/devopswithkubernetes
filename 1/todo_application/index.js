const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Todo Application</h1>');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`);
});