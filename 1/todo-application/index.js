const axios = require('axios');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

// Todo: fix the code below
app.use(express.static('images'))

const dirPath = path.join(__dirname, 'images')
const imageFilePath = path.join(dirPath, 'image.jpg')
const imageUrl = 'https://picsum.photos/1200'

const createImageDir = () => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath)
    }
}

const downloadImage = async (url, outputPath) => {
    try {
        const response = await axios({
            url: url,
            method: 'GET',
            responseType: 'stream'
        })

        const writer = fs.createWriteStream(outputPath)
        response.data.pipe(writer)

        return new Promise((resolve, reject) => {
            writer.on('finish', () => {
                console.log('Image downloaded successfully')
                resolve()
            })
            writer.on('error', (err) => {
                console.error(`Error writing to a file: ${err.message}`)
                reject(err)
            })
        })
    } catch (err) {
    console.error(`Error downloading image: ${err.message}`)
    }
}



app.get('/', (req, res) => {
    const html = '<h1>Todo Application</h1> <img src="/imageFilePath" />'
    res.send(`<h1>Todo Application</h1> <img src="/images/image.jpg" />`);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`);
});

createImageDir()
downloadImage(imageUrl, imageFilePath)