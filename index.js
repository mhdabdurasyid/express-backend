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
const publicRouter = require('./src/routes/public')
const itemImagesRouter = require('./src/routes/itemImages')
const shippingAddressRouter = require('./src/routes/shippingAddress')
const ordersRouter = require('./src/routes/orders')

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

app.use('/item', authMidlleware, itemsRouter)
app.use('/category', authMidlleware, categoriesRouter)
app.use('/color', authMidlleware, colorsRouter)
app.use('/condition', authMidlleware, conditionsRouter)
app.use('/seller', authMidlleware, sellersRouter)
app.use('/costumer', authMidlleware, costumersRouter)
app.use('/cart', authMidlleware, cartsRouter)
app.use('/item_image', authMidlleware, itemImagesRouter)
app.use('/shipping_address', authMidlleware, shippingAddressRouter)
app.use('/order', authMidlleware, ordersRouter)

app.use('/auth', authRouter)
app.use('/public', publicRouter)

// listening on port 8080
app.listen(8080, () => {
  console.log('App listening on port 8080')
})
