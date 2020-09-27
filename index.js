// IMPORT modul
const express = require('express')
const bodyParser = require('body-parser')
const itemsRouter = require('./src/routes/items')
const categoriesRouter = require('./src/routes/categories')
const colorsRouter = require('./src/routes/colors')
const conditionsRouter = require('./src/routes/conditions')
const sellersRouter = require('./src/routes/sellers')
const costumersRouter = require('./src/routes/costumers')
const cartsRouter = require('./src/routes/carts')
const authRouter = require('./src/routes/auth')

// enable CORS
const cors = require('cors')

const app = express()

// enable CORS
app.use(cors())

// import middleware
const authMidlleware = require('./src/middlewares/auth')

// configure express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/uploads', express.static('assets/uploads'))

app.use('/item', itemsRouter)
app.use('/category', authMidlleware, categoriesRouter)
app.use('/color', authMidlleware, colorsRouter)
app.use('/condition', authMidlleware, conditionsRouter)
app.use('/seller', sellersRouter)
app.use('/costumer', costumersRouter)
app.use('/cart', authMidlleware, cartsRouter)
app.use('/auth', authRouter)

// listening on port 8080
app.listen(8080, () => {
  console.log('App listening on port 8080')
})
