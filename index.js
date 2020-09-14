// IMPORT modul
const express = require('express')
const bodyParser = require('body-parser')
const itemsRouter = require('./src/routes/items')
const categoriesRouter = require('./src/routes/categories')
const colorsRouter = require('./src/routes/colors')
const conditionsRouter = require('./src/routes/conditions')
const sellersRouter = require('./src/routes/sellers')
const costumersRouter = require('./src/routes/costumers')

const app = express()

// configure express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/item', itemsRouter)
app.use('/category', categoriesRouter)
app.use('/color', colorsRouter)
app.use('/condition', conditionsRouter)
app.use('/seller', sellersRouter)
app.use('/costumer', costumersRouter)

// listening on port 8080
app.listen(8080, () => {
  console.log('App listening on port 8080')
})
