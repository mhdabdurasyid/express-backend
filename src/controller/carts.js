const { addCartModel } = require('../models/carts')

module.exports = {
  addCart: (request, response) => {
    const { costumerID, itemID, quantity } = request.body

    if (costumerID && itemID && quantity) {
      addCartModel(request.body, (error, result) => {
        if (!error) {
          response.send({
            success: true,
            message: 'Success add item to cart',
            data: request.body
          })
        } else {
          response.status(500).send({
            success: false,
            message: error.message
          })
        }
      })
    } else {
      response.status(400).send({
        success: false,
        message: 'Incomplete data on key & value'
      })
    }
  }
}
