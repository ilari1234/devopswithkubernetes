const { v4 } = require('uuid');

const get_uuid =() => {
    const uuid = v4()

    console.log(`${new Date().toISOString()}:${uuid}`)
    setInterval(() => {
        console.log(`${new Date().toISOString()}:${uuid}`)
    }, 5000)


}

get_uuid()
