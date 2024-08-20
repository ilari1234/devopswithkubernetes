const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const app = express();

const dirPath = path.join(__dirname, "logs");
const pingfilePath = path.join(dirPath, "pingpong.log");
let counter = 0;

app.get("/pingpong", (req, res) => {
  res.send(`counter: ${counter}`);
  counter++;
  logPing(counter);
});

const createLogDir = () => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
};

const logPing = (count) => {
  fs.writeFile(pingfilePath, `Ping / Pongs: ${count}`, (err) => {
    if (err) {
      console.error(`Error writing file: ${err}`);
    }
  });
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});

createLogDir();
