const mongoose = require("mongoose");
const express = require('express')
const users = require('./src/routes/userRouters')
const admin = require('./src/routes/adminRouters');
const crops = require("./src/routes/cropsRoutes");
const app = express()

require('./config/js/database')



app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/', users)
app.use('/admin', admin)
app.use('/crops', crops)

app.listen('3000', () => {
    console.log('Server active')
})