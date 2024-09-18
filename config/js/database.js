const mongoose = require('mongoose')
mongoose.Promise = global.Promise

async function main () {
    await mongoose.connect('mongodb://localhost/users')
    console.log('MongoDB conectado')
}

try {
    main()
} catch (err) {
    console.log(err.message)
}