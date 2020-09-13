// IMPORT modul
const express = require('express')
const bodyParser = require('body-parser')
const itemsRouter = require('./src/routes/items')
const categoriesRouter = require('./src/routes/categories')
const colorsRouter = require('./src/routes/colors')
const conditionsRouter = require('./src/routes/conditions')

const app = express()

// configure express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/item', itemsRouter)
app.use('/category', categoriesRouter)
app.use('/color', colorsRouter)
app.use('/condition', conditionsRouter)

// listening on port 8080
app.listen(8080, () => {
  console.log('App listening on port 8080')
})
