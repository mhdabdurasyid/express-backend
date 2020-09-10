// IMPORT modul
const express = require('express')
const bodyParser = require('body-parser')
const itemsRouter = require('./src/routes/items')

const app = express()

// configure express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/item', itemsRouter)

// listening on port 8080
app.listen(8080, () => {
  console.log('App listening on port 8080')
})
